"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, ArrowLeft, ImageIcon } from "lucide-react"
import Link from "next/link"
import { MediaUpload } from "./media-upload"

interface MediaFile {
  id: string
  file: File
  preview: string
  type: "image" | "video"
  name: string
  size: number
}

interface NewsFormProps {
  initialData?: {
    id: string
    title: string
    content: string
    excerpt: string | null
    featured_image: string | null
    media_files?: any[]
    featured_media_type?: string
    slug: string
    status: string
  }
}

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    featured_image: initialData?.featured_image || "",
    featured_media_type: initialData?.featured_media_type || "image",
    slug: initialData?.slug || "",
    status: initialData?.status || "draft",
  })

  // Gerar slug automaticamente baseado no título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-") // Remove hífens duplicados
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleMediaFilesChange = (files: MediaFile[]) => {
    setMediaFiles(files)
  }

  const handleFeaturedImageChange = (url: string) => {
    setFormData(prev => ({ ...prev, featured_image: url }))
  }

  const uploadMediaFiles = async (files: MediaFile[]) => {
    const uploadedFiles = []
    let featuredImageUrl = formData.featured_image // Manter a imagem destacada atual se houver

    for (const file of files) {
      try {
        // Usar a URL real do arquivo já enviado
        const fileData = {
          filename: file.name,
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          mime_type: file.file.type,
          url: file.url || file.preview,
          thumbnail_url: file.type === "image" ? (file.url || file.preview) : null,
          path: file.path,
        }
        
        uploadedFiles.push(fileData)
        
        // Se for uma imagem e não tiver imagem destacada, usar como imagem destacada
        if (file.type === "image" && !featuredImageUrl) {
          featuredImageUrl = file.url || file.preview
        }
      } catch (error) {
        console.error("Erro ao processar arquivo:", error)
      }
    }

    // Atualizar o estado da imagem destacada se necessário
    if (featuredImageUrl && featuredImageUrl !== formData.featured_image) {
      setFormData(prev => ({ ...prev, featured_image: featuredImageUrl }))
    }

    return uploadedFiles
  }

  const handleSubmit = async (e: React.FormEvent, status?: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validação básica
    if (!formData.title.trim()) {
      setError("O título é obrigatório")
      setIsLoading(false)
      return
    }

    if (!formData.content.trim()) {
      setError("O conteúdo é obrigatório")
      setIsLoading(false)
      return
    }

    try {
      console.log("Iniciando publicação da notícia...")

      const finalStatus = status || formData.status
      console.log("Status final:", finalStatus)

      // Fazer upload dos arquivos de mídia (se houver)
      let uploadedMedia = []
      if (mediaFiles.length > 0) {
        console.log("Fazendo upload de", mediaFiles.length, "arquivos...")
        uploadedMedia = await uploadMediaFiles(mediaFiles)
        console.log("Upload concluído:", uploadedMedia.length, "arquivos")
      }

      const dataToSave = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        featured_image: formData.featured_image,
        slug: formData.slug,
        status: finalStatus,
        published_at: finalStatus === "published" ? new Date().toISOString() : null,
        media_files: uploadedMedia.length > 0 ? uploadedMedia : [],
        featured_media_type: formData.featured_media_type,
      }

      console.log("Dados para salvar:", dataToSave)

      const url = initialData ? `/api/admin/news/${initialData.id}` : "/api/admin/news"

      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar notícia")
      }

      router.push("/admin/noticias")
      router.refresh()
    } catch (error: unknown) {
      console.error("Erro detalhado:", error)

      let errorMessage = "Ocorreu um erro inesperado"

      if (error instanceof Error) {
        errorMessage = `Erro: ${error.message}`
      } else if (typeof error === "object" && error !== null) {
        const errorObj = error as any
        if (errorObj.message) {
          errorMessage = `Erro: ${errorObj.message}`
        } else if (errorObj.error) {
          errorMessage = `Erro: ${errorObj.error}`
        }
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Botões de Ação */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/admin/noticias">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, "draft")} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Rascunho
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações principais da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Digite o título da notícia"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">URL (Slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-da-noticia"
              />
              <p className="text-xs text-gray-500">
                A URL será: {typeof window !== "undefined" ? window.location.origin : ""}/blog/{formData.slug}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Breve resumo da notícia (aparecerá na listagem)"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="featured_image">Imagem Destacada (URL)</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured_image: e.target.value }))}
                placeholder="https://exemplo.com/imagem.jpg"
                type="url"
              />
              <p className="text-xs text-gray-500">
                Ou use o upload de mídia abaixo para adicionar múltiplas imagens e vídeos
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicada</SelectItem>
                  <SelectItem value="archived">Arquivada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Mídia da Notícia
            </CardTitle>
            <CardDescription>Adicione imagens e vídeos para enriquecer o conteúdo da notícia</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaUpload
              onFilesChange={handleMediaFilesChange}
              onFeaturedImageChange={handleFeaturedImageChange}
              maxFiles={10}
              acceptedTypes={["image/*", "video/*"]}
              maxSize={50}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
            <CardDescription>Escreva o conteúdo completo da notícia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="content">Conteúdo *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Escreva o conteúdo completo da notícia aqui..."
                rows={15}
                required
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
