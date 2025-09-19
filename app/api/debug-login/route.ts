import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("=== DEBUG LOGIN ===")
    console.log("Email recebido:", email)
    console.log("Senha recebida:", password ? "***" : "vazia")

    // Buscar usuário
    const user = await getUserByEmail(email)
    console.log("Usuário encontrado:", user ? "SIM" : "NÃO")
    
    if (user) {
      console.log("Dados do usuário:", {
        id: user.id,
        email: user.email,
        role: user.role,
        password_hash_length: user.password_hash?.length,
        password_hash_start: user.password_hash?.substring(0, 10) + "..."
      })

      // Testar senha
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      console.log("Senha válida:", isValidPassword)

      return NextResponse.json({
        success: true,
        user_found: true,
        password_valid: isValidPassword,
        user_data: {
          id: user.id,
          email: user.email,
          role: user.role,
          password_hash_length: user.password_hash?.length,
          password_hash_start: user.password_hash?.substring(0, 10) + "..."
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        user_found: false,
        error: "Usuário não encontrado"
      })
    }

  } catch (error) {
    console.error("Erro no debug login:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    }, { status: 500 })
  }
}
