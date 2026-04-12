'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { LogoutButton } from '@/components/admin/LogoutButton'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full bg-[var(--color-admin-bg)] text-[var(--color-admin-text)]`}
      >
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex min-h-screen w-full flex-col">
          <header className="border-b border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-xl font-bold">Administração</h1>

              <nav className="flex items-center gap-3 text-sm font-medium text-[var(--color-admin-text)]">
                <Link href="/">Site</Link>
                <Link href="/loja">Loja</Link>
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/products">Produtos</Link>
                <Link href="/admin/pedidos">Pedidos</Link>
                <Link href="/admin/etiquetas">Etiquetas</Link>
                <LogoutButton />
              </nav>
            </div>
          </header>

          <main className="flex-1 mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}