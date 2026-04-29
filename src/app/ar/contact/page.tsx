import type { Metadata } from 'next'
import ContactPage from '../../(marketing)/contact/contact-page'

const siteName = 'إي آي لابس+'
const title = 'تواصل | إي آي لابس+'
const description =
  'تواصل مع إي آي لابس+ لحجز اجتماع مباشر أو إرسال تفاصيل مشروعك للحصول على نطاق تنفيذ ذكاء اصطناعي مناسب.'
const previewImage = '/IntArabic.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/contact',
    languages: {
      en: '/contact',
      ar: '/ar/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/contact',
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
        alt: 'معاينة صفحة التواصل في إي آي لابس+',
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

export default function ArabicContactPage() {
  return <ContactPage initialLanguage="ar" />
}
