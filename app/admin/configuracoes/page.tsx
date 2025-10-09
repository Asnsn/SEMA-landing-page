"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Settings, Globe, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface SettingsData {
  org_name: string
  org_description: string
  org_website: string
  contact_email: string
  contact_phone: string
  contact_address: string
  site_maintenance: boolean
  news_comments: boolean
  newsletter_enabled: boolean
  meta_title: string
  meta_description: string
  facebook_url: string
  instagram_url: string
}

const DEFAULT_SETTINGS: SettingsData = {
  org_name: "SEMA - Sociedade Esportiva e Musical de Apoio",
  org_description: "Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.",
  org_website: "https://sema-hortolandia.com.br",
  contact_email: "institutosemahortolandia@gmail.com",
  contact_phone: "(19) 98917-8896",
  contact_address: "Rua Lidia Lopes Moreira, 278 - Jd. Carmen Cristina, Hortolândia - SP",
  site_maintenance: false,
  news_comments: true,
  newsletter_enabled: false,
  meta_title: "SEMA - Esporte e Educação para Todos | Hortolândia",
  meta_description: "A SEMA é uma instituição em Hortolândia dedicada a oferecer esportes e atividades para crianças e jovens necessitados.",
  facebook_url: "https://facebook.com/semahortolandia",
  instagram_url: "https://instagram.com/semahortolandia"
}

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [formData, setFormData] = useState<SettingsData>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const loadSettings = () => {
      try {
        setLoading(true)
        setError(null)

        if (typeof window !== 'undefined') {
          const savedSettings = localStorage.getItem('sema_settings')
          if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings)
            setSettings(parsedSettings)
            setFormData({ ...DEFAULT_SETTINGS, ...parsedSettings })
          } else {
            setSettings(DEFAULT_SETTINGS)
            setFormData(DEFAULT_SETTINGS)
          }
        } else {
          setSettings(DEFAULT_SETTINGS)
          setFormData(DEFAULT_SETTINGS)
        }
      } catch (err) {
        console.error("Erro ao carregar configurações:", err)
        setError(err instanceof Error ? err.message : "Erro desconhecido")
        setSettings(DEFAULT_SETTINGS)
        setFormData(DEFAULT_SETTINGS)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      if (typeof window !== 'undefined') {
        localStorage.setItem('sema_settings', JSON.stringify(formData))
        setSettings(formData)
      }

      setSaveStatus('success')

      setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
    } catch (err) {
      console.error("Erro ao salvar configurações:", err)
      setError(err instanceof Error ? err.message : "Erro ao salvar")
      setSaveStatus('error')

      setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    // ... (código de loading)
  }

  if (error) {
    // ... (código de erro)
  }

  return (
    <div className="space-y-6">
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
          {/* ... (código do botão salvar) */}
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
                disabled // <-- ALTERAÇÃO AQUI
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="org-description">Descrição</Label>
              <Textarea
                id="org-description"
                value={formData.org_description || ''}
                onChange={(e) => handleInputChange('org_description', e.target.value)}
                rows={3}
                disabled // <-- ALTERAÇÃO AQUI
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="org-website">Website</Label>
              <Input
                id="org-website"
                value={formData.org_website || ''}
                onChange={(e) => handleInputChange('org_website', e.target.value)}
                disabled // <-- ALTERAÇÃO AQUI
              />
            </div>
          </CardContent>
        </Card>

        {/* Outras seções de configuração... */}
        {/* ... (o resto do arquivo continua igual) */}
      </div>
    </div>
  )
}