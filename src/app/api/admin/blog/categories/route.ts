// src/app/api/admin/blog-categories/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: [
  { order: 'asc' },
  { createdAt: 'desc' }, // fallback
]
  })

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  const body = await req.json()

  const {
    name,
    slug,
    description,
    image,
    featured,
    showOnHome,
    order,
    storeId, // ✅ novo
  } = body

  if (!name || !slug) {
    return NextResponse.json({ message: 'Nome e slug obrigatórios' }, { status: 400 })
  }

  const category = await prisma.blogCategory.create({
    data: {
      name,
      slug,
      description,
      image,
      featured: featured ?? false,
      showOnHome: showOnHome ?? false, // ✅ novo
      order: order ?? 0,
      storeId: storeId || null, // ✅ multi-loja
    },
  })

  return NextResponse.json(category)
}