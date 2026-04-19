# 📖 Guia de Uso - Componentes e Hooks

## 🎯 Arquivos Criados

Este guia explica como usar os novos arquivos criados para a página de meus-pedidos.

---

## 1. 📦 `src/types/order.ts` - Tipagem Centralizada

### O que é?
Arquivo com tipos e utilitários para trabalhar com pedidos de forma segura e reutilizável.

### Tipos disponíveis:

```typescript
// Pedido como vem da API (total pode ser string do Prisma)
type OrderFromAPI = {
  id: string
  statusPagamento: string | null
  total: string | number  // ⚠️ Pode vir como string
  createdAt: string
}

// Pedido com itens (para página de detalhes)
type OrderWithItems = OrderFromAPI & {
  fullName: string
  email: string
  cpf: string
  phone: string
  address: Record<string, any>
  frete: string | number | null
  items: OrderItem[]
}

// Item de um pedido
type OrderItem = {
  id: string
  orderId: string
  productId: string
  name: string
  quantity: number
  price: string | number  // Também pode vir como string
  size: string
  color: string
}
```

### Utilitários:

```typescript
// Converter um pedido para tipo seguro com números
const pedidoSeguro = OrderTypeUtils.toSafeOrder(pedidoAPI)
// Resultado: { id, statusPagamento, total: number, createdAt }

// Converter múltiplos pedidos
const pedidosSeguro = OrderTypeUtils.toSafeOrders(pedidosAPI)

// Validar se resposta é array de pedidos
if (OrderTypeUtils.isValidOrderList(data)) {
  // ✅ data é OrderFromAPI[]
}
```

### Uso em outro componente:

```typescript
import { OrderFromAPI, OrderTypeUtils } from '@/types/order'

async function buscarPedidos(email: string, cpf: string) {
  const res = await fetch('/api/orders/find', {
    method: 'POST',
    body: JSON.stringify({ email, cpf })
  })
  
  const data = await res.json()
  
  // ✅ Validar antes de usar
  if (OrderTypeUtils.isValidOrderList(data)) {
    const pedidos = OrderTypeUtils.toSafeOrders(data)
    console.log(pedidos[0].total) // ✅ É número aqui
  }
}
```

---

## 2. 🪝 `src/lib/hooks/useBuscaPedidos.ts` - Hook Reutilizável

### O que é?
Hook que gerencia toda a lógica de busca de pedidos (fetch, loading, erro, validação).

### Como usar:

```typescript
'use client'

import { useBuscaPedidos } from '@/lib/hooks/useBuscaPedidos'

export function MinhaComponente() {
  const { pedidos, loading, erro, semResultados, buscar, reset } = useBuscaPedidos()
  
  async function handleBuscar() {
    await buscar('teste@email.com', '123.456.789-10')
    // Agora pedidos está preenchido
  }
  
  return (
    <div>
      <button onClick={handleBuscar}>
        {loading ? 'Carregando...' : 'Buscar'}
      </button>
      
      {erro && <p className="text-red-600">{erro}</p>}
      {semResultados && <p>Nenhum pedido encontrado</p>}
      {pedidos.length > 0 && <p>{pedidos.length} pedido(s)</p>}
      
      <button onClick={reset}>Limpar</button>
    </div>
  )
}
```

### Estados retornados:

```typescript
{
  pedidos: OrderFromAPI[]      // Array de pedidos encontrados
  loading: boolean              // True enquanto busca
  erro: string                  // Mensagem de erro (se houver)
  semResultados: boolean        // True se busca retornou vazio
  buscar: (email, cpf) => void // Função para buscar
  reset: () => void             // Função para resetar estado
}
```

### Validações incluídas:

- ✅ Valida resposta JSON com `isValidOrderList()`
- ✅ Trata erro 404 como "sem resultados"
- ✅ Captura erros de rede
- ✅ Tira espaços em branco de mensagens de erro

---

## 3. 🎨 `src/components/OrderCard.tsx` - Componente de Card

### O que é?
Componente que exibe um único pedido em formato de card bonito e responsivo.

### Como usar:

```typescript
import { OrderCard } from '@/components/OrderCard'
import { OrderFromAPI } from '@/types/order'

export function MeuComponente() {
  const pedido: OrderFromAPI = {
    id: 'abc123',
    statusPagamento: 'approved',
    total: '99.90', // Ou número, o componente trata os dois
    createdAt: '2025-01-15T10:30:00Z'
  }
  
  return (
    <OrderCard
      pedido={pedido}
      onViewDetails={(id) => {
        window.location.href = `/loja/pedido/${id}`
      }}
    />
  )
}
```

### Props:

```typescript
interface OrderCardProps {
  pedido: OrderFromAPI          // O pedido a exibir
  onViewDetails: (id: string) => void  // Callback quando clicar em "Ver detalhes"
}
```

### O que o componente faz:

- ✅ Formata total como `R$ X,XX` (converte string para número)
- ✅ Formata data como `DD/MM/YYYY HH:MM`
- ✅ Exibe status com cores (✓ Aprovado, ⏳ Pendente, etc)
- ✅ Layout responsivo (empilha no mobile)
- ✅ Botão "Ver detalhes completos"

### Formatação de status:

