"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface SiteSetting {
  id: string
  setting_key: string
  setting_value: string
  setting_type: 'text' | 'boolean' | 'json'
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

  const supabase = createClient()

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error

      // Transformar array de configurações em objeto
      const settingsObj: Partial<SettingsData> = {}
      
      data?.forEach((setting: SiteSetting) => {
        const key = setting.setting_key as keyof SettingsData
        let value: any = setting.setting_value

        // Converter tipos
        if (setting.setting_type === 'boolean') {
          value = value === 'true'
        } else if (setting.setting_type === 'json') {
          try {
            value = JSON.parse(value)
          } catch {
            value = value
          }
        }

        settingsObj[key] = value
      })

      setSettings(settingsObj as SettingsData)
    } catch (err) {
      console.error('Erro ao carregar configurações:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (newSettings: Partial<SettingsData>) => {
    try {
      setSaving(true)
      setError(null)

      // Converter configurações para formato do banco
      const settingsToSave = Object.entries(newSettings).map(([key, value]) => {
        let settingValue = value
        let settingType = 'text'

        if (typeof value === 'boolean') {
          settingValue = value.toString()
          settingType = 'boolean'
        } else if (typeof value === 'object') {
          settingValue = JSON.stringify(value)
          settingType = 'json'
        }

        return {
          setting_key: key,
          setting_value: settingValue,
          setting_type: settingType
        }
      })

      // Atualizar cada configuração
      const promises = settingsToSave.map(async (setting) => {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            setting_key: setting.setting_key,
            setting_value: setting.setting_value,
            setting_type: setting.setting_type
          })

        if (error) throw error
      })

      await Promise.all(promises)

      // Recarregar configurações
      await loadSettings()

      return true
    } catch (err) {
      console.error('Erro ao salvar configurações:', err)
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
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
    saveSettings
  }
}
