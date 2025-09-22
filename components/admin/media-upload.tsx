"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  File,
  Trash2,
  Eye,
  Download
} from "lucide-react"

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

interface MediaUploadProps {
  onFilesChange: (files: MediaFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  maxSize?: number // em MB
}

export function MediaUpload({ 
  onFilesChange, 
  maxFiles = 10, 
  acceptedTypes = ['image/*', 'video/*'],
  maxSize = 50 
}: MediaUploadProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File): Promise<MediaFile | null> => {
    try {
      setUploading(true)
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro no upload')
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erro no upload')
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: result.url,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        name: file.name,
        size: file.size,
        url: result.url,
        path: result.path
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    const validFiles: MediaFile[] = []

    for (const file of fileArray) {
      // Verificar tipo de arquivo
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1))
        }
        return file.type === type
      })

      // Verificar tamanho
      const isValidSize = file.size <= maxSize * 1024 * 1024

      if (isValidType && isValidSize && files.length + validFiles.length < maxFiles) {
        const uploadedFile = await uploadFile(file)
        if (uploadedFile) {
          validFiles.push(uploadedFile)
        }
      }
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    }
  }, [files, acceptedTypes, maxSize, maxFiles, onFilesChange])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {/* Área de Upload */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <Upload className={`h-8 w-8 mx-auto ${uploading ? 'text-primary animate-pulse' : 'text-gray-400'}`} />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {uploading ? 'Fazendo upload...' : 'Arraste arquivos aqui ou clique para selecionar'}
            </p>
            <p className="text-xs text-gray-500">
              Imagens e vídeos até {maxSize}MB cada
            </p>
            <p className="text-xs text-gray-500">
              Máximo {maxFiles} arquivos
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            Arquivos Selecionados ({files.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="relative">
                <CardContent className="p-3">
                  {/* Preview */}
                  <div className="aspect-video bg-gray-100 rounded-md mb-2 overflow-hidden">
                    {file.type === 'image' ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={file.preview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    )}
                  </div>

                  {/* Informações do arquivo */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.file.type)}
                      <span className="text-xs font-medium text-gray-900 truncate">
                        {file.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex justify-end space-x-1 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(file.preview, '_blank')}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
