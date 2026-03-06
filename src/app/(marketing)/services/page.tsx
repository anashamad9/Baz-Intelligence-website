import type { Metadata } from 'next'
import ServicesPage from './services-page'

const siteName = 'Baz Intelligence'
const title = 'Services | Baz Intelligence'
const description =
  'Browse Baz Intelligence services across ML models, AI agents, LLM systems, data engineering, automation, and generative AI.'
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

export default function ServicesRoute() {
  return <ServicesPage initialLanguage="en" />
}
