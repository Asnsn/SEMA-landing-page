import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SEMA - Esporte e Educação para Todos | Hortolândia",
  description:
    "A SEMA é uma instituição em Hortolândia dedicada a oferecer esportes e atividades como ballet, futebol, judô e capoeira para crianças e jovens necessitados.",
  keywords: "SEMA, Hortolândia, esportes, crianças, jovens, ballet, futebol, judô, capoeira, instituição social",
  authors: [{ name: "SEMA Hortolândia" }],
  creator: "SEMA",
  publisher: "SEMA",
  openGraph: {
    title: "SEMA - Esporte e Educação para Todos",
    description: "Oferecemos esportes e atividades para crianças e jovens necessitados em Hortolândia",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEMA - Esporte e Educação para Todos",
    description: "Oferecemos esportes e atividades para crianças e jovens necessitados em Hortolândia",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
