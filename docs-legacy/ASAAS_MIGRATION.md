# 🔄 MIGRATION GUIDE - Mercado Pago → Asaas

Se você já tinha integração com Mercado Pago, esta é a migração para Asaas.

## 📊 O que Mudou?

| Aspecto | Mercado Pago | Asaas |
|---------|--------------|-------|
| **Tipo** | Redirecionador | Checkout Transparente |
| **Fluxo** | Redireciona para MP | Fica no site |
| **Métodos** | MP define | Você escolhe (cartão, Pix, etc) |
| **API** | Authorization Bearer | access_token header |
| **Sandbox** | Token diferente | Mesma chave, prefixo diferente |

## 🗑️ O que Foi Removido

```javascript
// ❌ Não existe mais em Mercado Pago:

// 1. Endpoint de preferência
// src/app/api/mercado-pago/preference/route.ts
// ❌ REMOVER OU MANTER SE PRECISAR DE FALLBACK

// 2. Hook de webhook Mercado Pago
// src/app/api/mercado-pago/webhook/route.ts
// ❌ REMOVER OU MANTER SE PRECISAR DE SUPORTE

// 3. Library de security MP
// src/lib/mercado-pago-security.ts
// ❌ REMOVER SE NÃO USA MAIS
```

## ➕ O que Foi Adicionado

```javascript
// ✅ NOVO - Asaas:

// 1. Library Asaas
src/lib/asaas.ts

// 2. APIs Asaas
src/app/api/asaas/
├── validate-key/
├── create-customer/
├── create-payment/
├── pix-qrcode/
└── webhook/

// 3. Componentes de Pagamento
src/components/payment/
├── PaymentMethodSelector.tsx
├── CreditCardForm.tsx
└── PixPayment.tsx

// 4. Página de Pagamento Transparente
src/app/loja/pedido/[orderId]/pagamento/page.tsx

// 5. Página de Confirmação
src/app/loja/pedido/[orderId]/page.tsx
```

## 🔄 Mudanças no Checkout

### Antes (Mercado Pago)

```javascript
// ❌ ANTIGO - CheckoutForm.tsx
const onSubmit = async (data) => {
  // Cria pedido
  const orderRes = await fetch('/api/orders', { ... })
  const { orderId } = await orderRes.json()

  // Cria preferência MP
  const prefRes = await fetch('/api/mercado-pago/preference', {
    body: JSON.stringify({ items, orderId })
  })
  const { init_point } = await prefRes.json()

  // Redireciona para MP
  router.push(init_point) // ❌ Sai do site!
}
```

### Depois (Asaas)

```javascript
// ✅ NOVO - CheckoutForm.tsx
const onSubmit = async (data) => {
  // Cria pedido
  const orderRes = await fetch('/api/orders', { ... })
  const { orderId } = await orderRes.json()

  // Redireciona para página de pagamento
  router.push(`/loja/pedido/${orderId}/pagamento`) // ✅ Fica no site!
}
```

## 📋 Passo-a-Passo da Migração

### 1️⃣ Backup

```bash
# Faça backup de tudo
git commit -m "Backup antes de migração Asaas"
git branch backup-mercado-pago
```

- [ ] Backup criado

### 2️⃣ Instalar Dependências (se necessário)

```bash
npm install
# Asaas não precisa de SDK externo, usa native fetch
```

- [ ] Dependências OK

### 3️⃣ Copiar Arquivos Novos

Todos os arquivos foram criados:

```
✅ src/lib/asaas.ts
✅ src/app/api/asaas/**
✅ src/components/payment/**
✅ src/app/loja/pedido/[orderId]/pagamento/page.tsx
✅ src/app/loja/pedido/[orderId]/page.tsx
```

- [ ] Arquivos copiados

### 4️⃣ Atualizar Environment

```bash
# .env antigo (Mercado Pago)
MERCADO_PAGO_ACCESS_TOKEN=APP_USR_...

# .env novo (Asaas)
ASAAS_API_KEY=$aact_hmlg_...  # ou $aact_prod_
```

- [ ] `.env` atualizado com Asaas

### 5️⃣ Atualizar CheckoutForm

```javascript
// Já foi atualizado automaticamente para:
// router.push(`/loja/pedido/${orderId}/pagamento`)
```

- [ ] CheckoutForm atualizado

### 6️⃣ Configurar Webhook

**Antes (Mercado Pago):**
```
https://seu-site.com/api/mercado-pago/webhook
```

