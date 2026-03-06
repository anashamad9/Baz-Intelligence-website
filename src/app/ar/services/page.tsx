import type { Metadata } from 'next'
import ServicesPage from '../../(marketing)/services/services-page'

export const metadata: Metadata = {
  title: 'الخدمات | باز إينتيليجنس',
  description:
    'استكشف خدمات باز إينتيليجنس في نماذج تعلم الآلة ووكلاء الذكاء الاصطناعي وحلول LLM والبيانات والأتمتة والذكاء التوليدي.',
  alternates: {
    canonical: '/ar/services',
    languages: {
      en: '/en/services',
      ar: '/ar/services',
    },
  },
}

export default function ArabicServicesPage() {
  return <ServicesPage initialLanguage="ar" />
}
