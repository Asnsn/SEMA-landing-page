"use client"

import { useState, useEffect } from "react"

export interface SiteSetting {
  id: string
  setting_key: string
  setting_value: string
  setting_type: "text" | "boolean" | "json"
  description: string
  category: string
  created_at: string
  updated_at: string
}

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

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin/settings")

      if (!response.ok) {
        throw new Error("Erro ao carregar configurações")
      }

      const data = await response.json()
      setSettings(data.settings)
    } catch (err) {
      console.error("Erro ao carregar configurações:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (newSettings: Partial<SettingsData>) => {
    try {
      setSaving(true)
      setError(null)

      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar configurações")
      }

      // Recarregar configurações
      await loadSettings()

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
