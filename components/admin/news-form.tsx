"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { MediaUpload } from "./media-upload"

type MediaFile = {
  id: string
  file: File
  preview: string
  type: "image" | "video"
  name: string
  size: number
  url?: string
  path?: string
}

type News = {
  id?: string
  title: string
  content: string
  excerpt?: string | null
  featured_image?: string | null
  featured_media_type?: "image" | "video"
  slug: string
  status: "draft" | "published"
}

interface NewsFormProps {
  initialData?: News
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])

  const [formData, setFormData] = useState<News>({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    excerpt: initialData?.excerpt ?? "",
    featured_image: initialData?.featured_image ?? "",
    featured_media_type: initialData?.featured_media_type ?? "image",
    slug: initialData?.slug ?? "",
    status: (initialData?.status as News["status"]) ?? "draft",
  })

  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      if (!initialData) {
        return { ...prev, title, slug: generateSlug(title) }
      }
      return { ...prev, title }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.slug) return

    try {
      setSubmitting(true)
      // Tenta enviar o author_id do admin logado salvo no localStorage
      let authorId: string | undefined
      try {
        const stored = localStorage.getItem("admin_user")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed?.id) authorId = parsed.id as string
        }
      } catch {}

      const body = {
        ...formData,
        author_id: authorId,
        media_files: mediaFiles.map((f) => ({ url: f.url ?? f.preview, type: f.type, name: f.name })),
      }

      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const details = err?.details ? `\nDetalhes: ${err.details}` : ""
        throw new Error((err?.error || "Falha ao salvar a notícia") + details)
      }

      router.push("/admin/noticias")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar notícia:", error)
      alert((error as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações principais da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Título da notícia"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">URL (Slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-da-noticia"
                disabled={!!initialData}
              />
              <p className="text-xs text-gray-500">
                A URL não pode ser alterada após a publicação para não quebrar links existentes.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt ?? ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Breve resumo da notícia"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Conteúdo da notícia"
                className="min-h-[160px]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData((p) => ({ ...p, status: v as News["status"] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Mídia em destaque</Label>
                <Select
                  value={formData.featured_media_type}
                  onValueChange={(v) => setFormData((p) => ({ ...p, featured_media_type: v as "image" | "video" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de mídia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Imagem</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

          {formData.featured_image && (
            <div className="grid gap-2">
              <Label>Atual em destaque (preview)</Label>
              {formData.featured_media_type === 'video' ? (
                <video src={formData.featured_image} className="w-full max-w-md rounded" controls />
              ) : (
                <img src={formData.featured_image} alt="Mídia atual" className="w-full max-w-md rounded" />
              )}
              <p className="text-xs text-gray-500">Ao enviar nova mídia abaixo, a imagem/vídeo em destaque será substituída.</p>
            </div>
          )}

            <div className="grid gap-2">
              <Label>Uploads (imagens/vídeos)</Label>
              <MediaUpload
                files={mediaFiles}
                onFilesChange={(files) => {
                  setMediaFiles(files)
                const firstUrl = files[0]?.url || files[0]?.preview
                if (firstUrl) {
                  setFormData((p) => ({ ...p, featured_image: firstUrl }))
                }
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="featured_image">URL da imagem/vídeo em destaque (opcional)</Label>
              <Input
                id="featured_image"
                value={formData.featured_image ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, featured_image: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={submitting}>
            <Save className="mr-2 h-4 w-4" />
            {submitting ? "Salvando..." : "Salvar notícia"}
          </Button>
        </div>
      </form>
    </div>
  )
}