# 🔐 INTEGRAÇÃO ASAAS - GUIA DE CONFIGURAÇÃO

## ✅ O que foi implementado

Você tem agora um **checkout transparente com Asaas** que substitui o Mercado Pago:

- ✅ Detecção automática de ambiente (sandbox vs produção) pela chave
- ✅ Pagamento por **Cartão de Crédito** (dentro do site)
- ✅ Pagamento por **Pix** com QR Code (dentro do site)
- ✅ Webhook para atualizar status do pedido
- ✅ Validação de dados com Yup
- ✅ Logs com chave mascarada
- ✅ Fluxo seguro server-side

## 🚀 Setup Rápido

### 1️⃣ Configure a chave Asaas

Copie a chave da API do Asaas e adicione ao `.env`:

```bash
# Para Sandbox (desenvolvimento/homologação)
ASAAS_API_KEY=$aact_hmlg_sua_chave_aqui

# Para Produção
ASAAS_API_KEY=$aact_prod_sua_chave_aqui
```

**Importante:** A detecção do ambiente é automática!
- Se começar com `$aact_hmlg_` → usa `https://api-sandbox.asaas.com/v3`
- Se começar com `$aact_prod_` → usa `https://api.asaas.com/v3`

### 2️⃣ Configure o Webhook (Importante!)

No painel do Asaas, configure o webhook para receber notificações:

1. Vá em **Configurações → Integrações → Webhooks**
2. Adicione a URL do webhook:
   - **Dev:** `http://localhost:3000/api/asaas/webhook`
   - **Prod:** `https://seu-site.com/api/asaas/webhook`
3. Escolha os eventos que quer receber:
   - `payment.confirmed` (pagamento aprovado)
   - `payment.pending` (pagamento pendente)
   - `payment.failed` (pagamento falhou)
   - `payment.overdue` (pagamento vencido)

### 3️⃣ Teste a integração

```bash
# Valide sua chave Asaas
curl http://localhost:3000/api/asaas/validate-key

# Resposta esperada:
# {
#   "valid": true,
#   "environment": "sandbox",
#   "apiKey": "$aact...****"
# }
```

## 📊 Fluxo do Checkout

```
1. Usuário preenche carrinho + dados
2. Clica em "Finalizar Pedido"
3. Sistema cria o pedido (status: pending)
4. Redireciona para /loja/pedido/[orderId]/pagamento
5. Usuário escolhe: Cartão ou Pix
6. Para Cartão:
   - Preenche dados do cartão
   - Sistema cria cliente no Asaas
   - Sistema cria cobrança
   - Asaas processa o cartão
7. Para Pix:
   - Sistema cria cliente no Asaas
   - Sistema cria cobrança Pix
   - Busca QR Code
   - Exibe QR Code + chave Pix
8. Webhook recebe notificação de pagamento
9. Sistema atualiza status do pedido
10. Usuário vê confirmação
```

## 🔧 Arquivos Criados

### APIs (Routes)

```
src/app/api/asaas/
├── validate-key/route.ts       # Valida a chave Asaas
├── create-customer/route.ts    # Cria cliente
├── create-payment/route.ts     # Cria cobrança (cartão/Pix)
├── pix-qrcode/route.ts         # Busca QR Code Pix
└── webhook/route.ts            # Webhook para receber notificações
```

### Components

```
src/components/payment/
├── PaymentMethodSelector.tsx   # Escolhe Cartão ou Pix
├── CreditCardForm.tsx          # Formulário de cartão
└── PixPayment.tsx              # Exibe QR Code Pix
```

### Library

```
src/lib/asaas.ts               # Funções auxiliares + tipos
```

### Página de Pagamento

```
src/app/loja/pedido/[orderId]/pagamento/page.tsx
```

## 📝 Variáveis de Ambiente

```bash
# Obrigatórias
ASAAS_API_KEY=$aact_hmlg_...              # Chave da API
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Opcionais (webhook)
NEXT_PUBLIC_ASAAS_WEBHOOK_URL=http://localhost:3000/api/asaas/webhook
```

