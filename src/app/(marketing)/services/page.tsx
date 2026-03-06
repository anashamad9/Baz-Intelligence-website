import type { Metadata } from 'next'
import ServicesPage from './services-page'

export const metadata: Metadata = {
  title: 'Services | Baz Intelligence',
  description:
    'Browse Baz Intelligence services across ML models, AI agents, LLM systems, data engineering, automation, and generative AI.',
  alternates: {
    canonical: '/services',
    languages: {
      en: '/en/services',
      ar: '/ar/services',
    },
  },
}

export default function ServicesRoute() {
  return <ServicesPage initialLanguage="en" />
}

