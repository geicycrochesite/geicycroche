// src/app/api/admin/blog-categories/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()

  const {
    name,
    slug,
    description,
    image,
    featured,
    showOnHome,
    order,
  } = body

  const updated = await prisma.blogCategory.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      image,
      featured,
      showOnHome,
      order,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await prisma.blogCategory.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Deletado' })
}