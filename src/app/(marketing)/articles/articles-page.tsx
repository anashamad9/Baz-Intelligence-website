'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'

type Language = 'en' | 'ar'

type PageCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  heading: string
  subtitle: string
}

const STORAGE_KEY = 'baz-language'
const THEME_STORAGE_KEY = 'baz-theme'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const copy: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Intelligence Lab',
      whatWeDo: 'What We Do',
      articles: 'Articles',
      sayHi: 'Say hi',
    },
    heading: 'Soon',
    subtitle: 'Articles are coming soon. We are preparing this page.',
  },
  ar: {
    nav: {
      logo: 'إنتيلجنس لاب',
      whatWeDo: 'ماذا نفعل',
      articles: 'المقالات',
      sayHi: 'تواصل',
    },
    heading: 'قريبًا',
    subtitle: 'صفحة المقالات قادمة قريبًا. نعمل حاليًا على تجهيزها.',
  },
}

export default function ArticlesPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const [theme, setTheme] = usePersistedTheme('system', THEME_STORAGE_KEY)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const shouldUseDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      document.documentElement.classList.toggle('dark', shouldUseDark)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  const isArabic = language === 'ar'
  const t = copy[language]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}
    >
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-[560px] items-center justify-between rounded-md bg-neutral-200/70 px-3 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Link href={isArabic ? '/ar' : '/en'} className="text-sm leading-6 font-medium text-black">{t.nav.logo}</Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Link href={isArabic ? '/ar/what-we-do' : '/en/what-we-do'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.whatWeDo}</Link>
            <Link href={isArabic ? '/ar/articles' : '/en/articles'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.articles}</Link>
            <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.sayHi}</Link>
          </div>
        </nav>
      </div>

      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-2xl items-center pt-10">
        <div className={`w-full ${textAlignClass}`}>
          <h1 className="text-xl leading-6 font-medium tracking-normal text-black">{t.heading}</h1>
          <p className="mt-2 text-base leading-6 font-light text-black/65">{t.subtitle}</p>
        </div>
      </section>
      <section className="mx-auto mt-4 flex w-full max-w-2xl justify-end pb-10">
        <div className="flex items-center gap-2">
          <select
            aria-label={isArabic ? 'اختيار اللغة' : 'Choose language'}
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
            className="h-8 rounded-md border border-black/10 bg-site-gray-surface px-2 text-sm font-light text-black/70 outline-none transition-colors hover:border-black/25 focus:border-black/25"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
          <select
            aria-label={isArabic ? 'اختيار النمط' : 'Choose theme'}
            value={theme}
            onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')}
            className="h-8 rounded-md border border-black/10 bg-site-gray-surface px-2 text-sm font-light text-black/70 outline-none transition-colors hover:border-black/25 focus:border-black/25"
          >
            <option value="light">{isArabic ? 'فاتح' : 'Light'}</option>
            <option value="dark">{isArabic ? 'داكن' : 'Dark'}</option>
            <option value="system">{isArabic ? 'النظام' : 'System'}</option>
          </select>
        </div>
      </section>
    </main>
  )
}
