# 🎨 Design System - Guia Prático

**Data:** 17 de Abril de 2026
**Versão:** 1.0 (Estável)
**Status:** ✅ Pronto para uso

---

## 🎯 Por que existe este Design System?

Para que **toda a interface** tenha um visual **consistente** sem que cada página precise "inventar" seu próprio estilo.

**Resultado:** Menos inconsistência, mais reutilização, desenvolvimento mais rápido.

---

## 📁 Onde estão os estilos?

```
src/
├── styles/
│   └── design-system.css      ← Todos os tokens e componentes
└── app/
    └── globals.css            ← Importa design-system.css
```

**Não edite globals.css!** Edite apenas `design-system.css` se precisar adicionar algo novo.

---

## 🧬 Estrutura do Design System

```
Design System
│
├─ 1. LAYOUT SYSTEM
│  ├─ .container-standard
│  ├─ .container-compact
│  ├─ .container-full
│  ├─ .page-wrapper
│  └─ .section-spacing
│
├─ 2. TYPOGRAPHY
│  ├─ .h1, .h2, .h3, .h4
│  ├─ .text-body
│  ├─ .text-secondary
│  ├─ .text-muted
│  └─ .text-label
│
├─ 3. COMPONENTS
│  ├─ CARDS (.card, .card-compact, .card-flat)
│  ├─ BUTTONS (.btn + variações)
│  ├─ INPUTS (.input)
│  ├─ BADGES (.badge + variações)
│  └─ ALERTS (.alert + variações)
│
├─ 4. UTILITIES
│  ├─ Spacing (--spacing-xs até --spacing-3xl)
│  ├─ Border Radius (--radius-sm até --radius-3xl)
│  ├─ Shadows (--shadow-sm até --shadow-xl)
│  └─ Helpers (.flex-center, .link, etc)
│
└─ 5. COLORS (CSS Variables)
   ├─ Background: bg-primary, bg-secondary, bg-tertiary, bg-card, bg-hover
   ├─ Text: text-primary, text-secondary, text-tertiary, text-muted
   ├─ Accent: accent, accent-hover
   └─ Semantic: error, border, border-light
```

---

## 🚀 Como Usar (Exemplos Práticos)

### 1. Criar uma Página Padrão

```tsx
export default function MinhaPage() {
  return (
    <div className="page-wrapper">
      <div className="container-standard">
        <h1 className="h1 mb-4">Meu Título</h1>
        <p className="text-body">Conteúdo da página...</p>
      </div>
    </div>
  )
}
```

**O que acontece:**
- `page-wrapper`: Fundo dark + espaçamento vertical
- `container-standard`: Centraliza + limita largura
- `h1` e `text-body`: Estilos de tipografia padronizados

---

### 2. Criar um Card

```tsx
<div className="card">
  <div className="card-header">
    <h3 className="h3">Título do Card</h3>
  </div>
  <div className="card-body">
    <p className="text-secondary">Conteúdo aqui...</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary btn-md">Ação</button>
  </div>
</div>
```

**Variações de Card:**
- `.card` → Card normal (com sombra, borda 3xl)
- `.card-compact` → Card menor (borda lg, padding menor)
- `.card-flat` → Card sem destaque (background tertiary)

---

### 3. Criar um Formulário

```tsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input 
    type="email" 
    className="input" 
    placeholder="seu@email.com"
  />
</div>

<div className="form-group">
  <label className="form-label">Mensagem (erro)</label>
  <input 
    type="text" 
    className="input input-error" 
    value="Algo errado"
  />
</div>
```

**O que cada classe faz:**
- `.input`: Estilo padrão de input
- `.input:focus`: Borda muda para accent (automático)
- `.input-error`: Adiciona estado de erro
- `.form-group`: Espaçamento label + input

---

### 4. Criar Botões

```tsx
{/* Botão primário (ação principal) */}
<button className="btn btn-primary btn-md">Enviar</button>

{/* Botão secundário (ações secundárias) */}
<button className="btn btn-secondary btn-md">Cancelar</button>

{/* Botão ghost (link com estilo) */}
<button className="btn btn-ghost">Voltar</button>

{/* Botão de perigo */}
<button className="btn btn-danger btn-sm">Deletar</button>

{/* Botão full-width */}
<button className="btn btn-primary btn-lg">Confirmar (width 100%)</button>
```

