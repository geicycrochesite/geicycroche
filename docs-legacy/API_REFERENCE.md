# 📡 REFERÊNCIA DE APIs

## Overview

Todos os endpoints estão em `/api`. A aplicação usa **POST** para operações que modificam dados e **GET** para leitura.

---

## 🛒 Pedidos (Orders)

### POST `/api/orders`

**Criar um novo pedido**

**Request:**
```json
{
  "items": [
    {
      "productId": "abc123",
      "name": "Camiseta Premium",
      "quantity": 2,
      "price": 79.90,
      "size": { "name": "M" },
      "color": { "name": "Azul", "hex": "#0000FF" }
    }
  ],
  "fullName": "João Silva",
  "email": "joao@email.com",
  "cpf": "12345678900",
  "phone": "11987654321",
  "address": {
    "street": "Rua A",
    "number": "123",
    "complement": "Apto 456",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "postalCode": "01310100"
  },
  "frete": 25.00
}
```

**Response (sucesso):**
```json
{
  "id": "order-123",
  "fullName": "João Silva",
  "email": "joao@email.com",
  "total": 184.80,
  "statusPagamento": null,
  "createdAt": "2025-01-15T10:30:00Z",
  "items": [
    {
      "id": "item-1",
      "name": "Camiseta Premium",
      "quantity": 2,
      "price": 79.90,
      "size": "M",
      "color": "Azul"
    }
  ]
}
```

**Erros:**
- `400` - Carrinho vazio ou validação falhou
- `500` - Erro ao salvar no banco

**Validações obrigatórias:**
- `fullName`: Não vazio
- `email`: Email válido
- `cpf`: CPF válido (sem máscara)
- `phone`: Telefone válido
- `address`: Todos os campos preenchidos
- `items`: Não vazio

---

### GET `/api/orders/find?email=joao@email.com`

**Buscar pedidos por email**

**Query Params:**
| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | string | ✅ | Email do cliente |

**Response:**
```json
[
  {
    "id": "order-123",
    "fullName": "João Silva",
    "email": "joao@email.com",
    "total": 184.80,
    "statusPagamento": "approved",
    "createdAt": "2025-01-15T10:30:00Z",
    "frete": 25.00
  }
]
```

---

## 💳 Pagamentos (Mercado Pago)

### POST `/api/mercado-pago/preference`

**Criar preferência de pagamento (iniciar checkout Mercado Pago)**

**Request:**
```json
{
  "items": [
    {
      "name": "Camiseta Premium",
      "quantity": 2,
      "price": 79.90
    }
  ],
  "orderId": "order-123"
}
```

**Response:**
```json
{
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=12345"
}
```

**Como usar:**
1. Chamar este endpoint após criar a ordem
2. Redirecionar usuário para `init_point`
3. Usuário realiza pagamento na plataforma Mercado Pago
4. Mercado Pago redireciona para URLs configuradas:
   - Sucesso: `{NEXT_PUBLIC_SITE_URL}/pedido/{orderId}?status=success`
   - Falha: `{NEXT_PUBLIC_SITE_URL}/pedido/{orderId}?status=failure`
   - Pendente: `{NEXT_PUBLIC_SITE_URL}/pedido/{orderId}?status=pending`

---

### POST `/api/mercado-pago/webhook`

**Webhook para confirmação de pagamento (automático)**

⚠️ **Não chamar manualmente!**

Este endpoint recebe notificações do Mercado Pago sobre status de pagamentos.

**O que faz:**
1. Recebe notificação de Mercado Pago
2. Consulta detalhes do pagamento
3. Atualiza status da ordem no banco
4. Retorna 200 OK

---

## 📦 Frete (Melhor Envio)

### POST `/api/frete`

**Calcular frete automático**

**Request:**
```json
{
  "cepDestino": "20040020",
  "quantidade": 2
}
```

**Response:**
```json
[
  {
    "id": "sedex",
    "name": "SEDEX",
    "price": 35.50,
    "delivery_time": 2,
    "error": null
  },
  {
    "id": "pac",
    "name": "PAC",
    "price": 15.80,
    "delivery_time": 7,
    "error": null
  }
]
```

