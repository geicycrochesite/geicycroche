'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SetupAdminClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const key = searchParams.get('key')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!key) {
      setError('Chave de setup não fornecida. URL inválida.')
    } else {
      setError(null)
    }
  }, [key])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!key) {
      setError('Chave ausente. Não é possível prosseguir.')
      return
    }

    if (!email.trim() || !password.trim()) {
      setError('Email e senha são obrigatórios.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/setup-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, key })
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data?.error || 'Erro ao criar administrador.')
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!key) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-red-600">❌ Acesso negado</h1>
          <p className="text-gray-700">
            A URL de setup não contém a chave de segurança necessária.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">Criar Admin</h1>
        <p className="text-gray-600 text-sm mb-6">
          Configure o primeiro usuário administrador do sistema.
        </p>

        {error && (
          <div className="mb-4 px-3 py-2 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 px-3 py-2 text-sm text-green-700 bg-green-100 rounded">
            ✅ Admin criado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              required
              className="w-full mt-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              className="w-full mt-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              required
              className="w-full mt-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading || !key}
          >
            {loading ? 'Criando...' : 'Criar Admin'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          ⚠️ Esta página só funciona se nenhum admin existir.
        </p>
      </div>
    </div>
  )
}
