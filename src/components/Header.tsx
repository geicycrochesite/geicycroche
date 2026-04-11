'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full fixed top-0 z-50 bg-black/90 backdrop-blur">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Image
          src="/logo-geicy-croche-horizontal.png"
          alt="Geicy Crochê"
          width={200}
          height={80}
        />

        <nav className="hidden md:flex gap-8 text-sm text-[#EADCC6]">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/pecas">Peças</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <a
          href="https://wa.me/5521986483118"
          className="hidden md:block px-4 py-2 border border-[#C8A96A] text-[#C8A96A] rounded hover:bg-[#C8A96A] hover:text-black transition"
        >
          Peça sob encomenda
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? (
              <X className="text-white hover:text-[#C8A96A] transition" />
            ) : (
              <Menu className="text-white hover:text-[#C8A96A] transition" />
            )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black px-6 pb-6 flex flex-col gap-4 text-[#EADCC6]">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/pecas">Peças</Link>
          <Link href="/contato">Contato</Link>
        </div>
      )}
    </header>
  )
}