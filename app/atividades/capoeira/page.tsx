import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CapoeiraPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Cultura Brasileira</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Capoeira na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Uma arte genuinamente brasileira que combina luta, dança, música e história. A capoeira desenvolve
                  coordenação, ritmo, flexibilidade e conecta as crianças com suas raízes culturais.
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
                  src="/children-capoeira-brazilian-martial-arts.png"
                  alt="Capoeira SEMA"
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
                  <p className="text-2xl font-bold text-primary">6 a 16 anos</p>
                  <p className="text-sm text-muted-foreground mt-2">Turmas divididas por idade e experiência</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Segunda e Quarta:</strong> 16h às 17h30
                    </p>
                    <p>
                      <strong>Terça e Quinta:</strong> 18h às 19h30
                    </p>
                    <p>
                      <strong>Sábado:</strong> 14h às 16h (roda)
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
                  <p className="text-sm text-muted-foreground mt-2">Uniforme e instrumentos inclusos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* História da Capoeira */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">História da Capoeira</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-pretty">
                Conhecer a história é fundamental para entender a importância cultural desta arte brasileira.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Origens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Criada pelos escravos africanos no Brasil colonial como forma de resistência e preservação cultural.
                    Disfarçada como dança para escapar da repressão, desenvolveu-se como uma arte única no mundo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Patrimônio Cultural</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Reconhecida como Patrimônio Cultural Imaterial da Humanidade pela UNESCO em 2014, a capoeira é
                    símbolo da diversidade e resistência cultural brasileira.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Elementos da Capoeira */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Elementos da Capoeira</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Ginga</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Movimento base que desenvolve coordenação, equilíbrio e ritmo
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Música</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Berimbau, pandeiro e atabaque criam o ritmo que guia os movimentos
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Canto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cantigas tradicionais que contam histórias e preservam a cultura
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Roda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Círculo sagrado onde acontece o jogo e a troca de energia
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
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Benefícios da Capoeira</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Coordenação Motora</h3>
                      <p className="text-sm text-muted-foreground">
                        Desenvolve coordenação, equilíbrio e consciência corporal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Identidade Cultural</h3>
                      <p className="text-sm text-muted-foreground">
                        Conecta as crianças com a história e cultura brasileira
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Musicalidade</h3>
                      <p className="text-sm text-muted-foreground">Desenvolve senso rítmico e apreciação musical</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold">Socialização</h3>
                      <p className="text-sm text-muted-foreground">Promove interação social e respeito mútuo na roda</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter">Instrumentos</h2>
                <p className="text-muted-foreground">
                  Os alunos aprendem a tocar os instrumentos tradicionais da capoeira, desenvolvendo habilidades
                  musicais e compreensão cultural.
                </p>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Berimbau</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Instrumento principal que comanda o ritmo e o tipo de jogo na roda
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pandeiro e Atabaque</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Instrumentos de percussão que complementam o berimbau na orquestra
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full mt-6">Venha Conhecer Nossa Roda</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
