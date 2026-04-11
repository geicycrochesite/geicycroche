# ⚡ Ação Rápida: Corrigir Upload do Cloudinary

## 🎯 O Que Mudou

Reescrevi completamente a integração Cloudinary para suportar corretamente tanto uploads **unsigned** quanto **signed**.

### Problemas Corrigidos

1. ❌ **api_key era incluído na assinatura** → ✅ Agora removido
2. ❌ **Misturava métodos signed/unsigned** → ✅ Agora detecta automaticamente
3. ❌ **Sem debug logging** → ✅ Agora mostra tudo em desenvolvimento

---

## 📋 Passos para Resolver

### Passo 1: Escolher o Modo

#### **OPÇÃO A: Unsigned (RECOMENDADO)**
✅ Mais simples
✅ Sem exposição de secrets
✅ Menos erros

- Ir para Cloudinary Dashboard
- Settings > Upload
- Seu preset `serena_dev_upload_test`
- Certifique-se que Mode = **"Unsigned"**
- Salvar

#### **OPÇÃO B: Signed**
- Ir para Cloudinary Dashboard
- Settings > Upload
- Seu preset `serena_dev_upload_test`
- Mode = **"Signed"**
- Salvar

### Passo 2: Configurar `.env.local`

#### Se escolheu **UNSIGNED**:
```env
CLOUDINARY_CLOUD_NAME="dz637qfrb"
CLOUDINARY_UPLOAD_PRESET="serena_dev_upload_test"
```

#### Se escolheu **SIGNED**:
```env
CLOUDINARY_CLOUD_NAME="dz637qfrb"
CLOUDINARY_UPLOAD_PRESET="serena_dev_upload_test"
CLOUDINARY_API_KEY="399253697118751"
CLOUDINARY_API_SECRET="OrWtemawQino35wW69fH-n4E8Jc"
```

### Passo 3: Testar

```bash
npm run dev
```

Nas DevTools (F12) > Console do navegador:
- Vá para `/admin/products/new`
- Selecione imagem
- Clique "Enviar imagens"

No terminal onde rodou `npm run dev`, procure por **`[Cloudinary Debug]`** para ver exatamente o que está sendo enviado.

---

## 📊 Comparação: Antes vs. Depois

### ❌ ANTES (Errado)
```
Assinatura incluía: api_key, public_id, timestamp, upload_preset
String to Sign: "api_key=...&public_id=...&timestamp=...&upload_preset=..."
Resultado: 401 Invalid Signature
```

### ✅ DEPOIS (Correto)
```
Assinatura inclui: public_id, timestamp, upload_preset
String to Sign: "public_id=...&timestamp=...&upload_preset=..."
Resultado: Signed upload funciona ✅
```

ou (sem assinatura)
```
Payload: file + upload_preset
Sem signature, sem api_key
Resultado: Unsigned upload funciona ✅
```

---

## 🐛 Se Ainda Tiver Erro

### Erro 401
- Verifique modo do preset (Unsigned vs Signed)
- Veja logs em `[Cloudinary Debug]`
- Copie a String to Sign e valide alfabeticamente

### Erro "Upload preset must be whitelisted"
- Preset está Signed mas você não configurou API keys
- **Solução:** Mude preset para Unsigned (recomendado)

### Erro "Missing required parameter"
- Preset requer autenticação
- Certifique-se que `API_KEY` e `API_SECRET` estão corretos

---

## 📚 Mais Detalhes

Veja:
- [`CLOUDINARY_SETUP.md`](./CLOUDINARY_SETUP.md) - Setup completo
- [`CLOUDINARY_SIGNATURE_FIX.md`](./CLOUDINARY_SIGNATURE_FIX.md) - Análise técnica do erro

---

## ✅ Checklist

- [ ] Escolhi se vou usar Unsigned ou Signed
- [ ] Configurei o preset no Cloudinary com o modo correto
- [ ] Atualizei `.env.local` com as variáveis certos
- [ ] Iniciei servidor com `npm run dev`
- [ ] Testei upload em `/admin/products/new`
- [ ] Vi logs `[Cloudinary Debug]` no terminal
- [ ] Upload funcionou! 🎉
