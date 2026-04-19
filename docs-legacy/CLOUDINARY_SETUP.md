# ☁️ Configuração do Cloudinary

Para o upload de imagens funcionar corretamente, siga estes passos:

## 1. Criar conta no Cloudinary

Acesse [cloudinary.com](https://cloudinary.com) e crie uma conta gratuita.

## 2. Obter credenciais

Após criar a conta, vá para o Dashboard e copie:
- **Cloud Name**: Visível no topo do dashboard
- **API Key**: Settings > Access Keys
- **API Secret**: Settings > Access Keys

## 3. Configurar Upload Preset

1. Vá para Settings > Upload
2. Clique em "Add upload preset"
3. Configure:
   - **Name**: `artesanaio-products` (ou qualquer nome)
   - **Mode**: 
     - ✅ **RECOMENDADO: "Unsigned"** (mais simples para upload do cliente)
     - ⚠️ "Signed" (mais seguro, mas requer chaves do servidor)
   - **Folder**: `artesanaio/products` (opcional)
   - **Format**: `Auto` (mantém formato original)
   - **Allowed formats**: `jpg,png,jpeg,webp` (opcional)
   - **Max file size**: `10000000` (10MB)
   - **Max image width/height**: `2000` (opcional)

## 4. Configurar variáveis de ambiente

### Opção A: Upload Unsigned (RECOMENDADO)

Se seu preset está em modo **"Unsigned"**, adicione ao `.env.local`:

```env
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_UPLOAD_PRESET="artesanaio-products"
```

Você **NÃO precisa** de `CLOUDINARY_API_KEY` ou `CLOUDINARY_API_SECRET`.

### Opção B: Upload Signed

Se seu preset está em modo **"Signed"**, adicione tudo ao `.env.local`:

```env
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_UPLOAD_PRESET="artesanaio-products"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="sua-api-secret"
```

## 5. Testar

1. Inicie o servidor: `npm run dev`
2. Vá para Admin > Produtos > Novo produto
3. Tente fazer upload de uma imagem
4. Verifique o console (cmd/terminal) para logs de debug

## 🔧 Troubleshooting

### "Invalid Signature 401"
- Seu preset pode estar em modo "Signed" mas os parâmetros estão errados
- **Solução**: Mude o preset para "Unsigned" no Cloudinary
- Ou certifique-se que `API_KEY` e `API_SECRET` estão corretos

### "Upload preset must be whitelisted for unsigned uploads"
- Seu preset está em modo "Signed" mas está tentando upload unauthenticated
- **Solução**: Mude o preset para "Unsigned" (recomendado)

### "Missing required parameter - api_key"
- Seu preset requer assinatura mas as chaves não estão configuradas
- **Solução**: Adicione `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET` ao `.env.local`

### "Erro 401 Unauthorized"
- Verifique se `API_KEY` e `API_SECRET` estão corretos (copie exatamente do Cloudinary)
- Certifique-se que não há espaços ou quebras de linha nas variáveis

### Imagens não aparecem no formulário
- Verifique se o Cloud Name está correto
- Certifique-se que as imagens foram enviadas com sucesso
- Abra as DevTools (F12) > Console para ver erros

## 📊 Recomendação Final

**USE UPLOAD UNSIGNED (Opção A)**:
- ✅ Mais simples
- ✅ Sem exposição de API Secret
- ✅ Menos erros de autenticação
- ✅ Melhor para upload de cliente

O código detecta automaticamente se é unsigned ou signed e escolhe a estratégia correta.
