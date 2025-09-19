import { NextResponse } from 'next/server'
import { testConnection, getUserByEmail } from '@/lib/database/supabase'

export async function GET() {
  try {
    console.log('Testando conexão com o Supabase...')
    
    // Testar conexão básica
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Não foi possível conectar ao banco de dados' },
        { status: 500 }
      )
    }

    // Buscar usuário específico
    const testUser = await getUserByEmail('admin@sema.org.br')

    return NextResponse.json({
      success: true,
      connection: 'OK',
      database: 'Supabase',
      test_user: testUser ? {
        id: testUser.id,
        email: testUser.email,
        full_name: testUser.full_name,
        role: testUser.role,
        created_at: testUser.created_at
      } : null,
      message: testUser ? 'Usuário admin encontrado' : 'Usuário admin não encontrado'
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
