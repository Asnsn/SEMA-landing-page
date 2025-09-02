import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"
import { DeleteNewsButton } from "@/components/admin/delete-news-button"

export default async function NoticiasPage() {
  const supabase = await createClient()

  // Buscar todas as notícias com informações do autor
  const { data: posts, error } = await supabase
    .from("news_posts")
    .select(`
      id,
      title,
      excerpt,
      status,
      created_at,
      updated_at,
      published_at,
      admin_users!inner(full_name, email)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar notícias:", error)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Publicada</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Rascunho</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Arquivada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notícias</h1>
          <p className="text-gray-600">Gerencie todas as notícias da SEMA</p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-orange-700">
          <Link href="/admin/noticias/nova">
            <Plus className="h-4 w-4 mr-2" />
            Nova Notícia
          </Link>
        </Button>
      </div>

      {/* Lista de Notícias */}
      {posts && posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt || "Sem descrição disponível"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(post.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>Autor:</strong> {post.admin_users?.full_name || post.admin_users?.email}
                    </p>
                    <p>
                      <strong>Criada:</strong> {new Date(post.created_at).toLocaleDateString("pt-BR")}
                    </p>
                    {post.published_at && (
                      <p>
                        <strong>Publicada:</strong> {new Date(post.published_at).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {post.status === "published" && (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/blog/${post.id}`} target="_blank">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/noticias/${post.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <DeleteNewsButton postId={post.id} postTitle={post.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Nenhuma notícia encontrada</h3>
                <p className="text-gray-500">Comece criando sua primeira notícia para a SEMA.</p>
              </div>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/admin/noticias/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Notícia
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
