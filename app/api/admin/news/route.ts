import { type NextRequest, NextResponse } from "next/server"
import { createNewsPost, getNewsPosts, supabaseAdmin } from "@/lib/database/supabase"
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

    // Buscar o usuário admin padrão
    const { data: adminUser, error: userError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('email', 'admin@sema.org.br')
      .single()

    if (userError || !adminUser) {
      console.error("Erro ao buscar usuário admin:", userError)
      return NextResponse.json({ error: "Usuário admin não encontrado" }, { status: 500 })
    }

    const defaultAuthorId = adminUser.id
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const posts = await getNewsPosts(status || undefined)
    
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Erro ao buscar notícias:", error)
    
    return NextResponse.json({ 
      error: "Erro interno do servidor", 
      details: error instanceof Error ? error.message : "Erro desconhecido" 
    }, { status: 500 })
  }
}
