import type { Metadata } from 'next'
import ContactPage from '../../(marketing)/contact/contact-page'

const siteName = 'Intelligence'
const title = 'Contact | Intelligence'
const description =
  'Contact Intelligence to book a direct meeting or send your project details for a tailored AI implementation scope.'
const previewImage = '/IntEng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/contact',
    languages: {
      en: '/contact',
      ar: '/ar/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    type: 'website',
    url: '/contact',
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
        alt: 'Intelligence contact preview',
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

export default function EnglishContactPage() {
  return <ContactPage initialLanguage="en" />
}
