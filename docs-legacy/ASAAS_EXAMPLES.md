# 🔗 Exemplos de Uso - Asaas API

## 1️⃣ Validar Chave Asaas

```bash
curl http://localhost:3000/api/asaas/validate-key

# Resposta:
# {
#   "valid": true,
#   "environment": "sandbox",
#   "apiKey": "$aact...****",
#   "message": "API key válida para SANDBOX"
# }
```

## 2️⃣ Criar Cliente

```javascript
// Frontend (em um API route ou componente)
const response = await fetch('/api/asaas/create-customer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@example.com',
    cpf: '12345678901',
    phone: '11999999999',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
      complement: 'Apto 123',
    },
  }),
});

const data = await response.json();
// {
//   "success": true,
//   "customerId": "cus_000000000000000000000001",
//   "customer": {
//     "id": "cus_000000000000000000000001",
//     "name": "João Silva",
//     "email": "joao@example.com",
//     "document": "12345678901"
//   }
// }
```

## 3️⃣ Criar Cobrança - Cartão de Crédito

```javascript
const response = await fetch('/api/asaas/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: 'cus_000000000000000000000001',
    orderId: 'ord_123456',
    total: 150.00,
    billingType: 'CREDIT_CARD',
    creditCardData: {
      creditCardNumber: '4111111111111111',
      creditCardExpirationMonth: '12',
      creditCardExpirationYear: '2026',
      creditCardCvv: '123',
      creditCardHolderName: 'JOAO SILVA',
    },
    dueDate: '2026-01-15', // Opcional, usa hoje se não informar
  }),
});

const data = await response.json();
// {
//   "success": true,
//   "paymentId": "pay_000000000000000000000001",
//   "payment": {
//     "id": "pay_000000000000000000000001",
//     "status": "approved",
//     "billingType": "CREDIT_CARD",
//     "value": 150.00,
//     "dueDate": "2026-01-15",
//     "externalReference": "ord_123456"
//   }
// }
```

## 4️⃣ Criar Cobrança - Pix

```javascript
const response = await fetch('/api/asaas/create-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: 'cus_000000000000000000000001',
    orderId: 'ord_123456',
    total: 150.00,
    billingType: 'PIX',
    // dueDate é opcional para Pix (padrão: 30 dias)
  }),
});

const data = await response.json();
// {
//   "success": true,
//   "paymentId": "pay_000000000000000000000002",
//   "payment": {
//     "id": "pay_000000000000000000000002",
//     "status": "pending",
//     "billingType": "PIX",
//     "value": 150.00,
//     "dueDate": "2026-02-14",
//     "externalReference": "ord_123456"
//   }
// }
```

## 5️⃣ Obter QR Code Pix

```javascript
// Usar o paymentId retornado na criação da cobrança Pix
const response = await fetch(
  '/api/asaas/pix-qrcode?paymentId=pay_000000000000000000000002'
);

const data = await response.json();
// {
//   "success": true,
//   "encodedImage": "data:image/png;base64,...",
//   "payload": "00020126360014br.gov.bcb.pix0136...",
//   "expirationDate": "2026-02-14T23:59:59"
// }
```

## 📊 Fluxo Completo - Cartão

```typescript
// 1. Usuário preenche dados e clica "Pagar com Cartão"
async function handleCardPayment(cardData) {
  try {
    // 2. Criar cliente
    const customerRes = await fetch('/api/asaas/create-customer', {
      method: 'POST',
      body: JSON.stringify({
        name: orderData.fullName,
        email: orderData.email,
        cpf: orderData.cpf,
        phone: orderData.phone,
        address: orderData.address,
      }),
    });
    const { customerId } = await customerRes.json();

    // 3. Criar cobrança
    const paymentRes = await fetch('/api/asaas/create-payment', {
      method: 'POST',
      body: JSON.stringify({
        customerId,
        orderId: orderData.id,
        total: orderData.total + orderData.frete,
        billingType: 'CREDIT_CARD',
        creditCardData: cardData,
      }),
    });
    const { payment } = await paymentRes.json();

    // 4. Pagamento processado
    if (payment.status === 'approved') {
      // Redirecionar para página de sucesso
      router.push(`/loja/pedido/${orderId}?status=success`);
    }
  } catch (error) {
    console.error('Erro:', error);
    toast.error('Erro ao processar pagamento');
  }
}
```

