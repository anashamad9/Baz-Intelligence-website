import type { Metadata } from 'next'
import ArticlesPage from '../../(marketing)/articles/articles-page'

const siteName = 'إنتيليجنس'
const title = 'المقالات | إنتيليجنس'
const description =
  'اطلع على مقالات إنتيليجنس حول هندسة الذكاء الاصطناعي التطبيقية ونشر النماذج وبنية البيانات والأتمتة.'
const previewImage = '/IntArabic.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/articles',
    languages: {
      en: '/articles',
      ar: '/ar/articles',
      'x-default': '/articles',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/articles',
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
        alt: 'معاينة مقالات إنتيليجنس',
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

export default function ArabicArticlesPage() {
  return <ArticlesPage initialLanguage="ar" />
}
