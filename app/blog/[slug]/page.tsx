import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Buscar a notícia pelo slug
  const { data: post, error } = await supabase
    .from("news_posts")
    .select(`
      id,
      title,
      content,
      excerpt,
      featured_image,
      slug,
      created_at,
      published_at,
      admin_users!inner(full_name, email)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const formatContent = (content: string) => {
    // Converter quebras de linha em parágrafos
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.trim() === "") return null
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article className="py-16">
          <div className="container px-4 md:px-6 max-w-4xl">
            <BreadcrumbNav items={[{ label: "Notícias", href: "/blog" }, { label: post.title }]} />

            {/* Botão Voltar */}
            <div className="mb-8">
              <Button asChild variant="outline" size="sm">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar às Notícias
                </Link>
              </Button>
            </div>

            {/* Imagem Destacada */}
            {post.featured_image && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.featured_image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Cabeçalho do Post */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 text-balance">{post.title}</h1>

              {post.excerpt && <p className="text-xl text-gray-600 mb-6 text-pretty">{post.excerpt}</p>}

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Por {post.admin_users?.full_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                </div>
              </div>
            </header>

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none">{formatContent(post.content)}</div>

            {/* Rodapé do Post */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Publicado pela SEMA - Instituição Social de Hortolândia</div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/blog">Ver Mais Notícias</Link>
                </Button>
              </div>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
