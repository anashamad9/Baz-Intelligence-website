'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Languages, Moon, Sun } from 'lucide-react'
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
      logo: 'AI Labs',
      whatWeDo: 'What We Do',
      articles: 'Articles',
      sayHi: 'Say hi',
    },
    heading: 'Soon',
    subtitle: 'Articles are coming soon. We are preparing this page.',
  },
  ar: {
    nav: {
      logo: 'إي آي لابس',
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
  const [theme, setTheme] = usePersistedTheme('light', THEME_STORAGE_KEY)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [language, theme])

  const isArabic = language === 'ar'
  const isDark = theme === 'dark'
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
            <Link href={isArabic ? '/ar' : '/en'} className="text-sm leading-6 font-medium text-black">
              <span className="inline-flex items-start">
                {t.nav.logo}
                <span
                  aria-hidden
                  className={isArabic ? 'mr-0 relative -top-[0.14em] inline-block text-[0.66em] leading-none' : 'ml-0 relative -top-[0.14em] inline-block text-[0.66em] leading-none'}
                >
                  +
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === 'en' ? 'ar' : 'en'))}
              aria-label={isArabic ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
              className="inline-flex size-5 cursor-pointer items-center justify-center text-black/70 transition-opacity hover:opacity-100 hover:text-black"
            >
              <Languages className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label={isDark ? (isArabic ? 'تفعيل الوضع الفاتح' : 'Switch to light mode') : (isArabic ? 'تفعيل الوضع الداكن' : 'Switch to dark mode')}
              className="inline-flex size-5 cursor-pointer items-center justify-center text-black/70 transition-opacity hover:opacity-100 hover:text-black"
            >
              {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>
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
    </main>
  )
}
