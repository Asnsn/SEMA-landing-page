import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database/neon"
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

    if (!process.env.JWT_SECRET) {
      console.error("[v0] JWT_SECRET não configurado")
      return NextResponse.json({ error: "Configuração do servidor incompleta" }, { status: 500 })
    }

    // Testando conexão com banco...
    console.log("[v0] Testando conexão com banco...")
    try {
      // Primeiro, testar se a conexão funciona
      await sql`SELECT 1`
      console.log("[v0] Conexão com banco OK")

      // Verificar se a tabela admin_users existe
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'admin_users'
        )
      `

      console.log("[v0] Tabela admin_users existe:", tableCheck[0]?.exists)

      if (!tableCheck[0]?.exists) {
        console.error("[v0] Tabela admin_users não existe!")
        return NextResponse.json(
          {
            error: "Banco de dados não configurado",
            details: "Tabela admin_users não encontrada. Execute o script SQL primeiro.",
          },
          { status: 500 },
        )
      }

      // Buscar usuário no banco usando template literal
      console.log("[v0] Buscando usuário no banco...")
      const result = await sql`SELECT * FROM admin_users WHERE email = ${email}`
      console.log("[v0] Resultado da busca:", result.length, "usuários encontrados")

      if (result.length === 0) {
        console.log("[v0] Usuário não encontrado")
        return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
      }

      const user = result[0]
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
        process.env.JWT_SECRET,
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
    } catch (dbError) {
      console.error("[v0] Erro específico do banco:", dbError)
      return NextResponse.json(
        {
          error: "Erro de conexão com banco de dados",
          details: dbError instanceof Error ? dbError.message : "Erro desconhecido no banco",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Erro geral no login:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 },
    )
  }
}
