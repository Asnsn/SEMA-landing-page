import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, Users } from "lucide-react"

export default function ApoieNossaCausaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <BreadcrumbNav items={[{ label: "Apoie Nossa Causa" }]} />

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
                Apoie Nossa Causa
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg text-pretty">
                Sua doação ajuda a manter nossas atividades e a transformar a vida de centenas de crianças e jovens em
                Hortolândia.
              </p>
            </div>

            {/* Valores de Doação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    Mais Popular
                  </Badge>
                  <CardTitle className="text-2xl">R$ 50</CardTitle>
                  <CardDescription>Doação Mensal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajuda a custear materiais esportivos para uma criança por um mês.
                  </p>
                  <Button className="w-full">Doar R$ 50</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">R$ 100</CardTitle>
                  <CardDescription>Doação Mensal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cobre os custos de uma atividade completa para duas crianças.
                  </p>
                  <Button className="w-full">Doar R$ 100</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">R$ 200</CardTitle>
                  <CardDescription>Doação Mensal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Patrocina um professor especializado por um mês.</p>
                  <Button className="w-full">Doar R$ 200</Button>
                </CardContent>
              </Card>
            </div>

            {/* Doação Personalizada */}
            <Card className="mb-12">
              <CardHeader className="text-center">
                <CardTitle>Valor Personalizado</CardTitle>
                <CardDescription>Escolha o valor que deseja doar. Qualquer quantia faz a diferença!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <input
                        type="number"
                        placeholder="0,00"
                        className="w-full pl-8 pr-4 py-2 border rounded-md"
                        min="1"
                      />
                    </div>
                  </div>
                  <Button>Doar Agora</Button>
                </div>
              </CardContent>
            </Card>

            {/* Formas de Pagamento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Formas de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span>Cartão de Crédito ou Débito</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <span>PIX</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <span>Transferência Bancária</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Impacto da Sua Doação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">R$ 25/mês</span>
                      <span className="text-sm text-muted-foreground">Uniforme completo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">R$ 50/mês</span>
                      <span className="text-sm text-muted-foreground">Materiais esportivos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">R$ 100/mês</span>
                      <span className="text-sm text-muted-foreground">Lanche para 20 crianças</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">R$ 200/mês</span>
                      <span className="text-sm text-muted-foreground">Salário de um professor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dados Bancários */}
            <Card className="mt-12 bg-muted/50">
              <CardHeader>
                <CardTitle>Dados Bancários para Transferência</CardTitle>
                <CardDescription>Para doações via transferência bancária ou PIX</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Conta Corrente</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Banco: Banco do Brasil</p>
                      <p>Agência: 1234-5</p>
                      <p>Conta: 12345-6</p>
                      <p>CNPJ: 12.345.678/0001-90</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">PIX</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Chave PIX: contato@sema.org.br</p>
                      <p>Favorecido: SEMA - Associação</p>
                    </div>
                  </div>
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
