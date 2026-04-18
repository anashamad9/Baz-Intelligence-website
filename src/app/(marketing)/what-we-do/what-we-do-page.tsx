'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Languages, Moon, Sun } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { CopyButton } from '@/components/copy-button'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'

type Language = 'en' | 'ar'

type Offer = {
  id: string
  title: string
  price?: string
  description?: string
  items?: string[]
}

type FaqItem = {
  question: string
  answer: string
}

type PageCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  heading: string
  intro: string
  offers: Offer[]
  cta: string
  calculator: {
    oneTimeLabel: string
    monthlyCostsLabel: string
    savingsLabel: string
    rangeNote: string
    placeholder: string
  }
  faq: {
    title: string
    items: FaqItem[]
  }
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

const STORAGE_KEY = 'baz-language'
const THEME_STORAGE_KEY = 'baz-theme'
const EMAIL_ADDRESS = 'hi@intelligence.com'
const X_URL = 'https://x.com/Bazintelligence'
const INSTAGRAM_URL = '#'
const LINKEDIN_URL = 'https://www.linkedin.com/company/baz-intelligence/'

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const content: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Intelligence',
      whatWeDo: 'What We Do',
      articles: 'Articles',
      sayHi: 'Say hi',
    },
    heading: 'What We Do',
    intro:
      'Your best growth investment is clear positioning and execution. We build strategic AI systems and product tracks tailored to your business.',
    offers: [
      {
        id: 'meeting',
        title: '1-1 Meeting',
        description: 'Automate your company workflow with a practical implementation plan tailored to your operations.',
        items: [
          'Save more than 50% of your costs',
          'Save a lot of hours for your repeated tasks',
          'Link all of your departments',
          'Meetings with your company departments',
          'Custom agents and AI solutions for your company',
        ],
      },
      {
        id: 'needs',
        title: 'You know what you need?',
        description: 'Pick the exact AI capability you need and we will build the right scope for your team.',
        items: [
          'Agents',
          'Automation',
          'LLMs & Chatbots',
          'Generative AI',
          'ML Models',
        ],
      },
      {
        id: 'for-who',
        title: 'For who?',
        description: 'Built to fit teams of any size, across industries and business models.',
        items: ['Startups', 'Individuals', 'Any Industry', 'Any type of corporation'],
      },
      {
        id: 'calculator',
        title: 'Savings Calculator',
        description:
          'You pay a one-time amount equal to 50% of your monthly costs.',
      },
    ],
    cta: 'Talk to us',
    calculator: {
      oneTimeLabel: 'One-time payment',
      monthlyCostsLabel: 'Enter your monthly costs (USD)',
      savingsLabel: 'Estimated monthly savings',
      rangeNote: 'Range based on 47% to 68% cost reduction.',
      placeholder: 'e.g. 20000',
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Who is this for?',
          answer: 'For startups, businesses, and individuals who want practical AI systems that save time and reduce costs.',
        },
        {
          question: 'How do we work?',
          answer: "If you don't know how this helps, we do a meeting to understand your business. If you already know what you want, then ignore this question :)",
        },
        {
          question: 'What are the prices?',
          answer: 'We are defintly less than your costs.',
        },
        {
          question: 'What services you are doing?',
          answer: 'Agents, automation, LLMs and chatbots, generative AI, and ML models.',
        },
        {
          question: 'What is the time for each project?',
          answer: 'Most projects start with a 2-4 week strategy phase, then execution time depends on scope.',
        },
        {
          question: 'Why us?',
          answer: 'Because we focus on measurable outcomes, clear execution, and lower operational cost.',
        },
        {
          question: 'Where we are located?',
          answer: 'We work remotely and support clients across different locations.',
        },
      ],
    },
    contact: {
      x: 'X',
      instagram: 'Instagram',
      linkedIn: 'LinkedIn',
    },
  },
  ar: {
    nav: {
      logo: 'إنتيليجنس',
      whatWeDo: 'ماذا نفعل',
      articles: 'المقالات',
      sayHi: 'تواصل',
    },
    heading: 'ماذا نفعل',
    intro:
      'أفضل استثمار لنموّك هو وضوح الاتجاه والتنفيذ. نبني مسارات عمل وأنظمة ذكاء اصطناعي استراتيجية تناسب طبيعة نشاطك.',
    offers: [
      {
        id: 'meeting',
        title: 'اجتماع 1-1',
        description: 'أتمتة سير العمل في شركتك عبر خطة تنفيذ عملية مصممة حسب طبيعة عملياتك.',
        items: [
          'توفير أكثر من 50٪ من التكاليف',
          'توفير عدد كبير من الساعات في المهام المتكررة',
          'ربط جميع أقسام شركتك',
          'اجتماعات مع أقسام شركتك',
          'وكلاء مخصصون وحلول ذكاء اصطناعي لشركتك',
        ],
      },
      {
        id: 'needs',
        title: 'تعرف ما الذي تحتاجه؟',
        description: 'اختر القدرة المناسبة من حلول الذكاء الاصطناعي، ونحن نبني لك نطاق تنفيذ واضحًا لفريقك.',
        items: [
          'وكلاء ذكيون',
          'الأتمتة',
          'نماذج لغوية ودردشة ذكية',
          'ذكاء اصطناعي توليدي',
          'نماذج تعلم الآلة',
        ],
      },
      {
        id: 'for-who',
        title: 'لمن هذه الخدمة؟',
        description: 'مناسبة لفرق بأحجام مختلفة، وفي مختلف القطاعات وأنواع الشركات.',
        items: ['الشركات الناشئة', 'الأفراد', 'أي قطاع', 'أي نوع من الشركات'],
      },
      {
        id: 'calculator',
        title: 'حاسبة التوفير',
        description:
          'تدفع دفعة واحدة تعادل 50٪ من تكاليفك الشهرية.',
      },
    ],
    cta: 'تواصل معنا',
    calculator: {
      oneTimeLabel: 'الدفع لمرة واحدة',
      monthlyCostsLabel: 'أدخل تكاليفك الشهرية (دولار)',
      savingsLabel: 'التوفير الشهري المتوقع',
      rangeNote: 'النطاق مبني على خفض تكلفة بين 47٪ و 68٪.',
      placeholder: 'مثال: 20000',
    },
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        {
          question: 'كم يستغرق المشروع عادة؟',
          answer: 'غالبًا نبدأ بمرحلة استراتيجية لمدة 2-4 أسابيع، ثم تتحدد مدة التنفيذ حسب نطاق العمل.',
        },
        {
          question: 'هل تعملون فقط مع الشركات الناشئة؟',
          answer: 'لا. نعمل مع الشركات الناشئة والأعمال القائمة والفرق التي تحتاج أنظمة ذكاء اصطناعي ذات أثر واضح.',
        },
        {
          question: 'هل يمكن البدء بخدمة واحدة فقط؟',
          answer: 'نعم. يمكن البدء بنطاق صغير مثل وحدة محددة أو مراجعة تقنية أو دورة تنفيذ قصيرة.',
        },
        {
          question: 'هل تقدمون دعمًا مستمرًا بعد الإطلاق؟',
          answer: 'نعم. نوفر دعمًا شهريًا للتحسين المستمر وتشغيل الحملات وتطوير تدفقات الذكاء الاصطناعي.',
        },
      ],
    },
    contact: {
      x: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
}

