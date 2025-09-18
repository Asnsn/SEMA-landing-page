import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BateriaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Música</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Bateria na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Oferece um canal de expressão artística, estimulando habilidades motoras e o gosto pela música. 
                  A atividade tem atraído crianças e adolescentes interessados em desenvolver o senso rítmico e trabalhar a coordenação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Inscreva-se Agora
                  </Button>
                  <Button size="lg" variant="outline">
                    Agendar Visita
                  </Button>
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Bateria SEMA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Informações Gerais */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    Alunos Atendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">32</p>
                  <p className="text-sm text-muted-foreground">alunos matriculados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    Público-Alvo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Crianças</p>
                  <p className="text-sm text-muted-foreground">e adolescentes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    Modalidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Música</p>
                  <p className="text-sm text-muted-foreground">percussão</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Horários */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Horários de Aula</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira os horários disponíveis para as aulas de Bateria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Segunda-feira</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">19:00 às 20:30</p>
                  <p className="text-sm text-muted-foreground">Aulas regulares</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sábado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">9:00 às 11:00</p>
                  <p className="text-sm text-muted-foreground">Aulas de fim de semana</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefícios da Bateria</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubra como a Bateria pode transformar a vida dos nossos alunos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Expressão Artística</h3>
                  <p className="text-sm text-muted-foreground">Canal de expressão musical</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Habilidades Motoras</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvimento da coordenação</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Senso Rítmico</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvimento do ritmo</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Gosto pela Música</h3>
                  <p className="text-sm text-muted-foreground">Estímulo musical</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para descobrir o ritmo da música?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se aos nossos 32 alunos e desenvolva suas habilidades musicais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Inscreva-se Agora
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Entre em Contato
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
