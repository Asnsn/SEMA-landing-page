import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database/supabase"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login API chamada")

    const { email, password } = await request.json()
    console.log("[v0] Dados recebidos:", { email, password: "***" })

    if (!email || !password) {
      console.log("[v0] Dados faltando")
      return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 })
    }

    const jwtSecret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET
    if (!jwtSecret) {
      console.error("[v0] JWT_SECRET não configurado")
      return NextResponse.json({ error: "Configuração do servidor incompleta" }, { status: 500 })
    }

    // Buscar usuário no banco
    console.log("[v0] Buscando usuário no banco...")
    const user = await getUserByEmail(email)
    
    if (!user) {
      console.log("[v0] Usuário não encontrado")
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
    }

    console.log("[v0] Usuário encontrado:", { id: user.id, email: user.email, role: user.role })

    // Verificar senha
    console.log("[v0] Verificando senha...")
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    console.log("[v0] Senha válida:", isValidPassword)

    if (!isValidPassword) {
      console.log("[v0] Senha incorreta")
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
    }

    console.log("[v0] Gerando token JWT...")
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        jwtSecret,
        { expiresIn: "24h" },
      )

    // Retornar dados do usuário (sem a senha)
    const userData = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    }

    console.log("[v0] Login bem-sucedido, retornando dados")
    const response = NextResponse.json({ user: userData, token })
    response.cookies.set("admin-token", token, {
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
