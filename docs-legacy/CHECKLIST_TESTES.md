# ✅ Checklist de Testes e Validação

## 📋 Pré-requisitos

Antes de testar, certifique-se que:

- [ ] Projeto está rodando localmente (`npm run dev`)
- [ ] Banco de dados tem pelo menos 1 pedido no teste
- [ ] API `/api/orders/find` está funcionando
- [ ] `.env.local` está configurado corretamente

---

## 🧪 Testes Funcionais

### 1️⃣ Teste: Busca sem resultados

**Passos:**
1. Acesse `http://localhost:3000/loja/meus-pedidos`
2. Digite email e CPF que não existem no banco
3. Clique "Buscar pedidos"

**Resultado esperado:**
- [ ] Loading spinner aparece enquanto busca
- [ ] Mensagem: "Nenhum pedido encontrado com esses dados"
- [ ] Nenhum pedido é exibido
- [ ] Sem erros no console

---

### 2️⃣ Teste: Busca com sucesso

**Preparação:**
1. Verifique um email e CPF de um pedido existente no banco:
   ```bash
   # No terminal, abra Prisma Studio
   npx prisma studio
   # Ou veja na tabela Order
   ```

**Passos:**
1. Acesse `http://localhost:3000/loja/meus-pedidos`
2. Digite email e CPF existentes
3. Clique "Buscar pedidos"

**Resultado esperado:**
- [ ] Loading spinner aparece
- [ ] Depois de ~1-2s, pedidos aparecem
- [ ] Cada pedido tem:
  - [ ] ID do pedido (monospace font)
  - [ ] Badge de status (✓ Aprovado / ⏳ Pendente / etc)
  - [ ] Total em formato **R$ XX,XX** (não com ponto)
  - [ ] Data em formato **DD/MM/YYYY HH:MM**
  - [ ] Botão "Ver detalhes completos →"
- [ ] Contagem de pedidos é correta
- [ ] Sem erros no console

---

### 3️⃣ Teste: Validação de Formulário

**Passos:**
1. Acesse `http://localhost:3000/loja/meus-pedidos`
2. Tente enviar sem preencher nada
3. Clique "Buscar pedidos"

**Resultado esperado:**
- [ ] Formulário não envia
- [ ] Mensagens de erro aparecem:
  - [ ] "Email inválido" (se email vazio ou inválido)
  - [ ] "CPF obrigatório" (se CPF vazio)
- [ ] Sem requisição à API

---

### 4️⃣ Teste: Navegação para Detalhes

**Passos:**
1. Após encontrar pedidos (teste 2️⃣)
2. Clique no botão "Ver detalhes completos →"

**Resultado esperado:**
- [ ] Navega para `/loja/pedido/[id]` com o ID correto
- [ ] Página de detalhes carrega
- [ ] Sem erros de navegação

---

### 5️⃣ Teste: Formatação de Total

**Verificação crítica:**

```javascript
// Abra o DevTools (F12) → Console
// Rode este código:

// Teste 1: String
JSON.parse('{"total": "99.90"}').total.toFixed(2)
// ❌ ERRO: toFixed is not a function (era o bug original)

// Agora teste na página:
// Abra Network tab, busque um pedido
// Verifique que o total aparece como "R$ 99,90"
// (não "R$ 99.90" com ponto)
```

**Resultado esperado:**
- [ ] Nenhum erro `toFixed is not a function` no console
- [ ] Total exibe com formato correto (vírgula, não ponto)
- [ ] Ex: ✅ "R$ 1.234,56" (não ❌ "R$ 1,234.56")

---

## 🔍 Testes de Hydration Mismatch

### 6️⃣ Verificar Warnings

**Passos:**
1. Abra DevTools (F12)
2. Vá para Console
3. Busque por pedidos
4. Procure por warnings como:
   - "Hydration mismatch"
   - "Did not expect server HTML to contain"

**Resultado esperado:**
- [ ] **ZERO warnings** de hydration mismatch
- [ ] Console limpo após busca

---

### 7️⃣ Teste: Hora é Consistente

**Passos:**
1. Abra DevTools → Network
2. Busque um pedido
3. Observe o timestamp no card
4. Recarregue a página (F5)
5. Busque o mesmo pedido novamente

**Resultado esperado:**
- [ ] Data do pedido é **SEMPRE a mesma** (não varia com reload)
- [ ] Exemplo: "15/01/2025 10:30" sempre igual

---

## 🎨 Testes de Layout

### 8️⃣ Desktop (1920px+)

**Passos:**
1. Redimensione navegador para 1920px de largura
2. Busque vários pedidos

**Resultado esperado:**
- [ ] Título e descrição com tamanho apropriado
- [ ] Formulário centrado e bem espaçado
- [ ] Cards de pedidos com layout grid correto:
  - [ ] ID e Status lado a lado no topo
  - [ ] Total e Data em 2 colunas iguais
  - [ ] Botão "Ver detalhes" visível
- [ ] Espaçamento e margens corretos
- [ ] Sem quebra de elementos

---

### 9️⃣ Tablet (768px)

**Passos:**
1. Redimensione navegador para 768px (ou use F12 → toggle device toolbar)
2. Busque um pedido

**Resultado esperado:**
- [ ] Layout se ajusta bem
- [ ] Elementos ainda legíveis
- [ ] Sem overflow horizontal
- [ ] Cards respondem bem

---

### 🔟 Mobile (375px)

**Passos:**
1. Redimensione para 375px ou use iPhone simulado no F12
2. Busque um pedido

