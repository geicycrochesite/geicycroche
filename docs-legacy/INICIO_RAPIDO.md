# ⚡ Início Rápido - Meus Pedidos

**5 minutos para validar as correções**

---

## 🚀 Passo 1: Inicie o Projeto

```bash
cd d:\Dev\ Sistemas\geicycroche
npm run dev
```

Aguarde o build completar. Você verá:
```
> next dev
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
```

---

## 🔍 Passo 2: Acesse a Página

Abra no navegador:
```
http://localhost:3000/loja/meus-pedidos
```

Você verá um formulário limpo com título "Consultar Meus Pedidos"

---

## 📝 Passo 3: Busque um Pedido

### Opção A: Com Dados Reais

1. Abra outro terminal e execute:
```bash
npx prisma studio
```

2. Vá para a tabela `Order` e copie:
   - Um `email` que existe
   - Um `cpf` que existe

3. Volte para a página `/loja/meus-pedidos`
4. Cole o email e CPF
5. Clique "Buscar pedidos"

### Opção B: Teste Rápido (sem dados reais)

```javascript
// Console do navegador (F12)
// Simule um pedido
const email = 'teste@teste.com'
const cpf = '123.456.789-10'
// Formule vai falhar, mas você verá "Nenhum pedido encontrado"
// (Mensagem amigável = ✅ Funciona)
```

---

## ✅ Passo 4: Validar Cada Correção

### 1. ✅ Total sem erro `toFixed`

**Procure por:**
- Console limpo (sem errors vermelhos)
- Total exibido com formato: `R$ 99,90` (com vírgula, não ponto)

**Se quebrar:**
```
❌ "pedido.total.toFixed is not a function"
```

**Se corrigido:**
```
✅ "R$ 1.234,56" ou similar
```

---

### 2. ✅ Sem Hydration Mismatch

**Procure por:**
- Console sem warnings como:
  - "Hydration mismatch"
  - "Did not expect server"

**Teste:**
```
1. Busque um pedido (data fica: 15/01/2025 10:30)
2. Recarregue (F5)
3. Busque o mesmo pedido
4. Data deve ser IDÊNTICA (não mudar)
```

---

### 3. ✅ Layout Bonito

**Verifique:**
- [ ] Formulário com espaçamento bom
- [ ] Cards de pedidos com sombra
- [ ] Total em destaque (azul)
- [ ] Status com cores (verde, amarelo, etc)
- [ ] Botão "Ver detalhes" legível

**Teste responsivo:**
```
1. F12 → Toggle Device Toolbar
2. Teste em iPhone (375px)
3. Teste em iPad (768px)
4. Teste em Desktop (1920px)
```

---

### 4. ✅ Sem Imagens com Warning

**Status:** ✅ OK (nenhuma imagem nesta página)

---

### 5. ✅ Busca Validada

**Procure por:**
- [ ] Erro quando email/CPF inválidos
- [ ] Validação do formulário (não envia vazio)
- [ ] Mensagem de erro amigável (não técnica)

**Teste:**
```
1. Clique "Buscar" sem preencher nada
2. Deve mostrar "Email obrigatório"
```

---

## 📊 Resultado Final (esperado)

### Console (F12):
```
✅ Sem errors vermelhos
✅ Sem warnings de Hydration
✅ Apenas logs de informação (normais)
```

### Page:
```
✅ Título e descrição
✅ Formulário validado
✅ Pedidos exibidos corretamente
✅ Total formatado como "R$ XX,XX"
✅ Data formatada como "DD/MM/YYYY HH:MM"
✅ Status com cores
✅ Layout responsivo
```

### Network (DevTools → Network):
```
✅ POST /api/orders/find - 200 OK
✅ Resposta com array de pedidos
✅ Total em formato string (Decimal do Prisma)
```

---

## 🎯 Checklist Rápido (2 min)

```
□ Acesso a /loja/meus-pedidos OK
□ Formulário valida email
□ Formulário valida CPF
□ Busca retorna pedidos (ou mensagem amigável)
□ Total: "R$ 99,90" (não quebra com toFixed)
□ Data: "DD/MM/YYYY HH:MM" (não muda com reload)
□ Console: ZERO hydration warnings
□ Layout: Responsivo em mobile/tablet/desktop
□ Botão "Ver detalhes": Navega corretamente
```

