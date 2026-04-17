# 🔄 Aplicar Padrão em Outras Páginas

Este guia mostra como aplicar as mesmas correções e padrões em outras páginas do projeto.

---

## 📋 Sumário Rápido do Padrão

### Passo 1: Tipagem
```typescript
// src/types/order.ts (já existe)
import { OrderFromAPI, OrderWithItems, OrderTypeUtils } from '@/types/order'
```

### Passo 2: Hook (se fizer busca)
```typescript
// src/lib/hooks/useMinhaLógica.ts
const { dados, loading, erro, buscar } = useMeuHook()
```

### Passo 3: Componentes Reutilizáveis
```typescript
// src/components/MeuCard.tsx
export function MeuCard({ item, onAction }: Props) {
  // Formatações seguras
  // Layout responsivo
}
```

### Passo 4: Page Limpa
```typescript
// 'use client' se necessário
// Use hook + componentes
// Sem lógica complexa
```

---

## 🎯 Aplicar em `/loja/pedido/[id]` (Página de Detalhes)

### Problema Atual
Provavelmente tem:
- Busca de pedido por ID
- Exibição de items
- Total que pode ser string
- Datas que podem causar hydration mismatch

### Solução

#### 1. Criar Hook para Buscar Pedido

**Arquivo:** `src/lib/hooks/useBuscaPedidoDetalhes.ts`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { OrderWithItems, OrderTypeUtils } from '@/types/order'

export function useBuscaPedidoDetalhes(orderId: string) {
  const [pedido, setPedido] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscar() {
      try {
        const res = await fetch(`/api/orders/find?orderId=${orderId}`)
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Pedido não encontrado')
          }
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        
        // ✅ Validar estrutura
        if (typeof data !== 'object' || !data.id) {
          throw new Error('Resposta inválida')
        }

        setPedido(data as OrderWithItems)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido'
        setErro(msg)
      } finally {
        setLoading(false)
      }
    }

    buscar()
  }, [orderId])

  return { pedido, loading, erro }
}
```

#### 2. Criar Componente de Item

**Arquivo:** `src/components/OrderItemRow.tsx`

```typescript
import { OrderItem } from '@/types/order'

interface OrderItemRowProps {
  item: OrderItem
  index: number
}

function formatPrice(price: string | number): string {
  const numeric = typeof price === 'string' ? parseFloat(price) : price
  return `R$ ${numeric.toFixed(2).replace('.', ',')}`
}

export function OrderItemRow({ item, index }: OrderItemRowProps) {
  const total = (typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-center text-gray-600">{index + 1}</td>
      <td className="px-4 py-3 font-medium">{item.name}</td>
      <td className="px-4 py-3 text-center">{item.quantity}x</td>
      <td className="px-4 py-3 text-right">{formatPrice(item.price)}</td>
      <td className="px-4 py-3">
        {item.size && <span className="text-sm">{item.size}</span>}
        {item.color && <span className="ml-2 text-sm">{item.color}</span>}
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {formatPrice(total)}
      </td>
    </tr>
  )
}
```

#### 3. Refatorar Página de Detalhes

**Arquivo:** `src/app/(site)/loja/pedido/[id]/page.tsx`

```typescript
'use client'

import { useBuscaPedidoDetalhes } from '@/lib/hooks/useBuscaPedidoDetalhes'
import { OrderItemRow } from '@/components/OrderItemRow'
import { useParams } from 'next/navigation'

function formatTotal(total: string | number): string {
  const numeric = typeof total === 'string' ? parseFloat(total) : total
  return `R$ ${numeric.toFixed(2).replace('.', ',')}`
}

