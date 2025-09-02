import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

const allBlogPosts = [
  {
    title: "Campeonato de Futebol SEMA 2024",
    excerpt:
      "Nossos jovens atletas se destacaram no campeonato regional, demonstrando todo o talento desenvolvido nos treinos. Uma vitória que representa muito mais que um troféu.",
    date: "15 de Janeiro, 2024",
    image: "/youth-soccer-championship-celebration.png",
    category: "Esportes",
    readTime: "3 min",
  },
  {
    title: "Apresentação de Ballet no Teatro Municipal",
    excerpt:
      "As alunas da SEMA emocionaram o público com uma apresentação inesquecível no Teatro Municipal de Hortolândia. Arte e dedicação em cada movimento.",
    date: "8 de Janeiro, 2024",
    image: "/ballet-performance-theater-stage.png",
    category: "Cultura",
    readTime: "4 min",
  },
  {
    title: "Novo Projeto: Inclusão Digital",
    excerpt:
      "Lançamos um novo projeto para ensinar informática básica às crianças, preparando-as para o futuro digital. Tecnologia como ferramenta de transformação social.",
    date: "2 de Janeiro, 2024",
    image: "/children-computer-class-digital-inclusion.png",
    category: "Educação",
    readTime: "5 min",
  },
  {
    title: "Formatura da Turma de Judô 2023",
    excerpt:
      "Celebramos a formatura de mais uma turma de judô, onde os alunos demonstraram não apenas técnicas aprendidas, mas valores como disciplina e respeito.",
    date: "20 de Dezembro, 2023",
    image: "/judo-graduation-ceremony-children.png",
    category: "Esportes",
    readTime: "3 min",
  },
  {
    title: "Parceria com Escolas Municipais",
    excerpt:
      "Firmamos nova parceria com escolas municipais de Hortolândia para expandir nosso alcance e atender ainda mais crianças da comunidade.",
    date: "15 de Dezembro, 2023",
    image: "/school-partnership-community-meeting.png",
    category: "Institucional",
    readTime: "4 min",
  },
  {
    title: "Festival de Capoeira 2023",
    excerpt:
      "O tradicional Festival de Capoeira da SEMA reuniu grupos de toda a região em uma celebração da cultura brasileira e da arte da capoeira.",
    date: "10 de Dezembro, 2023",
    image: "/capoeira-festival-brazilian-culture.png",
    category: "Cultura",
    readTime: "6 min",
  },
]

export default function BlogPage() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBlogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl text-balance">{post.title}</CardTitle>
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">{post.excerpt}</CardDescription>
                    <Link href={`/blog/${index + 1}`}>
                      <Button variant="outline" size="sm">
                        Ler Matéria Completa
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
