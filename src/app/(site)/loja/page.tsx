import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getProducts() {
  return prisma.product.findMany({
    include: {
      colors: true,
      sizes: true,
      images: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function LojaPage() {
  const products = await getProducts()

  return (
    <main>
      <section className="p-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const image = product.images?.[0]?.url || '/logo-artesanaio.jpeg'

          return (
            <Link
              key={product.id}
              href={`/loja/produto/${product.slug}`}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-100 object-cover rounded-xl"
              />

              <h2 className="text-xl font-semibold mt-2 px-4">
                {product.name}
              </h2>

              <p className="text-lg text-green-700 font-bold px-4">
                R$ {Number(product.price).toFixed(2)}
              </p>

              <button className="bg-green-600 px-8 py-2 m-4 rounded-xl text-center font-bold text-white">
                VER DETALHES
              </button>
            </Link>
          )
        })}
      </section>
    </main>
  )
}