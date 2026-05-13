import type { Metadata } from 'next'
import AITechnologiesSoonPage from '../../../(marketing)/our-work/ai-technologies/ai-technologies-soon-page'

const siteName = 'Intelligence Lab'
const title = 'Intelligence Lab for AI Technologies | Intelligence Lab'
const description = 'Intelligence Lab for AI Technologies is coming soon.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/our-work/ai-technologies',
    languages: {
      en: '/our-work/ai-technologies',
      ar: '/ar/our-work/ai-technologies',
      'x-default': '/our-work/ai-technologies',
    },
  },
  openGraph: {
    type: 'website',
    url: '/our-work/ai-technologies',
    siteName,
    title,
    description,
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function EnglishAITechnologiesPage() {
  return <AITechnologiesSoonPage initialLanguage="en" />
}
