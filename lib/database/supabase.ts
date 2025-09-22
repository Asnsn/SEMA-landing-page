import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Verificar se as variáveis estão configuradas (apenas em runtime, não durante build)
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL

if (isBuildTime) {
  console.warn("Build time: Supabase environment variables not configured")
}

// Cliente público (para operações do lado do cliente)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente com service role (para operações administrativas)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Função para verificar se as configurações são válidas
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
           process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// Interface para usuário admin
export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: "admin" | "super_admin"
  password_hash: string
  created_at: string
  updated_at: string
}

// Interface para posts de notícias
export interface NewsPost {
  id: string
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  slug: string
  status: "draft" | "published" | "archived"
  author_id: string
  created_at: string
  updated_at: string
  published_at?: string
  media_files?: any[]
  featured_media_type?: string
}

// Interface para configurações do site
export interface SiteSetting {
  id: string
  setting_key: string
  setting_value?: string
  setting_type: "text" | "boolean" | "json"
  description?: string
  category: string
  created_at: string
  updated_at: string
}

// Função para buscar usuário por email
export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase não configurado, retornando null")
    return null
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error("Erro ao buscar usuário:", error)
      return null
    }

    return data as AdminUser
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return null
  }
}

// Função para criar usuário
export async function createUser(userData: {
  email: string
  full_name: string
  role: "admin" | "super_admin"
  password_hash: string
}): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert([userData])
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar usuário:", error)
      return null
    }

    return data as AdminUser
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return null
  }
}

// Função para listar todos os usuários
export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Erro ao buscar usuários:", error)
      return []
    }

    return data as AdminUser[]
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }
}

// Função para atualizar usuário
export async function updateUser(
  id: string,
  userData: {
    email?: string
    full_name?: string
    role?: "admin" | "super_admin"
    password_hash?: string
  },
): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .update({ ...userData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar usuário:", error)
      return null
    }

    return data as AdminUser
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    return null
  }
}

// Função para deletar usuário
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('admin_users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Erro ao deletar usuário:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Erro ao deletar usuário:", error)
    return false
  }
}

// Função para testar conexão
export async function testConnection(): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase não configurado, retornando false")
    return false
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('count')
      .limit(1)

    return !error
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    return false
  }
}

// Função para buscar posts de notícias
export async function getNewsPosts(status?: string): Promise<NewsPost[]> {
  try {
    let query = supabaseAdmin
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar posts:", error)
      return []
    }

    return data as NewsPost[]
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return []
  }
}

// Função para criar post de notícia
export async function createNewsPost(postData: {
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  slug: string
  status: "draft" | "published" | "archived"
  author_id: string
  media_files?: any[]
  featured_media_type?: string
  published_at?: string
}): Promise<NewsPost | null> {
  console.log("=== INÍCIO DA FUNÇÃO createNewsPost ===")
  console.log("Dados recebidos:", JSON.stringify(postData, null, 2))

  if (!isSupabaseConfigured()) {
    console.warn("Supabase não configurado, retornando null")
    return null
  }

  try {
    const insertData = {
      ...postData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log("Dados para inserir:", JSON.stringify(insertData, null, 2))

    const { data, error } = await supabaseAdmin
      .from('news_posts')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar post:", error)
      console.error("Detalhes do erro:", JSON.stringify(error, null, 2))
      return null
    }

    console.log("Post criado com sucesso:", data)
    console.log("=== FIM DA FUNÇÃO createNewsPost ===")
    return data as NewsPost
  } catch (error) {
    console.error("Erro ao criar post:", error)
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A")
    return null
  }
}

// Função para buscar configurações do site
export async function getSiteSettings(): Promise<SiteSetting[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true })

    if (error) {
      console.error("Erro ao buscar configurações:", error)
      return []
    }

    return data as SiteSetting[]
  } catch (error) {
    console.error("Erro ao buscar configurações:", error)
    return []
  }
}

// Função para atualizar configuração do site
export async function updateSiteSetting(
  key: string,
  value: string
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('site_settings')
      .update({ 
        setting_value: value,
        updated_at: new Date().toISOString()
      })
      .eq('setting_key', key)

    if (error) {
      console.error("Erro ao atualizar configuração:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error)
    return false
  }
}

// Função para atualizar post de notícia
export async function updateNewsPost(
  id: string,
  postData: {
    title?: string
    content?: string
    excerpt?: string
    featured_image?: string
    slug?: string
    status?: "draft" | "published" | "archived"
    published_at?: string
  }
): Promise<NewsPost | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('news_posts')
      .update({ ...postData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar post:", error)
      return null
    }

    return data as NewsPost
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    return null
  }
}

// Função para deletar post de notícia
export async function deleteNewsPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('news_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Erro ao deletar post:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Erro ao deletar post:", error)
    return false
  }
}
