# Fluxo Completo de Pagamento com Mercado Pago

## Visão Geral

```
Usuário →  Adiciona produtos  →  Checkout  →  Cria Preferência MP  →  Redireciona para MP
   ↓
   Paga no Mercado Pago
   ↓
   MP envia Webhook  →  Sistema atualiza status do pedido  →  MP redireciona para /loja/pedido/{orderId}?status=...
   ↓
   Usuário vê página de sucesso/falha
```

---

## 1. CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE

### Obrigatórias
```bash
MERCADO_PAGO_ACCESS_TOKEN=your_access_key_here
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com  # localhost:3000 em dev
```

### Recomendadas (para webhook seguro)
```bash
MERCADO_PAGO_WEBHOOK_SECRET=your_webhook_secret_from_mp_dashboard
```

### Como obter:
1. Acesse https://www.mercadopago.com/developers/panel
2. Em "Aplicações", crie uma nova app
3. Copie `Access Token` para `MERCADO_PAGO_ACCESS_TOKEN`
4. Em "Webhooks", copie o `Secret` para `MERCADO_PAGO_WEBHOOK_SECRET`

---

## 2. ESTRUTURA DE PEDIDO

```typescript
// Order criado em POST /api/orders
{
  id: string
  total: Decimal        // Soma dos produtos
  frete: Decimal        // Valor do frete
  statusPagamento: "pending" | "approved" | "rejected" | "pending" // Começa com "pending"
  items: OrderItem[]
  fullName: string
  email: string
  cpf: string
  ...
}
```

---

## 3. FLUXO DETALHADO

### A) Usuário clica "Finalizar Compra" (CheckoutForm.tsx)

```
1. Valida: carrinho não vazio, frete calculado
2. POST /api/orders com dados do cliente + itens + frete
3. Backend cria pedido com statusPagamento = "pending"
4. Retorna { orderId, success }
5. FormulárioFormata itens para Mercado Pago
6. POST /api/mercado-pago/preference com items + orderId
7. Backend cria preferência e retorna init_point (URL de checkout)
8. Redireciona usuário para init_point (Checkout do MP)
```

### B) Usuário paga no Mercado Pago

```
1. Usuário preenche dados de pagamento
2. Mercado Pago processa o pagamento
3. Pagamento é aprovado/recusado/pendente
4. MP envia webhook para POST /api/mercado-pago/webhook
```

### C) Webhook atualiza o pedido (webhook/route.ts)

```
1. Mercado Pago envia POST com payment_id
2. Sistema valida assinatura HMAC (segurança)
3. Busca dados do pagamento na API do MP (https://api.mercadopago.com/v1/payments/{id})
4. Extrai: external_reference (orderId), status, transaction_amount
5. Valida se external_reference existe
6. Valida se valor do pagamento bate com pedido.total + pedido.frete
7. Atualiza ordem.statusPagamento = "approved" | "rejected" | "pending"
8. Retorna { success: true }
```

### D) Mercado Pago redireciona o usuário (back_urls)

```
Baseado no resultado do pagamento:
- ✅ Sucesso → /loja/pedido/{orderId}?status=success
- ❌ Falha  → /loja/pedido/{orderId}?status=failure
- ⏳ Pendente → /loja/pedido/{orderId}?status=pending
```

### E) Página de pedido exibe resultado (/loja/pedido/[id]/page.tsx)

```
1. Carrega pedido do banco
2. Lê query param ?status=...
3. Exibe status baseado em order.statusPagamento
4. Se status=approved: botão repagar fica oculto
5. Se status=pending/failure: oferece repagar via PagarNovamenteButton
```

---

## 4. VALIDAÇÕES IMPLEMENTADAS

| Ponto | Validação |
|-------|-----------|
| **POST /api/orders** | ✅ Estoque suficiente, frete válido (0-500), dados do cliente, transação atômica |
| **POST /api/preference** | ✅ Items array não vazio, prices válidas (sem NaN), orderId existe |
| **Webhook signature** | ✅ HMAC-SHA256 com MERCADO_PAGO_WEBHOOK_SECRET |
| **Webhook payment** | ✅ external_reference existe, status existe, valor bate com pedido |
| **Página de pedido** | ✅ Ordem existe, status visível, repagar disponível se não aprovado |

---

## 5. LOGS PARA DEBUG

