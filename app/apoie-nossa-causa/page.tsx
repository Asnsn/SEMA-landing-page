"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { useState } from "react"

export default function ApoieNossaCausaPage() {
  const [customAmount, setCustomAmount] = useState("")

  const handleWhatsAppDonation = (amount: string) => {
    const phoneNumber = "5519989178896"
    const message = `Olá! Gostaria de fazer uma doação de R$ ${amount} para a SEMA. Como posso proceder?`
    
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleCustomDonation = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      handleWhatsAppDonation(customAmount)
    }
  }

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
                  <Button className="w-full" onClick={() => handleWhatsAppDonation("50")}>Doar R$ 50</Button>
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
                  <Button className="w-full" onClick={() => handleWhatsAppDonation("100")}>Doar R$ 100</Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">R$ 200</CardTitle>
                  <CardDescription>Doação Mensal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Patrocina um professor especializado por um mês.</p>
                  <Button className="w-full" onClick={() => handleWhatsAppDonation("200")}>Doar R$ 200</Button>
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
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCustomDonation} disabled={!customAmount || parseFloat(customAmount) <= 0}>
                    Doar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Impacto da Sua Doação */}
            <Card className="mb-12">
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

            {/* Informações PIX */}
            <Card className="mt-12 bg-muted/50">
              <CardHeader>
                <CardTitle>Informações para Doação via PIX</CardTitle>
                <CardDescription>Entre em contato via WhatsApp para receber nossa chave PIX e realizar sua doação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Todas as doações são processadas via PIX através do nosso WhatsApp corporativo.
                  </p>
                  <Button 
                    onClick={() => handleWhatsAppDonation("personalizado")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Falar no WhatsApp
                  </Button>
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