## 🧪 Testando Cartão em Sandbox

Use estes cartões de teste no Asaas Sandbox:

```
Cartão Válido (Sem 3D Secure):
Número: 4111111111111111
Exp: 12/26
CVV: 123

Cartão com 3D Secure:
Número: 5425233010103981
Exp: 12/26
CVV: 123

Cartão que Falha:
Número: 4111111111111112
Exp: 12/26
CVV: 123
```

## 🧪 Testando Pix em Sandbox

Pix funciona normalmente em sandbox, gerando QR Codes reais para teste.

## 📱 Fluxo do Usuário - Cartão

1. Carrega a página `/loja/pedido/123/pagamento`
2. Vê resumo do pedido
3. Clica em "Cartão de Crédito"
4. Preenche:
   - Número do cartão
   - Nome do titular
   - Mês e ano de expiração
   - CVV
5. Clica em "Pagar com Cartão"
6. Sistema:
   - Cria cliente no Asaas
   - Cria cobrança
   - Processa pagamento
7. Se aprovado → redireciona para /loja/pedido/123?status=success

## 📱 Fluxo do Usuário - Pix

1. Carrega a página `/loja/pedido/123/pagamento`
2. Vê resumo do pedido
3. Clica em "Pix"
4. Sistema:
   - Cria cliente no Asaas
   - Cria cobrança Pix
   - Busca QR Code
5. Exibe:
   - QR Code para escanear
   - Chave Pix (copia e cola)
   - Data de expiração
6. Usuário escaneia ou copia a chave no app do banco
7. Webhook recebe confirmação
8. Sistema atualiza status automaticamente

## ⚠️ Pontos Importantes

### Segurança
- ❌ Nunca envie dados de cartão via frontend direto
- ✅ Sempre processe via API route (server-side)
- ✅ Asaas maneja os dados sensíveis
- 🔒 Logs mascaram a chave

### Validação
- ✅ Cartão: 16 dígitos
- ✅ Expiração: MM/YYYY (válido)
- ✅ CVV: 3-4 dígitos
- ✅ CPF: 11 dígitos
- ✅ Email: válido
- ✅ Telefone: 10-11 dígitos (opcional)

### Sandbox vs Produção
- **Detecção automática pela chave**
- Não precisa mudar código
- Apenas troque `ASAAS_API_KEY` no `.env`

### Webhook
- ⚠️ **Importante:** Configure no painel do Asaas!
- Sem webhook, status não atualiza automaticamente
- Em localhost, use ferramenta como ngrok para testar

## 🐛 Troubleshooting

### "invalid_access_token"
```bash
✅ Verificar se ASAAS_API_KEY existe no .env
✅ Verificar se não tem espaços extras (usa trim())
✅ Verificar se a chave é do ambiente correto (sandbox/prod)
```

### "Cliente não pode ser criado"
```bash
✅ Verificar se CPF é válido (11 dígitos)
✅ Verificar se email é único (cliente já existe)
✅ Verificar se dados estão em português
```

### "Cobrança não pode ser criada"
```bash
✅ Verificar se cliente existe
✅ Verificar se valor é > 0
✅ Verificar se conta Asaas está completa (dados comerciais)
✅ Verificar se billingType é válido (CREDIT_CARD ou PIX)
```

### "QR Code não gerado"
```bash
✅ Verificar se paymentId é válido
✅ Verificar se pagamento foi criado como tipo PIX
✅ Verificar se não expirou (Pix tem 30 dias de validade)
```

## 📖 Referências

- [Docs Asaas](https://docs.asaas.com)
- [API Reference Asaas](https://docs.asaas.com/reference)
- [Webhook Events](https://docs.asaas.com/docs/webhooks)

## ❓ Dúvidas?

Se algo não funciona:

1. Verifique os logs do console
2. Cheque se a chave está correta
3. Teste com `/api/asaas/validate-key`
4. Verifique o webhook no painel do Asaas
5. Teste em sandbox primeiro
