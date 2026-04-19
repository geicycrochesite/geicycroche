# 📖 Exemplos Práticos - Design System em Ação

**Veja como refatorar páginas antigas e criar novas com o Design System.**

---

## Exemplo 1: Refatorar Página Simples

### Antes (Inconsistente)

```tsx
export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Produtos</h1>
      <p className="text-gray-600 mb-8">Veja nossos produtos</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded border border-gray-300">
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <p className="text-gray-700 mb-4">{p.description}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
```

**Problemas:**
- ❌ Background gray-50 (não é do design)
- ❌ Cores aleatórias (blue-600, gray-900)
- ❌ Bordas não padronizadas
- ❌ Sem consistência com resto do projeto

### Depois (Com Design System)

```tsx
export default function ProductsPage() {
  return (
    <div className="page-wrapper">
      <div className="container-standard">
        <h1 className="h1 mb-2">Produtos</h1>
        <p className="text-secondary mb-8">Veja nossos produtos</p>
        
        <div className="grid-cols-1-responsive">
          {products.map(p => (
            <div key={p.id} className="card">
              <h3 className="h3 mb-2">{p.name}</h3>
              <p className="text-secondary mb-4">{p.description}</p>
              <button className="btn btn-primary btn-md">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Melhorias:**
- ✅ `page-wrapper` para background consistente
- ✅ `container-standard` para centralização
- ✅ `.h1` e `.h3` para tipografia padronizada
- ✅ `.card` para cards consistentes
- ✅ `.btn btn-primary` para botão padronizado
- ✅ `grid-cols-1-responsive` para responsividade consistente

---

## Exemplo 2: Criar Formulário Novo

### Sem Design System (Inconsistente)

```tsx
export default function ContactForm() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contato</h2>
      
      <input 
        type="text"
        placeholder="Seu nome"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
      />
      
      <textarea
        placeholder="Sua mensagem"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        rows={5}
      />
      
      <button className="w-full bg-green-600 text-white py-2 rounded font-bold">
        Enviar
      </button>
      
      <p className="mt-4 text-sm text-gray-500">Responderemos em breve</p>
    </div>
  )
}
```

### Com Design System (Consistente)

```tsx
export default function ContactForm() {
  return (
    <div className="page-wrapper">
      <div className="container-compact">
        <h2 className="h2 mb-6">Contato</h2>
        
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Nome</label>
              <input 
                type="text"
                placeholder="Seu nome"
                className="input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Mensagem</label>
              <textarea
                placeholder="Sua mensagem"
                className="input"
                rows={5}
              />
            </div>
          </div>
          
          <div className="card-footer">
            <button className="btn btn-primary btn-lg">
              Enviar
            </button>
          </div>
        </div>
        
        <p className="text-muted mt-4">Responderemos em breve</p>
      </div>
    </div>
  )
}
```

**Vantagens:**
- ✅ `.form-group` organiza label + input
- ✅ `.input` padronizado
- ✅ `.card` com estrutura clara
- ✅ `.text-muted` para small text
- ✅ `container-compact` para formulário

---

## Exemplo 3: Dashboard com Múltiplos Cards

```tsx
export default function Dashboard() {
  return (
    <div className="page-wrapper">
      <div className="container-standard">
        <div className="mb-8">
          <h1 className="h1">Dashboard</h1>
          <p className="text-secondary">Bem-vindo de volta!</p>
        </div>
        
        {/* Linha de estatísticas */}
        <div className="grid-cols-1-responsive mb-8">
          <div className="card">
            <p className="text-muted">Vendas Totais</p>
            <h3 className="h3">R$ 12.500</h3>
          </div>
          <div className="card">
            <p className="text-muted">Pedidos</p>
            <h3 className="h3">25</h3>
          </div>
          <div className="card">
            <p className="text-muted">Clientes</p>
            <h3 className="h3">150</h3>
          </div>
        </div>
        
        {/* Tabela */}
        <div className="card">
          <div className="card-header">
            <h3 className="h3">Pedidos Recentes</h3>
          </div>
          <div className="card-body">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-light)]">
                  <th className="text-left pb-2">ID</th>
                  <th className="text-left pb-2">Cliente</th>
                  <th className="text-right pb-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-border-light)]">
                  <td className="py-2">#001</td>
                  <td className="py-2">João Silva</td>
                  <td className="text-right py-2">R$ 150</td>
                </tr>
                <tr>
                  <td className="py-2">#002</td>
                  <td className="py-2">Maria Santos</td>
                  <td className="text-right py-2">R$ 280</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Alerta */}
        <div className="alert alert-warning mt-8">
          ⚠ Você tem 3 pedidos pendentes de confirmação
        </div>
      </div>
    </div>
  )
}
```

---

## Exemplo 4: Modal com Formulário

```tsx
export function ConfirmDialog({ 
  title, 
  message, 
  onConfirm, 
  onCancel 
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex-center">
      <div className="card max-w-sm">
        <div className="card-header">
          <h3 className="h3">{title}</h3>
        </div>
        
        <div className="card-body">
          <p className="text-secondary">{message}</p>
        </div>
        
        <div className="card-footer">
          <div className="flex gap-2">
            <button 
              onClick={onCancel}
              className="btn btn-secondary btn-md flex-1"
            >
              Cancelar
            </button>
            <button 
              onClick={onConfirm}
              className="btn btn-primary btn-md flex-1"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Exemplo 5: Status Badge com Lógica

```tsx
export function OrderStatus({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    pending: { 
      label: '⏳ Pendente',
      className: 'badge badge-warning'
    },
    approved: {
      label: '✓ Aprovado',
      className: 'badge badge-success'
    },
    failed: {
      label: '✗ Recusado',
      className: 'badge badge-error'
    }
  }
  
  const config = statusConfig[status] || statusConfig.pending
  
  return <span className={config.className}>{config.label}</span>
}

// Uso:
<OrderStatus status="approved" />  {/* ✓ Aprovado (verde) */}
<OrderStatus status="pending" />   {/* ⏳ Pendente (amarelo) */}
<OrderStatus status="failed" />    {/* ✗ Recusado (vermelho) */}
```

---

## Exemplo 6: Lista com Ações

```tsx
export function ItemList({ items, onEdit, onDelete }: ListProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="h3">Itens</h3>
      </div>
      
      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted text-center py-4">Nenhum item</p>
        ) : (
          <div className="space-y-2">
            {items.map(item => (
              <div 
                key={item.id}
                className="flex-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg"
              >
                <div>
                  <p className="text-body">{item.name}</p>
                  <p className="text-muted">{item.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(item.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Exemplo 7: Página com Abas

```tsx
export default function SettingsPage() {
  const [tab, setTab] = useState<'profile' | 'security' | 'notifications'>('profile')
  
  return (
    <div className="page-wrapper">
      <div className="container-compact">
        <h1 className="h1 mb-8">Configurações</h1>
        
        <div className="card">
          {/* Tabs Navigation */}
          <div className="card-header flex gap-4">
            <button
              onClick={() => setTab('profile')}
              className={`pb-2 border-b-2 transition ${
                tab === 'profile' 
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-text-secondary)]'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={() => setTab('security')}
              className={`pb-2 border-b-2 transition ${
                tab === 'security' 
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-text-secondary)]'
              }`}
            >
              Segurança
            </button>
            <button
              onClick={() => setTab('notifications')}
              className={`pb-2 border-b-2 transition ${
                tab === 'notifications' 
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-text-secondary)]'
              }`}
            >
              Notificações
            </button>
          </div>
          
          {/* Tabs Content */}
          <div className="card-body">
            {tab === 'profile' && <ProfileTab />}
            {tab === 'security' && <SecurityTab />}
            {tab === 'notifications' && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Checklist ao Criar Página

```tsx
export default function NewPage() {
  return (
    <div className="page-wrapper">
      <div className="container-standard">
        {/* ✅ Heading com .h1 */}
        <h1 className="h1 mb-4">Título</h1>
        
        {/* ✅ Descrição com .text-secondary */}
        <p className="text-secondary mb-8">Descrição</p>
        
        {/* ✅ Cards com .card */}
        <div className="card mb-6">
          {/* ✅ Tipografia padronizada */}
          <h2 className="h2 mb-4">Seção</h2>
          
          {/* ✅ Texto com classe apropriada */}
          <p className="text-body">Conteúdo</p>
          
          {/* ✅ Botões padronizados */}
          <button className="btn btn-primary btn-md mt-4">Ação</button>
        </div>
        
        {/* ✅ Sem estilos aleatórios */}
        {/* ❌ Não use: bg-blue-600, text-red-500, etc */}
      </div>
    </div>
  )
}
```

---

**Última atualização:** 17 de Abril de 2026
**Versão:** 1.0 (Estável)