**Resultado esperado:**
- [ ] Formulário é ótimo em mobile
- [ ] Labels visíveis
- [ ] Botão "Buscar" ocupa toda largura
- [ ] Cards empilham bem
- [ ] ID do pedido não fica cortado (quebra em linhas)
- [ ] Status badge não fica cortado
- [ ] Data e Total em 2 colunas compactas
- [ ] Botão "Ver detalhes" clicável (>44px height)

---

## 🎯 Testes de Cores/Status

### 1️1️⃣ Status Badge Colors

**Visualizar cada cor:**

1. Crie ou encontre pedidos com cada status:
   - `approved`
   - `pending`
   - `failed`
   - `refunded`
   - Algum outro status

**Resultado esperado:**
- [ ] ✅ Approved = Verde claro com texto verde escuro
- [ ] ⏳ Pending = Amarelo claro com texto amarelo escuro
- [ ] ✗ Failed = Vermelho claro com texto vermelho escuro
- [ ] ↩️ Refunded = Azul claro com texto azul escuro
- [ ] Status desconhecido = Cinza claro com texto cinza escuro

---

## 📊 Testes de Performance

### 1️2️⃣ Velocidade de Busca

**Passos:**
1. Abra DevTools → Network
2. Busque pedidos
3. Note o tempo de resposta

**Resultado esperado:**
- [ ] Requisição para `/api/orders/find` < 500ms
- [ ] Total load (com parsing) < 1000ms
- [ ] Página renderiza suavemente (sem lag)

---

### 1️3️⃣ Sem Erros JavaScript

**Passos:**
1. Abra DevTools → Console
2. Limpe todos os logs
3. Busque um pedido
4. Clique em "Ver detalhes"

**Resultado esperado:**
- [ ] **Zero erros vermelhos** no console
- [ ] Warnings: apenas Hydration (se houver) e debug info
- [ ] Aplicação funciona sem exceptions

---

## 🔐 Testes de Dados

### 1️4️⃣ Validação de Dados

**Passos:**
1. Abra DevTools → Network
2. Busque pedidos
3. Clique na requisição `/api/orders/find`
4. Veja a resposta

**Resultado esperado:**

Resposta JSON válida:
```json
[
  {
    "id": "string",
    "statusPagamento": "string | null",
    "total": "string (Decimal do Prisma)",
    "createdAt": "ISO string"
  }
]
```

- [ ] Cada campo está presente
- [ ] `total` é string (esperado do Prisma)
- [ ] `statusPagamento` pode ser null
- [ ] `createdAt` é ISO format válido

---

## 🚨 Testes de Erro

### 1️5️⃣ API retorna erro

**Preparação:**
1. Simule erro editando temporariamente a API
2. Ou desconecte o banco de dados

**Passos:**
1. Tente buscar um pedido

**Resultado esperado:**
- [ ] Mensagem de erro é exibida
- [ ] Não quebrá a página
- [ ] Botão "Buscar" continua funcional
- [ ] Usuário pode tentar novamente

---

### 1️6️⃣ Rede lenta/timeout

**Preparação:**
1. DevTools → Network → Throttle (Slow 3G)

**Passos:**
1. Busque um pedido
2. Veja o spinner enquanto carrega

**Resultado esperado:**
- [ ] Spinner aparece e continua girando
- [ ] Sem timeout/erro prematuro
- [ ] Após ~5-10s, dados aparecem (ou erro informativo)

---

## ✨ Testes Finais

### 1️7️⃣ Fluxo Completo do Usuário

**Passos (em sequência):**
1. Acesse `/loja/meus-pedidos`
2. Veja descrição clara
3. Preencha email e CPF
4. Clique "Buscar"
5. Veja pedidos
6. Clique "Ver detalhes" em um pedido
7. Chegue na página `/loja/pedido/[id]`
8. Volte (browser back)
9. Veja que os pedidos ainda estão na lista (estado não foi perdido)

**Resultado esperado:**
- [ ] Fluxo inteiro sem erros
- [ ] UX intuitiva
- [ ] Sem warnings/errors
- [ ] Transições suaves

---

## 📝 Relatório de Testes

Após completar os testes acima, preencha:

```
Data: _______________
Desenvolvedor: _______________

✅ Testes Passaram: ___ / 17 (total)

❌ Problemas Encontrados:
1. _______________
2. _______________
3. _______________

📝 Observações:
_______________
_______________
_______________

Assinado: _______________
```

---

## 🐛 Se encontrar bugs

1. **Hydration Mismatch**: Veja [HYDRATION_MISMATCH_GUIDE.md](HYDRATION_MISMATCH_GUIDE.md)
2. **Erro `toFixed is not a function`**: Verifique [src/components/OrderCard.tsx](src/components/OrderCard.tsx)
3. **Layout quebrado**: Inspecione CSS em DevTools → Elements
4. **API não retorna dados**: Teste direto com cURL/Postman:
   ```bash
   curl -X POST http://localhost:3000/api/orders/find \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","cpf":"123.456.789-10"}'
   ```

---

**Pronto para testar? 🚀**

Execute os testes acima e relata qualquer problema. O código foi refatorado para evitar os 5 problemas iniciais:

1. ✅ `toFixed is not a function` - Corrigido com conversão segura
2. ✅ Hydration mismatch - Eliminado com formatação determinística
3. ✅ CSS quebrado - Melhorado com Tailwind consistente
4. ✅ Imagens com warnings - Não aplicável (sem imagens na página)
5. ✅ Busca de pedidos - Validada e tipada corretamente
