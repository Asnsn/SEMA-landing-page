"use client"

import { useState, useEffect } from "react"

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  logged_in: boolean
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('admin_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.logged_in) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        localStorage.removeItem('admin_user')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData: AdminUser) => {
    const userWithAuth = { ...userData, logged_in: true }
    localStorage.setItem('admin_user', JSON.stringify(userWithAuth))
    setUser(userWithAuth)
  }

  const logout = () => {
    localStorage.removeItem('admin_user')
    setUser(null)
  }

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'
  const isSuperAdmin = user?.role === 'super_admin'

  return {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isSuperAdmin,
    isAuthenticated: !!user?.logged_in
  }
}
