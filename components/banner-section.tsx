"use client"

// Removemos os hooks useState e useEffect que controlavam o carrossel

export function BannerSection() {
  return (
    <section
      className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* --- INÍCIO DA ALTERAÇÃO --- */}
      {/* Adicionamos o player de vídeo como fundo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute w-full h-full object-cover -z-10"
      >
        {/* O nome do seu vídeo já está configurado aqui */}
        <source src="/videobanner.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      {/* --- FIM DA ALTERAÇÃO --- */}

      {/* Overlay escuro para contraste (continua o mesmo) */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/50"></div>

      {/* Conteúdo (continua o mesmo) */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance text-white drop-shadow-2xl leading-tight uppercase">
              <span className="text-primary drop-shadow-lg">Semeando amor</span> transformando vidas
            </h1>
            <p className="mx-auto max-w-[600px] sm:max-w-[700px] text-white/95 text-base sm:text-lg md:text-xl text-pretty drop-shadow-lg font-medium px-4">
              A SEMA oferece oportunidades esportivas e culturais para crianças e jovens.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a href="/atividades">
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-xl transition-colors text-sm sm:text-base whitespace-nowrap">
                Conheça Nossas Atividades
              </button>
            </a>
            <a href="/como-ajudar">
              <button className="px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-lg shadow-xl transition-colors backdrop-blur-sm text-sm sm:text-base whitespace-nowrap">
                Como Ajudar
              </button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 text-center max-w-4xl w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">500+</div>
              <div className="text-xs sm:text-sm text-white/80">Crianças Atendidas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">15</div>
              <div className="text-xs sm:text-sm text-white/80">Anos de História</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">12</div>
              <div className="text-xs sm:text-sm text-white/80">Modalidades</div>
            </div>
          </div>
        </div>
      </div>

      {/* Os botões de navegação e indicadores do carrossel foram removidos */}
    </section>
  )
}