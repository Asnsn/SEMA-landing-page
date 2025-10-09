import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from 'next/cache' // <-- ADICIONE ESTA LINHA NO TOPO
import { createNewsPost } from "@/lib/database/supabase"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.title || !data.content || !data.slug) {
      return NextResponse.json({ error: "Título, conteúdo e slug são obrigatórios" }, { status: 400 })
    }

    const postData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || null,
      featured_image: data.featured_image || null,
      slug: data.slug,
      status: data.status || 'draft',
      media_files: data.media_files || [],
      featured_media_type: data.featured_media_type || 'image',
      published_at: data.published_at || null,
    }

    const post = await createNewsPost(postData)

    if (!post) {
      return NextResponse.json({ error: "Erro ao criar notícia no banco de dados" }, { status: 500 })
    }

    revalidatePath('/admin/noticias') // <-- ADICIONE ESTA LINHA AQUI

    return NextResponse.json({ success: true, id: post.id })
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return NextResponse.json({
      error: "Erro interno do servidor",
      details: error instanceof Error ? error.message : "Erro desconhecido"
    }, { status: 500 })
  }
}