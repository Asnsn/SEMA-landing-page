"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ADMIN_PASSWORD = "sema2024"

export default function Page() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (password === ADMIN_PASSWORD) {
        // Login bem-sucedido
        const userData = {
          id: "admin",
          email: "admin@sema.org.br",
          full_name: "Administrador SEMA",
          role: "admin",
          logged_in: true,
        }

        // Salvar no localStorage
        localStorage.setItem("admin_user", JSON.stringify(userData))
        
        // Definir cookie para o servidor
        document.cookie = `admin_user=${JSON.stringify(userData)}; path=/; max-age=86400; secure; samesite=lax`
        document.cookie = `admin-token=sema2024; path=/; max-age=86400; secure; samesite=lax`
        
        router.push("/admin")
      } else {
        setError("Senha incorreta")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login Admin</CardTitle>
              <CardDescription>Digite a senha para acessar o painel administrativo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha de Acesso</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite a senha"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-xs text-muted-foreground">
                  <p>Senha padrão: sema2024</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
