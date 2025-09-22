"use client"

import { useState, useEffect } from "react"

export function BannerSection() {
  const banners = [
    "/banner%20sema.jpg",
    "/banner%202.jpg", 
    "/banner%203.jpg"
  ]
  
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // 4 segundos

    return () => clearInterval(interval)
  }, [banners.length, isPaused])

  const handleBannerChange = (newIndex: number) => {
    setCurrentBannerIndex(newIndex)
    setIsPaused(true)
    // Retomar o carrossel após 30 segundos de inatividade
    setTimeout(() => setIsPaused(false), 30000)
  }

  return (
    <section 
      className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url('${banners[currentBannerIndex]}')`
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Conteúdo */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance text-white drop-shadow-2xl">
              <span className="text-primary drop-shadow-lg">Semeando amor</span>, transformando vidas
            </h1>
            <p className="mx-auto max-w-[700px] text-white/95 md:text-xl text-pretty drop-shadow-lg font-medium">
              A SEMA oferece oportunidades esportivas e culturais para crianças e jovens de Hortolândia.
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

      {/* Botões de navegação */}
      <button
        onClick={() => handleBannerChange(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-20"
        aria-label="Banner anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => handleBannerChange(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-20"
        aria-label="Próximo banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de banner */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleBannerChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentBannerIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
