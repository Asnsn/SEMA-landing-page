import { type NextRequest, NextResponse } from "next/server"
import { getSiteSettings, updateSiteSetting } from "@/lib/database/supabase"

export async function GET() {
  try {
    const settings = await getSiteSettings()

    // Transformar array de configurações em objeto
    const settingsObj: any = {}

    settings.forEach((setting) => {
      const key = setting.setting_key
      let value: any = setting.setting_value

      // Converter tipos
      if (setting.setting_type === "boolean") {
        value = value === "true"
      } else if (setting.setting_type === "json") {
        try {
          value = JSON.parse(value || "{}")
        } catch {
          value = value
        }
      }

      settingsObj[key] = value
    })

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error("Erro ao buscar configurações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json()

    // Atualizar cada configuração
    for (const [key, value] of Object.entries(newSettings)) {
      let settingValue = value

      if (typeof value === "boolean") {
        settingValue = value.toString()
      } else if (typeof value === "object") {
        settingValue = JSON.stringify(value)
      }

      await updateSiteSetting(key, settingValue as string)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar configurações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
