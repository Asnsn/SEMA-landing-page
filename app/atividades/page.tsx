import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const activities = [
  {
    id: "ballet",
    title: "Ballet",
    description: "Desenvolvendo graça, disciplina e expressão artística através da dança clássica.",
    image: "/children-ballet-class-dancing.png",
    age: "4-16 anos",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "futebol",
    title: "Futebol",
    description:
      "Promovendo trabalho em equipe, disciplina e habilidades motoras através do esporte mais popular do Brasil.",
    image: "/children-playing-soccer-football.png",
    age: "6-18 anos",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "judo",
    title: "Judô",
    description: "Ensinando respeito, autocontrole e defesa pessoal através desta arte marcial milenar.",
    image: "/children-judo-martial-arts-class.png",
    age: "5-17 anos",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "capoeira",
    title: "Capoeira",
    description: "Celebrando a cultura brasileira através desta arte que combina luta, dança e música.",
    image: "/children-capoeira-brazilian-martial-arts.png",
    age: "6-16 anos",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "volei",
    title: "Vôlei",
    description: "Desenvolvendo coordenação, estratégia e espírito de equipe através do voleibol.",
    image: "/children-volleyball-team-sport.png",
    age: "8-18 anos",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "natacao",
    title: "Natação",
    description: "Promovendo saúde e segurança aquática através do ensino da natação.",
    image: "/children-swimming-pool-lessons.png",
    age: "4-18 anos",
    color: "bg-cyan-100 text-cyan-800",
  },
]

export default function AtividadesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BreadcrumbNav items={[{ label: "Atividades" }]} />

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                Nossas Atividades
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
                Descubra todas as modalidades esportivas e culturais que oferecemos para o desenvolvimento integral de
                crianças e jovens.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{activity.title}</CardTitle>
                      <span className={`text-sm px-2 py-1 rounded-full ${activity.color}`}>{activity.age}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">{activity.description}</CardDescription>
                    <Link href={`/atividades/${activity.id}`}>
                      <Button className="w-full">Saiba Mais</Button>
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
