import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

type ProductsPageProps = {
  searchParams?: { page?: string }
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = Math.max(1, Number(searchParams?.page || '1'))
  const perPage = 10

  const [total, products] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({
      include: { images: { orderBy: { createdAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / perPage))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <p className="text-sm text-slate-600">Gerencie o catálogo de produtos, imagens, categorias e vídeo do YouTube.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Novo produto
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Imagem</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Produto</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Preço</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Estoque</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {products.map((product) => {
              const thumbnail = product.images?.[0]?.url || product.imageUrl
              return (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="h-16 w-20 overflow-hidden rounded-2xl bg-slate-100">
                      <Image src={thumbnail} alt={product.name} width={120} height={80} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{product.name}</td>
                  <td className="px-4 py-3 text-slate-700">R$ {product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-700">{product.stock}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-slate-500">Página {page} de {totalPages}</p>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/products?page=${Math.max(1, page - 1)}`}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${page === 1 ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-700'}`}
          >
            Anterior
          </Link>
          <Link
            href={`/admin/products?page=${Math.min(totalPages, page + 1)}`}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${page >= totalPages ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-700'}`}
          >
            Próximo
          </Link>
        </div>
      </div>
    </div>
  )
}
