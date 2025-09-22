import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center bg-gradient-to-br from-card to-background overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance text-white drop-shadow-2xl">
              Transformando Vidas Através do
              <span className="text-primary drop-shadow-lg"> Esporte</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-white/95 md:text-xl text-pretty drop-shadow-lg font-medium">
              A SEMA oferece oportunidades esportivas e culturais para crianças e jovens de Hortolândia, promovendo
              inclusão social através do ballet, futebol e outras atividades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/atividades">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl backdrop-blur-sm">
                Conheça Nossas Atividades
              </Button>
            </Link>
            <Link href="/como-ajudar">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl">
                Como Ajudar
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
              <div className="text-sm text-white/80">Crianças Atendidas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white drop-shadow-lg">15</div>
              <div className="text-sm text-white/80">Anos de História</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-white drop-shadow-lg">8</div>
              <div className="text-sm text-white/80">Modalidades</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Banner com efeito blur moderno */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          {/* Imagem de fundo */}
          <img
            src="/banner%20sema.jpg"
            alt="Banner SEMA - Transformando vidas através do esporte"
            className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              console.log("Erro ao carregar imagem do banner")
              e.currentTarget.style.display = 'none'
            }}
          />
          
          {/* Fallback caso a imagem não carregue */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/40"></div>
          
          {/* Overlay com gradiente e blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
          
          {/* Efeito de brilho sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10"></div>
          
          {/* Bordas suaves */}
          <div className="absolute inset-0 ring-1 ring-white/10"></div>
        </div>
      </div>
    </section>
  )
}
