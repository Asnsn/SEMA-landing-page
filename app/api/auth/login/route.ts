import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/database/neon'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail não encontrado' },
        { status: 401 }
      )
    }

    // Verificar senha (Base64 encoding)
    const hashedPassword = Buffer.from(password).toString('base64')
    
    if (user.password_hash !== hashedPassword) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    // Retornar dados do usuário (sem a senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
