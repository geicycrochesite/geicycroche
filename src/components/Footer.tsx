'use client'

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full">

      {/* BENEFÍCIOS */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 py-16 bg-[#0F0F0F] text-center px-4 border-t border-[#1a1a1a]">

        <div>
          <h4 className="font-semibold text-lg text-[#EADCC6]">Feito à Mão</h4>
          <p className="text-sm text-[#B8A98A]">Cada peça com cuidado artesanal</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg text-[#EADCC6]">Peças Exclusivas</h4>
          <p className="text-sm text-[#B8A98A]">Produção sob encomenda</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg text-[#EADCC6]">Entrega no Brasil</h4>
          <p className="text-sm text-[#B8A98A]">Envios para todo o país</p>
        </div>

      </div>

      {/* FOOTER PRINCIPAL */}
      <div className="w-full bg-[#0B0B0B] text-[#EADCC6] py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {/* LOGO */}
          <div>
            <Image
              src="/logo-geicy-croche.png"
              alt="Geicy Crochê peças artesanais em crochê"
              width={160}
              height={80}
              className="mb-4"
            />

            <p className="text-sm text-[#B8A98A] leading-relaxed">
              Crochê artesanal com estilo e elegância. Peças feitas à mão sob encomenda,
              incluindo roupas, acessórios e itens para casa.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Navegação</h4>

            <ul className="space-y-2 text-sm text-[#B8A98A]">

              <li>
                <Link href="/" className="hover:text-[#C8A96A] transition">
                  Início
                </Link>
              </li>

              <li>
                <Link href="/pecas" className="hover:text-[#C8A96A] transition">
                  Peças em Crochê
                </Link>
              </li>

              <li>
                <Link href="/sobre" className="hover:text-[#C8A96A] transition">
                  Sobre
                </Link>
              </li>

              <li>
                <Link href="/contato" className="hover:text-[#C8A96A] transition">
                  Contato
                </Link>
              </li>

            </ul>
          </div>

          {/* CONTATO */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contato</h4>

            <p className="text-sm text-[#B8A98A] mb-2">WhatsApp</p>

            <Link
              href="https://wa.me/5521986483118"
              className="text-[#C8A96A] font-semibold hover:opacity-80 transition"
            >
              (21) 98648-3118
            </Link>

            <p className="mt-4 text-sm text-[#B8A98A]">
              Atendimento para todo o Brasil
            </p>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center py-6 text-xs bg-black text-[#B8A98A] border-t border-[#1a1a1a]">
        © {new Date().getFullYear()} Geicy Crochê — Crochê com Estilo e Elegância
      </div>

    </footer>
  )
}