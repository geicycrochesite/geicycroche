// src/app/(admin)/admin/posts/new/page.tsx

import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'

export default async function NewPostPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <PostForm
      mode="create"
      categories={categories}
    />
  )
}