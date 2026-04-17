// src/lib/mercado-pago-security.ts
import { createHmac } from 'crypto'

/**
 * Valida a assinatura HMAC de uma notificação do Mercado Pago
 * 
 * @param body - String bruta do corpo da requisição
 * @param signature - Valor do header x-signature
 * @param secret - MERCADO_PAGO_WEBHOOK_SECRET
 * @returns true se a assinatura é válida
 */
export function validateMercadoPagoSignature(
  body: string,
  signature: string | undefined,
  secret: string | undefined
): boolean {
  if (!secret) {
    console.warn('[MP-SECURITY] MERCADO_PAGO_WEBHOOK_SECRET não configurado. Aceitando webhook (dev mode)')
    return true
  }

  if (!signature) {
    console.warn('[MP-SECURITY] Header x-signature ausente. Rejeitando webhook.')
    return false
  }

  try {
    const hash = createHmac('sha256', secret).update(body).digest('hex')
    const isValid = hash === signature

    if (!isValid) {
      console.error('[MP-SECURITY] Assinatura inválida!', {
        expected: hash,
        received: signature,
      })
    }

    return isValid
  } catch (error) {
    console.error('[MP-SECURITY] Erro ao validar assinatura:', error)
    return false
  }
}

/**
 * Busca dados do pagamento na API do Mercado Pago
 * 
 * @param paymentId - ID do pagamento
 * @param accessToken - Access token do Mercado Pago
 * @returns Dados do pagamento ou null se erro
 */
export async function fetchMercadoPagoPayment(
  paymentId: string,
  accessToken: string | undefined
) {
  if (!accessToken) {
    console.error('[MP-API] MERCADO_PAGO_ACCESS_TOKEN não configurado')
    return null
  }

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      console.error(
        `[MP-API] Erro ao buscar pagamento: ${response.status} ${response.statusText}`
      )
      return null
    }

    const payment = await response.json()
    return payment
  } catch (error) {
    console.error('[MP-API] Erro ao buscar pagamento:', error)
    return null
  }
}

/**
 * Tipos de resposta do Mercado Pago
 */
export type MercadoPagoPaymentStatus =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'disputed'

export interface MercadoPagoPayment {
  id: number
  status: MercadoPagoPaymentStatus
  external_reference: string
  transaction_amount: number
  currency_id: string
  payer: {
    email: string
    identification: {
      type: string
      number: string
    }
  }
  description: string
  created_at: string
}
