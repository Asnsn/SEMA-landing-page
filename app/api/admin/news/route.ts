import { type NextRequest, NextResponse } from "next/server"
import { createNewsPost } from "@/lib/database/supabase"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Get current user from localStorage (this would need to be handled differently in production)
    // For now, we'll use a default author_id
    const defaultAuthorId = "1" // This should be replaced with proper authentication

    const post = await createNewsPost({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      featured_image: data.featured_image,
      slug: data.slug,
      status: data.status,
      author_id: defaultAuthorId,
    })

    if (!post) {
      return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: post.id })
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
