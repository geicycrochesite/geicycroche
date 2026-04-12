import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'
import { toNumber } from '@/lib/decimal'

type EditProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categories: true,
      images: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!product) {
    return (
      <div className="rounded-3xl border border-[var(--color-error)] bg-[var(--color-error)]/20 p-8 text-[var(--color-error)] shadow-sm">
        Produto não encontrado.
      </div>
    )
  }

  // ✅ CONVERSÃO AQUI (ESSENCIAL)
const formattedProduct = {
  ...product,
  price: toNumber(product.price),
}

  return (
    <div>
      <ProductForm
        mode="edit"
        categories={categories}
        product={formattedProduct}
      />
    </div>
  )
}