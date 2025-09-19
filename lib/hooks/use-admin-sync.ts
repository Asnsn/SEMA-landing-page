"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAdminSync() {
  const router = useRouter()

  useEffect(() => {
    const syncAdminUser = async () => {
      try {
        // Check if user is logged in via localStorage
        const userData = localStorage.getItem("admin_user")

        if (!userData) {
          console.log("No admin user found in localStorage")
          return
        }

        const user = JSON.parse(userData)

        if (!user.logged_in) {
          console.log("User not logged in")
          return
        }

        console.log("Admin user synced:", user.email)

        // In the new system, we don't need to sync with Supabase
        // The user data is already managed via localStorage and Neon database
      } catch (error) {
        console.error("Erro na sincronização do admin:", error)
      }
    }

    syncAdminUser()
  }, [router])
}
