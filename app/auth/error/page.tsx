import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">SEMA Admin</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-red-600">Ops, algo deu errado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              {params?.error ? (
                <p className="text-sm text-red-700">Erro: {params.error}</p>
              ) : (
                <p className="text-sm text-red-700">Ocorreu um erro não especificado.</p>
              )}
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href="/auth/login">Tentar Novamente</Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">Voltar ao Site Principal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
