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
  },
  {
    id: "futebol",
    title: "Futebol",
    description:
      "Promovendo trabalho em equipe, disciplina e habilidades motoras através do esporte mais popular do Brasil.",
    image: "/children-playing-soccer-football.png",
    age: "6-18 anos",
  },
  {
    id: "judo",
    title: "Judô",
    description: "Ensinando respeito, autocontrole e defesa pessoal através desta arte marcial milenar.",
    image: "/children-judo-martial-arts-class.png",
    age: "5-17 anos",
  },
  {
    id: "capoeira",
    title: "Capoeira",
    description: "Celebrando a cultura brasileira através desta arte que combina luta, dança e música.",
    image: "/children-capoeira-brazilian-martial-arts.png",
    age: "6-16 anos",
  },
  {
    id: "volei",
    title: "Vôlei",
    description: "Desenvolvendo coordenação, estratégia e espírito de equipe através do voleibol.",
    image: "/children-volleyball-team-sport.png",
    age: "8-18 anos",
  },
  {
    id: "natacao",
    title: "Natação",
    description: "Promovendo saúde e segurança aquática através do ensino da natação.",
    image: "/children-swimming-pool-lessons.png",
    age: "4-18 anos",
  },
]

export function ActivitiesSection() {
  return (
    <section id="atividades" className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Nossas Atividades
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
            Oferecemos uma variedade de modalidades esportivas e culturais para o desenvolvimento integral de crianças e
            jovens em situação de vulnerabilidade social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">{activity.age}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">{activity.description}</CardDescription>
                <Link href={`/atividades/${activity.id}`}>
                  <Button variant="outline" size="sm">
                    Saiba Mais
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/atividades">
            <Button className="bg-primary hover:bg-primary/90">Ver Todas as Atividades</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
