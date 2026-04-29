import type { Metadata } from 'next'
import ArticlesPage from '../../(marketing)/articles/articles-page'

const siteName = 'AI Labs+'
const title = 'Articles | AI Labs+'
const description =
  'Read AI Labs+ articles on applied AI engineering, model deployment, data systems, and automation strategy.'
const previewImage = '/IntEng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/articles',
    languages: {
      en: '/articles',
      ar: '/ar/articles',
      'x-default': '/articles',
    },
  },
  openGraph: {
    type: 'website',
    url: '/articles',
    siteName,
    title,
    description,
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'AI Labs+ articles preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage],
  },
}

export default function EnglishArticlesPage() {
  return <ArticlesPage initialLanguage="en" />
}
