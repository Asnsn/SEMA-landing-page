"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Settings, Globe, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useSettings } from "@/lib/hooks/use-settings"
import { useState, useEffect } from "react"

export default function ConfiguracoesPage() {
  const { settings, loading, saving, error, saveSettings } = useSettings()
  const [formData, setFormData] = useState<any>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Atualizar formData quando settings carregarem
  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    const success = await saveSettings(formData)
    setSaveStatus(success ? 'success' : 'error')
    
    // Limpar status após 3 segundos
    setTimeout(() => {
      setSaveStatus('idle')
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando configurações...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar configurações</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações gerais da SEMA</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : saveStatus === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Salvo!
            </>
          ) : saveStatus === 'error' ? (
            <>
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
              Erro
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </>
          )}
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
              <Input 
                id="org-name" 
                value={formData.org_name || ''}
                onChange={(e) => handleInputChange('org_name', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="org-description">Descrição</Label>
              <Textarea 
                id="org-description" 
                value={formData.org_description || ''}
                onChange={(e) => handleInputChange('org_description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="org-website">Website</Label>
              <Input 
                id="org-website" 
                value={formData.org_website || ''}
                onChange={(e) => handleInputChange('org_website', e.target.value)}
              />
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
              <Input 
                id="contact-email" 
                value={formData.contact_email || ''}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contact-phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input 
                id="contact-phone" 
                value={formData.contact_phone || ''}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço
              </Label>
              <Textarea 
                id="contact-address" 
                value={formData.contact_address || ''}
                onChange={(e) => handleInputChange('contact_address', e.target.value)}
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
              <Switch 
                checked={formData.site_maintenance || false}
                onCheckedChange={(checked) => handleInputChange('site_maintenance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comentários nas Notícias</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir comentários nas notícias
                </p>
              </div>
              <Switch 
                checked={formData.news_comments || false}
                onCheckedChange={(checked) => handleInputChange('news_comments', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar sistema de newsletter
                </p>
              </div>
              <Switch 
                checked={formData.newsletter_enabled || false}
                onCheckedChange={(checked) => handleInputChange('newsletter_enabled', checked)}
              />
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
              <Input 
                id="meta-title" 
                value={formData.meta_title || ''}
                onChange={(e) => handleInputChange('meta_title', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="meta-description">Descrição (SEO)</Label>
              <Textarea 
                id="meta-description" 
                value={formData.meta_description || ''}
                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="facebook-url">Facebook</Label>
              <Input 
                id="facebook-url" 
                value={formData.facebook_url || ''}
                onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                placeholder="https://facebook.com/sema" 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram-url">Instagram</Label>
              <Input 
                id="instagram-url" 
                value={formData.instagram_url || ''}
                onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                placeholder="https://instagram.com/sema" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
