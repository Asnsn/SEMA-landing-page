import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Variáveis de ambiente do Supabase não configuradas")
}

// Cliente Supabase para autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Interface para usuário autenticado
export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    role?: string
  }
}

// Função para fazer login
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Função para fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

// Função para obter usuário atual
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw new Error(error.message)
  }

  return user
}

// Função para verificar se usuário está autenticado
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Função para obter sessão atual
export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
