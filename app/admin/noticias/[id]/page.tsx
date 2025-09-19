import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"
import { query } from "@/lib/database/neon"

interface EditNoticiaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {
  const { id } = await params

  let post: any = null

  try {
    const result = await query(
      `
      SELECT 
        np.id,
        np.title,
        np.content,
        np.excerpt,
        np.featured_image,
        np.slug,
        np.status,
        np.created_at,
        np.updated_at,
        np.published_at,
        au.full_name,
        au.email
      FROM news_posts np
      LEFT JOIN admin_users au ON np.author_id = au.id
      WHERE np.id = $1
    `,
      [id],
    )

    if (result.rows.length > 0) {
      post = result.rows[0]
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
