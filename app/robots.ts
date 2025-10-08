import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/protected/'],
    },
    sitemap: 'https://sema-hortolandia.com.br/sitemap.xml',
  }
}