### CheckoutForm.tsx
```
✓ Iniciando onSubmit
✓ Itens no carrinho
✓ Frete
✓ Enviando requisição para /api/orders
✓ Resposta de /api/orders: 200
✓ Dados do pedido criado: { orderId, ... }
✓ Itens formatados para MP
✓ Enviando requisição para /api/mercado-pago/preference
✓ Responding de /api/mercado-pago/preference: 200
✓ Dados da preferência: { init_point, ... }
✓ Redirecionando para: {init_point}
```

### Webhook (webhook/route.ts)
```
[WEBHOOK] Iniciando processamento
[WEBHOOK] Body recebido: {...}
[WEBHOOK] Topic: payment, PaymentId: 123456
[WEBHOOK] Buscando pagamento 123456 na API do MP...
[WEBHOOK] Pagamento recebido: { status: "approved", external_reference: "order-123" }
[WEBHOOK] Buscando pedido order-123...
[WEBHOOK] Validando valor: 100.50 vs 100.50 ✓
[WEBHOOK] Atualizando pedido order-123 com status approved...
[WEBHOOK] Pedido atualizado com sucesso
```

---

## 6. EXEMPLO DE TESTECURL

### 1) Criar pedido
```bash
curl -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "fullName": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678901",
    "phone": "11999887766",
    "address": {
      "street": "Rua A",
      "number": "123",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310100"
    },
    "items": [{
      "productId": "prod-1",
      "name": "Cropped",
      "quantity": 1,
      "price": 89.90,
      "size": { "name": "P" },
      "color": { "name": "Preto", "hex": "#000000" }
    }],
    "frete": 15.00
  }'
```

Resposta:
```json
{
  "success": true,
  "orderId": "ckl123xyz789"
}
```

### 2) Criar preferência
```bash
curl -X POST http://localhost:3000/api/mercado-pago/preference \
  -H 'Content-Type: application/json' \
  -d '{
    "items": [{
      "name": "Cropped",
      "quantity": 1,
      "price": 89.90
    }, {
      "name": "Frete",
      "quantity": 1,
      "price": 15.00
    }],
    "orderId": "ckl123xyz789",
    "payerEmail": "joao@example.com"
  }'
```

Resposta:
```json
{
  "init_point": "https://www.mercadopago.com.br/checkout/v1/...",
  "id": "12345678",
  "status": "draft"
}
```

### 3) Simular webhook (local dev - sem HMAC)
```bash
curl -X POST http://localhost:3000/api/mercado-pago/webhook \
  -H 'Content-Type: application/json' \
  -d '{
    "data": { "id": 99999999 },
    "type": "payment"
  }'
```

---

## 7. TROUBLESHOOTING

| Erro | Causa | Solução |
|------|-------|--------|
| `403 PA_UNAUTHORIZED_RESULT_FROM_POLICIES` | Token invalido ou sem permissão | Verificar MERCADO_PAGO_ACCESS_TOKEN |
| `400 Bad Request ao criar pedido` | Estoque insuficiente | Aumentar stock do produto na admin |
| `Webhook não recebe notificações` | NEXT_PUBLIC_SITE_URL é localhost | Usar ngrok ou publicar em staging |
| `Assinatura inválida no webhook` | MERCADO_PAGO_WEBHOOK_SECRET errado | Copiar novamente do painel MP |
| `Pedido não atualiza após pagamento` | access_token expirado | Renovar no painel MP |

---

## 8. SEGURANÇA

✅ **Implementado**
- Validação HMAC-SHA256 do webhook
- Validação de amount do pagamento vs pedido
- Transação atômica (estoque não fica inconsistente)
- Pedido começa com statusPagamento="pending"

⚠️ **Ainda considerar**
- Rate limiting no webhook
- Retry logic se Prisma falhar
- Notificação por email ao usuário
- Webhook idempotency (evitar atualizar 2x)

---

## 9. RESUMO DO FLUXO

```
[1] Usuário faz checkout
    ↓
[2] POST /api/orders → cria pedido (statusPagamento=pending)
    ↓
[3] POST /api/mercado-pago/preference → retorna init_point
    ↓
[4] Redireciona para Mercado Pago
    ↓
[5] Usuário paga
    ↓
[6] MP envia webhook → POST /api/mercado-pago/webhook
    ↓
[7] Sistema atualiza order.statusPagamento=(approved|rejected|pending)
    ↓
[8] MP redireciona para /loja/pedido/{orderId}?status={status}
    ↓
[9] Página exibe resultado
```
