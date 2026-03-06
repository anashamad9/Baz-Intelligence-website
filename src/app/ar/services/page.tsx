import type { Metadata } from 'next'
import ServicesPage from '../../(marketing)/services/services-page'

const siteName = 'باز إنتيليجينس'
const title = 'الخدمات | باز إنتيليجينس'
const description =
  'استكشف خدمات باز إنتيليجينس في نماذج تعلم الآلة ووكلاء الذكاء الاصطناعي وحلول LLM والبيانات والأتمتة والذكاء التوليدي.'
const previewImage = '/Baz Intelligence Prev Ara.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/services',
    languages: {
      en: '/services',
      ar: '/ar/services',
      'x-default': '/services',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/services',
    siteName,
    title,
    description,
    locale: 'ar_JO',
    alternateLocale: ['en_US'],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'معاينة خدمات باز إنتيليجينس',
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

export default function ArabicServicesPage() {
  return <ServicesPage initialLanguage="ar" />
}
