# 🔒 GUIA DE SEGURANÇA & COMPLIANCE

## ⚠️ Avisos Críticos

### 1. CEP Fixo no Backend (RISCO MÉDIO)

**Localização:** [src/app/api/frete/route.ts](src/app/api/frete/route.ts#L26)

**Problema:**
```typescript
from: { postal_code: '25935506' } // Hardcoded!
```

**Risco:**
- Frete sempre calculado do mesmo origem
- Não configurável por loja/filial
- Dificuldade em expansão

**Solução Recomendada:**
```typescript
// .env
STORE_CEP_ORIGIN="25935506"

// route.ts
from: { postal_code: process.env.STORE_CEP_ORIGIN }
```

---

### 2. Sem Autenticação de Usuário (RISCO ALTO)

**Problema:**
- Qualquer pessoa consegue listar pedidos de qualquer email
- Sem login/sessão
- Dados pessoais expostos

**Impacto:**
- LGPD compliance: ❌
- Segurança dos clientes: ❌

**Solução TODO:**
```typescript
// Implementar:
// 1. NextAuth.js ou similar
// 2. JWT tokens
// 3. Verificação de permissões
// 4. Auditoria de acessos
```

---

### 3. localStorage Sem Validação (RISCO BAIXO)

**Problema:**
```typescript
const stored = localStorage.getItem('loja-roupas-cart')
const items = JSON.parse(stored) // Pode ser alterado manualmente
```

**Risco:**
- Usuário pode manipular carrinho
- Preços podem ser alterados no cliente
- Quantidade pode ser zerada

**Solução:**
1. Validar dados ao receber no backend
2. Nunca confiar em dados do cliente
3. Usar sessão do servidor quando possível

---

## ✅ Checklist de Segurança

### Variáveis de Ambiente

- [x] `.env` em `.gitignore`
- [ ] Usar `.env.example` com valores fictícios
- [ ] Credenciais diferentes para dev/prod
- [ ] Nunca commitar `.env`
- [ ] Rotacionar tokens periodicamente

### Banco de Dados

- [ ] Backups automáticos configurados
- [ ] Senhas fortes (min 16 chars)
- [ ] SSL/TLS habilitado
- [ ] Acesso IP restrito
- [ ] Logs de auditoria
- [ ] CORS configurado

### APIs Externas

- [ ] Mercado Pago: Usar tokens sandbox em dev
- [ ] Mercado Pago: Validar assinatura webhooks*
- [ ] Melhor Envio: Token com permissões mínimas
- [ ] Rate limiting implementado

**⚠️ IMPORTANTE:**

Adicionar validação de assinatura do webhook Mercado Pago:

```typescript
// src/app/api/mercado-pago/webhook/route.ts
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const signature = req.headers.get('x-signature')
  
  // Validar assinatura
  const s = crypto
    .createHmac('sha256', process.env.MERCADO_PAGO_SECRET!)
    .update(JSON.stringify(body))
    .digest('hex')
  
  if (signature !== s) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    )
  }
  
  // Processar webhook...
}
```

### Frontend

- [ ] Validar entrada do usuário
- [ ] Sanitizar HTML (evitar XSS)
- [ ] TailwindCSS classes não são dinâmicas*
- [ ] CSP headers configurados*
- [ ] HTTPS em produção

**⚠️ IMPORTANTE para TailwindCSS:**

❌ **Evitar (inseguro):**
```typescript
<div className={`text-${userInput}`}> // Dinâmico!
```

✅ **Sempre:**
```typescript
<div className={userInput === 'large' ? 'text-lg' : 'text-sm'}>
```

### API Routes

- [ ] Validação de entrada (Yup/Zod)
- [ ] Erro messages não expõem estrutura interna
- [ ] Logs com informações sensíveis mascaradas
- [ ] Rate limiting
- [ ] CORS apropriado

### Dados Pessoais (LGPD)

**Dados coletados:**
- Nome
- Email
- CPF
- Telefone
- Endereço

**Obrigações:**
- [ ] Política de Privacidade visível
- [ ] Consentimento explícito para marketing
- [ ] Direito ao esquecimento
- [ ] Dados criptografados em trânsito (HTTPS)
- [ ] Dados criptografados em repouso (database)*
- [ ] Auditoria de acessos
- [ ] Notificação de breaches

---

## 🔐 Checklist de Deploy

### Antes de ir para produção

- [ ] Usar SECRET_KEY novo (não igual ao dev)
- [ ] DATABASE_URL != dev database
- [ ] MERCADO_PAGO_ACCESS_TOKEN = production token
- [ ] NEXT_PUBLIC_SITE_URL = domínio correto
- [ ] `.env` E `.env.local` **NÃO** estão em git
- [ ] Build sem warnings: `npm run build`
- [ ] Testar fluxo completo:
  - [ ] Browse produtos
  - [ ] Adicionar ao carrinho
  - [ ] Calcular frete
  - [ ] Criar pedido
  - [ ] Testar pagamento Mercado Pago (sandbox)
  - [ ] Webhook recebendo

### Infraestrutura

- [ ] HTTPS/SSL habilitado
- [ ] Certificado válido
- [ ] Headers de segurança (HSTS, X-Frame-Options, etc)
- [ ] WAF (Web Application Firewall)
- [ ] Backups automáticos
- [ ] Monitoramento ativo
- [ ] Alertas configurados

---

## 🛡️ Headers Recomendados

Adicionar em `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## 🚨 Resposta a Incidentes

### Se descobrir vazamento de dados:

1. **Imediatamente:**
   - [ ] Desabilitar acesso do atacante
   - [ ] Fazer snapshot do sistema
   - [ ] Preservar logs

2. **Dentro de 24 horas:**
   - [ ] Notificar clientes afetados
   - [ ] Notificar autoridades (ANPD se LGPD)
   - [ ] Análise forense

3. **Dentro de 1 semana:**
   - [ ] Relatório público
   - [ ] Plano de remediação
   - [ ] Medidas preventivas

---

## 📋 Tokens Seguros

### Gerar token forte

```bash
# OpenSSL
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

### Rotação de Tokens

**Recomendação:**
- Mercado Pago: A cada 6 meses
- Melhor Envio: A cada 3 meses
- DATABASE: A cada 12 meses

---

## 🔍 Auditoria & Logs

### Eventos a logar

```typescript
// src/lib/logger.ts
export const logger = {
  auth: (action: string, userId: string, success: boolean) => {
    console.log(`[AUTH] ${action} - User: ${userId} - ${success ? 'OK' : 'FAIL'}`)
  },
  
  order: (action: string, orderId: string, data?: any) => {
    console.log(`[ORDER] ${action} - Order: ${orderId}`, data)
  },
  
  payment: (action: string, orderId: string, amount: number) => {
    console.log(`[PAYMENT] ${action} - Order: ${orderId} - R$ ${amount}`)
  },
  
  error: (context: string, error: any) => {
    console.error(`[ERROR] ${context}`, error.message)
  },
}
```

---

## 🔐 Exemplo de Rota Segura

```typescript
// src/app/api/secure/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// 1. Validar método
export async function POST(req: NextRequest) {
  try {
    // 2. Rate limiting (implementar)
    const ip = req.ip
    // checkRateLimit(ip)
    
    // 3. Validar entrada
    const body = await req.json()
    const schema = yup.object({
      email: yup.string().email().required(),
    })
    const data = await schema.validate(body)
    
    // 4. Processar com segurança
    const result = await db.create(data)
    
    // 5. Logar sucesso
    logger.order('created', result.id)
    
    // 6. Retornar sem expor detalhes
    return NextResponse.json({
      success: true,
      id: result.id,
    })
    
  } catch (error) {
    // 7. Retornar erro genérico
    logger.error('POST /api/secure', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

---

## 🎓 Recursos de Segurança

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [LGPD Guide](https://auth0.com/docs/compliance/lgpd-compliance)
- [Next.js Security](https://nextjs.org/docs/architecture/security-and-compliance)

---

## ✅ Checklist Final

- [ ] Li seção de Avisos Críticos
- [ ] Entendi os riscos
- [ ] Passei por todos os checklists
- [ ] Implementei mitigações necessárias
- [ ] Testei segurança em desenvolvimento
- [ ] Pronto para deploy com confiança ✅

**Segurança não é um destino, é uma jornada! 🔒**
