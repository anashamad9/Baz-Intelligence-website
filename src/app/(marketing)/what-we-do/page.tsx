import type { Metadata } from 'next'
import WhatWeDoPage from './what-we-do-page'

const siteName = 'Intellegince'
const title = 'What We Do | Intellegince'
const description =
  'Explore what Intellegince does across AI strategy, systems implementation, growth operations, and custom technical execution.'
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
        alt: 'Intellegince what we do preview',
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

export default function WhatWeDoRoute() {
  return <WhatWeDoPage initialLanguage="en" />
}
