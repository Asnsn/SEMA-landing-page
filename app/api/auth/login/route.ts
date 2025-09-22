import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login API chamada com Supabase Auth")

    const { email, password } = await request.json()
    console.log("[v0] Dados recebidos:", { email, password: "***" })

    if (!email || !password) {
      console.log("[v0] Dados faltando")
      return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 })
    }

    // Configurar cliente Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Variáveis do Supabase não configuradas")
      return NextResponse.json({ error: "Configuração do servidor incompleta" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fazer login usando Supabase Auth
    console.log("[v0] Fazendo login com Supabase Auth...")
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.log("[v0] Erro na autenticação:", authError.message)
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
    }

    if (!authData.user) {
      console.log("[v0] Usuário não retornado")
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
    }

    console.log("[v0] Login bem-sucedido:", { id: authData.user.id, email: authData.user.email })

    // Buscar dados adicionais do usuário na tabela admin_users
    const { data: userData, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError) {
      console.log("[v0] Erro ao buscar dados do usuário:", userError.message)
      // Se não encontrar na tabela admin_users, usar dados básicos do Supabase Auth
      const basicUserData = {
        id: authData.user.id,
        email: authData.user.email,
        full_name: authData.user.user_metadata?.full_name || 'Administrador',
        role: 'admin',
      }

      const response = NextResponse.json({ user: basicUserData })
      response.cookies.set("admin-token", authData.session?.access_token || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 horas
      })

      return response
    }

    // Retornar dados completos do usuário
    const userDataResponse = {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      role: userData.role,
    }

    console.log("[v0] Login bem-sucedido, retornando dados completos")
    const response = NextResponse.json({ user: userDataResponse })
    response.cookies.set("admin-token", authData.session?.access_token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 horas
    })

    return response
  } catch (error) {
    console.error("[v0] Erro geral no login:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 },
    )
  }
}
