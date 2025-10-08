import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEMA - Transformando Vidas através do Esporte | Hortolândia",
  description: "A SEMA oferece atividades esportivas e culturais para crianças e jovens em Hortolândia. Ballet, futebol, judô, capoeira e muito mais. Transformando vidas há mais de 15 anos.",
  keywords: "SEMA, Hortolândia, esportes, ballet, futebol, judô, capoeira, crianças, jovens, inclusão social, ONG, atividades esportivas",
  openGraph: {
    title: "SEMA - Transformando Vidas através do Esporte | Hortolândia",
    description: "A SEMA oferece atividades esportivas e culturais para crianças e jovens em Hortolândia. Ballet, futebol, judô, capoeira e muito mais.",
    type: "website",
    locale: "pt_BR",
    images: ["/banner%20sema.jpg"]
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SEMA - Transformando Vidas através do Esporte
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A SEMA oferece atividades esportivas e culturais para crianças e jovens em Hortolândia.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Bem-vindo ao SEMA
            </h2>
            <p className="text-gray-600 mb-6">
              Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">500+</h3>
                <p className="text-red-600">Crianças Atendidas</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">15</h3>
                <p className="text-red-600">Anos de História</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">12</h3>
                <p className="text-red-600">Modalidades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
