import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export async function BlogSection() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("news_posts")
    .select(`
      id,
      title,
      excerpt,
      featured_image,
      slug,
      created_at,
      published_at,
      admin_users!inner(full_name)
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)

  const blogPosts = posts || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <section id="blog" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">Últimas Notícias</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
            Acompanhe as conquistas, eventos e novidades da SEMA. Fique por dentro de tudo que acontece em nossa
            instituição.
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image || "/placeholder.svg?height=200&width=400&query=SEMA news"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">SEMA</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-balance">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {post.excerpt || "Leia a notícia completa para saber mais detalhes."}
                    </CardDescription>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm">
                        Ler Mais
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button className="bg-primary hover:bg-primary/90">Ver Todas as Notícias</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Em breve, novas notícias da SEMA aparecerão aqui.</p>
            <div className="mt-4">
              <Link href="/blog">
                <Button variant="outline">Ver Página de Notícias</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
