'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import { Languages } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { ComingSoonOverlay } from '@/components/coming-soon-overlay'

type Language = 'en' | 'ar'
type LocalizedText = Record<Language, string>

type ArticlePreview = {
  id: string
  tag: LocalizedText
  title: LocalizedText
  description: LocalizedText
}

const STORAGE_KEY = 'baz-language'
const EMAIL_ADDRESS = 'hi@bazintelligence.com'
const CAL_BOOKING_URL = 'https://cal.com/bazintelligence/'
const X_URL = 'https://x.com/Bazintelligence'
const LINKEDIN_URL = 'https://www.linkedin.com/company/baz-intelligence/'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const unixel = localFont({
  src: '../../../../public/unixel/font/unixel-Regular.woff2',
  display: 'swap',
})

const redaction50Italic = localFont({
  src: '../../../../public/redaction/Redaction_50-Italic.woff2',
  display: 'swap',
})

const uiCopy = {
  en: {
    nav: {
      logo: 'Baz Intelligence',
      services: 'Services',
      articles: 'Articles',
      sayHi: 'Say hi',
    },
    heading: {
      beforeHighlight: 'Practical',
      highlight: 'AI Articles',
      afterHighlight: 'for teams building with intelligence',
    },
    subheading:
      'In-depth write-ups on architecture, deployment patterns, and applied AI strategy.',
    contact: {
      twitter: 'X',
      instagram: 'Instagram',
      linkedIn: 'LinkedIn',
    },
  },
  ar: {
    nav: {
      logo: 'باز إنتيليجينس',
      services: 'الخدمات',
      articles: 'المقالات',
      sayHi: 'تواصل',
    },
    heading: {
      beforeHighlight: 'مقالات',
      highlight: 'الذكاء الاصطناعي',
      afterHighlight: 'لبناء أنظمة ذكية عملية',
    },
    subheading: 'محتوى معمق حول الهندسة والنشر واستراتيجيات الذكاء الاصطناعي التطبيقية.',
    contact: {
      twitter: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
} as const

const articlePreviews: ArticlePreview[] = [
  {
    id: 'deploying-llm-systems',
    tag: { en: 'Engineering', ar: 'الهندسة' },
    title: {
      en: 'Deploying LLM Systems in High-Stakes Workflows',
      ar: 'نشر أنظمة LLM في سير العمل عالي الحساسية',
    },
    description: {
      en: 'How teams can move from demos to reliable production systems with measurable impact.',
      ar: 'كيف تنتقل الفرق من النماذج التجريبية إلى أنظمة إنتاج موثوقة بأثر قابل للقياس.',
    },
  },
  {
    id: 'ai-agent-patterns',
    tag: { en: 'Agents', ar: 'الوكلاء' },
    title: {
      en: 'Agent Design Patterns That Actually Survive Production',
      ar: 'أنماط تصميم الوكلاء التي تنجح فعليًا في الإنتاج',
    },
    description: {
      en: 'A practical guide to orchestration, guardrails, and human-in-the-loop checkpoints.',
      ar: 'دليل عملي للتنسيق وضوابط الأمان ونقاط المراجعة البشرية داخل العمليات.',
    },
  },
  {
    id: 'data-readiness-playbook',
    tag: { en: 'Data', ar: 'البيانات' },
    title: {
      en: 'The Data Readiness Playbook for Applied AI',
      ar: 'دليل جاهزية البيانات للذكاء الاصطناعي التطبيقي',
    },
    description: {
      en: 'What to fix first in your pipelines before training or scaling any model.',
      ar: 'ما الذي يجب إصلاحه أولًا في خطوط البيانات قبل تدريب أي نموذج أو توسيعه.',
    },
  },
]

export default function ArticlesPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return initialLanguage
    }
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    return savedLanguage === 'ar' ? 'ar' : initialLanguage
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const isArabic = language === 'ar'
  const t = uiCopy[language]
  const headlineHighlightFontClass = isArabic ? unixel.className : redaction50Italic.className
  const textAlignClass = isArabic ? 'text-right' : 'text-left'

  return (
    <ComingSoonOverlay
      title={isArabic ? 'قريياً' : 'Soon'}
      subtitle={isArabic ? 'موقعنا يقدر يتنظر، شغلك لا' : 'Our website can wait, your business can not'}
      backLabel={isArabic ? 'رجوع' : 'Back'}
      backHref={isArabic ? '/ar' : '/en'}
    >
      <main
        id="top"
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`flex min-h-screen flex-col bg-stone-50 px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}
      >
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <nav className="flex w-full max-w-[460px] items-center justify-between rounded-full bg-neutral-200/70 px-3.5 py-2 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <Link href={isArabic ? '/ar' : '/en'} className="text-sm leading-6 font-medium text-black">
                {t.nav.logo}
              </Link>
              <button
                type="button"
                onClick={() => setLanguage(current => (current === 'en' ? 'ar' : 'en'))}
                aria-label={isArabic ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
                className="inline-flex size-5 cursor-pointer items-center justify-center text-black/70 transition-opacity hover:opacity-100 hover:text-black"
              >
                <Languages className="size-3.5" />
              </button>
            </div>
            <div className={`flex items-center justify-end gap-3 ${isArabic ? 'ml-2' : 'ml-6'}`}>
              <Link
                href={isArabic ? '/ar/services' : '/en/services'}
                className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black"
              >
                {t.nav.services}
              </Link>
              <Link
                href={isArabic ? '/ar/articles' : '/en/articles'}
                className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black"
              >
                {t.nav.articles}
              </Link>
              <a
                href={CAL_BOOKING_URL}
                className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black"
              >
                {t.nav.sayHi}
              </a>
            </div>
          </nav>
        </div>

        <section className="mx-auto w-full max-w-xl flex-1">
          <h1 className={`mx-auto max-w-xl text-xl leading-7 font-medium tracking-normal ${textAlignClass}`}>
            {t.heading.beforeHighlight}{' '}
            <span className={`${headlineHighlightFontClass} text-[#1063ff]`}>{t.heading.highlight}</span>{' '}
            {t.heading.afterHighlight}
          </h1>
          <p
            className={`mx-auto mt-2 max-w-xl text-base leading-6 font-light text-black/65 ${textAlignClass}`}
          >
            {t.subheading}
          </p>

          <div className="mt-6 space-y-3">
            {articlePreviews.map(article => (
              <article key={article.id} className="rounded-xl border border-black/10 bg-white/70 px-4 py-3">
                <p className={`text-xs leading-5 font-light text-black/45 uppercase ${textAlignClass}`}>
                  {article.tag[language]}
                </p>
                <h2 className={`mt-0.5 text-base leading-6 font-medium text-black ${textAlignClass}`}>
                  {article.title[language]}
                </h2>
                <p className={`mt-1 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                  {article.description[language]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer id="contact" className="mx-auto mt-8 flex w-full max-w-xl items-start justify-between border-t border-black/10 pt-6 pb-10">
          <div className={`space-y-2 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
            <div className="flex items-center gap-0.5">
              <a href={`mailto:${EMAIL_ADDRESS}`} className="transition-colors hover:text-black">
                {EMAIL_ADDRESS}
              </a>
              <CopyButton
                value={EMAIL_ADDRESS}
                size="sm"
                className="size-6 rounded-full text-black/65 transition-colors hover:text-black"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-base leading-6 font-light text-black/65">
            <a href={X_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-black">{t.contact.twitter}</a>
            <a href="#" className="transition-colors hover:text-black">{t.contact.instagram}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-black">{t.contact.linkedIn}</a>
          </div>
        </footer>
      </main>
    </ComingSoonOverlay>
  )
}
