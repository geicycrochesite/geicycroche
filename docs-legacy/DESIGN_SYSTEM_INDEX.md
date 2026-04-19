# 🎨 Design System - Central de Documentação

**Guia completo para entender, usar e manter o Design System do projeto.**

---

## 📚 Documentação Disponível

### Para Começar (15 minutos)
1. **[DESIGN_SYSTEM_QUICK_REFERENCE.md](DESIGN_SYSTEM_QUICK_REFERENCE.md)** ⚡
   - Referência rápida de todas as classes
   - Copiar/colar pronto para usar
   - Tempo: 2-5 minutos

2. **[DESIGN_SYSTEM_EXEMPLOS.md](DESIGN_SYSTEM_EXEMPLOS.md)** 📖
   - Exemplos práticos antes/depois
   - Padrões comuns (cards, botões, formulários)
   - Como refatorar uma página
   - Tempo: 10 minutos

### Aprendizado Completo (1 hora)
3. **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** 📚
   - Documentação completa e detalhada
   - Explicação do "por quê" de cada coisa
   - Regras de uso, do's e don'ts
   - Quando usar cada componente
   - Tempo: 45-60 minutos

### Suporte & Troubleshooting (30 minutos)
4. **[DESIGN_SYSTEM_TROUBLESHOOTING.md](DESIGN_SYSTEM_TROUBLESHOOTING.md)** 🆘
   - FAQ com respostas rápidas
   - Problemas comuns e soluções
   - Como debugar
   - Quando pedir ajuda
   - Tempo: 20-30 minutos

### Gerenciamento & Status (10 minutos)
5. **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** 📋
   - O que está completo
   - O que precisa fazer
   - Tabela de componentes
   - Prioridades
   - Tempo: 5-10 minutos

### Código-Fonte
6. **[src/styles/design-system.css](src/styles/design-system.css)** 💻
   - 450+ linhas de CSS
   - Tokens, componentes, utilitários
   - Comentários explicativos
   - Versão 1.0 (Estável)

---

## 🚀 Fluxo por Caso de Uso

### Caso 1: Sou novo e quero aprender rápido ⚡
```
1. Leia DESIGN_SYSTEM_QUICK_REFERENCE.md (5 min)
2. Veja DESIGN_SYSTEM_EXEMPLOS.md (10 min)
3. Pronto! Comece a usar
```

### Caso 2: Estou criando uma nova página 📄
```
1. Consulte DESIGN_SYSTEM_QUICK_REFERENCE.md para classes
2. Veja exemplo similar em DESIGN_SYSTEM_EXEMPLOS.md
3. Use as classes .card, .btn, .input, etc
4. Se dúvida: DESIGN_SYSTEM.md
```

### Caso 3: Estou refatorando um componente antigo 🔄
```
1. Veja DESIGN_SYSTEM_EXEMPLOS.md (seção "Antes/Depois")
2. Procure padrão similar
3. Substitua cores por var(--color-*)
4. Substitua botões por .btn .btn-*
5. Substitua cards por .card
```

### Caso 4: Encontrei um problema 🐛
```
1. Consulte DESIGN_SYSTEM_TROUBLESHOOTING.md
2. Se não encontrar: DESIGN_SYSTEM.md
3. Se ainda não resolver: Peça ajuda
```

### Caso 5: Preciso adicionar algo novo 🆕
```
1. Leia "Precisar Adicionar Algo Novo?" em DESIGN_SYSTEM.md
2. Verifique se combina com classes existentes
3. Se não: adicione em src/styles/design-system.css
4. Documente por quê
```

---

## 📊 Estrutura do Design System

```
Design System
│
├─ LAYOUT SYSTEM
│  ├─ .container-standard (max 6xl)
│  ├─ .container-compact (max 2xl)
│  ├─ .page-wrapper (min-h-screen)
│  └─ .grid-cols-*-responsive
│
├─ TYPOGRAPHY
│  ├─ .h1, .h2, .h3, .h4 (tamanhos)
│  ├─ .text-body (padrão)
│  ├─ .text-secondary (descrição)
│  ├─ .text-muted (pequeno)
│  └─ .text-label (formulário)
│
├─ COMPONENTS
│  ├─ CARD SYSTEM
│  │  ├─ .card (padrão)
│  │  ├─ .card-compact (compacto)
│  │  ├─ .card-flat (sem destaque)
│  │  └─ .card-header/body/footer
│  │
│  ├─ BUTTON SYSTEM
│  │  ├─ .btn (base)
│  │  ├─ .btn-primary (ação)
│  │  ├─ .btn-secondary (secundária)
│  │  ├─ .btn-ghost (link)
│  │  ├─ .btn-danger (deletar)
│  │  └─ .btn-sm/md/lg (tamanhos)
│  │
│  ├─ INPUT SYSTEM
│  │  ├─ .input (padrão)
│  │  ├─ .input-error (erro)
│  │  └─ .form-group/label
│  │
│  ├─ BADGE SYSTEM
│  │  ├─ .badge (base)
│  │  ├─ .badge-primary
│  │  ├─ .badge-success
│  │  ├─ .badge-warning
│  │  ├─ .badge-error
│  │  └─ .badge-info
│  │
│  └─ ALERT SYSTEM
│     ├─ .alert (base)
│     ├─ .alert-success
│     ├─ .alert-error
│     ├─ .alert-warning
│     └─ .alert-info
│
├─ COLOR TOKENS (CSS Variables)
│  ├─ --color-bg-primary
│  ├─ --color-bg-secondary
│  ├─ --color-text-primary
│  ├─ --color-accent
│  └─ +10 mais cores
│
├─ SPACING TOKENS
│  ├─ --spacing-xs (4px)
│  ├─ --spacing-sm (8px)
│  ├─ --spacing-md (16px)
│  ├─ --spacing-lg (24px)
│  └─ +3 mais tamanhos
│
└─ UTILITIES
   ├─ .flex-center (flex centralizado)
   ├─ .flex-between (space-between)
   ├─ .link (link estilizado)
   ├─ .divider (divisor)
   ├─ Animações (.animate-*)
   └─ Acessibilidade (.focus-visible-ring)
```

