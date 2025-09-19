import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database/neon"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Get current user from localStorage (this would need to be handled differently in production)
    // For now, we'll use a default author_id
    const defaultAuthorId = "1" // This should be replaced with proper authentication

    const result = await query(
      `
      INSERT INTO news_posts (
        title, content, excerpt, featured_image, slug, status, 
        published_at, author_id, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id
    `,
      [
        data.title,
        data.content,
        data.excerpt,
        data.featured_image,
        data.slug,
        data.status,
        data.published_at,
        defaultAuthorId,
      ],
    )

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
