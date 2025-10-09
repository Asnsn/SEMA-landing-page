"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
// ... (outros imports)
import Link from "next/link"
import { MediaUpload } from "./media-upload"

// ... (interfaces)

export function NewsForm({ initialData }: NewsFormProps) {
  // ... (outros hooks useState)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  // ...

  useEffect(() => {
    if (initialData?.media_files && Array.isArray(initialData.media_files)) {
        const existingMedia = initialData.media_files.map((fileData: any) => ({
            id: fileData.path || fileData.url,
            preview: fileData.url,
            url: fileData.url,
            path: fileData.path,
            name: fileData.filename || fileData.original_name,
            type: fileData.mime_type?.startsWith('image/') ? 'image' : 'video',
            size: fileData.file_size || 0,
            file: new File([], fileData.filename || 'arquivo existente'),
        }));
        setMediaFiles(existingMedia);
    }
  }, [initialData]);

  // ... (outras funções handle)

  const handleMediaFilesChange = (files: MediaFile[]) => {
    setMediaFiles(files); // Esta função agora é a única fonte da verdade
    const firstImage = files.find(file => file.type === 'image');
    setFormData(prev => ({
      ...prev,
      featured_image: firstImage?.url || '' // Atualiza ou limpa a imagem destacada
    }));
  }

  // ... (função handleSubmit)

  return (
    <div className="space-y-6">
      {/* ... (código JSX do formulário) */}
      <Card>
        <CardHeader>
            {/* ... */}
        </CardHeader>
        <CardContent>
          <MediaUpload
            files={mediaFiles} // <-- AQUI ESTÁ A MUDANÇA: Passando o estado para o componente
            onFilesChange={handleMediaFilesChange}
            maxFiles={10}
            acceptedTypes={["image/*", "video/*"]}
            maxSize={50}
          />
        </CardContent>
      </Card>
      {/* ... (resto do código JSX) */}
    </div>
  )
}