function formatData(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function PedidoDetalhesPage() {
  const params = useParams()
  const orderId = params.id as string
  
  const { pedido, loading, erro } = useBuscaPedidoDetalhes(orderId)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando pedido...</p>
      </div>
    )
  }

  if (erro || !pedido) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <p className="text-red-600">⚠️ {erro || 'Pedido não encontrado'}</p>
        <a href="/loja/meus-pedidos" className="text-blue-600 underline">
          Voltar aos meus pedidos
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Pedido</h1>

      {/* Informações Básicas */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">ID do Pedido</p>
            <p className="font-mono text-lg font-semibold">{pedido.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold">{pedido.statusPagamento || 'Pendente'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nome</p>
            <p className="font-semibold">{pedido.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{pedido.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Telefone</p>
            <p>{pedido.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data do Pedido</p>
            <p>{formatData(pedido.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Itens */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3 text-left">Produto</th>
              <th className="px-4 py-3 text-center">Qtd</th>
              <th className="px-4 py-3 text-right">Preço</th>
              <th className="px-4 py-3 text-left">Detalhes</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.items.map((item, idx) => (
              <OrderItemRow key={item.id} item={item} index={idx} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Totais */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="space-y-3">
          {pedido.frete && (
            <div className="flex justify-between">
              <p>Frete:</p>
              <p className="font-semibold">{formatTotal(pedido.frete)}</p>
            </div>
          )}
          <div className="border-t pt-3 flex justify-between items-center">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatTotal(pedido.total)}
            </p>
          </div>
        </div>
      </div>

      <a
        href="/loja/meus-pedidos"
        className="text-blue-600 underline"
      >
        ← Voltar aos meus pedidos
      </a>
    </div>
  )
}
```

---

## 🛒 Aplicar em `/carrinho` (Página de Carrinho)

### Hook para Carrinho

**Arquivo:** `src/lib/hooks/useCarrinho.ts`

```typescript
'use client'

import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export function useCarrinho() {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CartProvider')
  }

  return context
}
```

### Componente de Item de Carrinho

**Arquivo:** `src/components/CartItemRow.tsx`

```typescript
// Similar a OrderItemRow, mas com botões de remover/atualizar
```

---

## 📦 Padrão Genérico para Qualquer Página

### Template

```typescript
// 1. Types
import { MyType, MyTypeUtils } from '@/types/mytype'

// 2. Hook
const { data, loading, erro, buscar } = useMyHook()

// 3. Componentes
import { MyCard } from '@/components/MyCard'

// 4. Page
export default function MyPage() {
  const { data, loading, erro } = useMyHook()

  if (loading) return <LoadingSkeleton />
  if (erro) return <ErrorMessage message={erro} />
  if (!data) return <EmptyState />

  return (
    <div>
      {data.map(item => (
        <MyCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

---

## ✅ Checklist de Aplicação

Ao aplicar este padrão em uma nova página:

- [ ] Criar tipos em `src/types/novo.ts` (se necessário)
- [ ] Criar hook em `src/lib/hooks/useNovo.ts` (se fizer fetch)
- [ ] Criar componentes em `src/components/Novo*.tsx` (reutilizáveis)
- [ ] Refatorar page para usar hook + componentes
- [ ] Testar hydration mismatch (console limpo)
- [ ] Testar layout responsivo
- [ ] Testar erro handling
- [ ] Testar formatting (números, datas)

---

## 🎯 Próximas Páginas (Sugestão)

1. **`/loja/pedido/[id]`** (Detalhes) - PRIORITÁRIO
2. **`/admin/pedidos`** (Gerenciar pedidos)
3. **`/admin/produtos`** (Listar produtos)
4. **Qualquer outra página com lista/detalhes**

---

## 💡 Dicas

### Erros a Evitar

❌ **Não fazer:**
```typescript
// Hydration mismatch
<p>{new Date().toLocaleString()}</p>

// Sem validação
const data = await fetch(...).then(r => r.json())
setState(data)  // Pode quebrar

// Sem separação
// (toda lógica na page)
```

✅ **Fazer:**
```typescript
// Determinístico
<p>{formatData(dateString)}</p>

// Validado
if (MyTypeUtils.isValid(data)) setState(data)

// Separado
// Hook + Componentes + Page simples
```

### Performance

- Use `const` ao invés de `let`
- Memoize componentes se re-renderizam muito
- Lazy load componentes pesados com `dynamic()`

### Tipagem

- Sempre exporte tipos em `src/types/`
- Use type-guards (`isValid`, `isOfType`)
- Evite `any`

---

## 📚 Referências no Projeto

- [src/types/order.ts](src/types/order.ts) - Exemplo de tipos
- [src/components/OrderCard.tsx](src/components/OrderCard.tsx) - Exemplo de componente
- [src/lib/hooks/useBuscaPedidos.ts](src/lib/hooks/useBuscaPedidos.ts) - Exemplo de hook
- [src/app/(site)/loja/meus-pedidos/page.tsx](src/app/(site)/loja/meus-pedidos/page.tsx) - Exemplo de page

---

**Desenvolvido em:** 17 de Abril de 2026
**Versão:** 1.0
**Compatível com:** Next.js 15+, React 19+
