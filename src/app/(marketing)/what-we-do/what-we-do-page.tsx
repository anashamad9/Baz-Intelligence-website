'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { TopNav } from '@/components/top-nav'
import { MarketingFooter } from '@/components/marketing-footer'
import { usePathname, useRouter } from 'next/navigation'

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

type FeaturedUseCase = {
  badge: string
  title: string
  description: string
  cta: string
  features: string[]
  imageSrc: string
  imageAlt: string
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
  appWebsiteCard: {
    title: string
    description: string
    ourWork: string
  }
  calculator: {
    oneTimeLabel: string
    monthlyCostsLabel: string
    savingsLabel: string
    rangeNote: string
    placeholder: string
  }
  featuredUseCases: FeaturedUseCase[]
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

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const content: Record<Language, PageCopy> = {
  en: {
    nav: {
      logo: 'Intelligence Lab',
      whatWeDo: 'Services',
      articles: 'Articles',
      sayHi: 'Say Hi',
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
    appWebsiteCard: {
      title: 'Looking for an App or website?',
      description: 'We also design and build full digital products with fast execution and high-quality delivery.',
      ourWork: 'Our Work',
    },
    calculator: {
      oneTimeLabel: 'One-time payment',
      monthlyCostsLabel: 'Enter your monthly costs (USD)',
      savingsLabel: 'Estimated monthly savings',
      rangeNote: 'Range based on 47% to 68% cost reduction.',
      placeholder: 'e.g. 20000',
    },
    featuredUseCases: [
      {
        badge: 'Intelligence Lab Use Case 1',
        title: 'Voice Agent',
        description: 'Handles customer calls 24/7, reduces response time, and lowers support payroll costs.',
        cta: 'Explore use case',
        features: ['24/7 coverage', 'Lower support cost', 'Faster response'],
        imageSrc: '/images%20part/drool-is-shut-down.CgPgS3_0_1QSogs.avif',
        imageAlt: 'Intelligence Lab voice agent use case',
      },
      {
        badge: 'Intelligence Lab Use Case 3',
        title: 'ML Model',
        description: 'Predicts demand, risk, and churn earlier so teams reduce waste and avoid costly decisions.',
        cta: 'Explore use case',
        features: ['Better forecasting', 'Less waste', 'Smarter decisions'],
        imageSrc: '/images%20part/linkedin-automation.m-LHqa5x_OL9P8.avif',
        imageAlt: 'Intelligence Lab ML model use case',
      },
      {
        badge: 'Intelligence Lab Use Case 4',
        title: 'LLM',
        description: 'Accelerates internal search, summarization, and drafting to save operational time every day.',
        cta: 'Explore use case',
        features: ['Faster knowledge access', 'Less admin time', 'Higher output'],
        imageSrc: '/images%20part/orama-astro.CEysS80e_1t9OiV.avif',
        imageAlt: 'Intelligence Lab LLM use case',
      },
      {
        badge: 'Intelligence Lab Use Case 5',
        title: 'Generative AI',
        description: 'Creates content, assets, and campaign copy in minutes, cutting production time and spend.',
        cta: 'Explore use case',
        features: ['Faster content creation', 'Lower production spend', 'Consistent quality'],
        imageSrc: '/images%20part/scaling-highly-personalized-outbound.BLsWG_WN_IrHCc.avif',
        imageAlt: 'Intelligence Lab generative AI use case',
      },
    ],
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
          answer: 'Most projects start with a 1-2 week strategy phase, then execution time depends on scope.',
        },
        {
          question: 'Why us?',
          answer: 'Because we focus on measurable outcomes, clear execution, and lower operational cost.',
        },
        {
          question: 'Where we are located?',
          answer: 'We are based in Amman, Jordan, and we work remotely with clients globally.',
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
      logo: 'إنتيلجنس لاب',
      whatWeDo: 'الخدمات',
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
    appWebsiteCard: {
      title: 'هل تبحث عن تطبيق أو موقع؟',
      description: 'نقوم أيضًا بتصميم وتطوير منتجات رقمية كاملة بسرعة تنفيذ وجودة تسليم عالية.',
      ourWork: 'أعمالنا',
    },
    calculator: {
      oneTimeLabel: 'الدفع لمرة واحدة',
      monthlyCostsLabel: 'أدخل تكاليفك الشهرية (دولار)',
      savingsLabel: 'التوفير الشهري المتوقع',
      rangeNote: 'النطاق مبني على خفض تكلفة بين 47٪ و 68٪.',
      placeholder: 'مثال: 20000',
    },
    featuredUseCases: [
      {
        badge: 'Intelligence Lab Use Case 1',
        title: 'وكيل صوتي',
        description: 'يرد على مكالمات العملاء 24/7، يقلل زمن الاستجابة ويخفّض تكلفة فرق الدعم.',
        cta: 'اكتشف الحالة',
        features: ['تغطية 24/7', 'تكلفة دعم أقل', 'استجابة أسرع'],
        imageSrc: '/images%20part/drool-is-shut-down.CgPgS3_0_1QSogs.avif',
        imageAlt: 'حالة استخدام الوكيل الصوتي من Intelligence Lab',
      },
      {
        badge: 'Intelligence Lab Use Case 3',
        title: 'نموذج تعلم آلة',
        description: 'يتنبأ بالطلب والمخاطر والتسرّب مبكرًا، لتقليل الهدر وتجنب قرارات مكلفة.',
        cta: 'اكتشف الحالة',
        features: ['تنبؤ أدق', 'هدر أقل', 'قرارات أسرع'],
        imageSrc: '/images%20part/linkedin-automation.m-LHqa5x_OL9P8.avif',
        imageAlt: 'حالة استخدام نموذج تعلم الآلة من Intelligence Lab',
      },
      {
        badge: 'Intelligence Lab Use Case 4',
        title: 'نموذج لغوي كبير (LLM)',
        description: 'يسرّع البحث الداخلي والتلخيص وكتابة المسودات، فيختصر الوقت التشغيلي اليومي.',
        cta: 'اكتشف الحالة',
        features: ['وصول أسرع للمعرفة', 'وقت إداري أقل', 'إنتاجية أعلى'],
        imageSrc: '/images%20part/orama-astro.CEysS80e_1t9OiV.avif',
        imageAlt: 'حالة استخدام النموذج اللغوي من Intelligence Lab',
      },
      {
        badge: 'Intelligence Lab Use Case 5',
        title: 'ذكاء اصطناعي توليدي',
        description: 'ينتج محتوى وأصولًا ونسخًا للحملات خلال دقائق، ما يقلل وقت الإنتاج وتكلفته.',
        cta: 'اكتشف الحالة',
        features: ['إنتاج محتوى أسرع', 'تكلفة إنتاج أقل', 'جودة متسقة'],
        imageSrc: '/images%20part/scaling-highly-personalized-outbound.BLsWG_WN_IrHCc.avif',
        imageAlt: 'حالة استخدام الذكاء الاصطناعي التوليدي من Intelligence Lab',
      },
    ],
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        {
          question: 'لمن هذه الخدمة؟',
          answer: 'للشركات الناشئة والأعمال والأفراد الذين يريدون أنظمة ذكاء اصطناعي عملية توفّر الوقت وتقلّل التكاليف.',
        },
        {
          question: 'كيف نعمل؟',
          answer: 'إذا لم تكن تعرف كيف سيساعدك هذا، نعقد اجتماعًا لفهم نشاطك. وإذا كنت تعرف ما تريده بالفعل، يمكنك تجاهل هذا السؤال :)',
        },
        {
          question: 'ما هي الأسعار؟',
          answer: 'نحن بالتأكيد أقل من تكاليفك الحالية.',
        },
        {
          question: 'ما الخدمات التي تقدمونها؟',
          answer: 'الوكلاء، الأتمتة، النماذج اللغوية والدردشة الذكية، الذكاء الاصطناعي التوليدي، ونماذج تعلم الآلة.',
        },
        {
          question: 'ما المدة الزمنية لكل مشروع؟',
          answer: 'غالبًا تبدأ المشاريع بمرحلة استراتيجية لمدة 1-2 أسابيع، ثم تعتمد مدة التنفيذ على نطاق العمل.',
        },
        {
          question: 'لماذا نحن؟',
          answer: 'لأننا نركّز على نتائج قابلة للقياس، وتنفيذ واضح، وخفض التكلفة التشغيلية.',
        },
        {
          question: 'أين نحن موجودون؟',
          answer: 'نحن مقرّنا في عمّان، الأردن، ونعمل عن بُعد مع عملاء حول العالم.',
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
  const [openFaqItem, setOpenFaqItem] = useState<string | null>(null)
  const [monthlyCostsInput, setMonthlyCostsInput] = useState('')
  const [activeFeaturedUseCaseIndex, setActiveFeaturedUseCaseIndex] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', mediaQuery.matches)
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [])

  const switchLanguage = (nextLanguage: Language) => {
    setActiveFeaturedUseCaseIndex(0)
    setLanguage(nextLanguage)

    if (!pathname) return

    const normalizedPath = pathname === '/' ? '' : pathname
    let nextPath = normalizedPath

    if (normalizedPath === '' || normalizedPath === '/en' || normalizedPath === '/ar') {
      nextPath = nextLanguage === 'ar' ? '/ar' : '/en'
    } else if (normalizedPath.startsWith('/ar/')) {
      nextPath = nextLanguage === 'en' ? `/en/${normalizedPath.slice(4)}` : normalizedPath
    } else if (normalizedPath.startsWith('/en/')) {
      nextPath = nextLanguage === 'ar' ? `/ar/${normalizedPath.slice(4)}` : normalizedPath
    } else if (nextLanguage === 'ar') {
      nextPath = `/ar${normalizedPath}`
    } else if (nextLanguage === 'en') {
      nextPath = `/en${normalizedPath}`
    }

    if (nextPath !== pathname) {
      router.push(nextPath)
    }
  }

  const isArabic = language === 'ar'
  const t = content[language]
  const activeFeaturedUseCase = t.featuredUseCases[activeFeaturedUseCaseIndex] ?? t.featuredUseCases[0]
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const homeHref = isArabic ? '/ar' : '/en'
  const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
  const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveFeaturedUseCaseIndex((current) => (current + 1) % t.featuredUseCases.length)
    }, 4200)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [t.featuredUseCases.length])

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
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-md bg-[#1063ff] text-[11px] text-white">
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
            <Link href={contactHref} className="inline-flex h-7 items-center rounded-md bg-black px-2 py-0 text-xs font-medium text-white transition-colors hover:bg-black/85">
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
      <TopNav
        isArabic={isArabic}
        logo={t.nav.logo}
        services={t.nav.whatWeDo}
        sayHi={t.nav.sayHi}
        language={language}
        onLanguageToggle={() => {
          switchLanguage(language === 'en' ? 'ar' : 'en')
        }}
        homeHref={homeHref}
        servicesHref={servicesHref}
        contactHref={contactHref}
      />

      <section className="mx-auto mt-4 w-full max-w-2xl">
        <h1 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>{t.heading}</h1>
        <p className={`mt-3 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>{t.intro}</p>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <article className="overflow-hidden rounded-xl border border-black/10 bg-site-gray-surface p-0.5 sm:p-1">
          <div className="grid gap-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch">
            <div className={`flex min-w-0 flex-col p-4 sm:p-5 ${textAlignClass}`}>
              <div>
                <div className="flex justify-start">
                  <span className="inline-flex rounded-md bg-[#1063ff] px-2 py-1 text-sm font-medium text-white">
                    {activeFeaturedUseCase.badge}
                  </span>
                </div>
                <h2 className="mt-3 text-xl leading-6 font-medium tracking-normal text-black">{activeFeaturedUseCase.title}</h2>
                <p className="mt-2 text-base leading-5 font-light text-black/65">{activeFeaturedUseCase.description}</p>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex justify-start">
                  <Link
                    href={articlesHref}
                    className="inline-flex h-7 items-center rounded-md bg-black px-2 py-0 text-xs font-medium text-white transition-colors hover:bg-black/85"
                  >
                    {activeFeaturedUseCase.cta}
                  </Link>
                </div>
                <div className="mt-4 flex flex-wrap justify-start gap-1.5">
                  {activeFeaturedUseCase.features.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-md border border-black/10 bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div dir="ltr" className="relative min-h-[240px] overflow-hidden rounded-lg md:min-h-[360px]">
              <Image
                src={activeFeaturedUseCase.imageSrc}
                alt={activeFeaturedUseCase.imageAlt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </article>

        <div className="mt-2.5 grid gap-2.5 md:grid-cols-2">
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

      <MarketingFooter isArabic={isArabic} textAlignClass={textAlignClass} contact={t.contact} />
    </main>
  )
}
