import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Página não encontrada</h2>
          <p className="text-gray-600 max-w-md">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Voltar ao Início
          </Link>
          <Link 
            href="/contato"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Entrar em Contato
          </Link>
        </div>
      </div>
    </div>
  )
}