**Tamanhos:**
- `.btn-sm` → Pequeno
- `.btn-md` → Médio
- `.btn-lg` → Cheio (width 100%)

**Variantes:**
- `.btn-primary` → Ação principal (cor accent)
- `.btn-secondary` → Ação secundária (background card)
- `.btn-ghost` → Apenas texto
- `.btn-danger` → Ações destrutivas (vermelho)

---

### 5. Badges / Etiquetas

```tsx
{/* Badge primária */}
<span className="badge badge-primary">Novo</span>

{/* Badge de sucesso */}
<span className="badge badge-success">Aprovado</span>

{/* Badge de aviso */}
<span className="badge badge-warning">Pendente</span>

{/* Badge de erro */}
<span className="badge badge-error">Erro</span>
```

---

### 6. Alertas

```tsx
{/* Alerta de sucesso */}
<div className="alert alert-success">
  ✓ Operação realizada com sucesso!
</div>

{/* Alerta de erro */}
<div className="alert alert-error">
  ✗ Algo deu errado. Tente novamente.
</div>

{/* Alerta de aviso */}
<div className="alert alert-warning">
  ⚠ Atenção: Essa ação não pode ser desfeita.
</div>
```

---

### 7. Grid Responsivo

```tsx
{/* Grid que muda de 1 coluna em mobile para 3 colunas em desktop */}
<div className="grid-cols-1-responsive">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>

{/* Grid de 2 colunas responsivo */}
<div className="grid-cols-2-responsive">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
</div>
```

---

### 8. Tipografia (Texts)

```tsx
{/* Headline 1 - Maior, mais destaque */}
<h1 className="h1">Título Principal</h1>

{/* Headline 2 */}
<h2 className="h2">Subtítulo</h2>

{/* Headline 3 */}
<h3 className="h3">Seção</h3>

{/* Texto normal */}
<p className="text-body">Conteúdo principal do texto...</p>

{/* Texto secundário */}
<p className="text-secondary">Descrição, informação adicional...</p>

{/* Texto mutado (labels, hints) */}
<p className="text-muted">Texto pequeno, pouco importante</p>

{/* Label de formulário */}
<label className="text-label">Campo obrigatório</label>
```

---

## 🎨 Cores (CSS Variables)

**Não use hex direto!** Use as variáveis CSS:

```tsx
{/* ❌ ERRADO */}
<div className="bg-white text-red-500">Ruim</div>

{/* ✅ CORRETO */}
<div className="bg-[var(--color-bg-card)] text-[var(--color-error)]">
  Bem
</div>
```

**Cores disponíveis:**

| Variável | Uso |
|----------|-----|
| `--color-bg-primary` | Background da página |
| `--color-bg-secondary` | Variações sutis |
| `--color-bg-tertiary` | Inputs, backgrounds secundários |
| `--color-bg-card` | Cards, modais |
| `--color-bg-hover` | Estados hover |
| `--color-text-primary` | Texto principal |
| `--color-text-secondary` | Texto secundário |
| `--color-text-tertiary` | Labels, hints |
| `--color-text-muted` | Placeholders, disabled |
| `--color-accent` | Botões principais, links |
| `--color-accent-hover` | Hover do accent |
| `--color-error` | Erros, danger |
| `--color-border` | Bordas principais |
| `--color-border-light` | Bordas sutis |

---

## 📏 Spacing (Espaçamento)

CSS Variables para espaçamento consistente:

```tsx
{/* Usar classes Tailwind com variáveis */}
<div className="mb-4">
  {/* mb = margin-bottom = var(--spacing-md) = 16px */}
</div>

{/* Ou usar variável direta */}
<div style={{ marginBottom: 'var(--spacing-lg)' }}>
  {/* 24px */}
</div>
```

**Escala de spacing:**

| Classe | Tamanho | Tamanho em px |
|--------|---------|--------------|
| `--spacing-xs` | 0.25rem | 4px |
| `--spacing-sm` | 0.5rem | 8px |
| `--spacing-md` | 1rem | 16px |
| `--spacing-lg` | 1.5rem | 24px |
| `--spacing-xl` | 2rem | 32px |
| `--spacing-2xl` | 2.5rem | 40px |
| `--spacing-3xl` | 3rem | 48px |

