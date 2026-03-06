import type { Metadata } from 'next'
import ServicesPage from '../../(marketing)/services/services-page'

export const metadata: Metadata = {
  title: 'Services | Baz Intelligence',
  description:
    'Explore Baz Intelligence services, from ML models and AI agents to LLM pipelines, automation, and generative systems.',
  alternates: {
    canonical: '/en/services',
    languages: {
      en: '/en/services',
      ar: '/ar/services',
    },
  },
}

export default function EnglishServicesPage() {
  return <ServicesPage initialLanguage="en" />
}

