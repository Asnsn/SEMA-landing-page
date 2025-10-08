"use client"

import { useState, useEffect } from "react"

export interface SettingsData {
  // Organization
  org_name: string
  org_description: string
  org_website: string

  // Contact
  contact_email: string
  contact_phone: string
  contact_address: string

  // Site
  site_maintenance: boolean
  news_comments: boolean
  newsletter_enabled: boolean

  // SEO
  meta_title: string
  meta_description: string
  facebook_url: string
  instagram_url: string
}

// Configurações padrão
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

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)

      // Carregar do localStorage ou usar padrões
      const savedSettings = localStorage.getItem('sema_settings')
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings })
      } else {
        setSettings(DEFAULT_SETTINGS)
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      setSettings(DEFAULT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (newSettings: Partial<SettingsData>) => {
    try {
      setSaving(true)
      setError(null)

      // Atualizar configurações
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)

      // Salvar no localStorage
      localStorage.setItem('sema_settings', JSON.stringify(updatedSettings))

      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 500))

      return true
    } catch (err) {
      console.error("Erro ao salvar configurações:", err)
      setError(err instanceof Error ? err.message : "Erro ao salvar")
      return false
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  return {
    settings,
    loading,
    saving,
    error,
    loadSettings,
    saveSettings,
  }
}
