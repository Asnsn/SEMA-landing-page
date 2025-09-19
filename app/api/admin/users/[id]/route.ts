import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database/neon"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Deletar o usuário
    const result = await query("DELETE FROM admin_users WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar usuário:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
