import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getNewsPosts } from "@/lib/database/supabase"

export default async function BlogPage() {
  let blogPosts: any[] = []

  try {
    console.log("=== INÍCIO DA PÁGINA BLOG ===")
    const posts = await getNewsPosts('published')
    blogPosts = posts || []
    console.log("Posts recebidos na página:", blogPosts.length)
    if (blogPosts.length > 0) {
      console.log("Primeiro post na página:", {
        id: blogPosts[0].id,
        title: blogPosts[0].title,
        featured_image: blogPosts[0].featured_image,
        has_featured_image: !!(blogPosts[0].featured_image && blogPosts[0].featured_image.trim() !== '')
      })
    }
    console.log("=== FIM DA PÁGINA BLOG ===")
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    blogPosts = []
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content?.split(" ").length || 0
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min`
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BreadcrumbNav items={[{ label: "Notícias" }]} />

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                Notícias da SEMA
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
                Acompanhe todas as conquistas, eventos e novidades da nossa instituição. Histórias de transformação e
                esperança acontecem todos os dias.
              </p>
            </div>

            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">SEMA</span>
                        <span className="text-xs text-muted-foreground">{getReadTime(post.excerpt || "")}</span>
                      </div>
                      <CardTitle className="text-xl text-balance">{post.title}</CardTitle>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(post.published_at || post.created_at)} • Por {post.full_name}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {post.excerpt || "Leia a notícia completa para saber mais detalhes."}
                      </CardDescription>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Ler Matéria Completa
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia publicada</h3>
                <p className="text-gray-500">As notícias da SEMA aparecerão aqui quando forem publicadas.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
