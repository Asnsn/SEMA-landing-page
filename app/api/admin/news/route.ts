import { type NextRequest, NextResponse } from "next/server"
import { createNewsPost } from "@/lib/database/supabase"
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log("=== INÍCIO DA API DE CRIAÇÃO DE NOTÍCIA ===")
    
    const data = await request.json()
    console.log("Dados recebidos na API:", JSON.stringify(data, null, 2))

    // Validação dos dados obrigatórios
    if (!data.title) {
      console.error("Título não fornecido")
      return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 })
    }

    if (!data.content) {
      console.error("Conteúdo não fornecido")
      return NextResponse.json({ error: "Conteúdo é obrigatório" }, { status: 400 })
    }

    if (!data.slug) {
      console.error("Slug não fornecido")
      return NextResponse.json({ error: "Slug é obrigatório" }, { status: 400 })
    }

    // Get current user from localStorage (this would need to be handled differently in production)
    // For now, we'll use the provided admin user ID
    const defaultAuthorId = "13a874dc-b22d-4013-b903-a29747c208dd" // ID do usuário admin obtido do Supabase
    console.log("Usando ID do admin:", defaultAuthorId)

    console.log("Preparando dados para criar post...")
    const postData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || null,
      featured_image: data.featured_image || null,
      slug: data.slug,
      status: data.status || 'draft',
      author_id: defaultAuthorId,
      media_files: data.media_files || [],
      featured_media_type: data.featured_media_type || 'image',
      published_at: data.published_at || null,
    }

    console.log("Dados do post:", JSON.stringify(postData, null, 2))

    const post = await createNewsPost(postData)

    if (!post) {
      console.error("Erro ao criar post - retornou null")
      return NextResponse.json({ error: "Erro ao criar notícia no banco de dados" }, { status: 500 })
    }

    console.log("Post criado com sucesso:", post.id)
    console.log("=== FIM DA API DE CRIAÇÃO DE NOTÍCIA ===")
    return NextResponse.json({ success: true, id: post.id })
  } catch (error) {
    console.error("=== ERRO NA API DE CRIAÇÃO DE NOTÍCIA ===")
    console.error("Erro ao criar notícia:", error)
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A")
    console.error("=== FIM DO ERRO ===")
    
    return NextResponse.json({ 
      error: "Erro interno do servidor", 
      details: error instanceof Error ? error.message : "Erro desconhecido" 
    }, { status: 500 })
  }
}
