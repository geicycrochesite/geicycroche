'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CustomPage } from '@prisma/client'
import toast from 'react-hot-toast'
import type { FAQItem } from '@/types/admin'

type Props = {
  page: CustomPage
}

export default function PageForm({ page }: Props) {
  const router = useRouter()

  const [title, setTitle] = useState(page.title || '')
  const [introText, setIntroText] = useState(page.introText || '')

  const [faqs, setFaqs] = useState<FAQItem[]>(
    (page.faq as FAQItem[]) || []
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(page.coverImage || null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(page.coverImage || null)
  const [isUploading, setIsUploading] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function uploadImage() {
    if (!selectedFile) {
      toast.error('Selecione uma imagem')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('files', selectedFile)

      const res = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      const url = data.urls[0]

      setUploadedUrl(url)
      toast.success('Imagem enviada')
    } catch {
      toast.error('Erro no upload')
    } finally {
      setIsUploading(false)
    }
  }

  function addFaq() {
    setFaqs([...faqs, { question: '', answer: '' }])
  }

  function updateFaq(index: number, field: 'question' | 'answer', value: string) {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    const res = await fetch(`/api/admin/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        introText,
        coverImage: uploadedUrl,
        faq: faqs
      })
    })

    if (!res.ok) {
      toast.error('Erro ao salvar')
      return
    }

    toast.success('Salvo com sucesso')
    router.refresh()
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Editar página</h1>
        <p className="text-sm text-[var(--color-admin-text)]">
          Edite o conteúdo institucional
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* CONTEÚDO */}
        <section className="rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Conteúdo</h2>

          <div className="mt-6 space-y-4">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da página"
              className="w-full rounded-2xl border border-[var(--color-admin-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-sm"
            />

            <textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              placeholder="Texto introdutório"
              className="w-full rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-bg-tertiary)] px-4 py-3 text-sm"
            />

          </div>
        </section>

        {/* IMAGEM */}
        <section className="rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Imagem principal</h2>

          <div className="mt-6 space-y-4">

            <label className="cursor-pointer rounded-3xl border border-dashed border-[var(--color-admin-border)] bg-[var(--color-bg-tertiary)] px-4 py-6 text-center text-sm">
              <input type="file" className="hidden" onChange={handleFileChange} />
              Selecionar imagem
            </label>

            <button
              type="button"
              onClick={uploadImage}
              disabled={!selectedFile || isUploading}
              className="rounded-2xl bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)]"
            >
              {isUploading ? 'Enviando...' : 'Enviar imagem'}
            </button>

            {preview && (
              <div className="overflow-hidden rounded-3xl border border-[var(--color-admin-border)]">
                <img src={preview} className="h-48 w-full object-cover" />
              </div>
            )}

          </div>
        </section>

        {/* FAQ */}
        {page.slug === 'personalizados' && (
          <section className="rounded-3xl border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] p-6 shadow-sm">
            <h2 className="text-lg font-semibold">FAQ</h2>

            <div className="mt-6 space-y-4">

              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">

                  <input
                    value={faq.question}
                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    placeholder="Pergunta"
                    className="w-full rounded-2xl border border-[var(--color-admin-border)] px-3 py-2"
                  />

                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                    placeholder="Resposta"
                    className="w-full rounded-2xl border border-[var(--color-admin-border)] px-3 py-2"
                  />

                </div>
              ))}

              <button
                type="button"
                onClick={addFaq}
                className="text-sm text-blue-600"
              >
                + Adicionar pergunta
              </button>

            </div>
          </section>
        )}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-3xl bg-[var(--color-bg-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)]"
          >
            Salvar alterações
          </button>
        </div>

      </form>
    </div>
  )
}