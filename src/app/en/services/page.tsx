import type { Metadata } from 'next'
import ServicesPage from '../../(marketing)/services/services-page'

const siteName = 'Baz Intelligence'
const title = 'Services | Baz Intelligence'
const description =
  'Explore Baz Intelligence services, from ML models and AI agents to LLM pipelines, automation, and generative systems.'
const previewImage = '/Baz Intelligence Prev Eng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services',
    languages: {
      en: '/services',
      ar: '/ar/services',
      'x-default': '/services',
    },
  },
  openGraph: {
    type: 'website',
    url: '/services',
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
        alt: 'Baz Intelligence services preview',
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

export default function EnglishServicesPage() {
  return <ServicesPage initialLanguage="en" />
}
