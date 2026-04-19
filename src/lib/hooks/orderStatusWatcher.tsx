'use client'

import { useEffect } from 'react'

export function OrderStatusWatcher({ orderId }: { orderId: string }) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()

      console.log("STATUS:", data.statusPagamento)

      if (data.statusPagamento === "approved") {
        window.location.reload()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId])

  return null
}