import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/database/supabase"

// Adicionado para garantir que a página sempre busque os dados mais recentes
export const dynamic = 'force-dynamic'

interface EditNoticiaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {
  const { id } = await params

  let post: any = null

  try {
    const { data, error } = await supabaseAdmin
      .from('news_posts')
      .select(`
        id,
        title,
        content,
        excerpt,
        featured_image,
        slug,
        status,
        created_at,
        updated_at,
        published_at,
        author_id,
        admin_users(full_name, email) // SEM o "!inner"
      `)
      .eq('id', id)
      .single()

    if (data && !error) {
      post = {
        ...data,
        full_name: data.admin_users?.full_name,
        email: data.admin_users?.email
      }
    }
  } catch (error) {
    console.error("Erro ao buscar notícia:", error)
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Notícia</h1>
        <p className="text-gray-600">Edite a notícia: {post.title}</p>
      </div>

      <NewsForm initialData={post} />
    </div>
  )
}