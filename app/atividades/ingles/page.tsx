import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function InglesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Idiomas</Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                  Inglês na SEMA
                </h1>
                <p className="text-muted-foreground md:text-lg text-pretty leading-relaxed">
                  Prepara os alunos para um mercado de trabalho mais competitivo, ampliando suas possibilidades profissionais e pessoais. 
                  Em 2024, expandimos as aulas de inglês devido à alta procura, reforçando a importância do aprendizado de uma segunda língua.
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
                  src="/children-computer-class-digital-inclusion.png"
                  alt="Inglês SEMA"
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
                  <p className="text-3xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">alunos matriculados</p>
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
                  <p className="text-2xl font-bold text-primary">Alta</p>
                  <p className="text-sm text-muted-foreground">procura e expansão</p>
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
            </div>
          </div>
        </section>

        {/* Horários */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Horários de Aula</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira os horários disponíveis para as aulas de Inglês
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Terça e Quinta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">18:00 às 19:00</p>
                  <p className="text-sm text-muted-foreground">Aulas de inglês</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefícios do Inglês</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubra como o Inglês pode transformar a vida dos nossos alunos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Mercado de Trabalho</h3>
                  <p className="text-sm text-muted-foreground">Preparação para competitividade</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Possibilidades</h3>
                  <p className="text-sm text-muted-foreground">Ampliação profissional e pessoal</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Segunda Língua</h3>
                  <p className="text-sm text-muted-foreground">Importância do aprendizado</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold mb-2">Expansão 2024</h3>
                  <p className="text-sm text-muted-foreground">Alta procura e crescimento</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para ampliar suas possibilidades?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se aos nossos 15 alunos e aprenda inglês na SEMA
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
