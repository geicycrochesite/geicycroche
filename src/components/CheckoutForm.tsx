'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { checkoutSchema } from '@/lib/validators/checkoutSchema'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

type CheckoutFormData = yup.InferType<typeof checkoutSchema>

export default function CheckoutForm() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [frete, setFrete] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
  })

  const zipCode = watch('address.zipCode')

  useEffect(() => {
    const calcularFrete = async () => {
      if (!zipCode || zipCode.length < 8 || items.length === 0) return

      const quantidade = items.reduce((acc, item) => acc + item.quantity, 0)

      try {
        const res = await fetch('/api/frete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cepDestino: zipCode, quantidade }),
        })

        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          const melhor = data[0]
          setFrete(Number(melhor.price))
        } else {
          setFrete(null)
        }
      } catch (err) {
        console.error('Erro ao calcular frete:', err)
        toast.error('Erro ao calcular o frete.')
      }
    }

    calcularFrete()
  }, [zipCode, items])

  const onSubmit = async (data: CheckoutFormData) => {
    console.log('Iniciando onSubmit, dados:', data)
    console.log('Itens no carrinho:', items)
    console.log('Frete:', frete)

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio')
      return
    }

    if (!frete) {
      toast.error('Calcule o frete antes de finalizar.')
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Enviando requisição para /api/orders')
      // Criação do pedido
      const res = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ ...data, items, frete }),
        headers: { 'Content-Type': 'application/json' },
      })

      console.log('Resposta de /api/orders:', res.status, res.statusText)

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Erro em /api/orders:', errorData)
        toast.error(errorData?.error || 'Erro ao criar pedido')
        return
      }

      const orderData = await res.json()
      console.log('Dados do pedido criado:', orderData)
      const { orderId } = orderData

      // Itens formatados para Mercado Pago
      const formattedItems = [
        ...items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        {
          name: 'Frete',
          quantity: 1,
          price: frete,
        },
      ]

      console.log('Itens formatados para MP:', formattedItems)
      console.log('Enviando requisição para /api/mercado-pago/preference')

      // Criação da preferência do Mercado Pago
      const prefRes = await fetch('/api/mercado-pago/preference', {
        method: 'POST',
        body: JSON.stringify({ items: formattedItems, orderId }),
        headers: { 'Content-Type': 'application/json' },
      })

      console.log('Resposta de /api/mercado-pago/preference:', prefRes.status, prefRes.statusText)

      if (!prefRes.ok) {
        const errorData = await prefRes.json()
        console.error('Erro em /api/mercado-pago/preference:', errorData)
        toast.error('Erro ao redirecionar para o pagamento.')
        return
      }

      const prefData = await prefRes.json()
      console.log('Dados da preferência:', prefData)
      const { init_point } = prefData

      console.log('Limpando carrinho e redirecionando para:', init_point)
      clearCart()
      router.push(init_point)
    } catch (err) {
      console.error('Erro geral no onSubmit:', err)
      toast.error('Erro ao finalizar o pedido')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalItems = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalGeral = totalItems + (frete ?? 0)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="title">Finalizar Pedido</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* DADOS PESSOAIS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Dados Pessoais</h3>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Nome completo
              </label>
              <input
                {...register('fullName')}
                id="fullName"
                placeholder="Nome completo"
                className="input"
              />
              {errors.fullName && <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                E-mail
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="input"
              />
              {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                CPF
              </label>
              <input
                {...register('cpf')}
                id="cpf"
                placeholder="000.000.000-00"
                className="input"
              />
              {errors.cpf && <p className="mt-1 text-sm text-error">{errors.cpf.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Telefone
              </label>
              <input
                {...register('phone')}
                id="phone"
                placeholder="(00) 00000-0000"
                className="input"
              />
              {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone.message}</p>}
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Endereço de Entrega</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Rua
                </label>
                <input
                  {...register('address.street')}
                  id="street"
                  placeholder="Rua das Flores"
                  className="input"
                />
                {errors.address?.street && <p className="mt-1 text-sm text-error">{errors.address.street.message}</p>}
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Número
                </label>
                <input
                  {...register('address.number')}
                  id="number"
                  placeholder="123"
                  className="input"
                />
                {errors.address?.number && <p className="mt-1 text-sm text-error">{errors.address.number.message}</p>}
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Bairro
                </label>
                <input
                  {...register('address.neighborhood')}
                  id="neighborhood"
                  placeholder="Centro"
                  className="input"
                />
                {errors.address?.neighborhood && <p className="mt-1 text-sm text-error">{errors.address.neighborhood.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Cidade
                </label>
                <input
                  {...register('address.city')}
                  id="city"
                  placeholder="São Paulo"
                  className="input"
                />
                {errors.address?.city && <p className="mt-1 text-sm text-error">{errors.address.city.message}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Estado
                </label>
                <input
                  {...register('address.state')}
                  id="state"
                  placeholder="SP"
                  className="input"
                />
                {errors.address?.state && <p className="mt-1 text-sm text-error">{errors.address.state.message}</p>}
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  CEP
                </label>
                <input
                  {...register('address.zipCode')}
                  id="zipCode"
                  placeholder="00000-000"
                  className="input"
                />
                {errors.address?.zipCode && <p className="mt-1 text-sm text-error">{errors.address.zipCode.message}</p>}
              </div>
            </div>
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="bg-[var(--color-bg-tertiary)] rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Resumo do Pedido</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Subtotal:</span>
                <span className="text-[var(--color-text-primary)] font-medium">R$ {totalItems.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Frete:</span>
                <span className="text-[var(--color-text-primary)] font-medium">
                  {frete !== null ? `R$ ${frete.toFixed(2)}` : 'Calculando...'}
                </span>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-[var(--color-text-primary)]">Total:</span>
                <span className="text-[var(--color-accent)]">R$ {totalGeral.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={isSubmitting || !frete}
            className="w-full btn-success disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Finalizar Pedido'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
