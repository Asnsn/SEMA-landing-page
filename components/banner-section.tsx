export function BannerSection() {
  return (
    <section 
      className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/banner%20sema.jpg')"
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Conteúdo */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance text-white drop-shadow-2xl">
              Instituto sema semeando amor, transformando vidas
            </h1>
            <p className="mx-auto max-w-[700px] text-white/95 md:text-xl text-pretty drop-shadow-lg font-medium">
              A SEMA oferece oportunidades esportivas e culturais para crianças e jovens de Hortolândia, promovendo
              inclusão social através do ballet, futebol e outras atividades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/atividades">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-xl transition-colors">
                Conheça Nossas Atividades
              </button>
            </a>
            <a href="/como-ajudar">
              <button className="px-8 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-lg shadow-xl transition-colors backdrop-blur-sm">
                Como Ajudar
              </button>
            </a>
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
    </section>
  )
}
