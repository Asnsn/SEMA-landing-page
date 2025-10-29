import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'
import { updateNewsPost, deleteNewsPost } from "@/lib/database/supabase"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()
    const post = await updateNewsPost(id, data)

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