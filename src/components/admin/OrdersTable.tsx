import type { Order } from '@prisma/client'
import { format } from 'date-fns'

type Props = {
  orders: Array<Pick<Order, 'id' | 'fullName' | 'total' | 'statusPagamento' | 'createdAt'>>
}

export function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold">Últimos pedidos</h2>
      </div>
      <table className="w-full min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">ID</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Cliente</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Valor</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 text-xs text-slate-700">{order.id.slice(0, 8)}</td>
              <td className="px-4 py-3 text-xs text-slate-700">{order.fullName}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-800">R${order.total.toFixed(2)}</td>
              <td className="px-4 py-3 text-xs">
                <span
                  className={`rounded-full px-2 py-1 font-medium ${
                    order.statusPagamento === 'PAGO'
                      ? 'bg-emerald-100 text-emerald-700'
                      : order.statusPagamento === 'ENVIADO'
                      ? 'bg-blue-100 text-blue-700'
                      : order.statusPagamento === 'CANCELADO'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {order.statusPagamento || 'PENDENTE'}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{format(order.createdAt, 'dd/MM/yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
