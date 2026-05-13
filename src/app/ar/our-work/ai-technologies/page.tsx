import type { Metadata } from 'next'
import AITechnologiesSoonPage from '../../../(marketing)/our-work/ai-technologies/ai-technologies-soon-page'

const siteName = 'إنتيلجنس لاب'
const title = 'إنتيلجنس لاب لتقنيات الذكاء الاصطناعي | إنتيلجنس لاب'
const description = 'صفحة إنتيلجنس لاب لتقنيات الذكاء الاصطناعي قادمة قريبًا.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/our-work/ai-technologies',
    languages: {
      en: '/our-work/ai-technologies',
      ar: '/ar/our-work/ai-technologies',
      'x-default': '/our-work/ai-technologies',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/our-work/ai-technologies',
    siteName,
    title,
    description,
    locale: 'ar_JO',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function ArabicAITechnologiesPage() {
  return <AITechnologiesSoonPage initialLanguage="ar" />
}
