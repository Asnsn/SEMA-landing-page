import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BreadcrumbNav items={[{ label: "Contato" }]} />

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                Entre em Contato
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
                Estamos aqui para ajudar. Entre em contato conosco para saber mais sobre nossas atividades ou como você
                pode contribuir.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informações de Contato */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Endereço
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Rua Lidia Lopes Moreira, 278
                      <br />
                      Hortolândia - SP
                      <br />
                      CEP: 13184-696 - Jd Carmen Cristina
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Telefone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">+55 (19) 98917-8896</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      E-mail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">contato@sema.org.br</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horário de Funcionamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Segunda a Sexta: 8h às 18h</p>
                      <p>Sábado: 8h às 12h</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Formulário de Contato */}
              <Card>
                <CardHeader>
                  <CardTitle>Envie uma Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" placeholder="Seu nome completo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(19) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assunto">Assunto</Label>
                      <Input id="assunto" placeholder="Como podemos ajudar?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea id="mensagem" placeholder="Conte-nos mais sobre sua dúvida ou interesse..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
