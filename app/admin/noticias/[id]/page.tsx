import { createClient } from "@/lib/supabase/server"
import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"

interface EditNoticiaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Buscar a notícia para edição
  const { data: post, error } = await supabase
    .from("news_posts")
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
      admin_users!inner(full_name, email)
    `)
    .eq("id", id)
    .single()

  if (error || !post) {
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
