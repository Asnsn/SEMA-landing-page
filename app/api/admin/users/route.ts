import { NextRequest, NextResponse } from 'next/server'
import { createUser, getAllUsers } from '@/lib/database/neon'

export async function GET() {
  try {
    const users = await getAllUsers()
    
    // Remover password_hash dos dados retornados
    const usersWithoutPasswords = users.map(({ password_hash, ...user }) => user)
    
    return NextResponse.json({
      success: true,
      users: usersWithoutPasswords
    })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, full_name, role, password } = await request.json()

    if (!email || !full_name || !role || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Hash da senha (Base64 encoding)
    const password_hash = Buffer.from(password).toString('base64')

    // Criar usuário
    const user = await createUser({
      email,
      full_name,
      role,
      password_hash
    })

    // Retornar dados do usuário (sem a senha)
    const { password_hash: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
