"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, ArrowLeft, User, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"

interface UserData {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export default function EditarUsuarioPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    role: "admin",
  })

  // Carregar dados do usuário
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return

      try {
        const response = await fetch(`/api/admin/users/${userId}`)

        if (!response.ok) {
          throw new Error("Erro ao carregar usuário")
        }

        const data = await response.json()

        setUserData(data.user)
        setFormData({
          email: data.user.email,
          full_name: data.user.full_name,
          role: data.user.role,
        })
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        setError("Erro ao carregar dados do usuário")
      }
    }

    loadUser()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validação básica
    if (!formData.email.trim()) {
      setError("O e-mail é obrigatório")
      setIsLoading(false)
      return
    }

    if (!formData.full_name.trim()) {
      setError("O nome completo é obrigatório")
      setIsLoading(false)
      return
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um e-mail válido")
      setIsLoading(false)
      return
    }

    try {
      console.log("Atualizando administrador...")

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.full_name,
          role: formData.role,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário")
      }

      console.log("Administrador atualizado com sucesso!")
      router.push("/admin/usuarios")
      router.refresh()
    } catch (error: unknown) {
      console.error("Erro ao atualizar administrador:", error)

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

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este administrador? Esta ação não pode ser desfeita.")) {
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      console.log("Excluindo administrador...")

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário")
      }

      console.log("Administrador excluído com sucesso!")
      router.push("/admin/usuarios")
      router.refresh()
    } catch (error: unknown) {
      console.error("Erro ao excluir administrador:", error)

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
      setIsDeleting(false)
    }
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando dados do usuário...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Botões de Ação */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/admin/usuarios">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </>
            )}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
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
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Editar Administrador
            </CardTitle>
            <CardDescription>Modifique as informações do administrador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Nome Completo *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="exemplo@email.com"
                required
              />
              <p className="text-xs text-gray-500">Este e-mail será usado para autenticação no sistema</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Função</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="super_admin">Super Administrador</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Super Administradores têm acesso total ao sistema</p>
            </div>

            <div className="grid gap-2">
              <Label>Data de Criação</Label>
              <Input
                value={new Date(userData.created_at).toLocaleDateString("pt-BR")}
                disabled
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
