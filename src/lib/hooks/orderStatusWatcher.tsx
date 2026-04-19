'use client'

import { useEffect, useRef } from 'react'

export function OrderStatusWatcher({ orderId }: { orderId: string }) {
  const hasReloaded = useRef(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`)
        const data = await res.json()

        console.log("STATUS:", data.statusPagamento)

        if (
          data.statusPagamento === "approved" &&
          !hasReloaded.current
        ) {
          hasReloaded.current = true
          window.location.reload()
        }
      } catch (err) {
        console.error("Erro ao buscar status")
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId])

  return null
}