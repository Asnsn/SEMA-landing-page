import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, User } from "lucide-react"
import Link from "next/link"
import { DeleteUserButton } from "@/components/admin/delete-user-button"

export default async function UsuariosPage() {
  const supabase = await createClient()

  // Buscar todos os administradores
  const { data: users, error } = await supabase
    .from("admin_users")
    .select(`
      id,
      email,
      full_name,
      role,
      created_at,
      updated_at
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar usuários:", error)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Super Admin</Badge>
      case "admin":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Admin</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administradores</h1>
          <p className="text-gray-600">Gerencie os usuários administradores da SEMA</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/usuarios/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Administrador
          </Link>
        </Button>
      </div>

      {/* Lista de Usuários */}
      {users && users.length > 0 ? (
        <div className="grid gap-6">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{user.full_name || "Nome não informado"}</CardTitle>
                        <CardDescription className="text-base">{user.email}</CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getRoleBadge(user.role)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>ID:</strong> {user.id}
                    </p>
                    <p>
                      <strong>Criado em:</strong> {new Date(user.created_at).toLocaleDateString("pt-BR")}
                    </p>
                    <p>
                      <strong>Última atualização:</strong> {new Date(user.updated_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/usuarios/${user.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    <DeleteUserButton userId={user.id} userName={user.full_name || user.email} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Nenhum administrador encontrado</h3>
                <p className="text-gray-500">Comece adicionando o primeiro administrador da SEMA.</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/admin/usuarios/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Administrador
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
