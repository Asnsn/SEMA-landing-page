import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    title: "Campeonato de Futebol SEMA 2024",
    excerpt:
      "Nossos jovens atletas se destacaram no campeonato regional, demonstrando todo o talento desenvolvido nos treinos.",
    date: "15 de Janeiro, 2024",
    image: "/youth-soccer-championship-celebration.png",
    category: "Esportes",
  },
  {
    title: "Apresentação de Ballet no Teatro Municipal",
    excerpt:
      "As alunas da SEMA emocionaram o público com uma apresentação inesquecível no Teatro Municipal de Hortolândia.",
    date: "8 de Janeiro, 2024",
    image: "/ballet-performance-theater-stage.png",
    category: "Cultura",
  },
  {
    title: "Novo Projeto: Inclusão Digital",
    excerpt:
      "Lançamos um novo projeto para ensinar informática básica às crianças, preparando-as para o futuro digital.",
    date: "2 de Janeiro, 2024",
    image: "/children-computer-class-digital-inclusion.png",
    category: "Educação",
  },
]

export function BlogSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-xl text-balance">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">{post.excerpt}</CardDescription>
                <Link href={`/blog/${index + 1}`}>
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
      </div>
    </section>
  )
}
