# ✅ BOAS PRÁTICAS & CHECKLIST DE DESENVOLVIMENTO

## 📋 Para Novos Desenvolvedores

Ao começar a trabalhar no projeto:

1. **Ler documentação:**
   - [ ] README.md (visão geral)
   - [ ] SETUP_GUIDE.md (instalar e rodar)
   - [ ] API_REFERENCE.md (endpoints)
   - [ ] Este arquivo

2. **Preparar ambiente:**
   - [ ] Instalar dependências: `npm install`
   - [ ] Configurar `.env` (copiar de `.env.example`)
   - [ ] Rodar migrações: `npx prisma migrate deploy`
   - [ ] Rodar aplicação: `npm run dev`

3. **Entender arquitetura:**
   - [ ] Context API para carrinho
   - [ ] Prisma para banco de dados
   - [ ] API Routes para backend
   - [ ] Next.js App Router

---

## 🎯 Padrões de Código

### Componentes React

✅ **Bom:**
```typescript
'use client'

import { useState } from 'react'

export function MyComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  )
}
```

❌ **Evitar:**
```typescript
// Sem 'use client' em componentes interativos
export function MyComponent() {
  const [count, setCount] = useState(0) // Erro!
  // ...
}
```

### API Routes

✅ **Bom:**
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Validar
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Processar
    const result = await db.create(data)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

❌ **Evitar:**
```typescript
// Sem try/catch
export async function POST(req: NextRequest) {
  const data = await req.json()
  return NextResponse.json(data)
}

// Mensagens de erro vaga
{ error: 'Something went wrong' }
```

### TypeScript

✅ **Bom:**
```typescript
interface OrderItem {
  productId: string
  quantity: number
  price: number
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  createdAt: Date
}

async function getOrder(id: string): Promise<Order> {
  // ...
}
```

❌ **Evitar:**
```typescript
// Any types
async function getOrder(id: any): any {
  // ...
}

// Tipos não documentados
const result = prisma.order.findUnique({ where: { id } })
```

---

## 🗄️ Banco de Dados

### Migrations

Sempre criar novas migrations quando alterar schema:

```bash
# Fazer alteração em prisma/schema.prisma
nano prisma/schema.prisma

# Criar migration
npx prisma migrate dev --name descricao_da_mudanca

# Verificar status
npx prisma migrate status
```

✅ **Bom:**
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  published Boolean  @default(false)
  author    User     @relation(fields: [userId], references: [id])
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Queries

✅ **Bom:**
```typescript
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    items: true,
    customer: true
  }
})
```

❌ **Evitar:**
```typescript
// N+1 queries
const orders = await prisma.order.findMany()
for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  })
}
```

---

## 🔐 Segurança

### Validação

✅ **Sempre validar entrada:**
```typescript
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  age: yup.number().positive().integer(),
})

try {
  const valid = await schema.validate(data)
} catch (error) {
  console.log(error.errors)
}
```

### Variáveis de Ambiente

✅ **Seguro:**
```typescript
// Backend - Token protegido
const token = process.env.MERCADO_PAGO_ACCESS_TOKEN // ✅ Seguro

// Frontend - URL pública
const url = process.env.NEXT_PUBLIC_SITE_URL // ✅ Ok expor
```

❌ **Inseguro:**
```typescript
// NUNCA passar secrets para cliente
const token = process.env.MERCADO_PAGO_ACCESS_TOKEN // ❌ Em componente client
```

### Rate Limiting

⚠️ **TODO para produção:**
```typescript
// Implementar rate limiting em:
// - POST /api/orders
// - POST /api/frete
// - GET /api/orders/find
```

---

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── api/
│   ├── orders.test.ts
│   ├── frete.test.ts
│   └── mercado-pago.test.ts
├── components/
│   ├── Header.test.tsx
│   └── CheckoutForm.test.tsx
└── utils/
    └── validators.test.ts
```

### Exemplo de Teste

```typescript
describe('POST /api/orders', () => {
  it('should create order with valid data', async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [...],
        fullName: 'Test',
        email: 'test@test.com',
        // ...
      })
    })
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.id).toBeDefined()
  })
  
  it('should reject empty items', async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [],
        // ...
      })
    })
    
    expect(response.status).toBe(400)
  })
})
```

---

## 📈 Performance

### Otimizações

- [ ] Usar `next/image` para images
- [ ] Implementar ISR (Incremental Static Regeneration)
- [ ] Cache de produtos com revalidação
- [ ] Lazy load de componentes

### Exemplo Next.js Image

```typescript
import Image from 'next/image'

export function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={300}
      priority={false}
    />
  )
}
```

---

## 🔄 Git Workflow

### Branch Naming

```
feature/add-customer-auth
bugfix/fix-frete-calculation
docs/update-readme
hotfix/payment-webhook-issue
```

### Commit Messages

✅ **Bom:**
```
feat: add customer authentication
fix: resolve frete calculation for SP
docs: update API reference
```

❌ **Evitar:**
```
fixed stuff
updates
work in progress
```

### Pull Request

Antes de fazer PR:

- [ ] Código segue padrões do projeto
- [ ] Sem console.log()
- [ ] TypeScript sem errors
- [ ] Testado localmente
- [ ] Descrição clara da mudança

---

## 🚀 Deploy

### Pre-deployment Checklist

- [ ] Build sem erros: `npm run build`
- [ ] Lint passa: `npm run lint`
- [ ] Testes passam: `npm test`
- [ ] `.env` não está em git
- [ ] `DATABASE_URL` em produção está correto
- [ ] Token Mercado Pago é de produção
- [ ] `NEXT_PUBLIC_SITE_URL` é do domínio correto

### Commands

```bash
# Build
npm run build

# Lint
npm run lint

# Start
npm start
```

---

## 🐛 Debugging

### Ativar Modo Debug

```bash
DEBUG=prisma:* npm run dev
```

### Logs Úteis

```typescript
console.log('🔍 Debug:', { value, type: typeof value })
console.error('❌ Erro:', error)
console.warn('⚠️  Aviso:', warning)
```

### Prisma Studio

```bash
npx prisma studio
```

Abre interface gráfica em http://localhost:5555

---

## 📚 Estrutura Típica de Feature

```typescript
// components/MyFeature/MyFeature.tsx
'use client'

import { useState } from 'react'
import { api } from '@/lib/api' // criar helper

export function MyFeature() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (data: any) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await api.post('/my-endpoint', data)
      // Handle success
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {/* Form fields */}
    </form>
  )
}
```

---

## 🎓 Recursos de Aprendizado

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)

---

## 📝 Checklist Final

Antes de seguir em frente com o projeto:

- [ ] Entendi a estrutura
- [ ] Consegui rodar `npm run dev`
- [ ] `.env` está configurado
- [ ] Database está conectado
- [ ] Fiz teste de uma rota
- [ ] Estou pronto para contribuir

**Bem-vindo ao time! 🎉**
