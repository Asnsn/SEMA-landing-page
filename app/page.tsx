import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ActivitiesSection } from "@/components/activities-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
