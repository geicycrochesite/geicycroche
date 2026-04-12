import { format } from 'date-fns'

type OrderItem = {
  id: string
  fullName: string
  total: number // ✅ AGORA É NUMBER
  statusPagamento: string | null
  createdAt: Date
}

type Props = {
  orders: OrderItem[]
}

export function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] shadow-sm">
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold">Últimos pedidos</h2>
      </div>

      <table className="w-full min-w-full divide-y divide-[var(--color-admin-border)] text-sm">
        <thead className="bg-[var(--color-bg-tertiary)]">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">ID</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">Cliente</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">Valor</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">Status</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">Data</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--color-border-light)] bg-[var(--color-admin-bg)]">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 text-xs text-[var(--color-admin-text)]">
                {order.id.slice(0, 8)}
              </td>

              <td className="px-4 py-3 text-xs text-[var(--color-admin-text)]">
                {order.fullName}
              </td>

              <td className="px-4 py-3 text-xs font-semibold text-[var(--color-admin-text)]">
                R${order.total.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-xs">
                <span
                  className={`rounded-full px-2 py-1 font-medium ${
                    order.statusPagamento === 'PAGO'
                      ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                      : order.statusPagamento === 'ENVIADO'
                      ? 'bg-[var(--color-info)]/20 text-[var(--color-info)]'
                      : order.statusPagamento === 'CANCELADO'
                      ? 'bg-[var(--color-error)]/20 text-[var(--color-error)]'
                      : 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
                  }`}
                >
                  {order.statusPagamento || 'PENDENTE'}
                </span>
              </td>

              <td className="px-4 py-3 text-xs text-[var(--color-text-tertiary)]">
                {format(order.createdAt, 'dd/MM/yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}