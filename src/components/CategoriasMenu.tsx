'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Categoria = {
  id: string
  name: string
  slug: string
}

export default function CategoriasMenu() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    fetch('/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error('Erro ao carregar categorias:', err))
  }, [])

  return (
    <nav className="w-full bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between font-bold gap-4 overflow-x-auto">
        <Link href="/loja" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
          Início
        </Link>
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/loja/categoria/${cat.slug}`}
            className="text-sm text-[var(--color-text-secondary)] hover:underline whitespace-nowrap"
          >
            {cat.name}
          </Link>
        ))}
        <Link href="/personalizado" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
          Personalizado
        </Link>
      </div>
    </nav>
  )
}
