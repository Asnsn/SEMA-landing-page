import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SEMA Admin</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-green-600">Cadastro Realizado!</CardTitle>
            <CardDescription>Verifique seu email para confirmar a conta</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-700">
                Você se cadastrou com sucesso! Verifique seu email e clique no link de confirmação antes de fazer login.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-700">
                <strong>Importante:</strong> Após confirmar seu email, um super administrador precisa aprovar sua conta
                antes que você possa acessar o painel administrativo.
              </p>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/auth/login">Ir para Login</Link>
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
