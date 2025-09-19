import bcrypt from "bcryptjs"
import { getUserByEmail } from "./database/supabase"

export interface AuthUser {
  id: string
  email: string
  full_name: string
  role: "admin" | "super_admin"
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    }
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return null
  }
}

export function createSession(user: AuthUser): string {
  // Simple session token - in production, use JWT or proper session management
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      timestamp: Date.now(),
    }),
  )
}

export function validateSession(token: string): AuthUser | null {
  try {
    const decoded = JSON.parse(atob(token))

    // Check if token is not older than 24 hours
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    if (Date.now() - decoded.timestamp > maxAge) {
      return null
    }

    return {
      id: decoded.id,
      email: decoded.email,
      full_name: decoded.full_name,
      role: decoded.role,
    }
  } catch {
    return null
  }
}
