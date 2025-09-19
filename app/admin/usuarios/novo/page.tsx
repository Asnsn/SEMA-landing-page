"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Removido: import { createClient } from "@/lib/supabase/client"
// Removido: import { createAdminClient } from "@/lib/supabase/admin"
import { Save, ArrowLeft, UserPlus, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NovoUsuarioPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    role: "admin",
    password: "",
    confirmPassword: "",
  })

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

    if (!formData.password.trim()) {
      setError("A senha é obrigatória")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
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
      console.log('Criando novo administrador...')
      
      // Verificar se o usuário está autenticado (usando nosso sistema customizado)
      const storedUser = localStorage.getItem('admin_user')
      if (!storedUser) throw new Error("Usuário não autenticado")
      
      const currentUser = JSON.parse(storedUser)
      if (!currentUser.logged_in) throw new Error("Usuário não autenticado")
      
      console.log('Usuário autenticado:', currentUser.email)

      // Fazer requisição para a API de criação de usuário
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.full_name,
          role: formData.role,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar usuário')
      }

      if (!data.success) {
        throw new Error('Erro ao criar usuário')
      }

      console.log('Usuário criado com sucesso:', data.user)

      console.log('Administrador criado com sucesso!')
      
      // Mostrar mensagem de sucesso
      alert(`Administrador criado com sucesso!
      
E-mail: ${formData.email}
Senha: ${formData.password}

O usuário já pode fazer login com essas credenciais!`)
      
      router.push("/admin/usuarios")
      router.refresh()
    } catch (error: unknown) {
      console.error('Erro ao criar administrador:', error)
      
      let errorMessage = "Ocorreu um erro inesperado"
      
      if (error instanceof Error) {
        errorMessage = `Erro: ${error.message}`
      } else if (typeof error === 'object' && error !== null) {
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
          <Link href="/admin/usuarios">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Criar Administrador
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
            <CardTitle>Novo Administrador</CardTitle>
            <CardDescription>
              Adicione um novo usuário com acesso ao painel administrativo.
              <br />
              <strong>Nota:</strong> O usuário será criado no sistema de autenticação e poderá fazer login imediatamente.
            </CardDescription>
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
              <p className="text-xs text-gray-500">
                Este e-mail será usado para autenticação no sistema
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Mínimo 6 caracteres"
                required
              />
              <p className="text-xs text-gray-500">
                A senha deve ter pelo menos 6 caracteres
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Digite a senha novamente"
                required
              />
              <p className="text-xs text-gray-500">
                Digite a mesma senha para confirmar
              </p>
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
              <p className="text-xs text-gray-500">
                Super Administradores têm acesso total ao sistema
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
