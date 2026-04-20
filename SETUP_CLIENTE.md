# SETUP CLIENTE

## 1. Variáveis de Ambiente (.env.local)

```env
# URL da loja
NEXT_PUBLIC_SITE_URL="https://dominio-cliente.com.br"

# Banco de dados
DATABASE_URL="postgresql://user:password@host:5432/dbname"
POSTGRES_URL="postgresql://user:password@host:5432/dbname"
PRISMA_DATABASE_URL="postgresql://user:password@host:5432/dbname"

# JWT
AUTH_JWT_SECRET="seu_jwt_secret_aqui"

# Setup
SETUP_ADMIN_KEY="chave_aleatoria_forte"

# Cloudinary (imagens)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_UPLOAD_PRESET="seu_upload_preset"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# Asaas (pagamentos)
ASAAS_API_KEY="chave_asaas"
ASAAS_WALLET_ID="wallet_id_asaas"
ASAAS_ENV="production"

# Mercado Pago (pagamentos)
MERCADO_PAGO_PUBLIC_KEY="chave_publica_mp"
MERCADO_PAGO_ACCESS_TOKEN="token_acesso_mp"

# Melhor Envio (frete)
MELHOR_ENVIO_TOKEN="token_melhor_envio"
```

## 2. Gerar AUTH_JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiar e colar na variável `AUTH_JWT_SECRET`.

## 3. Configurar Asaas

✔️ Acesso: https://asaas.com/  
✔️ Criar conta / login  
✔️ Dashboard → Configurações → API  
✔️ Copiar chaves:
  - `ASAAS_API_KEY` (chave da API)
  - `ASAAS_WALLET_ID` (ID da carteira)
  - `ASAAS_ENV` = "production" ou "sandbox"

⚠️ **NÃO compartilhar `ASAAS_API_KEY`**

## 4. Configurar Banco de Dados

```bash
# 1. Criar database na sua infra
# PostgreSQL recomendado

# 2. Adicionar conexão em .env.local
DATABASE_URL="postgresql://..."

# 3. Rodar migrations
npx prisma migrate deploy

# 4. Verificar estrutura
npx prisma studio
```

## 5. Criar Admin

⚠️ **Fazer APENAS UMA VEZ por cliente**

```bash
# 1. URL
POST /api/setup-admin

# 2. Body
{
  "email": "admin@cliente.com",
  "password": "senha_forte_aleatorio",
  "setupKey": "valor_de_SETUP_ADMIN_KEY"
}

# 3. Resposta esperada
{ "success": true }

# 4. Apagar SETUP_ADMIN_KEY após usar
```

## 6. Trocar Cores da Loja

📁 **Arquivo**: `tailwind.config.ts`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#NOVO_COR_PRIMARIA',
      secondary: '#NOVO_COR_SECUNDARIA',
      accent: '#NOVO_COR_DESTAQUE',
    }
  }
}
```

📁 **Arquivo**: `src/app/globals.css`

```css
:root {
  --primary: #NOVO_COR_PRIMARIA;
  --secondary: #NOVO_COR_SECUNDARIA;
  --accent: #NOVO_COR_DESTAQUE;
}
```

✔️ Salvar → Rebuild automático

## 7. Trocar Nome e Logo

| O quê | Onde | Como |
|-------|------|------|
| **Nome loja** | `src/components/Header.tsx` | Buscar `NOME_LOJA` |
| **Logo** | `public/assets/` | Substituir `logo.png` |
| **Nome em meta** | `src/app/(site)/layout.tsx` | Alterar `title` e `description` |

✔️ Logo precisa estar em: `public/assets/logo.png` (SVG ou PNG)

## 8. Teste Rápido (Fluxo PIX)

1. ✔️ Acessar: `http://localhost:3000`
2. ✔️ Adicionar produto ao carrinho
3. ✔️ Ir ao checkout
4. ✔️ Selecionar PIX como método
5. ✔️ Completar compra
6. ✔️ Verificar em: `/api/webhook-asaas` se webhook chegou

⚠️ **Modo teste**: Asaas tem ambiente sandbox (usar se disponível)

## 9. Deploy Vercel

```bash
# 1. Fazer push no GitHub
git push

# 2. Conectar repo na Vercel
# Dashboard → New Project → GitHub repo

# 3. Variáveis de ambiente
Vercel → Settings → Environment Variables → Adicionar todas de .env.local

# 4. Deploy automático
# Cada push em main faz deploy

# 5. Verificar saúde
https://dominio-cliente.vercel.app
```

⚠️ **Não committar .env.local**

## 10. Checklist Final

- ✔️ `.env.local` preenchido com todas variáveis
- ✔️ Database conectada e migrations rodadas
- ✔️ Admin criado via `/api/setup-admin`
- ✔️ Asaas configurado (chaves testadas)
- ✔️ Cores alteradas em `tailwind.config.ts`
- ✔️ Logo substituída em `public/assets/`
- ✔️ Nome da loja atualizado nos componentes
- ✔️ Teste PIX funcionando
- ✔️ Webhook Asaas respondendo
- ✔️ Deploy na Vercel com variáveis corretas
- ✔️ SSL/HTTPS ativo
- ✔️ `SETUP_ADMIN_KEY` removida das variáveis após setup
- ✔️ `ASAAS_SECRET_KEY` e tokens não estão no GitHub
