# 🔗 Quick Reference - Cola Rápida

## .env - Copie e Cole

```bash
# ========== ASAAS ==========
ASAAS_API_KEY=$aact_hmlg_SUA_CHAVE_AQUI  # Sandbox
# ASAAS_API_KEY=$aact_prod_SUA_CHAVE_AQUI # Produção

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ASAAS_WEBHOOK_URL=http://localhost:3000/api/asaas/webhook

# ========== BANCO DE DADOS ==========
DATABASE_URL=postgresql://...

# ========== JWT ==========
JWT_SECRET=supersecretjwtkey

# ========== CLOUDINARY ==========
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Cartões de Teste - Copie e Cole

### Cartão Aprovado
```
Número: 4111111111111111
Mês: 12
Ano: 2026
CVV: 123
Nome: TESTE USUARIO
```

### Cartão com 3D Secure
```
Número: 5425233010103981
Mês: 12
Ano: 2026
CVV: 123
Nome: TESTE USUARIO
```

### Cartão Rejeitado
```
Número: 4111111111111112
Mês: 12
Ano: 2026
CVV: 123
Nome: TESTE USUARIO
```

## URLs Importantes

```
Desenvolvimento:
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Checkout: http://localhost:3000/loja/carrinho
- Pagamento: http://localhost:3000/loja/pedido/[id]/pagamento

Asaas:
- Dashboard: https://app.asaas.com
- API Docs: https://docs.asaas.com
- Status: https://status.asaas.com

ngrok (webhook):
- URL retornada: https://[random].ngrok.io
- Webhook: https://[random].ngrok.io/api/asaas/webhook
```

## Comandos Úteis

```bash
# Iniciar servidor
npm run dev

# Build
npm run build

# Validar chave
curl http://localhost:3000/api/asaas/validate-key

# Listar pedidos
curl http://localhost:3000/api/orders

# Ver logs (kill Ctrl+C)
# No terminal Next.js
```

## Checklists Rápidos

### Setup Inicial
- [ ] `ASAAS_API_KEY` no `.env`
- [ ] `npm run dev` funcionando
- [ ] `curl /api/asaas/validate-key` retorna OK

### Teste Cartão
- [ ] Carrinho com item
- [ ] Checkout preenchido
- [ ] Redireciona para `/loja/pedido/.../pagamento`
- [ ] "Cartão de Crédito" selecionável
- [ ] Formulário de cartão aparece
- [ ] Após pagar → redireciona para confirmação

### Teste Pix
- [ ] Carrinho com item
- [ ] Checkout preenchido
- [ ] Redireciona para `/loja/pedido/.../pagamento`
- [ ] "Pix" selecionável
- [ ] QR Code aparece
- [ ] Chave Pix copiável
- [ ] Data de expiração exibida

### Webhook (localhost)
- [ ] ngrok rodando: `ngrok http 3000`
- [ ] URL de webhook: `https://[hash].ngrok.io/api/asaas/webhook`
- [ ] Webhook configurado no painel Asaas
- [ ] Paga e vê POST no ngrok console
- [ ] Status atualiza no banco: `Order.statusPagamento`

## Debugging

### Ver Logs
```
Frontend (navegador):
- Abrir DevTools (F12)
- Ver Console
- Ver Network (requisições)

Backend (terminal):
- npm run dev mostra logs do servidor
- Procurar por: "[Asaas" ou "Erro"
```

### Testar API Diretamente

```bash
# 1. Validar chave
curl http://localhost:3000/api/asaas/validate-key

# 2. Criar cliente
curl -X POST http://localhost:3000/api/asaas/create-customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@test.com",
    "cpf": "12345678901"
  }'

# 3. Criar pagamento
curl -X POST http://localhost:3000/api/asaas/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "cus_...",
    "orderId": "ord_...",
    "total": 100.00,
    "billingType": "PIX"
  }'
```

## Erros Comuns & Soluções

| Erro | Solução |
|------|---------|
| `invalid_access_token` | Verificar ASAAS_API_KEY |
| `ECONNREFUSED` | npm run dev não está rodando |
| `Webhook não recebe` | ngrok não rodando ou URL errada |
| `Email já existe` | Usar outro email ou deletar no painel |
| `QR Code não aparece` | Pagamento não é tipo PIX |

## Sandbox vs Produção

```
SANDBOX (Testes):
- Chave: $aact_hmlg_...
- API: https://api-sandbox.asaas.com/v3
- Cartões de teste funcionam
- Não cobra no seu cartão real
- Use para desenvolver

PRODUÇÃO (Real):
- Chave: $aact_prod_...
- API: https://api.asaas.com/v3
- Aceita cartões reais
- COBRA de verdade
- Cuidado ao testar!
```

## Migração MP → Asaas

```bash
# 1. Backup
git commit -m "Backup antes Asaas"

# 2. Adicionar chave
# ASAAS_API_KEY no .env

# 3. Remover (opcional)
rm src/app/api/mercado-pago/preference/route.ts
rm src/app/api/mercado-pago/webhook/route.ts
rm src/lib/mercado-pago-security.ts

# 4. Testar
npm run dev

# 5. Deploy
npm run build
# Deploy no seu hosting
```

## Status do Pedido - Estados Possíveis

```
pending      → Aguardando pagamento
approved     → Pagamento aprovado ✅
rejected     → Pagamento rejeitado ❌
failed       → Erro no processamento
overdue      → Vencido
```

## URLs Internas (para usar em código)

```typescript
// Criar cliente
POST /api/asaas/create-customer

// Criar cobrança
POST /api/asaas/create-payment

// QR Code Pix
GET /api/asaas/pix-qrcode?paymentId=...

// Validar chave
GET /api/asaas/validate-key

// Webhook (Asaas → seu servidor)
POST /api/asaas/webhook

// Listar pedidos
GET /api/orders

// Buscar pedido
GET /api/orders/[id]

// Criar pedido
POST /api/orders
```

## Environment Vars - Checklist

```bash
# OBRIGATÓRIOS
✅ ASAAS_API_KEY

# Recomendados
✅ NEXT_PUBLIC_SITE_URL
✅ DATABASE_URL
✅ NODE_ENV

# Opcionais
⚪ NEXT_PUBLIC_ASAAS_WEBHOOK_URL
⚪ JWT_SECRET
⚪ CLOUDINARY_*
```

## Deploy Checklist

```bash
# Antes de deployar
[ ] npm run build (sem erros)
[ ] Verificar .env em produção
[ ] Webhook configurado (URL produção)
[ ] Chave Asaas produção
[ ] Banco de dados ok
[ ] npm run dev funciona localmente

# Deploy
[ ] git commit
[ ] git push
[ ] Vercel (ou outro) auto-deploy
[ ] Verificar logs
[ ] Testar fluxo completo
[ ] Monitorar erros
```

---

**Tudo que você precisa em um só lugar! 📋**
