"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { AuthUser } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("admin_user")

        if (!userData) {
          router.push("/auth/login-custom")
          return
        }

        const parsedUser = JSON.parse(userData)

        // Validate the session format
        if (parsedUser && parsedUser.id && parsedUser.email) {
          setUser(parsedUser)
        } else {
          localStorage.removeItem("admin_user")
          router.push("/auth/login-custom")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        localStorage.removeItem("admin_user")
        router.push("/auth/login-custom")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
