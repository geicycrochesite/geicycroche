import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'

type EditProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  const product = await prisma.product.findUnique({
    where: { id },
    include: { categories: true, images: { orderBy: { createdAt: 'desc' } } },
  })

  if (!product) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm">
        Produto não encontrado.
      </div>
    )
  }

  return (
    <div>
      <ProductForm mode="edit" categories={categories} product={product} />
    </div>
  )
}
