# 🛠️ GUIA DE SETUP E TROUBLESHOOTING

## ✅ Checklist de Setup

### Passo 1: Preparar Ambiente

- [ ] Ter Node.js 18+ instalado
- [ ] Ter PostgreSQL instalado ou acesso a banco online (Supabase, Railway, etc)
- [ ] Ter Git instalado

**Verificar versões:**
```bash
node --version    # deve ser v18+
npm --version     # deve ser v8+
psql --version    # verificar PostgreSQL
```

### Passo 2: Clonar e Instalar

- [ ] Clonar repositório
- [ ] Executar `npm install`
- [ ] Verificar se não há erros

```bash
git clone <URL>
cd artesanaio
npm install
```

### Passo 3: Contas Externas Necessárias

- [ ] Conta Mercado Pago (sandbox para teste)
  - Link: https://www.mercadopago.com.br/developers
  - Copiar: Access Token

- [ ] Conta Melhor Envio
  - Link: https://www.melhorenvio.com.br
  - Copiar: Token de API

- [ ] Banco de Dados PostgreSQL
  - Opção A: Local (postgresql://localhost:5432/artesanaio)
  - Opção B: Online (Supabase, Railway, Render, etc)

### Passo 4: Criar .env

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com seus valores
nano .env  # ou use seu editor favorito
```

**Obrigatoriamente preencher:**
- `DATABASE_URL`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MELHOR_ENVIO_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

### Passo 5: Configurar Banco de Dados

```bash
# Instalar Prisma CLI globalmente (opcional)
npm install -g prisma

# Gerar Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate deploy

# (Opcional) Abrir Prisma Studio para ver dados
npx prisma studio
```

### Passo 6: Rodar em Desenvolvimento

```bash
npm run dev
```

Acessar: http://localhost:3000

---

## ⚠️ Problemas Comuns

### Problema 1: "DATABASE_URL is missing"

**Sintoma:**
```
Error: DATABASE_URL is missing
```

**Solução:**
1. Verificar se arquivo `.env` existe na raiz
2. Verificar se `DATABASE_URL` está preenchida
3. Testar conexão com banco:
   ```bash
   psql postgresql://user:pass@localhost:5432/artesanaio
   ```

---

### Problema 2: "Prisma Client not found"

**Sintoma:**
```
Error: @prisma/client not found
```

**Solução:**
```bash
# Regenerar Prisma Client
npx prisma generate

# Ou instalar dependências novamente
rm -rf node_modules package-lock.json
npm install
```

---

### Problema 3: "Migration failed"

**Sintoma:**
```
Error: Migração falhou
```

**Solução - Opção 1: Apenas aplicar migrações existentes**
```bash
npx prisma migrate deploy
```

**Solução - Opção 2: Resetar banco (apenas desenvolvimento)**
```bash
# ⚠️  AVISO: Apaga todos os dados!
npx prisma migrate reset
```

---

### Problema 4: "Cannot find module 'mercadopago'"

**Sintoma:**
```
Error: Cannot find module 'mercadopago'
```

**Solução:**
```bash
npm install
npm run build
```

---

### Problema 5: "next/font error"

**Sintoma:**
```
Error loading fonts from Vercel
```

**Solução:**
Este é um aviso que pode ser ignorado em desenvolvimento. Para remover:

Editar `src/app/layout.tsx` e remover/comentar import de fontes externas.

---

### Problema 6: "CEP fixo no frete"

**Sintoma:**
Frete sempre calcula para CEP `25935506`

**Localização:**
`src/app/api/frete/route.ts` linha 26

**Solução:**
```typescript
// Antes:
from: { postal_code: '25935506' },

// Depois:
from: { postal_code: process.env.STORE_CEP_ORIGIN || '25935506' },
```

Adicionar no `.env`:
```
STORE_CEP_ORIGIN=25935506
```

---

## 🔍 Debug Tips

### Ativar Logs no Prisma

Adicionar ao `.env`:
```
DEBUG="prisma:*"
```

Rodar:
```bash
npm run dev
```

---

### Testar API de Frete

```bash
curl -X POST http://localhost:3000/api/frete \
  -H "Content-Type: application/json" \
  -d '{
    "cepDestino": "20040020",
    "quantidade": 1
  }'
```

---

### Testar API de Pedidos

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "1",
        "name": "Camiseta",
        "quantity": 1,
        "price": 50.00,
        "size": {"name": "M"},
        "color": {"name": "Azul"}
      }
    ],
    "fullName": "Teste",
    "email": "teste@email.com",
    "cpf": "12345678900",
    "phone": "11999999999",
    "address": {"street": "Rua A", "number": "123"}
  }'
```

---

## 📊 Ver Dados do Banco

### Usando Prisma Studio

```bash
npx prisma studio
```

Abre interface gráfica em http://localhost:5555

### Usando SQL direto

```bash
psql postgresql://user:pass@localhost:5432/artesanaio

# Listar tabelas
\dt

# Ver produtos
SELECT * FROM "Product";

# Ver pedidos
SELECT * FROM "Order";
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Fazer push para GitHub
2. Conectar repo em https://vercel.com
3. Adicionar variáveis de ambiente no painel
4. Deploy automático

### Railway

1. Conectar GitHub repo
2. Adicionar variáveis de ambiente
3. Deploy

### Render

1. New → Web Service
2. Conectar GitHub
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Adicionar variáveis de ambiente

---

## 🔒 Segurança em Produção

### Checklist

- [ ] `.env` não está em git (verifique `.gitignore`)
- [ ] Usar tokens diferentes para sandbox/production
- [ ] `DATABASE_URL` usa senha forte
- [ ] `NEXT_PUBLIC_*` não contém segredos
- [ ] CORS está configurado corretamente
- [ ] Rate limiting implementado (futuro)

### Exemplo .gitignore

```
.env
.env.local
.env.development.local
.env.production.local
node_modules/
.next/
dist/
```

---

## 📞 Suporte

Se algo não funcionar:

1. Verificar este guia
2. Ler erro completo (não só a primeira linha)
3. Verificar logs: `npm run dev` com output completo
4. Testar com cURL
5. Abrir issue com: erro + versão node + versão npm
