import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/database/neon'

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEBUG LOGIN API ===')
    
    const { email, password } = await request.json()
    console.log('Email recebido:', email)
    console.log('Senha recebida:', password ? '[OCULTA]' : '[VAZIA]')

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email e senha são obrigatórios',
        step: 'validation'
      })
    }

    // Buscar usuário no banco
    console.log('Buscando usuário no banco...')
    const user = await getUserByEmail(email)
    console.log('Usuário encontrado:', user ? 'SIM' : 'NÃO')

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'E-mail não encontrado',
        step: 'user_lookup',
        email: email
      })
    }

    // Verificar senha
    const hashedPassword = Buffer.from(password).toString('base64')
    console.log('Senha original:', password)
    console.log('Senha hashada:', hashedPassword)
    console.log('Senha armazenada:', user.password_hash)
    console.log('Senhas coincidem:', user.password_hash === hashedPassword)
    
    if (user.password_hash !== hashedPassword) {
      return NextResponse.json({
        success: false,
        error: 'Senha incorreta',
        step: 'password_check',
        password_test: {
          original: password,
          hashed: hashedPassword,
          stored: user.password_hash,
          matches: user.password_hash === hashedPassword
        }
      })
    }

    // Retornar dados do usuário (sem a senha)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      step: 'login_success',
      user: userWithoutPassword,
      message: 'Login bem-sucedido!'
    })

  } catch (error) {
    console.error('Erro no debug login:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      step: 'server_error',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    })
  }
}
