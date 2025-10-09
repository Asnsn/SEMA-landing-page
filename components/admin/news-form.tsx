"use client"

import type React from "react"
import { useState, useEffect } from "react"
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

// ... (interfaces)

export function NewsForm({ initialData }: NewsFormProps) {
  // ... (hooks e useEffect)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    featured_image: initialData?.featured_image || "",
    featured_media_type: initialData?.featured_media_type || "image",
    slug: initialData?.slug || "",
    status: initialData?.status || "draft",
  })
  
  // ... (useEffect para carregar mídias)

  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      if (!initialData) {
        return { ...prev, title, slug: generateSlug(title) };
      }
      return { ...prev, title };
    });
  };

  // ... (outras funções)

  return (
    <div className="space-y-6">
      {/* ... (cabeçalho com botões) */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações principais da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* ... (campo de título) */}
            <div className="grid gap-2">
              <Label htmlFor="slug">URL (Slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-da-noticia"
                // --- GARANTA QUE ESTA LINHA ESTEJA ASSIM ---
                disabled={!!initialData} 
              />
              <p className="text-xs text-gray-500">
                A URL não pode ser alterada após a publicação para não quebrar links existentes.
              </p>
            </div>
            {/* ... (resto do formulário) */}
          </CardContent>
        </Card>
        {/* ... (resto do formulário) */}
      </form>
    </div>
  )
}