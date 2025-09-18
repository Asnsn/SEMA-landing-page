import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const activities = [
  {
    id: "kung-fu",
    title: "Kung Fu",
    description: "Traz benefícios para a saúde física e mental dos alunos, por meio de exercícios posturais e de respiração dos praticantes. Estimula a disciplina, o foco, a paz interior e o respeito ao próximo.",
    image: "/children-judo-martial-arts-class.png",
    age: "Todas as idades",
    students: "21 alunos",
  },
  {
    id: "handebol",
    title: "Handebol",
    description: "Esporte coletivo que promove o trabalho em equipe, a competitividade saudável e o respeito pelas regras. Ensinamos técnicas básicas, como passes e posicionamento, e também valores como o trabalho em equipe e o respeito ao adversário.",
    image: "/children-volleyball-team-sport.png",
    age: "Todas as idades",
    students: "46 alunos",
  },
  {
    id: "futebol",
    title: "Futebol e Futsal",
    description: "Modalidades muito populares entre crianças e adolescentes, proporcionando uma forma segura e saudável de lazer. Essas atividades incentivam a prática esportiva regular e ensinam a importância do jogo limpo e do trabalho em equipe.",
    image: "/children-playing-soccer-football.png",
    age: "Todas as idades",
    students: "359 alunos",
  },
  {
    id: "ballet",
    title: "Ballet",
    description: "Com foco no público infantil e juvenil, o ballet é uma das atividades mais populares entre as crianças, proporcionando uma forma de expressão corporal e emocional. Trabalha a elegância, coordenação motora e postura dos alunos.",
    image: "/children-ballet-class-dancing.png",
    age: "Infantil e juvenil",
    students: "75 alunas",
  },
  {
    id: "capoeira",
    title: "Capoeira",
    description: "Contribui para o desenvolvimento físico, equilíbrio, mobilidade e a flexibilidade dos alunos e incentiva o trabalho em grupo e o respeito pela cultura afro-brasileira, por meio de atividades que misturam artes marciais, música e dança.",
    image: "/children-capoeira-brazilian-martial-arts.png",
    age: "Todas as idades",
    students: "23 alunos",
  },
  {
    id: "reforco-escolar",
    title: "Reforço Escolar",
    description: "Atendimento focado no auxílio aos alunos que têm dificuldades em matérias como português e matemática. Tem se mostrado fundamental para o desempenho escolar dos alunos, contribuindo para a permanência e o sucesso na escola.",
    image: "/children-computer-class-digital-inclusion.png",
    age: "Todas as idades",
    students: "18 alunos",
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{activity.students}</span>
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
