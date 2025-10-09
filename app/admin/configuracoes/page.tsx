// ... (imports e hooks)

export default function ConfiguracoesPage() {
  // ... (hooks e funções)

  return (
    <div className="space-y-6">
      {/* ... (cabeçalho) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            {/* ... */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Nome da Organização</Label>
              <Input
                id="org-name"
                value={formData.org_name || ''}
                disabled // <-- VERIFIQUE AQUI
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-description">Descrição</Label>
              <Textarea
                id="org-description"
                value={formData.org_description || ''}
                rows={3}
                disabled // <-- VERIFIQUE AQUI
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-website">Website</Label>
              <Input
                id="org-website"
                value={formData.org_website || ''}
                disabled // <-- VERIFIQUE AQUI
              />
            </div>
          </CardContent>
        </Card>
        {/* ... (resto da página) */}
      </div>
    </div>
  )
}