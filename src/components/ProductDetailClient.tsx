'use client'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import FreteCalculator from './FreteCalculator'

export type Color = { id: string; name: string; hex: string }
export type Size = { id: string; name: string }

export type ProductDetailClientProps = {
  id: string
  name: string
  slug: string
  imageUrl: string
  description: string
  price: number
  colors: Color[]
  sizes: Size[]
}

export default function ProductDetailClient({ product }: { product: ProductDetailClientProps }) {
  const { id, name, slug, imageUrl, description, price, colors, sizes } = product

  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)

  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Selecione cor e tamanho antes de adicionar ao carrinho.')
      return
    }

    addItem({
      productId: id,
      name,
      slug,
      imageUrl,
      price,
      color: { name: selectedColor.name, hex: selectedColor.hex },
      size: { name: selectedSize.name },
      quantity: 1,
    })

    toast.custom((t) => (
      <div
        className={`max-w-sm w-full bg-[var(--color-admin-bg)] shadow-lg rounded-lg pointer-events-auto ring-1 ring-[var(--color-border)] p-4 flex justify-between items-center gap-4 ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--color-admin-text)]">Produto adicionado!</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Você pode continuar comprando ou ver o carrinho.</p>
        </div>
        <Link
          href="/carrinho"
          className="text-[var(--color-success)] font-medium hover:underline text-sm"
          onClick={() => toast.dismiss(t.id)}
        >
          Ver carrinho
        </Link>
      </div>
    ), {
      duration: 5000,
    })
  }

  return (
    <div className="w-full">
  <div className="mx-auto px-4 flex flex-col md:flex-row md:items-start gap-8 mt-8">
    {/* Imagem */}
    <div className="flex-1">
      <Image
        src={imageUrl}
        alt={name}
        width={600}
        height={600}
        className="w-full h-auto object-cover rounded-xl"
      />
    </div>

    {/* Informações */}
    <div className="flex-1 space-y-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{name}</h1>

      <FreteCalculator quantidade={1} />

      <p className="text-lg text-[var(--color-text-secondary)]">{description}</p>

      <p className="text-2xl text-[var(--color-success)] font-bold">
        R$ {price.toFixed(2)}
      </p>

      {/* Seleção de cor */}
      <div>
        <h2 className="font-semibold text-[var(--color-text-primary)] mb-2">Escolha a cor:</h2>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.name}
              className={`w-8 h-8 rounded-full border-2 transition ${
                selectedColor?.id === color.id
                  ? 'ring-2 ring-green-600 border-green-600 '
                  : 'hover:border-gray-500'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Seleção de tamanho */}
      <div>
        <h2 className="font-semibold text-[var(--color-text-primary)] mb-2">Escolha o tamanho:</h2>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              className={`px-3 py-1 border border-[var(--color-border)] rounded-md transition ${
                selectedSize?.id === size.id
                  ? 'bg-[var(--color-accent)] text-[var(--color-text-primary)]'
                  : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Botão adicionar ao carrinho */}
      <button
        onClick={handleAddToCart}
        type="button"
        className="w-full bg-[var(--color-success)] text-[var(--color-text-primary)] py-3 rounded-md hover:bg-[var(--color-success-hover)] transition"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  </div>
</div>
  )
}
