import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function JudoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Arte Marcial</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Judô na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Uma arte marcial milenar que ensina muito mais que técnicas de luta. O judô desenvolve respeito,
                  autocontrole, disciplina e confiança através de uma filosofia de vida baseada em valores.
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
                  alt="Judô SEMA"
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
                  <p className="text-2xl font-bold text-primary">5 a 17 anos</p>
                  <p className="text-sm text-muted-foreground mt-2">Turmas separadas por idade e graduação</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Horários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Segunda e Quarta:</strong> 17h às 18h30
                    </p>
                    <p>
                      <strong>Terça e Quinta:</strong> 17h às 18h30
                    </p>
                    <p>
                      <strong>Sábado:</strong> 10h às 11h30
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
                  <p className="text-sm text-muted-foreground mt-2">Kimono fornecido pela instituição</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Filosofia do Judô */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Filosofia do Judô</h2>
              <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground text-pretty">
                O judô é baseado em princípios fundamentais que guiam não apenas a prática, mas a vida dos praticantes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Jita Kyoei</CardTitle>
                  <CardDescription>Prosperidade e Benefícios Mútuos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ensina que o progresso individual deve contribuir para o bem-estar coletivo, promovendo cooperação e
                    solidariedade.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Seiryoku Zenyo</CardTitle>
                  <CardDescription>Melhor Uso da Energia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Princípio de eficiência que ensina a usar a força do oponente a seu favor, aplicável tanto no tatame
                    quanto na vida.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">Benefícios do Judô</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Autocontrole</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Desenvolve a capacidade de controlar impulsos e emoções
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Respeito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ensina respeito pelos outros, pelos professores e por si mesmo
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Confiança</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Aumenta a autoestima e confiança através do domínio das técnicas
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Defesa Pessoal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ensina técnicas eficazes de autodefesa de forma responsável
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Graduação */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Sistema de Graduação</h2>
                <p className="text-muted-foreground mb-6">
                  O judô possui um sistema de graduação por faixas que reconhece o progresso técnico e moral do
                  praticante.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded"></div>
                    <span className="text-sm">Faixa Branca - Iniciante</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-sm">Faixa Amarela - 1º Kyu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-400 rounded"></div>
                    <span className="text-sm">Faixa Laranja - 2º Kyu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Faixa Verde - 3º Kyu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Faixa Azul - 4º Kyu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-amber-800 rounded"></div>
                    <span className="text-sm">Faixa Marrom - 5º Kyu</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter">Exames de Faixa</h2>
                <p className="text-muted-foreground">
                  Os exames são realizados periodicamente e avaliam não apenas técnicas, mas também comportamento e
                  valores.
                </p>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Critérios de Avaliação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Domínio das técnicas da graduação</p>
                      <p>• Comportamento dentro e fora do tatame</p>
                      <p>• Frequência e dedicação aos treinos</p>
                      <p>• Respeito aos colegas e professores</p>
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full">Saiba Mais sobre Graduações</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
