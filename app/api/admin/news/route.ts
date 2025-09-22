import { type NextRequest, NextResponse } from "next/server"
import { createNewsPost } from "@/lib/database/supabase"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Dados recebidos na API:", data)

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
      media_files: data.media_files || [],
      featured_media_type: data.featured_media_type || 'image',
      published_at: data.published_at,
    })

    if (!post) {
      console.error("Erro ao criar post - retornou null")
      return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 })
    }

    console.log("Post criado com sucesso:", post.id)
    return NextResponse.json({ success: true, id: post.id })
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return NextResponse.json({ 
      error: "Erro interno do servidor", 
      details: error instanceof Error ? error.message : "Erro desconhecido" 
    }, { status: 500 })
  }
}
