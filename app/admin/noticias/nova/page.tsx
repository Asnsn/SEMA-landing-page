import { NewsForm } from "@/components/admin/news-form"

export default function NovaNoticiaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nova Notícia</h1>
        <p className="text-gray-600">Crie uma nova notícia para o site da SEMA</p>
      </div>

      <NewsForm />
    </div>
  )
}
