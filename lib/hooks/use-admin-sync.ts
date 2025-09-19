"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function useAdminSync() {
  const router = useRouter()

  useEffect(() => {
    const syncAdminUser = async () => {
      const supabase = createClient()
      
      try {
        // Verificar se o usuário está logado
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Verificar se já existe um registro na tabela admin_users
        const { data: existingAdmin, error: fetchError } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Erro ao verificar admin existente:', fetchError)
          return
        }

        // Se não existe, criar o registro
        if (!existingAdmin) {
          console.log('Sincronizando usuário admin...')
          
          const { error: insertError } = await supabase
            .from("admin_users")
            .insert({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin',
              role: user.user_metadata?.role || 'admin',
            })

          if (insertError) {
            console.error('Erro ao sincronizar admin:', insertError)
          } else {
            console.log('Admin sincronizado com sucesso!')
            // Recarregar a página para atualizar o estado
            router.refresh()
          }
        }
      } catch (error) {
        console.error('Erro na sincronização do admin:', error)
      }
    }

    syncAdminUser()
  }, [router])
}