---

## 🔄 Quando Usar Cada Coisa?

### Container
- **`container-standard`** → Maioria das páginas (max-width 6xl)
- **`container-compact`** → Formulários, páginas internas (max-width 2xl)
- **`container-full`** → Layouts que ocupam tudo (sem max-width)

### Card
- **`.card`** → Cards normais, destaques
- **`.card-compact`** → Listas de items pequenos
- **`.card-flat`** → Backgrounds sutis, sem destaque

### Button
- **`btn-primary`** → Ação principal (salvar, enviar)
- **`btn-secondary`** → Ações secundárias (cancelar)
- **`btn-ghost`** → Links, ações terciárias
- **`btn-danger`** → Deletar, ações irreversíveis

### Text
- **`h1`** → Títulos da página
- **`h2`** → Seções principais
- **`text-body`** → Conteúdo principal
- **`text-secondary`** → Descrições, informações adicionais
- **`text-muted`** → Labels, placeholders, hints

### Alert
- **`alert-success`** → Confirmações, "sucesso!"
- **`alert-error`** → Erros, problemas
- **`alert-warning`** → Avisos, atenção
- **`alert-info`** → Informações gerais

---

## ❌ O que NÃO fazer

```tsx
{/* ❌ Não fazer - cor aleatória */}
<button className="bg-purple-600">Clique</button>

{/* ❌ Não fazer - espaçamento aleatório */}
<div className="mb-7 mt-11 px-9">Conteúdo</div>

{/* ❌ Não fazer - novo estilo por página */}
<div className="rounded-2xl border-2 border-pink-400 p-7">Card</div>

{/* ❌ Não fazer - cores inline */}
<div style={{ color: '#ff5733' }}>Texto</div>

{/* ✅ FAZER - usar as classes */}
<button className="btn btn-primary">Clique</button>
<div className="mb-4 mt-4 px-4">Conteúdo</div>
<div className="card">Card</div>
<div className="text-[var(--color-accent)]">Texto</div>
```

---

## 📝 Checklist para Nova Página

Ao criar uma nova página, verifique:

- [ ] Usa `page-wrapper` para background?
- [ ] Usa `container-*` (standard/compact/full)?
- [ ] Headings usam `.h1`, `.h2`, `.h3`?
- [ ] Textos usam `.text-body`, `.text-secondary`, `.text-muted`?
- [ ] Cards usam `.card` ou variação?
- [ ] Botões usam `.btn` + variante?
- [ ] Inputs usam `.input`?
- [ ] Cores usam `var(--color-*)`?
- [ ] Espaçamento usa classes Tailwind padrão?
- [ ] Sem estilos inline ou cores aleatórias?

---

## 🔧 Precisar Adicionar Algo Novo?

Se precisar de um novo padrão:

1. **Não é um caso único?** Adicione em `design-system.css`
2. **Edite `.input`, `.card`, `.btn` etc?** Atualize a classe
3. **Précisa de nova cor?** Adicione em `:root` no `globals.css`
4. **Novo componente?** Crie em `src/components/` usando as classes

**Exemplo - Adicionar novo tamanho de card:**

```css
/* src/styles/design-system.css */

.card-large {
  @apply rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 transition-shadow hover:shadow-lg;
}
```

Agora pode usar: `<div className="card-large">...</div>`

---

## 📚 Referências Rápidas

### Arquivo
- `src/styles/design-system.css` ← Edite aqui
- `src/app/globals.css` ← NÃO edite (só importa)

### Documentação
- [Tailwind CSS](https://tailwindcss.com/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

### Comandos Úteis
- Listar classes disponíveis: `grep "@apply" src/styles/design-system.css`
- Buscar uso de `.card`: `grep -r "className.*card" src/`

---

## 🎯 Resultado Final

Com este Design System:

✅ **Consistência** - Toda UI segue o mesmo padrão
✅ **Velocidade** - Reutiliza classes prontas
✅ **Manutenibilidade** - Alterar um padrão muda tudo
✅ **Escalabilidade** - Fácil adicionar novos componentes
✅ **Harmonia Visual** - Sem "colagens" de estilos

---

**Última atualização:** 17 de Abril de 2026
**Versão:** 1.0 (Estável)
**Pronto para uso? Sim! ✅**
