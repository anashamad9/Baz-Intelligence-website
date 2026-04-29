import type { Metadata } from 'next'
import WhatWeDoPage from '../../(marketing)/what-we-do/what-we-do-page'

const siteName = 'AI Labs+'
const title = 'What We Do | AI Labs+'
const description =
  'Explore what AI Labs+ does across AI strategy, systems implementation, growth operations, and custom technical execution.'
const previewImage = '/IntEng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/what-we-do',
    languages: {
      en: '/what-we-do',
      ar: '/ar/what-we-do',
      'x-default': '/what-we-do',
    },
  },
  openGraph: {
    type: 'website',
    url: '/what-we-do',
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
        alt: 'AI Labs+ what we do preview',
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

export default function EnglishWhatWeDoPage() {
  return <WhatWeDoPage initialLanguage="en" />
}
