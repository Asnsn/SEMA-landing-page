"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function TestLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: "admin@sema.org.br",
    password: "admin123",
  })

  const handleTestLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('Testando login...')
      
      const response = await fetch('/api/debug-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Resposta da API:', data)
      
      setResult({
        status: response.status,
        data: data
      })

    } catch (error) {
      console.error('Erro no teste:', error)
      setResult({
        status: 'ERROR',
        data: { error: error instanceof Error ? error.message : 'Erro desconhecido' }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRealLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('Testando login real...')
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Resposta da API real:', data)
      
      setResult({
        status: response.status,
        data: data,
        api: 'real'
      })

    } catch (error) {
      console.error('Erro no login real:', error)
      setResult({
        status: 'ERROR',
        data: { error: error instanceof Error ? error.message : 'Erro desconhecido' },
        api: 'real'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Teste de Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Página para testar o sistema de login
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Teste de Login</CardTitle>
            <CardDescription>
              Teste o sistema de login com logs detalhados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="admin@sema.org.br"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="admin123"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleTestLogin}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testando...
                  </>
                ) : (
                  "Teste Debug"
                )}
              </Button>
              
              <Button
                onClick={handleRealLogin}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testando...
                  </>
                ) : (
                  "Login Real"
                )}
              </Button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium mb-2">
                  Resultado {result.api === 'real' ? '(API Real)' : '(API Debug)'}:
                </h3>
                <div className="text-sm">
                  <p><strong>Status:</strong> {result.status}</p>
                  <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
