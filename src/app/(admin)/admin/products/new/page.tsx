//src/app/(admin)/admin/products/new/page.tsx
import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <ProductForm mode="create" categories={categories} />
    </div>
  )
}
