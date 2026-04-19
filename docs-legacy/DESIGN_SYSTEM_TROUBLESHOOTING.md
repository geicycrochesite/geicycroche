# 🆘 Design System - Troubleshooting & FAQ

**Problemas comuns e como resolvê-los**

---

## ❓ FAQ Rápido

### P: Qual classe uso para X?
**R:** Consulte `DESIGN_SYSTEM_QUICK_REFERENCE.md` (2 min)

### P: Tenho um caso de uso não coberto
**R:** Veja se é realmente único → `DESIGN_SYSTEM_EXEMPLOS.md`

### P: Preciso adicionar uma cor nova?
**R:** **NÃO.** Verifique se existe uma já: `--color-*`

### P: Qual a diferença entre .card e .card-compact?
**R:** `.card` = normal (6px padding), `.card-compact` = pequeno (4px padding)

### P: Como faço um botão azul?
**R:** Use `.btn-primary` (que já é azul/accent do design)

### P: Posso usar Tailwind classes diretamente?
**R:** Sim, mas prefira as do design system (`.btn`, `.card`, etc)

---

## 🐛 Problemas Comuns

### 1. "Meu botão não fica do tamanho certo"

**Problema:**
```tsx
❌ <button className="btn btn-md px-10 py-4">Clique</button>
```

**Solução:**
```tsx
✅ <button className="btn btn-lg">Clique</button>
```

**Por quê:** Use `.btn-sm`, `.btn-md`, ou `.btn-lg` - não adicione padding extra.

---

### 2. "Meu input aparece com a borda errada"

**Problema:**
```tsx
❌ <input className="input border-blue-600" />
```

**Solução:**
```tsx
✅ <input className="input" />
```

**Por quê:** `.input` já tem borda padronizada. Se precisa destacar erro:
```tsx
✅ <input className="input input-error" />
```

---

### 3. "Como faço um card com fundo diferente?"

**Problema:**
```tsx
❌ <div className="card bg-blue-100">Conteúdo</div>
```

**Solução:**
```tsx
✅ <div className="card-flat">Conteúdo</div>
{/* ou */}
✅ <div className="card" style={{ background: 'var(--color-bg-tertiary)' }}>
```

**Variações disponíveis:**
- `.card` = Card padrão
- `.card-compact` = Card compacto
- `.card-flat` = Fundo tertiary (mais sutil)

---

### 4. "Espaçamento não fica consistente"

**Problema:**
```tsx
❌ <div className="mb-7 mt-11 px-9">Conteúdo</div>
```

**Solução:**
```tsx
✅ <div className="mb-4 mt-4 px-4">Conteúdo</div>
```

**Escala permitida:** xs (4px), sm (8px), md (16px), lg (24px), xl (32px)

Use múltiplos:
- mb-4 = 16px
- mb-8 = 32px (mb-4 × 2)
- mb-12 = 48px (mb-4 × 3)

---

### 5. "Meu texto fica com tamanho errado"

**Problema:**
```tsx
❌ <h2 className="text-3xl font-bold">Título</h2>
```

**Solução:**
```tsx
✅ <h2 className="h2">Título</h2>
```

**Hierarquia:**
- `.h1` = Título principal
- `.h2` = Subtítulo
- `.h3` = Seção
- `.h4` = Sub-seção
- `.text-body` = Parágrafo normal
- `.text-secondary` = Descrição
- `.text-muted` = Pequeno texto

---

### 6. "O grid fica desalinhado em mobile"

**Problema:**
```tsx
❌ <div className="grid grid-cols-3 gap-4">
  {items.map(...)}
</div>
```

**Solução:**
```tsx
✅ <div className="grid-cols-1-responsive gap-4">
  {items.map(...)}
</div>
```

**O que faz:**
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas

---

### 7. "Cores não ficam vivas/consistentes"

**Problema:**
```tsx
❌ <div className="bg-red-600 text-blue-400">Alerta</div>
```

**Solução:**
```tsx
✅ <div className="alert alert-error">Alerta</div>
```

**Por quê:** Cores devem vir de `.alert`, `.badge`, ou `var(--color-*)`

---

### 8. "Preciso de um componente novo"

**Antes de criar um novo:**

1. Verificar se existe combinação de classes que faz:
   ```tsx
   ✅ <div className="card card-compact">Pequeno</div>
   ```

