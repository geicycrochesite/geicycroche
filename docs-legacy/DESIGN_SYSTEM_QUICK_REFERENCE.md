# ⚡ Design System - Referência Rápida

**Use este documento para consultar rapidamente classes e padrões.**

---

## 🎯 Começar uma Página

```tsx
export default function Page() {
  return (
    <div className="page-wrapper">
      <div className="container-standard">
        <h1 className="h1 mb-6">Título</h1>
        {/* Conteúdo */}
      </div>
    </div>
  )
}
```

---

## 📦 Cards

```tsx
{/* Card padrão */}
<div className="card">Conteúdo</div>

{/* Card compacto */}
<div className="card-compact">Pequeno</div>

{/* Card sem destaque */}
<div className="card-flat">Simples</div>

{/* Com estrutura */}
<div className="card">
  <div className="card-header"><h3 className="h3">Título</h3></div>
  <div className="card-body">Conteúdo</div>
  <div className="card-footer">Rodapé</div>
</div>
```

---

## 🔘 Botões

```tsx
{/* Padrão */}
<button className="btn btn-primary btn-md">Primário</button>
<button className="btn btn-secondary btn-md">Secundário</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-danger btn-sm">Deletar</button>

{/* Sizes */}
<button className="btn btn-primary btn-sm">Pequeno</button>
<button className="btn btn-primary btn-md">Médio</button>
<button className="btn btn-primary btn-lg">Full Width</button>
```

---

## 📝 Inputs

```tsx
{/* Input padrão */}
<input className="input" placeholder="Digite aqui" />

{/* Com erro */}
<input className="input input-error" />

{/* Disabled */}
<input className="input" disabled />

{/* Com label */}
<div className="form-group">
  <label className="form-label">Email</label>
  <input className="input" type="email" />
</div>
```

---

## 📝 Tipografia

```tsx
<h1 className="h1">Título Principal</h1>
<h2 className="h2">Subtítulo</h2>
<h3 className="h3">Seção</h3>
<h4 className="h4">Sub-seção</h4>

<p className="text-body">Texto normal</p>
<p className="text-secondary">Descrição</p>
<p className="text-muted">Pequeno texto</p>
<label className="text-label">Label</label>
```

---

## 🏷️ Badges

```tsx
<span className="badge badge-primary">Novo</span>
<span className="badge badge-success">✓ OK</span>
<span className="badge badge-warning">⚠ Pendente</span>
<span className="badge badge-error">✗ Erro</span>
<span className="badge badge-info">ℹ Info</span>
```

---

## ⚠️ Alertas

```tsx
<div className="alert alert-success">Sucesso!</div>
<div className="alert alert-error">Erro!</div>
<div className="alert alert-warning">Aviso!</div>
<div className="alert alert-info">Informação!</div>
```

---

## 🎨 Cores (CSS Variables)

```tsx
{/* Background */}
<div className="bg-[var(--color-bg-primary)]">Principal</div>
<div className="bg-[var(--color-bg-secondary)]">Secundário</div>
<div className="bg-[var(--color-bg-card)]">Card</div>

{/* Text */}
<p className="text-[var(--color-text-primary)]">Principal</p>
<p className="text-[var(--color-text-secondary)]">Secundário</p>
<p className="text-[var(--color-text-muted)]">Mutado</p>

{/* Accent */}
<div className="text-[var(--color-accent)]">Destaque</div>
<div className="text-[var(--color-error)]">Erro</div>
```

---

## 🔲 Containers

```tsx
{/* Padrão (max-width 6xl) */}
<div className="container-standard">Conteúdo</div>

{/* Compacto (max-width 2xl) */}
<div className="container-compact">Formulário</div>

{/* Full (sem limite) */}
<div className="container-full">Hero</div>
```

---

## 📐 Grid

```tsx
{/* Grid responsivo 1-2-3 colunas */}
<div className="grid-cols-1-responsive">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

{/* Grid responsivo 1-2 colunas */}
<div className="grid-cols-2-responsive">
  <div>Esquerda</div>
  <div>Direita</div>
</div>
```

---

## 📏 Espaçamento

```tsx
{/* Margin */}
<div className="mb-4 mt-2 px-4">Conteúdo</div>

{/* Classes úteis */}
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 🔗 Utilitários

```tsx
{/* Flexbox */}
<div className="flex-center">Centralizado</div>
<div className="flex-between">
  <span>Esquerda</span>
  <span>Direita</span>
</div>

{/* Link */}
<a className="link" href="#">Link estilizado</a>

{/* Truncate */}
<p className="truncate-line">Texto cortado...</p>
```

---

## 🎬 Animações

```tsx
<div className="animate-fade-in">Fade In</div>
<div className="animate-slide-in">Slide In</div>
<div className="animate-enter">Enter</div>
<div className="animate-leave">Leave</div>
```

---

## 🚫 Não Fazer

```tsx
{/* ❌ Cores aleatórias */}
<button className="bg-blue-600">Errado</button>

{/* ❌ Espaçamento aleatório */}
<div className="mb-7 px-9">Errado</div>

{/* ❌ Novos estilos por página */}
<div className="rounded-2xl border-pink-400">Errado</div>

{/* ✅ Use as classes */}
<button className="btn btn-primary">Certo</button>
<div className="mb-4 px-4">Certo</div>
<div className="card">Certo</div>
```

---

## 📖 Documentação Completa

Para mais detalhes, leia: **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**

---

**Última atualização:** 17 de Abril de 2026
