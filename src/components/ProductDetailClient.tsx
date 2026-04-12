'use client'

import { useState } from 'react'

export type ProductDetailClientProps = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  youtubeUrl?: string | null
  colors: { id: string; name: string; hex: string }[]
  sizes: { id: string; name: string }[]
}

export default function ProductDetailClient({ product }: { product: ProductDetailClientProps }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || '/logo-artesanaio.jpeg'
  )
  function getEmbedUrl(url?: string | null) {
  if (!url) return null

    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  const embedUrl = getEmbedUrl(product.youtubeUrl)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* GALERIA */}
      <div className="space-y-4">
        {/* IMAGEM PRINCIPAL */}
        <div className="w-full aspect-square bg-[var(--color-bg-tertiary)] rounded-2xl overflow-hidden">
          {selectedImage === 'video' && embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      )}
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-2 flex-wrap">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                selectedImage === img
                  ? 'border-[var(--color-accent)]'
                  : 'border-transparent'
              }`}
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {embedUrl && (
  <button
    onClick={() => setSelectedImage('video')}
    className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
      selectedImage === 'video'
        ? 'border-[var(--color-accent)]'
        : 'border-transparent'
    }`}
  >
    <div className="w-full h-full flex items-center justify-center bg-black text-white text-xs">
      ▶
    </div>
  </button>
)}
        </div>
      </div>

      {/* INFO */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[var(--color-text-secondary)]">{product.name}</h1>

        <p className="text-lg font-semibold text-green-600">
          R$ {product.price.toFixed(2)}
        </p>

        <p className="text-[var(--color-text-secondary)] whitespace-pre-line">
  {product.description}
</p>

        {/* CORES */}
        {product.colors.length > 0 && (
          <div>
            <p className="font-medium mb-1">Cores:</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  key={color.id}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAMANHOS */}
        {product.sizes.length > 0 && (
          <div>
            <p className="font-medium mb-1">Tamanhos:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <span
                  key={size.id}
                  className="px-3 py-1 border rounded-lg text-sm"
                >
                  {size.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BOTÃO (placeholder) */}
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}