// src/app/api/mercado-pago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchMercadoPagoPayment } from '@/lib/mercado-pago-security'

const TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

export async function POST(req: NextRequest) {
  const body = await req.json()

  const paymentId = body?.data?.id
  const topic = body?.type || body?.topic

  if (topic !== 'payment' || !paymentId) {
    return NextResponse.json({ status: 'ignored' })
  }

  const payment = await fetchMercadoPagoPayment(paymentId, TOKEN!)

  const orderId = payment?.external_reference
  const status = payment?.status

  if (!orderId || !status) {
    return NextResponse.json({ error: 'invalid payment' }, { status: 400 })
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { statusPagamento: status },
  })

  return NextResponse.json({ success: true })
}