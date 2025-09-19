import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Acesso Negado</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar esta área.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Esta área requer privilégios de Super Administrador.
              Entre em contato com o administrador do sistema.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Painel
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">
                  Ir para o Site Principal
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
