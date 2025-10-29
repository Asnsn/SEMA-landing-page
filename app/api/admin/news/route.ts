import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'
import { createNewsPost, isSupabaseConfigured } from "@/lib/database/supabase"

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        error: "Supabase não configurado",
        details: "Defina NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY no ambiente de execução."
      }, { status: 500 })
    }

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
      author_id: data.author_id, // preferir o author do cliente quando presente
      media_files: data.media_files || [],
      featured_media_type: data.featured_media_type || 'image',
      published_at: data.published_at || null,
    }

    const post = await createNewsPost(postData)
    if (!post) {
      throw new Error('Criação retornou vazio')
    }

    // --- INÍCIO DA ALTERAÇÃO ---
    // Limpa o cache da página de admin (já tínhamos feito)
    revalidatePath('/admin/noticias')
    // Limpa o cache da página principal do blog
    revalidatePath('/blog')
    // Limpa o cache da página inicial (que também mostra notícias)
    revalidatePath('/')
    // --- FIM DA ALTERAÇÃO ---

    return NextResponse.json({ success: true, id: post.id })
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return NextResponse.json({
      error: "Erro ao criar notícia no banco de dados",
      details: error instanceof Error ? error.message : "Erro desconhecido"
    }, { status: 500 })
  }
}