'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { buildYouTubeEmbedUrl, normalizeYouTubeUrl } from '@/lib/youtube'

type Category = {
  id: string
  name: string
}

type ProductImage = {
  id: string
  url: string
}

type AdminProduct = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  materials: string | null
  handmade: boolean
  youtubeUrl: string | null
  categories: Category[]
  images: ProductImage[]
}

type ProductFormData = {
  name: string
  slug: string
  description: string
  price: string
  stock: string
  materials: string
  handmade: boolean
  categories: string[]
  youtubeUrl: string
}

type Props = {
  mode: 'create' | 'edit'
  categories: Category[]
  product?: AdminProduct
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function ProductForm({ mode, categories, product }: Props) {
  const router = useRouter()
  const [manualSlug, setManualSlug] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<ProductImage[]>(product?.images ?? [])
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const defaultValues: ProductFormData = {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    price: product?.price.toFixed(2) ?? '0.00',
    stock: String(product?.stock ?? 0),
    materials: product?.materials ?? '',
    handmade: product?.handmade ?? true,
    categories: product?.categories.map((category) => category.id) ?? [],
    youtubeUrl: product?.youtubeUrl ?? '',
  }

  const { register, handleSubmit, watch, setValue } = useForm<ProductFormData>({ defaultValues })
  const watchedName = watch('name')
  const watchedSlug = watch('slug')
  const youtubeUrlValue = watch('youtubeUrl')
  const watchedCategories = watch('categories')

  useEffect(() => {
    if (!manualSlug) {
      setValue('slug', slugify(watchedName || ''))
    }
  }, [watchedName, manualSlug, setValue])

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const embedUrl = useMemo(() => buildYouTubeEmbedUrl(youtubeUrlValue), [youtubeUrlValue])
  const visibleExistingImages = existingImages.filter((image) => !removedImageIds.includes(image.id))

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files) return

    const selected = Array.from(files)
    setSelectedFiles(selected)
    setPreviewUrls(selected.map((file) => URL.createObjectURL(file)))
  }

  function handleRemovePreview(index: number) {
    const newFiles = selectedFiles.filter((_, itemIndex) => itemIndex !== index)
    const newPreviews = previewUrls.filter((_, itemIndex) => itemIndex !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newPreviews)
  }

  function handleRemoveExistingImage(imageId: string) {
    setRemovedImageIds((current) => [...current, imageId])
  }

  async function uploadSelectedFiles() {
    if (!selectedFiles.length) {
      toast.error('Selecione ao menos uma imagem para enviar.')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => formData.append('files', file))

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Falha ao enviar imagens.')
      }

      setUploadedImageUrls((current) => [...current, ...(data.urls ?? [])])
      setSelectedFiles([])
      setPreviewUrls([])
      toast.success('Imagens enviadas com sucesso.')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao enviar imagens. Verifique o arquivo e tente novamente.')
    } finally {
      setIsUploading(false)
    }
  }

  async function onSubmit(values: ProductFormData) {
    const normalizedYoutubeUrl = values.youtubeUrl ? normalizeYouTubeUrl(values.youtubeUrl) : null
    const selectedCategories = Array.isArray(values.categories) ? values.categories : [values.categories]
    const finalExistingImageUrls = visibleExistingImages.map((image) => image.url)
    const hasImages = mode === 'create' ? uploadedImageUrls.length > 0 : finalExistingImageUrls.length + uploadedImageUrls.length > 0

    if (!hasImages) {
      toast.error('Adicione ao menos uma imagem ao produto.')
      return
    }

    const body = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      price: Number(values.price),
      stock: Number(values.stock),
      materials: values.materials || null,
      handmade: values.handmade,
      categories: selectedCategories,
      youtubeUrl: normalizedYoutubeUrl,
      imageUrls: uploadedImageUrls,
      removeImageIds: removedImageIds,
    }

    setIsSaving(true)

    try {
      const endpoint = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${product?.id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || 'Erro ao salvar produto.')
      }

      toast.success(`Produto ${mode === 'create' ? 'criado' : 'atualizado'} com sucesso.`)
      router.push('/admin/products')
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || 'Não foi possível salvar o produto.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{mode === 'create' ? 'Criar produto' : 'Editar produto'}</h1>
            <p className="text-sm text-slate-600">Preencha os dados do produto e carregue as imagens.</p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Modo {mode === 'create' ? 'criação' : 'edição'}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Informações básicas</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Nome
              <input {...register('name', { required: true })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Slug
              <input
                {...register('slug', { required: true })}
                onChange={(event) => {
                  setManualSlug(true)
                  setValue('slug', event.target.value)
                }}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
          </div>

          <label className="mt-6 block space-y-2 text-sm font-medium text-slate-700">
            Descrição
            <textarea
              {...register('description', { required: true })}
              rows={5}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </label>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Mídia do produto</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Vídeo do YouTube (URL)
              <input
                {...register('youtubeUrl')}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Materiais
              <input
                {...register('materials')}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
          </div>

          {embedUrl ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-900 p-4 text-white">
              <p className="text-sm font-medium">Prévia do vídeo</p>
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={embedUrl}
                  title="Prévia do Youtube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : (youtubeUrlValue && <p className="mt-4 text-sm text-rose-600">URL do YouTube inválida.</p>)}

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">Imagens</p>
              <button
                type="button"
                onClick={uploadSelectedFiles}
                disabled={!selectedFiles.length || isUploading}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isUploading ? 'Enviando...' : 'Enviar imagens'}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 transition hover:border-slate-400 hover:bg-slate-100">
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelection} />
                Selecione ou arraste imagens
              </label>
              <p className="text-sm text-slate-500">Selecione várias imagens JPEG/PNG para o produto.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleExistingImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img src={image.url} alt="Imagem do produto" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.id)}
                    className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Remover
                  </button>
                </div>
              ))}
              {previewUrls.map((src, index) => (
                <div key={src} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img src={src} alt="Prévia" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePreview(index)}
                    className="absolute right-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Remover
                  </button>
                </div>
              ))}
              {uploadedImageUrls.map((url) => (
                <div key={url} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img src={url} alt="Carregado" className="h-48 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Preço, estoque e categorias</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Preço
              <input
                {...register('price', { required: true })}
                type="number"
                step="0.01"
                min="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Estoque
              <input
                {...register('stock', { required: true })}
                type="number"
                min="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
          </div>

          <label className="mt-6 block space-y-2 text-sm font-medium text-slate-700">
            Categorias
            <select
              {...register('categories')}
              multiple
              className="h-40 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-slate-700">
            <input {...register('handmade')} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
            Produto artesanal
          </label>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? 'Salvando...' : mode === 'create' ? 'Criar produto' : 'Atualizar produto'}
          </button>
        </div>
      </form>
    </div>
  )
}
