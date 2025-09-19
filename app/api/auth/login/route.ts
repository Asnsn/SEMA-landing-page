import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/database/neon'

export async function POST(request: NextRequest) {
  try {
    console.log('=== INÍCIO DO LOGIN ===')
    
    const { email, password } = await request.json()
    console.log('Email recebido:', email)
    console.log('Senha recebida:', password ? '[OCULTA]' : '[VAZIA]')

    if (!email || !password) {
      console.log('Erro: Email ou senha não fornecidos')
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('Buscando usuário no banco...')
    // Buscar usuário no banco
    const user = await getUserByEmail(email)
    console.log('Usuário encontrado:', user ? 'SIM' : 'NÃO')

    if (!user) {
      console.log('Erro: Usuário não encontrado')
      return NextResponse.json(
        { error: 'E-mail não encontrado' },
        { status: 401 }
      )
    }

    console.log('Usuário encontrado:', {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role
    })

    // Verificar senha (Base64 encoding)
    const hashedPassword = Buffer.from(password).toString('base64')
    console.log('Senha original:', password)
    console.log('Senha hashada:', hashedPassword)
    console.log('Senha armazenada:', user.password_hash)
    console.log('Senhas coincidem:', user.password_hash === hashedPassword)
    
    if (user.password_hash !== hashedPassword) {
      console.log('Erro: Senha incorreta')
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    console.log('Login bem-sucedido!')
    // Retornar dados do usuário (sem a senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}
