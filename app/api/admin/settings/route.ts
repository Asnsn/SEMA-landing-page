import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database/neon"

export async function GET() {
  try {
    const result = await query(`
      SELECT * FROM site_settings 
      ORDER BY category, setting_key
    `)

    // Transformar array de configurações em objeto
    const settingsObj: any = {}

    result.rows.forEach((setting: any) => {
      const key = setting.setting_key
      let value: any = setting.setting_value

      // Converter tipos
      if (setting.setting_type === "boolean") {
        value = value === "true"
      } else if (setting.setting_type === "json") {
        try {
          value = JSON.parse(value)
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

    // Converter configurações para formato do banco
    const settingsToSave = Object.entries(newSettings).map(([key, value]) => {
      let settingValue = value
      let settingType = "text"

      if (typeof value === "boolean") {
        settingValue = value.toString()
        settingType = "boolean"
      } else if (typeof value === "object") {
        settingValue = JSON.stringify(value)
        settingType = "json"
      }

      return {
        setting_key: key,
        setting_value: settingValue,
        setting_type: settingType,
      }
    })

    // Atualizar cada configuração
    for (const setting of settingsToSave) {
      await query(
        `
        INSERT INTO site_settings (setting_key, setting_value, setting_type)
        VALUES ($1, $2, $3)
        ON CONFLICT (setting_key) 
        DO UPDATE SET 
          setting_value = EXCLUDED.setting_value,
          setting_type = EXCLUDED.setting_type,
          updated_at = CURRENT_TIMESTAMP
      `,
        [setting.setting_key, setting.setting_value, setting.setting_type],
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar configurações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
