import { Header } from "@/components/header"
import { BannerSection } from "@/components/banner-section"
import { ActivitiesSection } from "@/components/activities-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEMA - Transformando Vidas através do Esporte | Hortolândia",
  description: "A SEMA oferece atividades esportivas e culturais para crianças e jovens em Hortolândia. Ballet, futebol, judô, capoeira e muito mais. Transformando vidas há mais de 15 anos.",
  keywords: "SEMA, Hortolândia, esportes, ballet, futebol, judô, capoeira, crianças, jovens, inclusão social, ONG, atividades esportivas",
  openGraph: {
    title: "SEMA - Transformando Vidas através do Esporte | Hortolândia",
    description: "A SEMA oferece atividades esportivas e culturais para crianças e jovens em Hortolândia. Ballet, futebol, judô, capoeira e muito mais.",
    type: "website",
    locale: "pt_BR",
    images: ["/banner%20sema.jpg"]
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BannerSection />
        <ActivitiesSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
