'use client'

import { useEffect, useMemo, useState } from 'react'

type Order = {
  id: string
  fullName: string
  total: number
  statusPagamento: string | null
  createdAt: string
}

const statusOptions = ['ALL', 'PENDENTE', 'PAGO', 'ENVIADO', 'CANCELADO']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [status, setStatus] = useState('ALL')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      const params = new URLSearchParams({
        status,
        search,
        page: String(page),
        perPage: String(perPage),
      })

      const res = await fetch(`/api/admin/orders?${params.toString()}`, {
        signal: controller.signal,
      })
      const json = await res.json()
      setOrders(json.orders)
      setTotal(json.total)
      setLoading(false)
    }

    load().catch(() => setLoading(false))

    return () => controller.abort()
  }, [status, search, page, perPage])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / perPage)), [total, perPage])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-admin-text)]">Pedidos</h2>
        <p className="text-[var(--color-text-secondary)]">Listagem completa com filtro, busca e paginação.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--color-admin-text)]">Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border border-[var(--color-border)] p-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]">
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Buscar cliente" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded border border-[var(--color-border)] p-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]" />
          <button onClick={() => setPage(1)} className="rounded bg-[var(--color-info)] px-4 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-info-hover)]">Buscar</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-admin-bg)] shadow-sm">
        <table className="min-w-full divide-y divide-[var(--color-border)] text-left text-sm">
          <thead className="bg-[var(--color-bg-tertiary)]">
            <tr>
              <th className="px-4 py-3 text-[var(--color-admin-text)]">ID</th>
              <th className="px-4 py-3 text-[var(--color-admin-text)]">Cliente</th>
              <th className="px-4 py-3 text-[var(--color-admin-text)]">Total</th>
              <th className="px-4 py-3 text-[var(--color-admin-text)]">Status</th>
              <th className="px-4 py-3 text-[var(--color-admin-text)]">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {loading ? (
              <tr><td className="p-4 text-[var(--color-text-secondary)]" colSpan={5}>Carregando...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td className="p-4 text-[var(--color-text-secondary)]" colSpan={5}>Nenhum pedido encontrado.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-primary)]">{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-primary)]">{order.fullName}</td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-primary)]">R${Number(order.total || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-primary)]">{order.statusPagamento || 'PENDENTE'}</td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-primary)]">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
        <span>Exibindo {orders.length} de {total} pedidos</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border border-[var(--color-border)] px-3 py-1 disabled:opacity-50 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]">Anterior</button>
          <span className="text-[var(--color-text-primary)]">Página {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded border border-[var(--color-border)] px-3 py-1 disabled:opacity-50 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]">Próxima</button>
        </div>
      </div>
    </div>
  )
}
