"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings, 
  Save, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Users,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react"

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState({
    site_name: "SEMA - Sociedade Esportiva e Musical de Apoio",
    site_description: "Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.",
    contact_email: "institutosemahortolandia@gmail.com",
    contact_phone: "(19) 99999-9999",
    address: "Rua Lidia Lopes Moreira, 278 - Jd. Carmen Cristina, Hortolândia - SP",
    email_notifications: true,
    admin_notifications: true,
    require_email_verification: true,
    allow_user_registration: false,
    session_timeout: 24,
    primary_color: "#dc2626",
    secondary_color: "#000000",
    logo_url: "/sema-logo.jpg"
  })

  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleSave = async () => {
    setLoading(true)
    setSaveStatus('saving')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setLoading(false)
    }
  }

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Salvando...
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Salvo!
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle className="h-4 w-4 mr-2" />
            Erro ao salvar
          </>
        )
      default:
        return (
          <>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </>
        )
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie as configurações gerais do sistema</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={loading}
          className={`${
            saveStatus === 'success' ? 'bg-green-600 hover:bg-green-700' :
            saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
            'bg-primary hover:bg-primary/90'
          }`}
        >
          {getSaveButtonContent()}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Informações Gerais
            </CardTitle>
            <CardDescription>
              Configurações básicas do site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_name">Nome do Site</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="site_description">Descrição</Label>
              <Textarea
                id="site_description"
                value={settings.site_description}
                onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contact_email">Email de Contato</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Telefone</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configurações de notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_notifications">Notificações por Email</Label>
                <p className="text-sm text-gray-600">Enviar notificações por email</p>
              </div>
              <Switch
                id="email_notifications"
                checked={settings.email_notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, email_notifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="admin_notifications">Notificações para Admin</Label>
                <p className="text-sm text-gray-600">Notificar administradores</p>
              </div>
              <Switch
                id="admin_notifications"
                checked={settings.admin_notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, admin_notifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_verification">Verificação de Email</Label>
                <p className="text-sm text-gray-600">Exigir verificação de email</p>
              </div>
              <Switch
                id="email_verification"
                checked={settings.require_email_verification}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, require_email_verification: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="user_registration">Cadastro de Usuários</Label>
                <p className="text-sm text-gray-600">Permitir cadastro público</p>
              </div>
              <Switch
                id="user_registration"
                checked={settings.allow_user_registration}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allow_user_registration: checked }))}
              />
            </div>
            <div>
              <Label htmlFor="session_timeout">Timeout da Sessão (horas)</Label>
              <Select
                value={settings.session_timeout.toString()}
                onValueChange={(value) => setSettings(prev => ({ ...prev, session_timeout: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="168">7 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Aparência
            </CardTitle>
            <CardDescription>
              Configurações visuais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary_color">Cor Primária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={settings.primary_color}
                  onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary_color">Cor Secundária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondary_color"
                  type="color"
                  value={settings.secondary_color}
                  onChange={(e) => setSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={settings.secondary_color}
                  onChange={(e) => setSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="logo_url">URL do Logo</Label>
              <Input
                id="logo_url"
                value={settings.logo_url}
                onChange={(e) => setSettings(prev => ({ ...prev, logo_url: e.target.value }))}
                placeholder="/sema-logo.jpg"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
