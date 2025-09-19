"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/hooks/use-admin-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireSuperAdmin?: boolean
}

export function AuthGuard({ children, requireSuperAdmin = false }: AuthGuardProps) {
  const { user, loading, isAuthenticated, isSuperAdmin } = useAdminAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    console.log('AuthGuard - loading:', loading, 'isAuthenticated:', isAuthenticated)
    
    // Verificar localStorage diretamente para evitar problemas de timing
    const checkAuthDirectly = () => {
      try {
        const storedUser = localStorage.getItem('admin_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.logged_in) {
            console.log('AuthGuard - Usuário autenticado via localStorage direto')
            setIsChecking(false)
            return
          }
        }
      } catch (error) {
        console.error('Erro ao verificar localStorage:', error)
      }
      
      console.log('AuthGuard - Usuário não autenticado, redirecionando...')
      router.push("/auth/login-custom")
    }
    
    if (!loading) {
      checkAuthDirectly()
    }
  }, [loading, router])

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verificando autenticação...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Será redirecionado pelo useEffect
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return null // Será redirecionado pelo useEffect
  }

  return <>{children}</>
}
