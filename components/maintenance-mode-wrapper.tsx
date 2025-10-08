"use client"

import { useState, useEffect } from "react"
import MaintenanceMode from "./maintenance-mode"

export default function MaintenanceModeWrapper() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)

  useEffect(() => {
    // Verificar se está em modo de manutenção
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
  }, [])
  
  return <MaintenanceMode isEnabled={isMaintenanceMode} />
}