| Status | Badge | Cor |
|--------|-------|-----|
| approved | ✓ Aprovado | Verde |
| pending | ⏳ Pendente | Amarelo |
| failed | ✗ Falhou | Vermelho |
| refunded | ↩️ Reembolsado | Azul |
| (padrão) | Pendente | Cinza |

---

## 4. 📄 Página Refatorada

### Antes (problemas):
```typescript
// ❌ ERRADO
const [pedidos, setPedidos] = useState<Pedido[]>([])
// ... lógica de busca misturada

{pedido.total.toFixed(2)}  // ERRO se for string
{new Date(...).toLocaleString('pt-BR')}  // Hydration mismatch
```

### Depois (corrigido):
```typescript
// ✅ CORRETO
const { pedidos, loading, erro, semResultados, buscar } = useBuscaPedidos()
// ... lógica limpa e reutilizável

<OrderCard
  pedido={pedido}
  onViewDetails={(id) => window.location.href = `/loja/pedido/${id}`}
/>
// Formatação garantida dentro do componente
```

---

## 🔄 Fluxo Completo

```
┌─ Usuário preence formulário
│
├─ Clica "Buscar pedidos"
│
├─ Hook `useBuscaPedidos` chama API
│  └─ Valida resposta com `OrderTypeUtils.isValidOrderList()`
│
├─ Se OK: preenche `pedidos`
├─ Se erro: preenche `erro`
├─ Se vazio: preenche `semResultados`
│
├─ Page renderiza `<OrderCard>` para cada pedido
│  └─ OrderCard formata valores e renderiza
│
└─ Usuário clica "Ver detalhes"
   └─ Navega para `/loja/pedido/[id]`
```

---

## 💡 Exemplos Avançados

### Usar hook com validação extra

```typescript
'use client'

import { useBuscaPedidos } from '@/lib/hooks/useBuscaPedidos'
import { OrderTypeUtils } from '@/types/order'

export function MeuComponente() {
  const { buscar } = useBuscaPedidos()
  
  async function handleBuscar(email: string, cpf: string) {
    // Validação no client
    if (!email.includes('@')) {
      alert('Email inválido')
      return
    }
    
    await buscar(email, cpf)
  }
  
  return (
    <button onClick={() => handleBuscar('test@email.com', '123.456.789-10')}>
      Buscar
    </button>
  )
}
```

### Usar OrderCard com mais lógica

```typescript
import { OrderCard } from '@/components/OrderCard'
import { OrderFromAPI } from '@/types/order'

export function ListaPedidos({ pedidos }: { pedidos: OrderFromAPI[] }) {
  return (
    <div className="space-y-4">
      {pedidos.map((pedido) => (
        <OrderCard
          key={pedido.id}
          pedido={pedido}
          onViewDetails={(id) => {
            // Lógica customizada
            console.log('Visualizando', id)
            
            // Ou usar router
            // router.push(`/loja/pedido/${id}`)
            
            window.location.href = `/loja/pedido/${id}`
          }}
        />
      ))}
    </div>
  )
}
```

---

## ⚠️ Armadilhas Comuns

### ❌ Não fazer isso:

```typescript
// ❌ ERRADO: Não converter total
<p>{pedido.total.toFixed(2)}</p>  // Pode quebrar se for string

// ❌ ERRADO: Sem validação da API
const pedidos = await res.json()
setPedidos(pedidos)  // Pode quebrar se formato for diferente

// ❌ ERRADO: Hydration mismatch
<p>{new Date().toLocaleString()}</p>  // Renderiza diferente server/client
```

### ✅ Fazer assim:

```typescript
// ✅ CORRETO: Usar hook que valida
const { pedidos, buscar } = useBuscaPedidos()
await buscar(email, cpf)
// pedidos já está validado e seguro

// ✅ CORRETO: Usar componente que formata
<OrderCard pedido={pedido} onViewDetails={...} />
// Formatação garantida

// ✅ CORRETO: Usar função determinística
<p>{formatData(pedido.createdAt)}</p>
// Renderiza igual server/client
```

---

## 🧪 Testes Recomendados

```typescript
// Teste: Validação de tipo
import { OrderTypeUtils } from '@/types/order'

test('valida lista de pedidos', () => {
  const data = [
    {
      id: 'abc',
      statusPagamento: 'approved',
      total: '99.90',
      createdAt: '2025-01-15T10:00:00Z'
    }
  ]
  
  expect(OrderTypeUtils.isValidOrderList(data)).toBe(true)
})

// Teste: Conversão de tipo
test('converte total para número', () => {
  const pedido = {
    id: 'abc',
    statusPagamento: null,
    total: '99.90',
    createdAt: '2025-01-15T10:00:00Z'
  }
  
  const safe = OrderTypeUtils.toSafeOrder(pedido)
  expect(typeof safe.total).toBe('number')
  expect(safe.total).toBe(99.90)
})
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console para hydration mismatch warnings
2. Verifique se a API está retornando dados corretos
3. Use `OrderTypeUtils.isValidOrderList()` para validar
4. Consulte [HYDRATION_MISMATCH_GUIDE.md](HYDRATION_MISMATCH_GUIDE.md) para dúvidas

---

**Última atualização:** 17 de Abril de 2026
