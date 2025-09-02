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
import { createClient } from "@/lib/supabase/client"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface NewsFormProps {
  initialData?: {
    id: string
    title: string
    content: string
    excerpt: string | null
    featured_image: string | null
    slug: string
    status: string
  }
}

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    featured_image: initialData?.featured_image || "",
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

  const handleSubmit = async (e: React.FormEvent, status?: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Verificar se o usuário está autenticado
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      const finalStatus = status || formData.status
      const dataToSave = {
        ...formData,
        status: finalStatus,
        published_at: finalStatus === "published" ? new Date().toISOString() : null,
      }

      if (initialData) {
        // Atualizar notícia existente
        const { error } = await supabase.from("news_posts").update(dataToSave).eq("id", initialData.id)

        if (error) throw error
      } else {
        // Criar nova notícia
        const { error } = await supabase.from("news_posts").insert({
          ...dataToSave,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/noticias")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro")
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
                A URL será: {window.location.origin}/blog/{formData.slug}
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
