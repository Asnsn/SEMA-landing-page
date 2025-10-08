"use client"

import { useEffect, useState } from "react"

interface MaintenanceModeProps {
  isEnabled: boolean
}

export function MaintenanceMode({ isEnabled }: MaintenanceModeProps) {
  const [showMaintenance, setShowMaintenance] = useState(false)

  useEffect(() => {
    if (isEnabled) {
      setShowMaintenance(true)
    }
  }, [isEnabled])

  if (!showMaintenance) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site em Manutenção</h1>
          <p className="text-gray-600">
            Estamos realizando melhorias no site. Voltaremos em breve!
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Para mais informações, entre em contato:
          </p>
          <div className="text-sm text-gray-700">
            <p>📧 institutosemahortolandia@gmail.com</p>
            <p>📱 (19) 98917-8896</p>
          </div>
        </div>
      </div>
    </div>
  )
}