Se **TODOS** com ☑️ = **✅ SUCESSO**

---

## 🐛 Se Algo Quebrar

### Erro: `toFixed is not a function`

```javascript
// ❌ Ainda quebra?
// Abra: src/components/OrderCard.tsx
// Procure por: function formatTotal
// Certifique-se que converte para número ANTES de chamar .toFixed()
```

### Erro: Hydration Mismatch

```javascript
// ❌ Aviso no console?
// Abra: src/components/OrderCard.tsx
// Procure por: function formatData
// Certifique-se que usa toLocaleDateString com options (não toLocaleString)
```

### Erro: API não retorna dados

```bash
# Teste direto com cURL
curl -X POST http://localhost:3000/api/orders/find \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","cpf":"123.456.789-10"}'

# Deve retornar:
# [{"id":"...","statusPagamento":"...","total":"99.90","createdAt":"..."}]
```

---

## 📚 Documentação Completa

Se precisar entender melhor:

1. **Resumo executivo:**
   → [README_MEUS_PEDIDOS.md](README_MEUS_PEDIDOS.md)

2. **Detalhes técnicos:**
   → [MEUS_PEDIDOS_FIXES.md](MEUS_PEDIDOS_FIXES.md)

3. **Como reutilizar:**
   → [GUIA_USO_COMPONENTES.md](GUIA_USO_COMPONENTES.md)

4. **Testes completos (17):**
   → [CHECKLIST_TESTES.md](CHECKLIST_TESTES.md)

5. **Boas práticas Next.js:**
   → [HYDRATION_MISMATCH_GUIDE.md](HYDRATION_MISMATCH_GUIDE.md)

6. **Aplicar padrão em outras páginas:**
   → [APLICAR_PADRAO_OUTRAS_PAGINAS.md](APLICAR_PADRAO_OUTRAS_PAGINAS.md)

---

## 💬 Resumo do que foi feito

### ✅ Corrigido

| Problema | Solução | Arquivo |
|----------|---------|---------|
| `total.toFixed is not a function` | `formatTotal()` converte string→número | `src/components/OrderCard.tsx` |
| Hydration mismatch | `formatData()` determinístico | `src/components/OrderCard.tsx` |
| Layout inconsistente | Tailwind + grid responsivo | `src/app/(site)/loja/meus-pedidos/page.tsx` |
| Busca sem validação | `useBuscaPedidos()` com validação | `src/lib/hooks/useBuscaPedidos.ts` |
| Código complexo | Componentes + hooks reutilizáveis | `src/components/OrderCard.tsx` |

### 🆕 Criado

1. **Tipos**: `src/types/order.ts`
2. **Hook**: `src/lib/hooks/useBuscaPedidos.ts`
3. **Componente**: `src/components/OrderCard.tsx`
4. **Documentação**: 6 arquivos `.md`

### 🔄 Refatorado

- `src/app/(site)/loja/meus-pedidos/page.tsx` (mais limpo e seguro)

---

## 🎉 Próximo?

Depois de validar:

1. ✅ Execute todos os **17 testes** em [CHECKLIST_TESTES.md](CHECKLIST_TESTES.md)
2. ✅ Aplique o mesmo padrão em `/loja/pedido/[id]` (página de detalhes)
3. ✅ Considere aplicar em outras páginas (admin, etc)

---

## 📞 Suporte Rápido

**Pergunta:** Como saber se foi bem?
**Resposta:** Se checklist acima passar = ✅ Tudo certo

**Pergunta:** Posso usar em outro lugar?
**Resposta:** Sim! Veja [GUIA_USO_COMPONENTES.md](GUIA_USO_COMPONENTES.md)

**Pergunta:** Por que formatData() é importante?
**Resposta:** Sem ela, Next.js reclama de hydration mismatch (server renderiza diferente do client)

---

**Pronto? Inicie em 2 minutos! 🚀**

```bash
npm run dev
# Abra: http://localhost:3000/loja/meus-pedidos
# Busque um pedido
# Verifique: Total correto, sem errors, sem warnings
```

---

**Data:** 17 de Abril de 2026
**Status:** ✅ Pronto para uso
**Tempo estimado de validação:** 5-10 minutos