export default function WhatWeDoPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const [theme, setTheme] = usePersistedTheme('light', THEME_STORAGE_KEY)
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null)
  const [monthlyCostsInput, setMonthlyCostsInput] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [language, theme])

  const isArabic = language === 'ar'
  const isDark = theme === 'dark'
  const t = content[language]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'
  const monthlyCosts = Number(monthlyCostsInput.replace(/,/g, '').trim())
  const hasValidMonthlyCosts = Number.isFinite(monthlyCosts) && monthlyCosts > 0
  const minSavings = hasValidMonthlyCosts ? monthlyCosts * 0.47 : 0
  const maxSavings = hasValidMonthlyCosts ? monthlyCosts * 0.68 : 0
  const oneTimePayment = hasValidMonthlyCosts ? monthlyCosts * 0.5 : 0
  const currencyFormatter = new Intl.NumberFormat(isArabic ? 'ar-JO' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
  const offersById = Object.fromEntries(t.offers.map((offer) => [offer.id, offer])) as Record<string, Offer>
  const leftColumnOffers = [offersById.meeting, offersById['for-who']].filter(Boolean)
  const rightColumnOffers = [offersById.needs, offersById.calculator].filter(Boolean)

  const renderOfferCard = (offer: Offer, variant: 'featured' | 'default' | 'compact' = 'default') => {
    const cardPaddingClass =
      variant === 'featured' ? 'p-6' : variant === 'compact' ? 'p-4' : 'p-5'
    const titleClass =
      variant === 'compact' ? 'text-lg leading-6' : 'text-xl leading-7'
    const isCalculatorCard = offer.id === 'calculator'

    return (
      <article
        key={offer.id}
        className={`flex h-full flex-col rounded-xl border border-black/10 bg-site-gray-surface ${cardPaddingClass} ${textAlignClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className={`${titleClass} font-medium text-black`}>{offer.title}</h2>
          {offer.price ? <p className="text-sm font-light text-black/50">{offer.price}</p> : null}
        </div>

        {offer.description ? <p className="mt-3 text-base leading-6 font-light text-black/65">{offer.description}</p> : null}

        {!isCalculatorCard && offer.items ? (
          <div className="mt-4 space-y-2">
            {offer.items.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm leading-5 font-light text-black/70">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[#1063ff] text-[11px] text-white">
                  ✓
                </span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        ) : null}

        {isCalculatorCard ? (
          <div className="mt-4 space-y-3">
            <div className="text-sm leading-5 font-light text-black/65">
              <p>{t.calculator.oneTimeLabel}: {hasValidMonthlyCosts ? currencyFormatter.format(oneTimePayment) : '-'}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black/75">{t.calculator.monthlyCostsLabel}</label>
              <input
                type="number"
                min={0}
                step={100}
                value={monthlyCostsInput}
                onChange={(event) => setMonthlyCostsInput(event.target.value)}
                placeholder={t.calculator.placeholder}
                className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/35"
                dir="ltr"
              />
            </div>
            <div className="rounded-md border border-black/10 bg-site-gray-surface px-3 py-2">
              <p className="text-sm font-medium text-black/80">{t.calculator.savingsLabel}</p>
              <p className="mt-1 text-base font-medium text-black">
                {hasValidMonthlyCosts
                  ? `${currencyFormatter.format(minSavings)} - ${currencyFormatter.format(maxSavings)}`
                  : '-'}
              </p>
              <p className="mt-1 text-xs font-light text-black/55">{t.calculator.rangeNote}</p>
            </div>
          </div>
        ) : (
          <div className={`mt-5 flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
            <Link href={contactHref} className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85">
              {t.cta}
            </Link>
          </div>
        )}
      </article>
    )
  }

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}
    >
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-[560px] items-center justify-between rounded-md bg-neutral-200/70 px-3 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Link href={isArabic ? '/ar' : '/en'} className="text-sm leading-6 font-medium text-black">
              {t.nav.logo}
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
            <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">
              {t.nav.sayHi}
            </Link>
          </div>
        </nav>
      </div>

      <section className="mx-auto mt-4 w-full max-w-2xl">
        <h1 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>{t.heading}</h1>
        <p className={`mt-3 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>{t.intro}</p>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <div className="grid gap-2.5 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            {leftColumnOffers.map((offer) =>
              renderOfferCard(offer, offer.id === 'meeting' ? 'featured' : 'compact'),
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {rightColumnOffers.map((offer) =>
              renderOfferCard(offer, offer.id === 'needs' ? 'default' : 'compact'),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <h2 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>{t.faq.title}</h2>
        <div className="mt-2 grid gap-2">
          {t.faq.items.map((item, index) => {
            const faqId = `${language}-faq-${index}`
            const isOpen = openFaqItem === faqId

            return (
              <article key={item.question} className="rounded-xl border border-black/10 bg-site-gray-surface">
                <button
                  type="button"
                  onClick={() => setOpenFaqItem((current) => (current === faqId ? null : faqId))}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-base leading-5 font-medium text-black ${textAlignClass}`}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`size-4 shrink-0 text-black/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={faqId}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden px-3 pb-2.5">
                    <p className={`text-sm leading-5 font-light text-black/65 ${textAlignClass}`}>{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <footer id="contact" className={`mx-auto mt-8 flex w-full max-w-2xl items-start justify-between border-t border-black/10 pt-6 pb-10 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
          <div className="flex flex-wrap items-center justify-start gap-2">
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
        <div className="flex flex-wrap items-center gap-1.5 text-xs leading-4 font-light text-black/70">
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-site-gray-ui px-2.5 py-0.5 transition-colors hover:bg-site-gray-ui hover:text-black"
          >
            {t.contact.x}
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-site-gray-ui px-2.5 py-0.5 transition-colors hover:bg-site-gray-ui hover:text-black"
          >
            {t.contact.instagram}
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-site-gray-ui px-2.5 py-0.5 transition-colors hover:bg-site-gray-ui hover:text-black"
          >
            {t.contact.linkedIn}
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </footer>
    </main>
  )
}
