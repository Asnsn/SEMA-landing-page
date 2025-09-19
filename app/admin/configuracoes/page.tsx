import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Settings, Globe, Mail, Phone, MapPin } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações gerais da SEMA</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações da Organização */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Informações da Organização
            </CardTitle>
            <CardDescription>
              Configure as informações básicas da SEMA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Nome da Organização</Label>
              <Input id="org-name" defaultValue="SEMA - Sociedade Esportiva e Musical de Hortolândia" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="org-description">Descrição</Label>
              <Textarea 
                id="org-description" 
                defaultValue="Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="org-website">Website</Label>
              <Input id="org-website" defaultValue="https://institutosema.org.br" />
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Informações de Contato
            </CardTitle>
            <CardDescription>
              Configure as informações de contato da SEMA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail de Contato
              </Label>
              <Input id="contact-email" defaultValue="contato@sema.org.br" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contact-phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input id="contact-phone" defaultValue="+55 (19) 98917-8896" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço
              </Label>
              <Textarea 
                id="contact-address" 
                defaultValue="Rua Lidia Lopes Moreira, 278&#10;Hortolândia - SP&#10;CEP: 13184-696 - Jd Carmen Cristina"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Site */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Configurações do Site
            </CardTitle>
            <CardDescription>
              Configure as funcionalidades do site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Manutenção do Site</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar modo de manutenção
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comentários nas Notícias</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir comentários nas notícias
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar sistema de newsletter
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              SEO e Redes Sociais
            </CardTitle>
            <CardDescription>
              Configure as informações para SEO e redes sociais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="meta-title">Título da Página (SEO)</Label>
              <Input id="meta-title" defaultValue="SEMA - Sociedade Esportiva e Musical de Hortolândia" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="meta-description">Descrição (SEO)</Label>
              <Textarea 
                id="meta-description" 
                defaultValue="Transformando vidas através do esporte e da cultura em Hortolândia. Ballet, futebol, capoeira e muito mais!"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="facebook-url">Facebook</Label>
              <Input id="facebook-url" placeholder="https://facebook.com/sema" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram-url">Instagram</Label>
              <Input id="instagram-url" placeholder="https://instagram.com/sema" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
