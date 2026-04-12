// src/app/(admin)/admin/blog-categories/page.tsx
'use client'

import { useEffect, useState } from 'react'

type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  featured: boolean
  showOnHome: boolean // ✅ novo
  order?: number
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<Partial<Category>>({})

  async function fetchCategories() {
    const res = await fetch('/api/admin/blog-categories')
    const data = await res.json()
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch('/api/admin/blog-categories', {
      method: 'POST',
      body: JSON.stringify(form),
    })

    setForm({})
    fetchCategories()
  }

  async function toggleFeatured(cat: Category) {
    await fetch(`/api/admin/blog-categories/${cat.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ featured: !cat.featured }),
    })

    fetchCategories()
  }

  async function deleteCategory(id: string) {
    await fetch(`/api/admin/blog-categories/${id}`, {
      method: 'DELETE',
    })

    fetchCategories()
  }

  return (
    <div className="p-6 space-y-8">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-xl">
        <h2 className="text-lg font-bold">Nova Categoria</h2>

        <input
          placeholder="Nome"
          className="border p-2 w-full"
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Slug"
          className="border p-2 w-full"
          value={form.slug || ''}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          placeholder="Imagem (URL)"
          className="border p-2 w-full"
          value={form.image || ''}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <textarea
          placeholder="Descrição"
          className="border p-2 w-full"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Ordem"
          className="border p-2 w-full"
          value={form.order || 0}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />

        <label className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={form.showOnHome || false}
            onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })}
        />
        Mostrar na home
        </label>

        <button className="bg-black text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>

      {/* LISTAGEM */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold">Categorias</h2>

        {categories.map((cat) => (
          <div key={cat.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm text-gray-500">/{cat.slug}</p>
              {cat.featured && <span className="text-xs text-green-600">★ Destaque</span>}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleFeatured(cat)}
                className="text-xs bg-yellow-500 px-2 py-1 rounded text-white"
              >
                Toggle Destaque
              </button>

              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-xs bg-red-600 px-2 py-1 rounded text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}