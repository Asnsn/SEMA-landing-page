"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, Video, File, Trash2, Eye } from "lucide-react"

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
  name: string
  size: number
  url?: string
  path?: string
}

// A interface de propriedades foi atualizada para receber 'files'
interface MediaUploadProps {
  files: MediaFile[] // <-- NOVA PROPRIEDADE
  onFilesChange: (files: MediaFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  maxSize?: number // em MB
}

export function MediaUpload({
  files, // <-- NOVA PROPRIEDADE
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/*'],
  maxSize = 50
}: MediaUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File): Promise<MediaFile | null> => {
    // ... (o resto desta função continua igual)
  }

  const handleFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    const validFiles: MediaFile[] = []

    for (const file of fileArray) {
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) return file.type.startsWith(type.slice(0, -1))
        return file.type === type
      })
      const isValidSize = file.size <= maxSize * 1024 * 1024

      if (isValidType && isValidSize && files.length + validFiles.length < maxFiles) {
        const uploadedFile = await uploadFile(file)
        if (uploadedFile) {
          validFiles.push(uploadedFile)
        }
      }
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]) // Apenas notifica o componente pai
    }
  }, [files, acceptedTypes, maxSize, maxFiles, onFilesChange])

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id)
    onFilesChange(updatedFiles) // Apenas notifica o componente pai
  }

  // ... (O resto do arquivo continua o mesmo, mas usando a prop 'files' em vez do estado local)
  return (
    // ...
  )
}