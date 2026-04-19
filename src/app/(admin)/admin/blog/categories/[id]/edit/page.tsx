import { prisma } from '@/lib/prisma'
import CategoryForm from '@/components/admin/CategoryForm'

export default async function EditCategoryPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const category = await prisma.blogCategory.findUnique({
    where: { id },
  })

  if (!category) {
    return <div>Categoria não encontrada</div>
  }

  return <CategoryForm mode="edit" category={category} />
}