---

## ✨ Princípios de Design

### 1. Simplicidade
- Menos classes = menos confusão
- Use o mínimo necessário
- Combine classes existentes

### 2. Reutilização
- `.card`, `.btn`, `.input` funcionam em todo projeto
- Não crie variações desnecessárias
- Estenda existentes em vez de criar novas

### 3. Consistência
- Mesmas cores em todos os lugares
- Mesmo espaçamento, mesma tipografia
- Visual unificado

### 4. Acessibilidade
- Contraste suficiente
- Navegação por keyboard
- Labels em inputs

### 5. Performance
- CSS minificado (~8KB)
- Não usar inline styles
- Classes compartilhadas diminuem CSS final

---

## 🎯 Checklist para Implementação

### Cada componente novo deve ter:
- [ ] `.card` ou `.btn` ou `.input` apropriado?
- [ ] Cores do design system?
- [ ] Espaçamento consistente?
- [ ] Tipografia correta?
- [ ] Responsivo?
- [ ] Sem cores aleatórias?
- [ ] Sem padding/margin aleatórios?
- [ ] Acessível?

---

## 📈 Métricas de Sucesso

Quando o design system estiver implementado:

| Métrica | Antes | Depois |
|---------|-------|--------|
| Linhas CSS | 5000+ | ~1000 |
| Cores diferentes na UI | 20+ | 8 |
| Tempo criar página | 3h | 1h |
| Bugs de estilo | 30+ | 2-3 |
| Consistência visual | 60% | 99% |

---

## 🔗 Links Rápidos

### Documentação
- 📄 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Completo
- ⚡ [DESIGN_SYSTEM_QUICK_REFERENCE.md](DESIGN_SYSTEM_QUICK_REFERENCE.md) - Rápido
- 📖 [DESIGN_SYSTEM_EXEMPLOS.md](DESIGN_SYSTEM_EXEMPLOS.md) - Exemplos
- 🆘 [DESIGN_SYSTEM_TROUBLESHOOTING.md](DESIGN_SYSTEM_TROUBLESHOOTING.md) - Ajuda
- 📋 [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) - Status

### Código
- 💻 [src/styles/design-system.css](src/styles/design-system.css) - Tokens & Classes
- 🎨 [src/app/globals.css](src/app/globals.css) - Configuração global
- 📦 [src/types/order.ts](src/types/order.ts) - Tipos de exemplo

### Exemplos de Uso
- ✅ [src/components/OrderCard.tsx](src/components/OrderCard.tsx) - Exemplo de componente
- ✅ [src/app/(site)/loja/meus-pedidos/page.tsx](src/app/(site)/loja/meus-pedidos/page.tsx) - Exemplo de página
- ✅ [src/app/(site)/loja/pedido/[id]/page.tsx](src/app/(site)/loja/pedido/[id]/page.tsx) - Exemplo de página detalhe

---

## 🎓 Aprendizado Recomendado

### Dia 1: Fundamentos (30 min)
- Leia DESIGN_SYSTEM_QUICK_REFERENCE.md
- Explore DESIGN_SYSTEM_EXEMPLOS.md

### Dia 2: Prática (1 hora)
- Refatore um componente simples
- Veja IMPLEMENTATION_STATUS.md para pegar tarefa

### Dia 3: Profundidade (45 min)
- Leia DESIGN_SYSTEM.md completo
- Entenda os princípios

### Dia 4+: Contribuição (Contínuo)
- Use em novos componentes
- Sugira melhorias
- Reporte problemas

---

## 💡 Dicas Pro

### Tip 1: Use DevTools para debugar
```
F12 → Inspecione → Veja classes aplicadas
Procure por conflitos com DevTools
```

### Tip 2: Busque padrões similares
```
Antes de criar novo, procure similar
Provavelmente existe combinação que faz
```

### Tip 3: Combine classes
```tsx
✅ <div className="card card-compact">Bom</div>
✅ <button className="btn btn-primary btn-lg">Melhor</button>
```

### Tip 4: Mantenha globals.css limpo
```
Não edite globals.css
Edite design-system.css
Globals.css só importa
```

### Tip 5: Teste em mobile
```
Sempre teste em mobile
Use Chrome DevTools: Ctrl+Shift+M
Verifique grid e spacing
```

---

## 📞 Comunique-se

Se encontrar:
- 🐛 Bug: Crie issue com prints
- 💡 Ideia: Abra discussão
- ❓ Dúvida: Consulte docs primeiro
- ✨ Melhoria: Sugira em PR

---

## ✅ Status Atual

| Item | Status |
|------|--------|
| Design System CSS | ✅ Completo |
| Documentação | ✅ Completa |
| Exemplos | ✅ Completos |
| Componentes base | ✅ 15+ prontos |
| Aplicação em projeto | ⏳ Em andamento |

---

## 🎉 Pronto para Começar?

1. **Leia:** DESIGN_SYSTEM_QUICK_REFERENCE.md (5 min)
2. **Veja:** DESIGN_SYSTEM_EXEMPLOS.md (10 min)
3. **Pegue:** Tarefa em IMPLEMENTATION_STATUS.md
4. **Implemente:** Seu primeiro componente
5. **Teste:** Em mobile e desktop

**Sucesso!** 🚀

---

**Última atualização:** 17 de Abril de 2026
**Versão:** 1.0 (Estável)
**Status:** ✅ Pronto para uso
