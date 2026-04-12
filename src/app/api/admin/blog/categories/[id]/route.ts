import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const post = await prisma.post.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(post)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.post.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Post deletado' })
}