import type { Metadata } from 'next'
import ArticlesPage from './articles-page'

const siteName = 'Intelligence'
const title = 'Articles | Intelligence'
const description =
  'Read Intelligence articles on applied AI engineering, model deployment, data systems, and automation strategy.'
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
        alt: 'Intelligence articles preview',
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

export default function ArticlesRoute() {
  return <ArticlesPage initialLanguage="en" />
}
