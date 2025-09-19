import { NextResponse } from 'next/server'
import { testConnection, query } from '@/lib/database/neon'

export async function GET() {
  try {
    console.log('Testando conexão com o banco...')
    
    // Testar conexão básica
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Não foi possível conectar ao banco de dados' },
        { status: 500 }
      )
    }

    // Testar se a tabela admin_users existe
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'admin_users'
      ) as table_exists
    `)

    if (!tableCheck.rows[0].table_exists) {
      return NextResponse.json(
        { error: 'Tabela admin_users não existe' },
        { status: 500 }
      )
    }

    // Verificar se existem usuários
    const usersCheck = await query('SELECT COUNT(*) as user_count FROM admin_users')
    const userCount = parseInt(usersCheck.rows[0].user_count)

    // Buscar usuário específico
    const userCheck = await query(
      'SELECT id, email, full_name, role FROM admin_users WHERE email = $1',
      ['admin@sema.org.br']
    )

    // Testar hash de senha
    const testPassword = 'admin123'
    const hashedPassword = Buffer.from(testPassword).toString('base64')
    
    const passwordCheck = await query(
      'SELECT password_hash FROM admin_users WHERE email = $1',
      ['admin@sema.org.br']
    )

    const passwordMatch = passwordCheck.rows.length > 0 && 
                         passwordCheck.rows[0].password_hash === hashedPassword

    return NextResponse.json({
      success: true,
      connection: 'OK',
      table_exists: true,
      user_count: userCount,
      test_user: userCheck.rows.length > 0 ? {
        id: userCheck.rows[0].id,
        email: userCheck.rows[0].email,
        full_name: userCheck.rows[0].full_name,
        role: userCheck.rows[0].role
      } : null,
      password_test: {
        original: testPassword,
        hashed: hashedPassword,
        stored: passwordCheck.rows.length > 0 ? passwordCheck.rows[0].password_hash : null,
        matches: passwordMatch
      }
    })

  } catch (error) {
    console.error('Erro no teste de conexão:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}
