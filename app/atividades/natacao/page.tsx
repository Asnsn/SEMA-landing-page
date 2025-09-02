import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NatacaoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-cyan-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Esporte Aquático</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Natação na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  A natação é uma das atividades físicas mais completas que existem. Desenvolve força, resistência,
                  coordenação e promove saúde e segurança aquática para toda a vida.
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
                  src="/children-swimming-pool-lessons.png"
                  alt="Natação SEMA"
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
                  <p className="text-2xl font-bold text-primary">4 a 18 anos</p>
                  <p className="text-sm text-muted-foreground mt-2">Desde adaptação aquática até natação competitiva</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Segunda a Sexta:</strong> 7h às 11h
                    </p>
                    <p>
                      <strong>Segunda a Sexta:</strong> 14h às 18h
                    </p>
                    <p>
                      <strong>Sábado:</strong> 8h às 12h
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
                  <p className="text-sm text-muted-foreground mt-2">Equipamentos de segurança inclusos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Níveis de Ensino */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Níveis de Ensino</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-pretty">
                Metodologia progressiva que respeita o ritmo de cada aluno, desde o primeiro contato com a água até a
                natação competitiva.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Adaptação Aquática</CardTitle>
                  <CardDescription>4-6 anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Primeiro contato com a água através de brincadeiras e atividades lúdicas
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Iniciação</CardTitle>
                  <CardDescription>7-9 anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Aprendizagem dos movimentos básicos e respiração aquática
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Aperfeiçoamento</CardTitle>
                  <CardDescription>10-14 anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Desenvolvimento técnico dos quatro nados e resistência
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Competitivo</CardTitle>
                  <CardDescription>15-18 anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Treinamento focado em performance e participação em competições
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Os Quatro Nados */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Os Quatro Nados</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-pretty">
                Ensinamos todos os estilos oficiais da natação, desenvolvendo diferentes grupos musculares e
                habilidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Crawl (Nado Livre)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O nado mais rápido e eficiente. Desenvolve coordenação entre braços e pernas, além de ensinar
                    respiração lateral. Ideal para iniciantes por ser mais natural.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Costas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nado executado de costas, excelente para postura e fortalecimento das costas. Permite respiração
                    livre e é menos cansativo para iniciantes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Peito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nado mais técnico, que exige coordenação precisa. Desenvolve força nas pernas e é excelente para
                    resistência cardiovascular.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Borboleta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O nado mais desafiador tecnicamente. Desenvolve força do core e coordenação avançada. Ensinado
                    apenas para alunos mais experientes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Benefícios da Natação</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Exercício Completo</h3>
                      <p className="text-sm text-muted-foreground">
                        Trabalha todos os grupos musculares sem impacto nas articulações
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Capacidade Respiratória</h3>
                      <p className="text-sm text-muted-foreground">
                        Melhora significativamente a capacidade pulmonar e controle respiratório
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Segurança Aquática</h3>
                      <p className="text-sm text-muted-foreground">
                        Ensina habilidades essenciais de sobrevivência na água
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Baixo Impacto</h3>
                      <p className="text-sm text-muted-foreground">
                        Ideal para pessoas com problemas articulares ou lesões
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter">Nossa Estrutura</h2>
                <p className="text-muted-foreground">
                  Contamos com instalações modernas e seguras para proporcionar a melhor experiência aquática.
                </p>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Piscina Semi-Olímpica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        25 metros de comprimento com 6 raias, aquecida e com tratamento adequado da água
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Piscina Infantil</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Espaço dedicado para adaptação aquática das crianças menores
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vestiários Completos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Vestiários masculino e feminino com chuveiros quentes e armários
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full mt-6">Conheça Nossa Piscina</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