**Erros possíveis:**
- `400` - CEP inválido (deve ter 8 dígitos)
- `400` - Quantidade inválida (deve ser >= 1)
- `500` - Erro ao consultar Melhor Envio

**Cálculos:**
- Peso: 200g por item
- Dimensões por item: 20cm x 20cm x 5cm

---

## 📦 Produtos (Products)

### GET `/api/products`

**Listar todos os produtos**

**Response:**
```json
[
  {
    "id": "prod-1",
    "name": "Camiseta Premium",
    "slug": "camiseta-premium",
    "price": 79.90,
    "imageUrl": "https://...",
    "description": "Camiseta 100% algodão",
    "categoryId": "cat-1",
    "colors": [
      { "id": "c1", "name": "Azul", "hex": "#0000FF" },
      { "id": "c2", "name": "Vermelho", "hex": "#FF0000" }
    ],
    "sizes": [
      { "id": "s1", "name": "P" },
      { "id": "s2", "name": "M" },
      { "id": "s3", "name": "G" }
    ]
  }
]
```

---

## 🏷️ Categorias (Categories)

### GET `/api/categorias`

**Listar todas as categorias**

**Response:**
```json
[
  {
    "id": "cat-1",
    "name": "Camisetas",
    "slug": "camisetas",
    "products": [...]
  },
  {
    "id": "cat-2",
    "name": "Calças",
    "slug": "calcas",
    "products": [...]
  }
]
```

---

## 🔄 Status de Pagamento

Os seguintes status podem aparecer em `statusPagamento`:

| Status | Significado | Ação |
|--------|-------------|------|
| `null` | Aguardando pagamento | Redirecionando para Mercado Pago |
| `pending` | Pagamento pendente | Aguardando confirmação |
| `approved` | ✅ Pago com sucesso | Pedido deve ser enviado |
| `rejected` | ❌ Pagamento recusado | Permitir novo pagamento |
| `cancelled` | ⛔ Pagamento cancelado | Pedido não processado |

---

## 🚨 Tratamento de Erros

Todos os endpoints retornam erros em JSON:

```json
{
  "error": "CPF inválido"
}
```

ou array de erros (validação):

```json
{
  "error": [
    "fullName is required",
    "email must be a valid email"
  ]
}
```

---

## 🔐 Segurança

### Não autenticados
- Qualquer pessoa pode criar pedidos
- Qualquer pessoa pode consultar pedidos por email ⚠️

### ✅ TODO: Implementar

- [ ] Autenticação de usuário
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Validação CSRF

---

## 📝 Exemplos com cURL

### Criar Pedido

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"productId": "1", "name": "Produto", "quantity": 1, "price": 50, "size": {"name": "M"}, "color": {"name": "Azul"}}],
    "fullName": "Teste",
    "email": "teste@email.com",
    "cpf": "12345678901",
    "phone": "11987654321",
    "address": {"street": "Rua A", "number": "123", "neighborhood": "Centro", "city": "São Paulo", "state": "SP", "postalCode": "01310100"},
    "frete": 20
  }'
```

### Calcular Frete

```bash
curl -X POST http://localhost:3000/api/frete \
  -H "Content-Type: application/json" \
  -d '{"cepDestino": "20040020", "quantidade": 1}'
```

### Buscar Pedidos

```bash
curl http://localhost:3000/api/orders/find?email=teste@email.com
```

### Listar Produtos

```bash
curl http://localhost:3000/api/products
```

### Listar Categorias

```bash
curl http://localhost:3000/api/categorias
```

---

## 📊 Fluxo Típico

1. **GET `/api/products`** → Lista produtos
2. **POST `/api/frete`** → Calcula frete
3. **POST `/api/orders`** → Cria pedido
4. **POST `/api/mercado-pago/preference`** → Obtém link de pagamento
5. **Redirecionar usuário** → Para link Mercado Pago
6. **Webhook `/api/mercado-pago/webhook`** → Recebe confirmação
7. **GET `/api/orders/find`** → Usuário consulta pedido

---

## 🔗 Referências

- Mercado Pago: https://docs.mercadopago.com
- Melhor Envio: https://www.melhorenvio.com.br/api
- Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
