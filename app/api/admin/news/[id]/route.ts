import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database/neon"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    await query(
      `
      UPDATE news_posts 
      SET title = $1, content = $2, excerpt = $3, featured_image = $4, 
          slug = $5, status = $6, published_at = $7, updated_at = NOW()
      WHERE id = $8
    `,
      [data.title, data.content, data.excerpt, data.featured_image, data.slug, data.status, data.published_at, id],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Deletar a notícia
    const result = await query("DELETE FROM news_posts WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar notícia:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
