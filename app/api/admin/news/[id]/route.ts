import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'
import { updateNewsPost, deleteNewsPost } from "@/lib/database/supabase"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    // Sanitiza os campos permitidos para evitar enviar author_id inválido
    const isValidUuid = (v?: string) => !!v && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
    const updateData: any = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      featured_image: data.featured_image,
      slug: data.slug,
      status: data.status,
      published_at: data.published_at,
    }
    if (data.author_id && !isValidUuid(data.author_id)) {
      delete updateData.author_id
    }

    const post = await updateNewsPost(id, updateData)

    revalidatePath('/admin/noticias')
    revalidatePath('/blog')
    revalidatePath('/')
    if (post?.slug) {
      revalidatePath(`/blog/${post.slug}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({
      error: 'Erro ao atualizar notícia',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const success = await deleteNewsPost(id)

    if (!success) {
      return NextResponse.json({ error: "Notícia não encontrada" }, { status: 404 });
    }

    revalidatePath('/admin/noticias')
    revalidatePath('/blog')
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}