2. Se não existe, criar em `design-system.css`:
   ```css
   .card-mini {
     @apply rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-2;
   }
   ```

3. Usar a nova classe:
   ```tsx
   ✅ <div className="card-mini">Ultra pequeno</div>
   ```

---

### 9. "Meu component fica com estilo diferente em mobile/desktop"

**Problema:**
```tsx
❌ <div className="p-6 md:p-12">Conteúdo</div>
```

**Solução:**
```tsx
✅ <div className="page-wrapper">
  <div className="container-standard">Conteúdo</div>
</div>
```

**Por quê:** `page-wrapper` e `container-*` já resolvem responsividade.

---

### 10. "Preciso usar uma cor fora da paleta"

**PARE!** Primeiro, considere:

- [ ] Existe uma cor similar na paleta?
- [ ] Posso usar `.alert`, `.badge` com cores existentes?
- [ ] Essa cor é realmente necessária?

**Se SIM em todos os casos:**
1. Edite `src/app/globals.css`
2. Adicione a nova cor em `:root {}`
3. Use como: `className="text-[var(--color-nova)]"`

**IMPORTANTE:** Documente por que a nova cor era necessária.

---

## 🔧 Como Debugar

### Checklist de Debug

```
[ ] A classe está escrita certo? (sem typos)
[ ] O arquivo design-system.css está importado em globals.css?
[ ] O build recompilou após mudanças?
[ ] Não há conflito com outra classe?
[ ] Verificou no DevTools qual classe está aplicada?
```

### No DevTools do Navegador

1. Inspecione o elemento (F12)
2. Veja qual classe está aplicada
3. Procure por conflitos (classe sendo sobrescrita)
4. Verifique se `design-system.css` está carregado

### Comando para Buscar

```bash
# Buscar onde .card é usado
grep -r "className.*card" src/

# Buscar cores aleatórias
grep -r "bg-\[#\|text-\[#\|bg-red\|bg-blue" src/

# Buscar padding/margin aleatórios
grep -r "mb-[789]\|px-[789]\|py-[789]" src/
```

---

## 📖 Quando Consultar Cada Doc

| Situação | Documento |
|----------|-----------|
| Estou começando | `DESIGN_SYSTEM_QUICK_REFERENCE.md` |
| Quero aprender tudo | `DESIGN_SYSTEM.md` |
| Preciso de exemplo | `DESIGN_SYSTEM_EXEMPLOS.md` |
| Estou debugando | Este arquivo |
| Preciso do status | `IMPLEMENTATION_STATUS.md` |
| Quero o código | `src/styles/design-system.css` |

---

## 💬 Padrões de Menssagem de Erro

### Se encontrar erro por falta de classe:

```
❌ TypeError: Cannot read property 'color' of undefined

Dica: Verifique se a classe .btn está importada
Local: src/components/MyButton.tsx
Solução: Certifique-se que design-system.css é importado em globals.css
```

### Se estilos não aplicarem:

```
❌ Estilos não aparecem

Checklist:
1. Classe está escrita certo?
2. CSS foi recompilado? (yarn build)
3. Navegador foi atualizado? (Ctrl+Shift+R)
4. Não há typo em design-system.css?
5. A classe é @apply ou classe regular?
```

---

## 🎯 Princípios ao Resolver Problemas

### 1. **Primeira escolha: Use uma classe existente**
```tsx
❌ Criar novo estilo
✅ Usar .card, .btn, .input
```

### 2. **Segunda escolha: Combine classes**
```tsx
❌ Criar novo componente
✅ Usar .card + .card-compact
```

### 3. **Terceira escolha: Tailwind direto**
```tsx
❌ Criar novo arquivo CSS
✅ Usar classes Tailwind
```

### 4. **Última escolha: Adicionar em design-system.css**
```tsx
❌ Estilo inline
✅ Adicionar em design-system.css (e documentar por quê)
```

---

## 📞 Quando Pedir Ajuda

Você não precisa resolver sozinho se:

- [ ] Encontrou um bug no design system
- [ ] Uma classe não funciona como esperado
- [ ] Precisa adicionar novo padrão
- [ ] Quer revisar sua implementação

**Por favor, sempre mencione:**
1. Qual é o problema exato?
2. Qual classe/componente afeta?
3. Qual era o esperado vs. resultado?
4. Arquivo e linha (se possível)

---

**Última atualização:** 17 de Abril de 2026
**Versão:** 1.0
