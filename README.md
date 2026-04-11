# 🛍️ Artesanato - E-commerce de Roupas

> Plataforma de e-commerce completa para venda de roupas e artesanato com integração de pagamentos e cálculo de frete automático.

---

## 📌 Visão Geral

**Artesanato** é uma loja virtual desenvolvida em Next.js que permite:

- ✅ Navegação e filtro de produtos por categorias
- ✅ Carrinho de compras com persistência local
- ✅ Checkout com validação de dados
- ✅ Cálculo automático de frete via Melhor Envio
- ✅ Pagamento integrado com Mercado Pago
- ✅ Histórico de pedidos do cliente
- ✅ Painel administrativo para produtos e categorias

A aplicação funciona como uma loja completa: do catálogo até a confirmação de pagamento.

---

## ⚙️ Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, TailwindCSS |
| **Formulários** | React Hook Form, Yup, React Input Mask |
| **Banco de Dados** | Prisma ORM, PostgreSQL |
| **Pagamentos** | Mercado Pago API |
| **Frete** | Melhor Envio API |
| **UI/UX** | Lucide React, React Hot Toast |
| **Dev** | ESLint, TypeScript, Next.js Turbopack |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL instalado ou acesso a banco online
- Conta no Mercado Pago (sandbox)
- Conta no Melhor Envio

### 1. Clonar e Instalar Dependências

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre no diretório
cd artesanaio

# Instale as dependências
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Copie do exemplo
cp .env.example .env
```

Abra `.env` e preencha com seus valores (veja seção "Variáveis de Ambiente")

### 3. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate deploy
```

### 4. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 5. Build para Produção

```bash
npm run build
npm start
```

---

## 📁 Estrutura de Pastas

```
src/
├── app/                         # Aplicação Next.js (App Router)
│   ├── api/                     # API Routes (backend)
│   │   ├── mercado-pago/       # Integração com Mercado Pago
│   │   ├── frete/              # Cálculo de frete
│   │   ├── orders/             # CRUD de pedidos
│   │   ├── products/           # CRUD de produtos
│   │   └── categorias/         # CRUD de categorias
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Home
│   ├── carrinho/               # Página do carrinho
│   ├── checkout/               # Página de checkout
│   ├── categoria/[slug]/       # Filtro por categoria
│   ├── produto/[slug]/         # Detalhe do produto
│   ├── pedido/[id]/            # Detalhe do pedido
│   └── meus-pedidos/           # Histórico de pedidos
│
├── components/                  # Componentes React reutilizáveis
│   ├── Header.tsx              # Cabeçalho
│   ├── Footer.tsx              # Rodapé
│   ├── CategoriasMenu.tsx       # Menu de categorias
│   ├── CheckoutForm.tsx         # Formulário de checkout
│   ├── FreteCalculator.tsx      # Calculadora de frete
│   ├── ProductDetailClient.tsx  # Detalhe do produto (client)
│   ├── PagarNovamenteButton.tsx # Repagar pedido
│   └── WhatsAppButton.tsx       # Botão WhatsApp
│
├── context/                     # Context API (estado global)
│   └── CartContext.tsx          # Gerenciamento do carrinho
│
├── lib/                         # Funções auxiliares
│   ├── prisma.ts               # Configuração Prisma
│   └── validators/
│       └── checkoutSchema.ts    # Validação de checkout
│
└── app/globals.css             # Estilos globais
```

---

## 🔄 Fluxo do Sistema

```
┌─────────────────┐
│   HomePage      │  ← Usuário acessa a loja
└────────┬────────┘
         │
    ┌────▼─────────────┐
    │ Busca Produtos   │  ← Filtro por categoria
    └────┬─────────────┘
         │
    ┌────▼──────────────────────┐
    │ Detalhe do Produto        │  ← Seleciona cor, tamanho, qty
    │ (ProductDetailClient)     │
    └────┬───────────────────────┘
         │
    ┌────▼────────────────┐
    │ Adiciona ao Carrinho│  ← localStorage
    └────┬────────────────┘
         │
    ┌────▼──────────────┐
    │ Página Carrinho   │  ← Revisa itens
    └────┬──────────────┘
         │
    ┌────▼──────────────────┐
    │ Checkout              │  ← Preenche dados, calcula frete
    │ (CheckoutForm)        │
    └────┬───────────────────┘
         │
    ┌────▼───────────────────────────┐
    │ API: POST /api/orders          │  ← Cria pedido no BD
    │ Validação com Yup              │
    └────┬────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │ API: POST /api/mercado-pago/   │  ← Prepara pagamento
    │ preference                      │
    └────┬─────────────────────────────┘
         │
    ┌────▼──────────────────┐
    │ Mercado Pago          │  ← Usuário paga
    │ (Checkout Externo)    │
    └────┬───────────────────┘
         │
    ┌────▼──────────────────────────┐
    │ Webhook MercadoPago           │  ← Confirma pagamento
    │ /api/mercado-pago/webhook     │
    └────┬───────────────────────────┘
         │
    ┌────▼────────────────────┐
    │ Página Pedido           │  ← Status do pagamento
    │ /pedido/[id]            │
    └────────────────────┬────┘
                         │
            ┌────────────▼──────────────┐
            │ Meus Pedidos              │
            │ Histórico de compras      │
            └──────────────────────────┘
```

