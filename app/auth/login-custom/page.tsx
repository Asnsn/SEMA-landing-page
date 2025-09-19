"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Removido: import { createClient } from "@/lib/supabase/client"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CustomLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.password.trim()) {
      setError("A senha é obrigatória")
      setIsLoading(false)
      return
    }

    // Login simples - sem banco de dados
    const validEmail = "admin@sema.org.br"
    const validPassword = "admin123"

    console.log('Tentando login com:', formData.email, formData.password)
    console.log('Credenciais válidas:', validEmail, validPassword)

    if (formData.email === validEmail && formData.password === validPassword) {
      console.log('Login válido! Salvando no localStorage...')
      
      // Login bem-sucedido
      const userData = {
        id: 'admin-001',
        email: validEmail,
        full_name: 'Administrador SEMA',
        role: 'super_admin',
        logged_in: true
      }
      
      localStorage.setItem('admin_user', JSON.stringify(userData))
      console.log('Dados salvos no localStorage:', userData)
      
      // Verificar se foi salvo
      const saved = localStorage.getItem('admin_user')
      console.log('Verificação localStorage:', saved)
      
      console.log('Redirecionando para /admin...')
      // Redirecionar para o painel admin
      window.location.href = "/admin"
    } else {
      console.log('Credenciais inválidas!')
      setError("E-mail ou senha incorretos")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            SEMA Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Área administrativa da SEMA
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login Administrativo</CardTitle>
            <CardDescription>
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@sema.org.br"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site principal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
