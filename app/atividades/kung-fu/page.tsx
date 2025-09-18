import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function KungFuPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Arte Marcial</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Kung Fu na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Traz benefícios para a saúde física e mental dos alunos, por meio de exercícios posturais 
                  e de respiração dos praticantes. Estimula a disciplina, o foco, a paz interior e o respeito ao próximo.
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
                  src="/children-judo-martial-arts-class.png"
                  alt="Kung Fu SEMA"
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
                  <p className="text-3xl font-bold text-primary">21</p>
                  <p className="text-sm text-muted-foreground">alunos matriculados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    Faixa Etária
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Todas</p>
                  <p className="text-sm text-muted-foreground">as idades</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    Destaque 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-primary">Forte</p>
                  <p className="text-sm text-muted-foreground">adesão entre adolescentes</p>
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
                Confira os horários disponíveis para as aulas de Kung Fu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Terça e Quinta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">19:30 às 21:00</p>
                  <p className="text-sm text-muted-foreground">Aulas regulares</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sábado e Domingo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">10:00 às 11:30</p>
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
              <h2 className="text-3xl font-bold mb-4">Benefícios do Kung Fu</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubra como o Kung Fu pode transformar a vida dos nossos alunos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Saúde Física</h3>
                  <p className="text-sm text-muted-foreground">Exercícios posturais e de respiração</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Disciplina</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvimento do autocontrole</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Foco</h3>
                  <p className="text-sm text-muted-foreground">Concentração e atenção</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Respeito</h3>
                  <p className="text-sm text-muted-foreground">Valores e respeito ao próximo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada no Kung Fu?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se aos nossos 21 alunos e descubra os benefícios desta arte marcial milenar
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
