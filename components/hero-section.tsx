import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-card to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Transformando Vidas Através do
              <span className="text-primary"> Esporte</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
              A SEMA oferece oportunidades esportivas e culturais para crianças e jovens de Hortolândia, promovendo
              inclusão social através do ballet, futebol e outras atividades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Conheça Nossas Atividades
            </Button>
            <Button size="lg" variant="outline">
              Como Ajudar
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Crianças Atendidas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Anos de História</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Modalidades</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
