import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BalletPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">Dança Clássica</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Ballet na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Desenvolvemos graça, disciplina e expressão artística através da dança clássica. Nossas aulas de
                  ballet proporcionam às crianças e jovens uma base sólida em técnica, postura e expressão corporal.
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
                  src="/children-ballet-class-dancing.png"
                  alt="Aula de Ballet SEMA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Informações Gerais */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Faixa Etária</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">4 a 16 anos</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Turmas divididas por idade e nível de experiência
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Segunda e Quarta:</strong> 14h às 15h30
                    </p>
                    <p>
                      <strong>Terça e Quinta:</strong> 16h às 17h30
                    </p>
                    <p>
                      <strong>Sábado:</strong> 9h às 10h30
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Investimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Gratuito</p>
                  <p className="text-sm text-muted-foreground mt-2">Atividade totalmente gratuita para a comunidade</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Benefícios do Ballet</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-pretty">
                O ballet oferece muito mais que movimentos graciosos - é uma ferramenta completa de desenvolvimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Disciplina</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Desenvolve autocontrole e responsabilidade através da prática regular
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Postura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Melhora o alinhamento corporal e a consciência postural
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Flexibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Aumenta a amplitude de movimento e previne lesões</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Expressão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Desenvolve a capacidade de comunicação através do movimento
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* O que oferecemos */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">O que Oferecemos</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Técnica Clássica</h3>
                      <p className="text-sm text-muted-foreground">
                        Ensino dos fundamentos do ballet clássico com metodologia adaptada para cada idade
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Apresentações</h3>
                      <p className="text-sm text-muted-foreground">
                        Oportunidades de apresentação em eventos da comunidade e festivais de dança
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Figurinos</h3>
                      <p className="text-sm text-muted-foreground">
                        Fornecemos figurinos e acessórios necessários para as apresentações
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Professores Qualificados</h3>
                      <p className="text-sm text-muted-foreground">
                        Equipe de profissionais formados em dança com experiência em ensino infantil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter">Como se Inscrever</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-sm">Venha conhecer nossa sede na Rua das Flores, 123 - Hortolândia</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-sm">Traga documentos da criança e comprovante de residência</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-sm">Faça a matrícula e escolha o horário mais conveniente</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <p className="text-sm">Comece as aulas e faça parte da família SEMA!</p>
                  </div>
                </div>
                <Button className="w-full mt-6">Entre em Contato</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
