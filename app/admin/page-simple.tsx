"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Settings, Users, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminPageSimple() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticação diretamente
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('admin_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.logged_in) {
            setUser(userData)
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
      }
      
      // Se não estiver autenticado, redirecionar
      router.push("/auth/login-custom")
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    router.push("/auth/login-custom")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-sm text-gray-600">Bem-vindo, {user.full_name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Notícias */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notícias
              </CardTitle>
              <CardDescription>
                Gerencie as notícias da SEMA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/noticias">
                  Gerenciar Notícias
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Usuários */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Usuários
              </CardTitle>
              <CardDescription>
                Gerencie os administradores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/usuarios">
                  Gerenciar Usuários
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Configurações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações
              </CardTitle>
              <CardDescription>
                Configure o site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/configuracoes">
                  Configurações
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status do Sistema */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Usuário logado:</strong> {user.email}</p>
                <p><strong>Nome:</strong> {user.full_name}</p>
                <p><strong>Função:</strong> {user.role}</p>
                <p><strong>Status:</strong> <span className="text-green-600">✅ Autenticado</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
