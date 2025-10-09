import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from 'next/cache' // Adicionado para limpar o cache
import { updateNewsPost, deleteNewsPost } from "@/lib/database/supabase"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    const post = await updateNewsPost(id, {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      featured_image: data.featured_image,
      slug: data.slug,
      status: data.status,
      published_at: data.published_at,
      media_files: data.media_files, // Adicionado para permitir atualização de mídias
    })

    if (!post) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 })
    }

    // Revalida as páginas após a atualização
    revalidatePath('/admin/noticias')
    revalidatePath('/blog')
    revalidatePath('/')
    if (post.slug) {
      revalidatePath(`/blog/${post.slug}`)
    }

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
    const success = await deleteNewsPost(id)

    if (!success) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 })
    }

    // --- INÍCIO DA ALTERAÇÃO ---
    // Limpa o cache da página de admin
    revalidatePath('/admin/noticias')
    // Limpa o cache da página principal do blog
    revalidatePath('/blog')
    // Limpa o cache da página inicial
    revalidatePath('/')
    // --- FIM DA ALTERAÇÃO ---

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar notícia:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}