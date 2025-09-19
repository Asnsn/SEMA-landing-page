"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecionando para o painel administrativo...</p>
    </div>
  )
}