**Atores Externos:**
1. **Melhor Envio** - Calcula frete em tempo real
2. **Mercado Pago** - Processa pagamento
3. **PostgreSQL** - Armazena dados

---

## 🔐 Variáveis de Ambiente

### 📄 Arquivo `.env` (Backend/Servidor)

| Variável | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `DATABASE_URL` | **OBRIGATÓRIA** | URL de conexão PostgreSQL | `postgresql://user:pass@localhost:5432/artesanaio` |
| `MERCADO_PAGO_ACCESS_TOKEN` | **OBRIGATÓRIA** | Token de acesso Mercado Pago | `APP_USR_12345...` |
| `MELHOR_ENVIO_TOKEN` | **OBRIGATÓRIA** | Token para cálculo de frete | `eyJ0eXAi...` |
| `NODE_ENV` | Opcional | Ambiente (development/production) | `development` |

### 💻 Arquivo `.env.local` (Frontend/Público)

| Variável | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | **OBRIGATÓRIA** | URL da aplicação (com protocolo) | `http://localhost:3000` ou `https://artesanaio.com.br` |

### ⚠️ Variáveis Críticas

**🔴 NUNCA exponha em .env.local:**
- `DATABASE_URL` - controla acesso ao banco
- `MERCADO_PAGO_ACCESS_TOKEN` - permite fazer transações
- `MELHOR_ENVIO_TOKEN` - acesso à API de frete

**✅ Seguro expor em .env.local:**
- `NEXT_PUBLIC_SITE_URL` - é usado no cliente de forma legítima

---

## 📋 Guia de Configuração por Ambiente

### 👨‍💻 Desenvolvimento Local

**.env**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/artesanaio
MERCADO_PAGO_ACCESS_TOKEN=APP_USR_12345... (sandbox)
MELHOR_ENVIO_TOKEN=seu_token_aqui
NODE_ENV=development
```

**.env.local**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 🚀 Produção (Vercel/Render/etc)

**Definir no painel do host:**
```
DATABASE_URL = postgresql://...
MERCADO_PAGO_ACCESS_TOKEN = APP_USR_... (production)
MELHOR_ENVIO_TOKEN = ...
NEXT_PUBLIC_SITE_URL = https://artesanaio.com.br
```

---

## ⚙️ Primeiros Passos Após Instalação

### 1. Verificar Conexão do Banco

```bash
npx prisma db push
```

### 2. Abrir Prisma Studio (gerenciar dados)

```bash
npx prisma studio
```

### 3. Popular Dados Iniciais (produtos, categorias)

```bash
# Será necessário criar um script seed (futuro)
# Por enquanto, use Prisma Studio ou insira via API
```

### 4. Testar APIs

```bash
# Criar um pedido (POST)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[],"fullName":"Teste","email":"teste@email.com"...}'
```

---

## ⚠️ Boas Práticas & Avisos

### 🔴 Problemas Encontrados

1. **CEP Fixo no Frete**
   - Localizado em: `src/app/api/frete/route.ts` linha 26
   - CEP: `25935506` está hardcoded
   - ✅ **Solução:** Adicionar configuração por loja

2. **DATABASE_URL Comentada**
   - Arquivo: `prisma/schema.prisma` linha 13
   - ℹ️ **Nota:** Será lida do `.env` automaticamente

3. **Sem .env.example**
   - Usuarios novos não sabem quais variáveis são necessárias
   - ✅ **Solução:** Criar `.env.example`

4. **localStorage sem validação**
   - Carrinho pode desincronizar do servidor
   - ✅ **Solução:** Sincronizar com sessão do servidor

### ✅ Pontos Positivos

- Validação robusta com Yup
- Utilização correta de Context API
- Prisma com data proxy
- TypeScript em todo projeto
- Componentes bem organizados

### 🎯 Melhorias Recomendadas

| Prioridade | Item | Benef. |
|-----------|------|--------|
| 🔴 Alta | Adicionar autenticação de usuário | Segurança + histórico |
| 🟠 Alta | Criar script seed para dados | Setup rápido |
| 🟠 Média | Implementar cache de produtos | Performance |
| 🟡 Média | Adicionar logs estruturados | Debug em produção |
| 🟡 Baixa | Testes automatizados | Confiança |

---

## 📞 Contato & Suporte Externo

- **Mercado Pago:** [docs.mercadopago.com](https://docs.mercadopago.com)
- **Melhor Envio:** [melhorenvio.com.br/api](https://melhorenvio.com.br/api)
- **Next.js:** [nextjs.org](https://nextjs.org)
- **Prisma:** [prisma.io](https://prisma.io)

---

## 📄 Licença

Projeto privado. Todos os direitos reservados.
