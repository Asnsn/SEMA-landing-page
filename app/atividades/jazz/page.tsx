import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function JazzPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Dança</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Jazz na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Tem atraído principalmente jovens e adolescentes, que veem no jazz uma forma de expressão e de conexão com a música. 
                  Contribui para a flexibilidade e o ritmo, além de promover a criatividade e a autoestima.
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
                  src="/Jazz.jpeg"
                  alt="Jazz SEMA"
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
                    Alunas Atendidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">75</p>
                  <p className="text-sm text-muted-foreground">alunas (junto com ballet)</p>
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
                  <p className="text-2xl font-bold text-primary">Jovens</p>
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
                  <p className="text-2xl font-bold text-primary">Dança</p>
                  <p className="text-sm text-muted-foreground">contemporânea</p>
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
                Confira os horários disponíveis para as aulas de Jazz
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Sábado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">10:30 às 11:30</p>
                  <p className="text-sm text-muted-foreground">Aulas de jazz (após o ballet)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefícios do Jazz</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubra como o Jazz pode transformar a vida dos nossos alunos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Expressão</h3>
                  <p className="text-sm text-muted-foreground">Forma de expressão artística</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Conexão Musical</h3>
                  <p className="text-sm text-muted-foreground">Conexão com a música</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Flexibilidade</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvimento da flexibilidade</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Autoestima</h3>
                  <p className="text-sm text-muted-foreground">Promoção da criatividade e autoestima</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para se expressar através do Jazz?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se às nossas 75 alunas e descubra a magia da dança jazz
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
