import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function BlogCategoriesPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Categorias do Blog</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Gerencie as categorias que aparecem na home e no blog
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] p-6 space-y-6">

        <form
          action="/api/admin/blog/categories"
          method="POST"
          className="grid gap-4 sm:grid-cols-2"
        >
          <input name="name" placeholder="Nome" className="input" />
          <input name="slug" placeholder="Slug" className="input" />
          <input name="image" placeholder="Imagem (URL)" className="input" />
          <input name="order" type="number" placeholder="Ordem" className="input" />

          <textarea
            name="description"
            placeholder="Descrição"
            className="input sm:col-span-2"
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="showOnHome" />
            Mostrar na home
          </label>

          <button className="btn-primary sm:col-span-2">
            Salvar categoria
          </button>
        </form>

      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--color-bg-tertiary)]">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Home</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3">/{cat.slug}</td>
                <td className="px-4 py-3">
                  {cat.showOnHome ? 'Sim' : 'Não'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}