**Depois (Asaas):**
```
https://seu-site.com/api/asaas/webhook
```

Configure no painel do Asaas:
1. Vá em **Configurações → Integrações → Webhooks**
2. Remova webhook antigo do MP
3. Adicione novo webhook do Asaas
4. Selecione eventos: `payment.confirmed`, `payment.pending`, `payment.failed`

- [ ] Webhook Asaas configurado
- [ ] Webhook MP removido (ou desabilitado)

### 7️⃣ Testar Fluxo Completo

```bash
# Inicie servidor
npm run dev

# Teste:
1. Carrinho com produtos
2. Checkout
3. Escolher Cartão ou Pix
4. Completar pagamento
5. Ver confirmação
6. Verificar webhook no ngrok (localhost)
```

- [ ] Fluxo completo testado

### 8️⃣ Remover Código Antigo (Opcional)

Se não precisar mais de suporte a MP:

```bash
# Remove arquivo antigo
rm src/app/api/mercado-pago/preference/route.ts
rm src/app/api/mercado-pago/webhook/route.ts
rm src/lib/mercado-pago-security.ts

# Ou mantenha se quiser fallback
```

- [ ] Código antigo removido (ou mantido para fallback)

## 📈 Benefícios da Migração

### Asaas vs Mercado Pago

| Benefício | Detalhes |
|-----------|----------|
| **Checkout Transparente** | Usuário não sai do site |
| **Menor Bounce Rate** | Menos abandono de carrinho |
| **Melhor UX** | Controle total do design |
| **Pix Integrado** | Pagamento instantâneo no site |
| **Sandbox Automático** | Mesma chave detecta ambiente |
| **Múltiplos Métodos** | Cartão, Pix, boleto, etc |
| **Webhook Confiável** | Notificações em tempo real |

## ⚠️ Considerações

### Dados Históricos

Se você quer manter histórico de pagamentos MP:

```javascript
// Opção 1: Adicionar campo tipo_pagamento
model Order {
  ...
  statusPagamento: String
  tipoPagamento: String  // "mercado_pago" | "asaas"
  paymentProviderRef: String  // ID do MP ou Asaas
}

// Opção 2: Manter ambas as integrações
// Deixe MP para pedidos antigos, Asaas para novos
```

### Transição Suave

```javascript
// Se quer suportar ambos por um tempo:
const onSubmit = async (data) => {
  const { orderId } = await createOrder()
  
  // Nova lógica (Asaas)
  router.push(`/loja/pedido/${orderId}/pagamento`)
  
  // Ou redirecionar para MP se necessário
  // const { init_point } = await getMPPreference()
  // router.push(init_point)
}
```

## 🧪 Testes de Regressão

Antes de deployar:

- [ ] Carrinho funciona
- [ ] Cálculo de frete funciona
- [ ] Validação de dados funciona
- [ ] Criação de pedido funciona
- [ ] Pagamento por cartão funciona
- [ ] Pagamento por Pix funciona
- [ ] Página de confirmação exibe dados corretos
- [ ] Webhook atualiza status
- [ ] Emails de confirmação enviados
- [ ] Admin pode visualizar pedidos

## 📊 Monitoramento

Após migração, monitore:

```javascript
// 1. Taxa de sucesso de pagamento
Orders.count({ statusPagamento: "approved" }) / Orders.count()

// 2. Tempo médio para confirmar pagamento
// 3. Taxa de erro
// 4. Taxa de abandono
// 5. Feedback do cliente
```

## 🔄 Rollback (Se Necessário)

```bash
# Se precisar voltar:
git checkout backup-mercado-pago

# Ou mantenha ambas as integrações e mude no código
if (usarAsaas) {
  router.push(`/loja/pedido/${orderId}/pagamento`)
} else {
  // Usar MP
}
```

- [ ] Plano de rollback definido

## ✅ Checklist Final

- [ ] Arquivos Asaas criados
- [ ] Chave Asaas configurada
- [ ] .env atualizado
- [ ] CheckoutForm atualizado
- [ ] Webhook configurado
- [ ] Testes locais OK
- [ ] Testes em produção OK
- [ ] Webhook recebendo notificações
- [ ] Dados históricos MP preservados (se necessário)
- [ ] Documentação atualizada
- [ ] Equipe treinada
- [ ] Monitoramento configurado
- [ ] Deploy em produção ✅

---

**Migração completada! Bem-vindo à Asaas 🚀**
