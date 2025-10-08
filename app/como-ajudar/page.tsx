import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Gift, Handshake, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

export default function ComoAjudarPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BreadcrumbNav items={[{ label: "Como Ajudar" }]} />

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                Como Você Pode Ajudar
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
                Existem várias maneiras de contribuir com a SEMA e fazer a diferença na vida de crianças e jovens de
                Hortolândia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Doação Financeira</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Contribua financeiramente para manter nossas atividades e expandir nosso alcance.
                  </CardDescription>
                  <Link href="/apoie-nossa-causa">
                    <Button className="w-full">Fazer Doação</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Voluntariado</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Doe seu tempo e habilidades para ajudar em nossas atividades e eventos.
                  </CardDescription>
                  <Link href="/contato">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ser Voluntário
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Doação de Materiais</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Doe equipamentos esportivos, uniformes ou materiais para nossas atividades.
                  </CardDescription>
                  <Link href="/contato">
                    <Button variant="outline" className="w-full bg-transparent">
                      Doar Materiais
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Parcerias</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Empresas podem se tornar parceiras e apoiar nossos projetos sociais.
                  </CardDescription>
                  <Link href="/contato">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ser Parceiro
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Divulgação</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Ajude a divulgar nosso trabalho nas redes sociais e para seus conhecidos.
                  </CardDescription>
                  <Button variant="outline" className="w-full bg-transparent">
                    Compartilhar
                  </Button>
                </CardContent>
              </Card>

            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Sua Contribuição Faz a Diferença</CardTitle>
                <CardDescription className="text-lg">
                  Cada doação, por menor que seja, ajuda a transformar vidas através do esporte e da cultura.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/apoie-nossa-causa">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Fazer Doação Agora
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button size="lg" variant="outline">
                      Falar Conosco
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
