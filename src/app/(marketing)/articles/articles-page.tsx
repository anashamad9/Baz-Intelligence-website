'use client'

import { useEffect } from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'
import { TopNav } from '@/components/top-nav'

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
      logo: 'Atmet Technologies',
      whatWeDo: 'Services',
      articles: 'Articles',
      sayHi: 'Say Hi',
    },
    heading: 'Soon',
    subtitle: 'Articles are coming soon. We are preparing this page.',
  },
  ar: {
    nav: {
      logo: 'أتمت تيكنولوجيس',
      whatWeDo: 'الخدمات',
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
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const aiTechnologiesHref = isArabic ? '/ar/our-work/ai-technologies' : '/en/our-work/ai-technologies'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}
    >
      <TopNav
        isArabic={isArabic}
        logo={t.nav.logo}
        services={t.nav.whatWeDo}
        articles={t.nav.articles}
        sayHi={t.nav.sayHi}
        homeHref={homeHref}
        servicesHref={servicesHref}
        aiTechnologiesHref={aiTechnologiesHref}
        articlesHref={articlesHref}
        contactHref={contactHref}
      />

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
