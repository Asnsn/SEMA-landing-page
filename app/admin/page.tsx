import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Users, Eye, Calendar } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Buscar estatísticas
  const [{ count: totalPosts }, { count: publishedPosts }, { count: draftPosts }, { count: totalAdmins }] =
    await Promise.all([
      supabase.from("news_posts").select("*", { count: "exact", head: true }),
      supabase.from("news_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("news_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("admin_users").select("*", { count: "exact", head: true }),
    ])

  // Buscar posts recentes
  const { data: recentPosts } = await supabase
    .from("news_posts")
    .select(`
      id,
      title,
      status,
      created_at,
      admin_users!inner(full_name)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel administrativo da SEMA</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Notícias</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts || 0}</div>
            <p className="text-xs text-muted-foreground">Todas as notícias criadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicadas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedPosts || 0}</div>
            <p className="text-xs text-muted-foreground">Visíveis no site</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{draftPosts || 0}</div>
            <p className="text-xs text-muted-foreground">Aguardando publicação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins || 0}</div>
            <p className="text-xs text-muted-foreground">Usuários com acesso</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/admin/noticias/nova">Nova Notícia</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/noticias">Gerenciar Notícias</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/" target="_blank">
                Ver Site
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notícias Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Notícias Recentes</CardTitle>
          <CardDescription>Últimas notícias criadas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {recentPosts && recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      Por {post.admin_users?.full_name} • {new Date(post.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : post.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.status === "published" ? "Publicada" : post.status === "draft" ? "Rascunho" : "Arquivada"}
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/noticias/${post.id}`}>Editar</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma notícia</h3>
              <p className="mt-1 text-sm text-gray-500">Comece criando sua primeira notícia.</p>
              <div className="mt-6">
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/admin/noticias/nova">Nova Notícia</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