## 📊 Fluxo Completo - Pix

```typescript
// 1. Usuário clica "Pix"
async function handlePixPayment() {
  try {
    // 2. Criar cliente
    const customerRes = await fetch('/api/asaas/create-customer', {
      method: 'POST',
      body: JSON.stringify({
        name: orderData.fullName,
        email: orderData.email,
        cpf: orderData.cpf,
        address: orderData.address,
      }),
    });
    const { customerId } = await customerRes.json();

    // 3. Criar cobrança Pix
    const paymentRes = await fetch('/api/asaas/create-payment', {
      method: 'POST',
      body: JSON.stringify({
        customerId,
        orderId: orderData.id,
        total: orderData.total + orderData.frete,
        billingType: 'PIX',
      }),
    });
    const { paymentId } = await paymentRes.json();

    // 4. Obter QR Code
    const qrRes = await fetch(
      `/api/asaas/pix-qrcode?paymentId=${paymentId}`
    );
    const qrData = await qrRes.json();

    // 5. Exibir QR Code para usuário
    setQrCode(qrData);
    // Usuário escaneia o código ou copia a chave Pix
    // Webhook recebe confirmação automaticamente
  } catch (error) {
    console.error('Erro:', error);
    toast.error('Erro ao gerar QR Code Pix');
  }
}
```

## 🔔 Webhook - O que receber

```javascript
// POST /api/asaas/webhook
// Corpo da requisição:
{
  "event": "PAYMENT_CONFIRMED",
  "payment": {
    "id": "pay_000000000000000000000001",
    "value": 150.00,
    "status": "confirmed",
    "billingType": "CREDIT_CARD",
    "externalReference": "ord_123456"
  }
}

// Events possíveis:
// - PAYMENT_CONFIRMED (pagamento aprovado)
// - PAYMENT_PENDING (aguardando pagamento)
// - PAYMENT_FAILED (pagamento rejeitado)
// - PAYMENT_OVERDUE (pagamento vencido)
```

## 🔌 Using asaas.ts Library Directly

```typescript
// Em um arquivo do servidor (API route, server action, etc)
import {
  asaasFetch,
  getAsaasApiKey,
  getAsaasBaseUrl,
  isSandboxEnvironment,
  maskApiKey,
} from '@/lib/asaas';

// ✅ Fazer request customizado
const customers = await asaasFetch('/customers?limit=10');

// ✅ Criar cliente customizado
const customer = await asaasFetch('/customers', 'POST', {
  name: 'João',
  email: 'joao@example.com',
  document: '12345678901',
  documentType: 'CPF',
});

// ✅ Atualizar cliente
await asaasFetch(`/customers/${customerId}`, 'PUT', {
  name: 'João Silva',
});

// ✅ Deletar cliente
await asaasFetch(`/customers/${customerId}`, 'DELETE');

// ✅ Detectar ambiente
if (isSandboxEnvironment(apiKey)) {
  console.log('Usando sandbox!');
}

// ✅ Mascarar chave para logs
console.log(`Usando chave: ${maskApiKey(apiKey)}`);
```

## 🎯 Dicas Importantes

### Validação de Cartão
```javascript
// Cartão de teste sandbox (aprovado):
4111111111111111

// Cartão com 3D Secure:
5425233010103981

// Cartão que rejeita:
4111111111111112
```

### Datas
```javascript
// Format correto: YYYY-MM-DD
'2026-12-31' ✅
'31/12/2026' ❌
'12-31-2026' ❌
```

### Valores
```javascript
// Sempre usar Decimal (não array)
150.00 ✅
150 ✅
"150,00" ❌
{value: 150} ❌
```

### Erro Comum: invalid_access_token
```typescript
// ❌ Não faça:
const key = process.env.ASAAS_API_KEY // pode ter espaços
fetch(url, {
  headers: {
    'Authorization': `Bearer ${key}` // Asaas não usa Bearer!
  }
})

// ✅ Faça:
import { asaasFetch } from '@/lib/asaas'
await asaasFetch('/customers') // Já cuida de tudo!
```
