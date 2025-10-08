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
    "A SEMA é uma instituição em Hortolândia dedicada a oferecer esportes e atividades como ballet, futebol, judô e capoeira para crianças e jovens necessitados. Transformando vidas há mais de 15 anos.",
  keywords: "SEMA, Hortolândia, esportes, crianças, jovens, ballet, futebol, judô, capoeira, instituição social, doação, voluntariado, inclusão social, esporte educacional, Hortolândia SP, ONG esportiva, atividades para crianças",
  authors: [{ name: "SEMA Hortolândia" }],
  creator: "SEMA - Sociedade Esportiva e Musical de Apoio",
  publisher: "SEMA",
  applicationName: "SEMA Hortolândia",
  category: "Organização sem fins lucrativos",
  classification: "ONG esportiva",
  openGraph: {
    title: "SEMA - Esporte e Educação para Todos | Hortolândia",
    description: "Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos. Ballet, futebol, judô, capoeira e muito mais!",
    type: "website",
    locale: "pt_BR",
    siteName: "SEMA Hortolândia",
    url: "https://sema-hortolandia.com.br",
    images: [
      {
        url: "/banner%20sema.jpg",
        width: 1200,
        height: 630,
        alt: "SEMA - Transformando vidas através do esporte"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SEMA - Esporte e Educação para Todos",
    description: "Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.",
    images: ["/banner%20sema.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://sema-hortolandia.com.br"
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'Hortolândia',
    'geo.position': '-22.8583;-47.2200',
    'ICBM': '-22.8583, -47.2200'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SEMA - Sociedade Esportiva e Musical de Apoio',
    alternateName: 'INSTITUTO SEMA',
    url: 'https://sema-hortolandia.com.br',
    logo: 'https://sema-hortolandia.com.br/sema-logo.jpg',
    description: 'Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Lidia Lopes Moreira, 278',
      addressLocality: 'Hortolândia',
      addressRegion: 'SP',
      postalCode: '13184-696',
      addressCountry: 'BR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-19-98917-8896',
      contactType: 'customer service',
      email: 'institutosemahortolandia@gmail.com'
    },
    sameAs: [
      'https://www.facebook.com/semahortolandia',
      'https://www.instagram.com/semahortolandia'
    ],
    foundingDate: '2009',
    numberOfEmployees: '10-50',
    areaServed: {
      '@type': 'City',
      name: 'Hortolândia',
      containedInPlace: {
        '@type': 'State',
        name: 'São Paulo'
      }
    },
    serviceType: 'Esportes e atividades culturais para crianças e jovens',
    nonprofitStatus: 'NonProfitType'
  }

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
