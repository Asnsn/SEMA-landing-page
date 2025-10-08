"use client"

import { useState, useEffect } from "react"

export function useMaintenance() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)

  useEffect(() => {
    // Verificar se está em modo de manutenção
    const checkMaintenanceMode = () => {
      if (typeof window !== 'undefined') {
        const settings = localStorage.getItem('sema_settings')
        if (settings) {
          try {
            const parsedSettings = JSON.parse(settings)
            setIsMaintenanceMode(parsedSettings.site_maintenance || false)
          } catch (error) {
            console.error('Erro ao verificar modo de manutenção:', error)
          }
        }
      }
    }

    checkMaintenanceMode()

    // Verificar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sema_settings') {
        checkMaintenanceMode()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return { isMaintenanceMode }
}
