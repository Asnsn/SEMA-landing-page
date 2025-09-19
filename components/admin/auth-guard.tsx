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
    if (!loading) {
      if (!isAuthenticated) {
        // Redirecionar para login se não estiver autenticado
        router.push("/auth/login-custom")
        return
      }

      if (requireSuperAdmin && !isSuperAdmin) {
        // Redirecionar para página de erro se não for super admin
        router.push("/admin/unauthorized")
        return
      }

      setIsChecking(false)
    }
  }, [loading, isAuthenticated, isSuperAdmin, requireSuperAdmin, router])

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
