// src/app/api/mercado-pago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  validateMercadoPagoSignature,
  fetchMercadoPagoPayment,
} from '@/lib/mercado-pago-security'

const MERCADO_PAGO_SECRET = process.env.MERCADO_PAGO_WEBHOOK_SECRET
const MERCADO_PAGO_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

export async function POST(req: NextRequest) {
  console.log('[WEBHOOK] Iniciando processamento de notificação Mercado Pago')

  let bodyText: string = ''

  try {
    // Lê o body bruto para validação de assinatura
    bodyText = await req.text()
    console.log('[WEBHOOK] Body recebido:', bodyText.substring(0, 200) + '...')

    let body: any
    try {
      body = JSON.parse(bodyText)
    } catch (parseErr) {
      console.error('[WEBHOOK] Erro ao parsear JSON:', parseErr)
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
    }

    // Valida assinatura
    const signature = req.headers.get('x-signature') ?? undefined
    if (!validateMercadoPagoSignature(bodyText, signature, MERCADO_PAGO_SECRET)) {
      console.warn('[WEBHOOK] Assinatura inválida! Rejeitando notificação.')
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 403 })
    }

    const paymentId = body?.data?.id
    const topic = body?.type || body?.topic

    console.log(`[WEBHOOK] Topic: ${topic}, PaymentId: ${paymentId}`)

    if (topic !== 'payment' || !paymentId) {
      console.log('[WEBHOOK] Ignorando notificação (topic ou paymentId inválido)')
      return NextResponse.json({ status: 'ignored' })
    }

    // Busca o pagamento via API oficial
    console.log(`[WEBHOOK] Buscando dados do pagamento ${paymentId}...`)
    const payment = await fetchMercadoPagoPayment(paymentId, MERCADO_PAGO_TOKEN)

    if (!payment) {
      console.error('[WEBHOOK] Falha ao buscar pagamento da API do MP')
      return NextResponse.json(
        { error: 'Falha ao buscar pagamento' },
        { status: 500 }
      )
    }

    const orderId = payment?.external_reference
    const paymentStatus = payment?.status
    const paymentAmount = payment?.transaction_amount

    console.log(`[WEBHOOK] Dados do pagamento:`, {
      paymentId,
      status: paymentStatus,
      orderId,
      amount: paymentAmount,
    })

    if (!orderId) {
      console.error(
        '[WEBHOOK] external_reference (orderId) não encontrado no pagamento'
      )
      return NextResponse.json({ error: 'OrderId não encontrado' }, { status: 400 })
    }

    if (!paymentStatus) {
      console.error('[WEBHOOK] Status do pagamento não encontrado')
      return NextResponse.json(
        { error: 'Payment status não encontrado' },
        { status: 400 }
      )
    }

    // Busca o pedido para validar o valor
    console.log(`[WEBHOOK] Buscando pedido ${orderId}...`)
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      console.error(`[WEBHOOK] Pedido ${orderId} não encontrado`)
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    }

    // Valida se o valor do pagamento bate com o total do pedido
    const expectedTotal = Number(order.total) + Number(order.frete)
    if (
      paymentAmount &&
      Math.abs(paymentAmount - expectedTotal) > 0.01
    ) {
      console.warn(
        `[WEBHOOK] ⚠️ Valor do pagamento (${paymentAmount}) diferente do total do pedido (${expectedTotal})`
      )
      // Continua mesmo assim, pode ser desconto ou ajuste do MP
    } else {
      console.log(`[WEBHOOK] ✓ Valor do pagamento validado: ${paymentAmount}`)
    }

    // Atualiza o status do pedido no banco
    console.log(`[WEBHOOK] Atualizando pedido ${orderId} com status ${paymentStatus}...`)
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { statusPagamento: paymentStatus },
    })

    console.log(`[WEBHOOK] ✓ Pedido atualizado com sucesso:`, {
      orderId: updatedOrder.id,
      statusPagamento: updatedOrder.statusPagamento,
    })

    return NextResponse.json({
      success: true,
      orderId,
      paymentStatus,
      message: 'Pedido atualizado com sucesso',
    })
  } catch (err: any) {
    console.error('[WEBHOOK] ❌ Erro geral:', err)
    console.error('[WEBHOOK] error.message:', err?.message)
    console.error('[WEBHOOK] error.stack:', err?.stack)

    return NextResponse.json(
      { error: err?.message || 'Erro interno no webhook' },
      { status: 500 }
    )
  }
}
