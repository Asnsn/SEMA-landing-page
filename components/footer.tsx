"use client"

import Link from "next/link"
import { useSettings } from "@/lib/hooks/use-settings"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  const { settings } = useSettings()

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/sema-logo ofc.jpg" 
                alt="SEMA Logo" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-primary">INSTITUTO SEMA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {settings?.org_description || "Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos."}
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              {settings?.facebook_url && (
                <a 
                  href={settings.facebook_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings?.instagram_url && (
                <a 
                  href={settings.instagram_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Atividades</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/atividades/ballet" className="text-muted-foreground hover:text-primary transition-colors">
                  Ballet
                </Link>
              </li>
              <li>
                <Link href="/atividades/futebol" className="text-muted-foreground hover:text-primary transition-colors">
                  Futebol
                </Link>
              </li>
              <li>
                <Link href="/atividades/judo" className="text-muted-foreground hover:text-primary transition-colors">
                  Judô
                </Link>
              </li>
              <li>
                <Link
                  href="/atividades/capoeira"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Capoeira
                </Link>
              </li>
              <li>
                <Link href="/atividades/volei" className="text-muted-foreground hover:text-primary transition-colors">
                  Vôlei
                </Link>
              </li>
              <li>
                <Link href="/atividades/natacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Natação
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/atividades" className="text-muted-foreground hover:text-primary transition-colors">
                  Todas as Atividades
                </Link>
              </li>
              <li>
                <Link href="/como-ajudar" className="text-muted-foreground hover:text-primary transition-colors">
                  Como Ajudar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{settings?.contact_address || "Rua Lidia Lopes Moreira, 278 - Jd. Carmen Cristina, Hortolândia - SP"}</p>
              <p>{settings?.contact_phone || "(19) 98917-8896"}</p>
              <p>{settings?.contact_email || "institutosemahortolandia@gmail.com"}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 INSTITUTO SEMA - Todos os direitos reservados. Desenvolvido com ❤️ para transformar vidas.</p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            🔒 Site blindado e protegido contra malware - Navegação 100% segura
          </p>
        </div>
      </div>
    </footer>
  )
}
