/**
 * 🎨 Componente: OrderCard
 * 
 * Exibe um pedido em formato de card com layout responsivo
 * Encapsula formatação de valores e status
 */

import { OrderFromAPI } from '@/types/order'

interface OrderCardProps {
  pedido: OrderFromAPI
  onViewDetails: (id: string) => void
}

/**
 * Formata total com segurança (total pode ser string do Prisma)
 */
function formatTotal(total: string | number): string {
  const numericTotal = typeof total === 'string' ? parseFloat(total) : total
  if (isNaN(numericTotal)) return 'R$ 0,00'
  return `R$ ${numericTotal.toFixed(2).replace('.', ',')}`
}

/**
 * Formata data com segurança (sem hydration mismatch)
 */
function formatData(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

/**
 * Badge de status com cores
 */
function getStatusBadge(status: string | null): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    'approved': { text: '✓ Aprovado', color: 'bg-green-100 text-green-800' },
    'pending': { text: '⏳ Pendente', color: 'bg-yellow-100 text-yellow-800' },
    'failed': { text: '✗ Falhou', color: 'bg-red-100 text-red-800' },
    'refunded': { text: '↩️ Reembolsado', color: 'bg-blue-100 text-blue-800' },
  }
  return statusMap[status?.toLowerCase() || 'pending'] || {
    text: 'Pendente',
    color: 'bg-gray-100 text-gray-800'
  }
}

export function OrderCard({ pedido, onViewDetails }: OrderCardProps) {
  const statusInfo = getStatusBadge(pedido.statusPagamento)

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 border border-gray-200">
      {/* Cabeçalho: ID + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-gray-500">ID do Pedido</p>
          <p className="font-mono text-lg font-semibold text-gray-900 break-all">
            {pedido.id}
          </p>
        </div>
        <div className={`mt-2 sm:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </div>
      </div>

      {/* Corpo: Total + Data */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-y border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total</p>
          <p className="text-xl font-bold text-blue-600">
            {formatTotal(pedido.total)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Data do Pedido</p>
          <p className="text-gray-900 font-medium">
            {formatData(pedido.createdAt)}
          </p>
        </div>
      </div>

      {/* Rodapé: Botão */}
      <button
        onClick={() => onViewDetails(pedido.id)}
        className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
      >
        Ver detalhes completos →
      </button>
    </div>
  )
}
