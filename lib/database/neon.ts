import { Pool } from 'pg'

// Configuração do pool de conexões PostgreSQL
// Usar NETLIFY_DATABASE_URL se disponível (Netlify), senão usar DATABASE_URL (local)
const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL ou NETLIFY_DATABASE_URL não configurada')
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

// Interface para usuário admin
export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'super_admin'
  password_hash: string
  created_at: Date
  updated_at: Date
}

// Função para executar queries
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// Função para buscar usuário por email
export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  try {
    const result = await query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email]
    )
    
    if (result.rows.length === 0) {
      return null
    }
    
    return result.rows[0] as AdminUser
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}

// Função para criar usuário
export async function createUser(userData: {
  email: string
  full_name: string
  role: 'admin' | 'super_admin'
  password_hash: string
}): Promise<AdminUser> {
  try {
    const result = await query(
      `INSERT INTO admin_users (email, full_name, role, password_hash) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userData.email, userData.full_name, userData.role, userData.password_hash]
    )
    
    return result.rows[0] as AdminUser
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

// Função para listar todos os usuários
export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    const result = await query(
      'SELECT * FROM admin_users ORDER BY created_at DESC'
    )
    
    return result.rows as AdminUser[]
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

// Função para atualizar usuário
export async function updateUser(id: string, userData: {
  email?: string
  full_name?: string
  role?: 'admin' | 'super_admin'
  password_hash?: string
}): Promise<AdminUser> {
  try {
    const fields = []
    const values = []
    let paramCount = 1

    if (userData.email !== undefined) {
      fields.push(`email = $${paramCount}`)
      values.push(userData.email)
      paramCount++
    }

    if (userData.full_name !== undefined) {
      fields.push(`full_name = $${paramCount}`)
      values.push(userData.full_name)
      paramCount++
    }

    if (userData.role !== undefined) {
      fields.push(`role = $${paramCount}`)
      values.push(userData.role)
      paramCount++
    }

    if (userData.password_hash !== undefined) {
      fields.push(`password_hash = $${paramCount}`)
      values.push(userData.password_hash)
      paramCount++
    }

    fields.push(`updated_at = NOW()`)
    values.push(id)

    const result = await query(
      `UPDATE admin_users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    )
    
    return result.rows[0] as AdminUser
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

// Função para deletar usuário
export async function deleteUser(id: string): Promise<void> {
  try {
    await query('DELETE FROM admin_users WHERE id = $1', [id])
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    throw error
  }
}

// Função para testar conexão
export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT 1')
    return true
  } catch (error) {
    console.error('Erro na conexão com o banco:', error)
    return false
  }
}
