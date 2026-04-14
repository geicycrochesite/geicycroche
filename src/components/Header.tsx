'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="w-full fixed top-0 z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Image
          src="/logo-geicy-croche-horizontal.png"
          alt="Geicy Crochê"
          width={200}
          height={80}
        />

        <nav className="hidden md:flex gap-8 text-sm text-[var(--color-text-primary)]">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/pecas">Peças</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/loja/carrinho" className="inline-flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Carrinho
            {totalItems > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--color-accent)] px-2 text-[0.65rem] font-semibold text-[var(--color-bg-primary)]">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <a
          href="https://wa.me/5521986483118"
          className="hidden md:block px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] rounded hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition"
        >
          Peça sob encomenda
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? (
              <X className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition" />
            ) : (
              <Menu className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition" />
            )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--color-bg-primary)] px-6 pb-6 flex flex-col gap-4 text-[var(--color-text-primary)]">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/pecas">Peças</Link>
          <Link href="/loja/carrinho">Carrinho</Link>
          <Link href="/contato">Contato</Link>
        </div>
      )}
    </header>
  )
}