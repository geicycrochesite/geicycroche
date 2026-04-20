# ✅ CHECKLIST - Implementação Asaas

## 📋 Pré-requisitos

- [ ] Conta Asaas criada (https://www.asaas.com)
- [ ] Chave API obtida no painel
- [ ] Node.js 16+ instalado
- [ ] Banco de dados PostgreSQL configurado
- [ ] Next.js 16+ rodando

## 🔧 1. Configuração Inicial

### 1.1 Variáveis de Ambiente

```bash
# Copie .env.example para .env
cp .env.example .env

# Abra .env e preencha:
ASAAS_API_KEY=$aact_hmlg_sua_chave_aqui  # (sandbox)
# OU
ASAAS_API_KEY=$aact_prod_sua_chave_aqui  # (produção)

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] `ASAAS_API_KEY` configurada
- [ ] `NEXT_PUBLIC_SITE_URL` configurada

### 1.2 Teste a Chave

```bash
# Teste se a chave está correta
curl http://localhost:3000/api/asaas/validate-key

# Deve retornar:
# {
#   "valid": true,
#   "environment": "sandbox",
#   "apiKey": "$aact...****"
# }
```

- [ ] Chave validada com sucesso

## 🗄️ 2. Banco de Dados

### 2.1 Verificar Schema

O campo `statusPagamento` já existe no modelo `Order`.

```bash
# Se precisar resetar o banco (CUIDADO - DELETA TUDO):
npx prisma migrate reset
```

- [ ] Verificado que `Order.statusPagamento` existe no schema

### 2.2 Migrations (se necessário)

```bash
npx prisma migrate dev --name add_asaas_fields
```

- [ ] Migrations aplicadas (se necessário)

## 📂 3. Arquivos Criados

Verifique se todos os arquivos foram criados:

```
✅ Libs:
  src/lib/asaas.ts

✅ API Routes (Asaas):
  src/app/api/asaas/validate-key/route.ts
  src/app/api/asaas/create-customer/route.ts
  src/app/api/asaas/create-payment/route.ts
  src/app/api/asaas/pix-qrcode/route.ts
  src/app/api/asaas/webhook/route.ts

✅ Components (Pagamento):
  src/components/payment/PaymentMethodSelector.tsx
  src/components/payment/CreditCardForm.tsx
  src/components/payment/PixPayment.tsx

✅ Páginas:
  src/app/loja/pedido/[orderId]/pagamento/page.tsx
  src/app/loja/pedido/[orderId]/page.tsx

✅ Atualizado:
  src/components/CheckoutForm.tsx (removido MP, adicionado Asaas)
  src/app/api/orders/route.ts (adicionado GET)

✅ Docs:
  docs-legacy/ASAAS_SETUP.md
  docs-legacy/ASAAS_EXAMPLES.md
  .env.example
```

- [ ] Todos os arquivos criados e atualizados

## 🧪 4. Testes Locais

### 4.1 Iniciar Servidor

```bash
npm run dev
```

- [ ] Servidor rodando em http://localhost:3000

### 4.2 Teste de Fluxo - Cartão

1. Acesse `/` e adicione produtos ao carrinho
2. Vá ao checkout e preencha dados
3. Calcule o frete
4. Clique "Finalizar Pedido"
5. Deve redirecionar para `/loja/pedido/[id]/pagamento`
6. Escolha "Cartão de Crédito"
7. Preencha com cartão de teste:
   - Número: `4111111111111111`
   - Nome: `TESTE USUARIO`
   - Vencimento: `12/26`
   - CVV: `123`
8. Clique "Pagar com Cartão"
9. Deve processar e redirecionar para confirmação

- [ ] Fluxo de cartão funcionando
- [ ] Pedido criado com status `pending` → `approved`

### 4.3 Teste de Fluxo - Pix

1. Repita passos 1-5 acima
2. Escolha "Pix"
3. Sistema deve gerar QR Code
4. QR Code deve ser exibido na tela
5. Chave Pix deve ser copiável
6. Botão "Voltar" deve funcionar

- [ ] Fluxo de Pix funcionando
- [ ] QR Code gerado corretamente

### 4.4 Teste de Página de Pedido

1. Acesse `/loja/pedido/[id]` (sem pagamento)
2. Deve exibir resumo do pedido
3. Deve mostrar status
4. Deve ter botão "Tentar Pagamento Novamente" se status != approved
5. Clique em voltar deve funcionar

- [ ] Página de pedido exibindo corretamente

## 🔗 5. Webhook - Sandbox

Para testar webhook em localhost, use **ngrok**:

```bash
# 1. Instale ngrok
brew install ngrok  # macOS
# ou wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip  # Windows

# 2. Exponha seu localhost
ngrok http 3000

# 3. Você receberá uma URL como: https://abc123.ngrok.io

# 4. Configure no Asaas:
#    - Vá em Configurações → Integrações → Webhooks
#    - Adicione webhook: https://abc123.ngrok.io/api/asaas/webhook
#    - Selecione eventos: payment.confirmed, payment.pending, payment.failed
#    - Salve

# 5. Faça um pagamento teste
# 6. Verifique se o webhook foi recebido:
#    - ngrok mostrar a requisição POST
#    - Banco de dados deve ter statusPagamento atualizado
```

- [ ] Ngrok configurado (se testando webhook)
- [ ] Webhook configurado no painel Asaas
- [ ] Webhook recebendo notificações (verificar ngrok console)
- [ ] Status do pedido atualiza após webhook

## 🔐 6. Configuração Produção

### 6.1 Trocar Chave

```bash
# No .env de produção:
ASAAS_API_KEY=$aact_prod_sua_chave_produção

# NÃO esqueça de:
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://seu-site.com
```

- [ ] Chave de produção configurada
- [ ] URL correta configurada

### 6.2 Webhook em Produção

```
Vá no painel Asaas e configure webhook para:
https://seu-site.com/api/asaas/webhook
```

- [ ] Webhook configurado com URL de produção

### 6.3 Testes em Produção

```bash
# Teste com cartão de teste do Asaas (Produção)
# Seu account manager pode fornecer cartões de teste
# OU use cartões reais (sem compromisso em teste)
```

- [ ] Pagamento teste realizado em produção
- [ ] Webhook recebido e status atualizado

## 📧 7. Emails e Notificações (Opcional)

Se quiser enviar emails:

```typescript
// Em /api/asaas/webhook, adicione:
if (event === 'PAYMENT_CONFIRMED') {
  // Enviar email de confirmação
  // Atualizar status de entrega
  // Gerar nota fiscal
}
```

- [ ] Emails configurados (se necessário)

## 🚀 8. Deploy

### 8.1 Build

```bash
npm run build
```

- [ ] Build sem erros
- [ ] Sem warnings desnecessários

### 8.2 Deploy (Vercel/outro)

```bash
# Vercel
vercel deploy

# Outro hosting:
# Siga as instruções do seu provider
```

- [ ] Site deployado
- [ ] Ambiente correto (produção)
- [ ] Variáveis de ambiente configuradas no hosting

## ✅ 9. Verificações Finais

- [ ] Checkout funciona sem erros
- [ ] Cartão é processado corretamente
- [ ] Pix gera QR Code
- [ ] Webhook atualiza status do pedido
- [ ] Emails de confirmação enviados (se implementado)
- [ ] Admin panel mostra pedidos com status correto
- [ ] Página de pedido exibe status correto
- [ ] Pode repetir pagamento se falhar
- [ ] Logs estão corretos (chave mascarada)
- [ ] Sem dados sensíveis nos logs

## 🐛 Troubleshooting

### Erro: "invalid_access_token"

```bash
✅ Verificar .env
✅ Verificar se ASAAS_API_KEY é válida
✅ Verificar se não tem espaços
✅ Restart do servidor (npm run dev)
```

### Erro: "Customer email already exists"

```bash
# Significa que esse email já tem cliente no Asaas
# Solução 1: Use outro email para teste
# Solução 2: Delete o cliente do painel Asaas (sandbox only)
```

### Webhook não é recebido

```bash
✅ Verificar se ngrok está rodando (localhost)
✅ Verificar se webhook está configurado no Asaas
✅ Verificar URL do webhook
✅ Verificar se eventos estão selecionados
✅ Checar logs do ngrok
```

### QR Code Pix não aparece

```bash
✅ Verificar se paymentId é válido
✅ Verificar se pagamento foi criado como PIX
✅ Verificar se não expirou (30 dias)
✅ Checar console do navegador para erros
```

## 📞 Suporte

- **Docs Asaas:** https://docs.asaas.com
- **Status Asaas:** https://status.asaas.com
- **Email Asaas:** suporte@asaas.com

---

**Parabéns! Se tudo passou no checklist, você tem uma integração Asaas completa e pronta para produção! 🎉**
