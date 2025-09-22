import { Header } from "@/components/header"
import { BannerSection } from "@/components/banner-section"
import { ActivitiesSection } from "@/components/activities-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

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
