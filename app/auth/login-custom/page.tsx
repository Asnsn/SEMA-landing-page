"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

    try {
      console.log("[v0] Iniciando login com:", { email: formData.email })

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("[v0] Resposta não é JSON:", contentType)
        const textResponse = await response.text()
        console.error("[v0] Resposta como texto:", textResponse)
        setError("Erro no servidor. Resposta inválida.")
        setIsLoading(false)
        return
      }

      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (response.ok && data.user) {
        // Login bem-sucedido
        const userData = {
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.full_name,
          role: data.user.role,
          logged_in: true,
        }

        localStorage.setItem("admin_user", JSON.stringify(userData))
        console.log("[v0] Login bem-sucedido, redirecionando...")

        // Redirecionar para o painel admin
        setTimeout(() => {
          window.location.href = "/admin"
        }, 100)
      } else {
        console.error("[v0] Login falhou:", data)
        setError(data.error || "E-mail ou senha incorretos")
      }
    } catch (error) {
      console.error("[v0] Erro no login:", error)
      setError("Erro interno do servidor. Tente novamente.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">SEMA Admin</h2>
          <p className="mt-2 text-sm text-gray-600">Área administrativa da SEMA</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login Administrativo</CardTitle>
            <CardDescription>Entre com suas credenciais de administrador</CardDescription>
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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
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
