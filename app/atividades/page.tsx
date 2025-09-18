import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
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
    color: "bg-red-100 text-red-800",
    students: "21 alunos",
    schedule: "Terça e quinta das 19:30 às 21:00h | Sábado e domingo das 10:00 às 11:30h"
  },
  {
    id: "handebol",
    title: "Handebol",
    description: "Esporte coletivo que promove o trabalho em equipe, a competitividade saudável e o respeito pelas regras. Ensinamos técnicas básicas, como passes e posicionamento, e também valores como o trabalho em equipe e o respeito ao adversário.",
    image: "/children-volleyball-team-sport.png",
    age: "Todas as idades",
    color: "bg-blue-100 text-blue-800",
    students: "46 alunos",
    schedule: "Terça e quinta das 19:00 às 21:30h"
  },
  {
    id: "futebol",
    title: "Futebol e Futsal",
    description: "Modalidades muito populares entre crianças e adolescentes, proporcionando uma forma segura e saudável de lazer. Essas atividades incentivam a prática esportiva regular e ensinam a importância do jogo limpo e do trabalho em equipe.",
    image: "/children-playing-soccer-football.png",
    age: "Todas as idades",
    color: "bg-green-100 text-green-800",
    students: "136 alunos (futebol) + 223 alunos (futsal)",
    schedule: "Segunda, quarta e sexta das 19:30 às 21:00h | Sábado das 8:30 às 11:30h"
  },
  {
    id: "volei",
    title: "Vôlei",
    description: "Promove a interação social, o trabalho em equipe e a coordenação. Essa atividade se tornou uma das preferidas dos jovens, com aulas práticas e dinâmicas que envolvem o grupo e desenvolvem habilidades coletivas.",
    image: "/children-volleyball-team-sport.png",
    age: "Todas as idades",
    color: "bg-purple-100 text-purple-800",
    students: "37 alunos",
    schedule: "Sábado das 8:00 às 11:30h"
  },
  {
    id: "ballet",
    title: "Ballet",
    description: "Com foco no público infantil e juvenil, o ballet é uma das atividades mais populares entre as crianças, proporcionando uma forma de expressão corporal e emocional. Trabalha a elegância, coordenação motora e postura dos alunos.",
    image: "/children-ballet-class-dancing.png",
    age: "Infantil e juvenil",
    color: "bg-pink-100 text-pink-800",
    students: "75 alunas",
    schedule: "Sábado das 9:00 às 10:30h"
  },
  {
    id: "jazz",
    title: "Jazz",
    description: "Tem atraído principalmente jovens e adolescentes, que veem no jazz uma forma de expressão e de conexão com a música. Contribui para a flexibilidade e o ritmo, além de promover a criatividade e a autoestima.",
    image: "/children-ballet-class-dancing.png",
    age: "Jovens e adolescentes",
    color: "bg-purple-100 text-purple-800",
    students: "75 alunas (junto com ballet)",
    schedule: "Sábado das 10:30 às 11:30h"
  },
  {
    id: "zumba",
    title: "Zumba",
    description: "Combinando exercícios físicos com ritmos musicais animados, a zumba se tornou uma atividade bastante popular, atraindo não só jovens, mas também adultos que desejam manter a forma de maneira descontraída. O foco é promover bem-estar e saúde, além de estimular a autoestima e a socialização.",
    image: "/children-ballet-class-dancing.png",
    age: "Jovens e adultos",
    color: "bg-orange-100 text-orange-800",
    students: "38 alunas",
    schedule: "Sexta das 19:00 às 20:30h"
  },
  {
    id: "capoeira",
    title: "Capoeira",
    description: "Contribui para o desenvolvimento físico, equilíbrio, mobilidade e a flexibilidade dos alunos e incentiva o trabalho em grupo e o respeito pela cultura afro-brasileira, por meio de atividades que misturam artes marciais, música e dança. Também traz uma rica bagagem cultural, que desperta o interesse dos participantes pela história e pela cultura brasileira.",
    image: "/children-capoeira-brazilian-martial-arts.png",
    age: "Todas as idades",
    color: "bg-yellow-100 text-yellow-800",
    students: "23 alunos",
    schedule: "Quarta e sexta das 20:00 às 21:30h"
  },
  {
    id: "bateria",
    title: "Bateria",
    description: "Oferece um canal de expressão artística, estimulando habilidades motoras e o gosto pela música. A atividade tem atraído crianças e adolescentes interessados em desenvolver o senso rítmico e trabalhar a coordenação.",
    image: "/placeholder.svg",
    age: "Crianças e adolescentes",
    color: "bg-gray-100 text-gray-800",
    students: "32 alunos",
    schedule: "Segunda das 19:00 às 20:30h | Sábado das 9:00 às 11:00h"
  },
  {
    id: "croche",
    title: "Crochê",
    description: "Desenvolve habilidades manuais e criatividade, sendo muito procurada por jovens e adultos interessados em aprender uma nova técnica artística. Em 2024, o crochê se consolidou como uma atividade que, além de ensinar um ofício, promove a socialização e o bem-estar dos participantes.",
    image: "/placeholder.svg",
    age: "Jovens e adultos",
    color: "bg-pink-100 text-pink-800",
    students: "5 alunas",
    schedule: "Sábado das 9:30 às 11:00h"
  },
  {
    id: "reforco-escolar",
    title: "Reforço Escolar",
    description: "Atendimento focado no auxílio aos alunos que têm dificuldades em matérias como português e matemática. Tem se mostrado fundamental para o desempenho escolar dos alunos, contribuindo para a permanência e o sucesso na escola.",
    image: "/children-computer-class-digital-inclusion.png",
    age: "Todas as idades",
    color: "bg-blue-100 text-blue-800",
    students: "18 alunos",
    schedule: "Terça e quinta das 19:00 às 20:30h"
  },
  {
    id: "ingles",
    title: "Inglês",
    description: "Prepara os alunos para um mercado de trabalho mais competitivo, ampliando suas possibilidades profissionais e pessoais. Em 2024, expandimos as aulas de inglês devido à alta procura, reforçando a importância do aprendizado de uma segunda língua.",
    image: "/children-computer-class-digital-inclusion.png",
    age: "Todas as idades",
    color: "bg-green-100 text-green-800",
    students: "15 alunos",
    schedule: "Terça e quinta das 18:00 às 19:00h"
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
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">{activity.students}</span>
                        <span className="text-xs text-muted-foreground">{activity.age}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{activity.schedule}</p>
                    </div>
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
