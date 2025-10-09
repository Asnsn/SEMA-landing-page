import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/database/supabase"

export const dynamic = 'force-dynamic'

interface EditNoticiaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {
  const { id } = await params
  console.log(`[DEBUG] Carregando página de edição para o ID: ${id}`); // Log 1: Mostra o ID

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
        media_files
      `)
      .eq('id', id)
      .single()

    // --- INÍCIO DOS LOGS DE DEPURAÇÃO ---
    if (error) {
      console.error('[DEBUG] Erro retornado pelo Supabase:', error); // Log 2: Mostra o erro exato do Supabase
    }
    if (!data) {
      console.warn('[DEBUG] Nenhum dado (data) foi retornado pelo Supabase.'); // Log 3: Confirma se os dados estão vazios
    }
    // --- FIM DOS LOGS DE DEPURAÇÃO ---

    if (data && !error) {
      console.log(`[DEBUG] Notícia encontrada com sucesso: ${data.title}`); // Log 4: Confirma o sucesso
      post = data
    }
  } catch (error) {
    console.error("[DEBUG] Erro CRÍTICO ao buscar notícia para edição:", error); // Log 5: Captura erros maiores
  }

  if (!post) {
    console.log(`[DEBUG] "post" é nulo. Acionando notFound() para o ID: ${id}`); // Log 6: Confirma por que o 404 é chamado
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