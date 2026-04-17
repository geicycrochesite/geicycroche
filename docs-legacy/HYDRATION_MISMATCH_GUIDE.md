# 🔧 Guia: Evitar Hydration Mismatch no Next.js (App Router)

## O que é Hydration Mismatch?

Hydration mismatch ocorre quando o HTML renderizado no servidor (SSR) é diferente do que o JavaScript renderiza no cliente. Isso causa warnings no console e comportamentos inconsistentes.

## Causas Comuns

### 1. ❌ Valores dinâmicos (Date, random, etc.)
```typescript
// ERRADO: Renderiza diferente no server vs client
<p>{new Date().toLocaleString()}</p>
<p>{Math.random()}</p>
```

### 2. ❌ Condicional com `typeof window`
```typescript
// ERRADO: Renderiza diferente no server vs client
{typeof window !== 'undefined' && <Component />}
```

### 3. ❌ Estado que muda após render inicial
```typescript
// ERRADO: useEffect modifica conteúdo renderizado
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
return <div>{mounted ? 'client' : 'server'}</div> // Renderiza diferente
```

### 4. ❌ Timezone-dependent formatting
```typescript
// ERRADO: Hora muda entre server e client
<p>{new Date('2025-01-01').toLocaleString('pt-BR')}</p>
```

## ✅ Soluções no Projeto

### 1. **Converter valores antes de renderizar**
```typescript
// ✅ CORRETO: Converte em tempo determinístico
const formatData = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
```

### 2. **Usar `suppressHydrationWarning` para conteúdo seguro**
```typescript
// ✅ Quando você sabe que a diferença é esperada e segura
<div suppressHydrationWarning>
  {new Date().toLocaleTimeString()}
</div>
```

### 3. **Usar `useEffect` para renderização client-only**
```typescript
const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

if (!isMounted) {
  return null // Ou um skeleton/fallback
}

return <ClientOnlyContent />
```

### 4. **Renderizar condicionais apenas no client**
```typescript
'use client'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  return children
}

// Uso:
<ClientOnly>
  <p>{typeof window !== 'undefined' ? 'Client' : 'Server'}</p>
</ClientOnly>
```

## ✅ Aplicadas no Projeto (`meus-pedidos`)

### 1. **Tipagem correta com conversão**
```typescript
// Type permite string ou number (como Prisma retorna)
type Pedido = {
  total: string | number
}

// Função dedicada para conversão segura
function formatTotal(total: string | number): string {
  const numericTotal = typeof total === 'string' ? parseFloat(total) : total
  return `R$ ${numericTotal.toFixed(2).replace('.', ',')}`
}

// Uso seguro
<p>{formatTotal(pedido.total)}</p>
```

### 2. **Formatação de data consistente**
```typescript
function formatData(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
```

### 3. **Sem lógicas de `typeof window`**
Todos os dados vêm da API após interação do usuário, então não há diferença entre server/client.

### 4. **Validação de dados da API**
```typescript
// ✅ Valida antes de usar
if (!Array.isArray(pedidosEncontrados)) {
  throw new Error('Resposta inválida da API')
}
```

## 🎯 Checklist para novas páginas/componentes

- [ ] Sem `Date.now()`, `Math.random()` ou valores dinâmicos no render
- [ ] Sem `typeof window !== 'undefined'` que afete HTML renderizado
- [ ] Sem `useEffect` que modifica conteúdo já renderizado (use fallback/skeleton)
- [ ] Formatação de data/hora usa `toLocaleDateString()` com options específicas
- [ ] Estados de loading/erro são gerenciados corretamente
- [ ] Tipagem correta para dados que vêm da API
- [ ] Sem avisos de hydration mismatch no console do navegador

## 📚 Referências

- [Next.js - Hydration Mismatch](https://nextjs.org/docs/messages/react-hydration-error)
- [React - useId (alternativa para IDs únicos)](https://react.dev/reference/react/useId)
- [MDN - toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
