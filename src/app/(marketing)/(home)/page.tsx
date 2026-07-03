'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent } from 'react'
import ButtonDemo from '@/components/button-demo'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react'
import { Badge } from '@/components/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { TopNav } from '@/components/top-nav'
import { MarketingFooter } from '@/components/marketing-footer'
import StackIcon, { type IconName } from 'tech-stack-icons'
import AvatarGroupTooltipTransitionDemo, { type Avatar18Item } from '@/components/shadcn-studio/avatar/avatar-18'
import { usePathname, useRouter } from 'next/navigation'

type Language = 'en' | 'ar'
type ShowcaseProjectCard = {
    badge: string
    title: string
    subtitle: string
    features: string[]
    betweenParagraph?: string
    images: Array<{
        src: string
        alt: string
    }>
}

const STORAGE_KEY = 'baz-language'
const ibmArabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
})
const thmanyahSerifDisplay = localFont({
    src: '../../../../public/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2',
    display: 'swap',
})
const redaction50Italic = localFont({
    src: '../../../../public/redaction/Redaction_50-Italic.woff2',
    display: 'swap',
})
const redaction50Regular = localFont({
    src: '../../../../public/redaction/Redaction_50-Regular.woff2',
    display: 'swap',
})
const thmanyahOpenTypeStyles: CSSProperties = {
    // Enable stylistic alternates and contextual Arabic shaping when available in the font.
    fontFeatureSettings: '"salt" 1, "calt" 1, "liga" 1, "kern" 1, "ss01" 1, "ss02" 1',
    fontKerning: 'normal',
}

const content = {
    en: {
        nav: {
            logo: 'Atmet Technologies',
            services: 'Services',
            ourWork: 'Our Work',
            aiTechnologies: 'Atmet Technologies: for AI Technologies',
            appsWebsites: 'Atmet Technologies: for Apps & Websites',
            articles: 'Articles',
            sayHi: 'Say Hi',
        },
        brandTitle: 'Atmet Technologies',
        brandSubtitle: 'AI Technologies Lab',
        heading: {
            beforeHighlight: 'Save your time and reduce your operating costs for real with an',
            highlight: 'artificial intelligence',
            afterHighlight: 'technology and research lab that builds custom solutions around how you work for companies, institutions, and individuals.',
        },
        subheading: 'For founders, startups, businesses, and individuals.',
        introParagraphs: [
            'Most companies today use artificial intelligence in a shallow way: ready-made tools, limited results, and almost no real impact. We work differently. We go deep into your business, analyze every step, and identify exactly where your time and money are being lost, then turn those operations into intelligent systems that run on their own. From AI agents that execute full tasks without intervention, to advanced automation that connects all your systems, to language models and machine learning models built specifically on your data, everything is designed to serve how you work, not the other way around.',
            'The result? Real cost reduction, faster execution, and greater ability to scale without adding complexity. Instead of your team losing time on repetitive tasks, they focus on decisions and growth. We have worked with teams across finance, operations, and marketing, helping them transform entire workflows from daily burden into near-autonomous systems. If AI in your company is still just an extra tool, then you have not really started yet. We turn it into the core infrastructure your business runs on.',
        ],
        buttons: {
            talkTo: 'Talk to',
            founders: 'Founders',
            ourWork: 'Services',
        },
        articlesDescription: 'Intelligent systems designed to simplify complex workflows and deliver practical, measurable outcomes.',
        foundersTitle: 'Founders',
        foundersTagline: '- We just love AI',
        contact: {
            x: 'X',
            instagram: 'Instagram',
            linkedIn: 'LinkedIn',
        },
        testimonials: {
            title: 'Testimonials',
            items: [
                {
                    clientName: 'Randa Mitwalli',
                    company: 'Randa Academy',
                    quote: 'I did not share my feedback yet but I will do soon : )',
                    avatarFallback: 'RM',
                    avatarSrc: '/new%20clients/Randa%20mitwalli.webp',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'Execution quality was exceptional. Their system gave our team better visibility, faster decisions, and a much clearer way to scale internal processes.',
                    avatarFallback: 'EM',
                    avatarSrc: '/new%20clients/Ehab%20Mousa.jpg',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'From strategy to rollout, every step was practical and measurable. The final product matched our business goals and improved our day-to-day operations.',
                    avatarFallback: 'YB',
                    avatarSrc: '/new%20clients/Yazan%20Al%20billeh.jpeg',
                },
            ],
        },
        ctaPanel: {
            headline: 'Ready to build your AI system?',
            description: 'We design and ship practical AI products tailored to your operations, with clear execution and measurable outcomes.',
        },
    },
    ar: {
        nav: {
            logo: 'أتمت تيكنولوجيس',
            services: 'الخدمات',
            ourWork: 'أعمالنا',
            aiTechnologies: 'أتمت تيكنولوجيس: لتقنيات الذكاء الاصطناعي',
            appsWebsites: 'أتمت تيكنولوجيس: للتطبيقات والمواقع',
            articles: 'المقالات',
            sayHi: 'تواصل',
        },
        brandTitle: 'أتمت تيكنولوجيس',
        brandSubtitle: 'مختبر تقنيات ذكاء إصطناعي',
        heading: {
            beforeHighlight: 'وفّر وقتك وقلّل تكاليف شغلك بشكل فعلي مع مختبر تقنيات وأبحاث',
            highlight: 'ذكاء اصطناعي',
            afterHighlight: 'يبني لك حلول مخصصة حسب طريقة عملك ،للشركات، المؤسسات، وحتى الأفراد',
        },
        subheading: 'للمؤسسين، للشركات الناشئة، للأعمال، وللأفراد.',
        introParagraphs: [
            'معظم الشركات اليوم تستخدم الذكاء الاصطناعي بشكل سطحي… أدوات جاهزة، نتائج محدودة، وتأثير شبه معدوم. احنا نشتغل بشكل مختلف. بنتعمق داخل شغلك، نحلل كل خطوة، ونحدد وين يضيع وقتك وفلوسك فعلياً، ثم نحوّل هذه العمليات إلى أنظمة ذكية تشتغل لحالها. من وكلاء ذكاء اصطناعي ينفذوا مهام كاملة بدون تدخل، إلى أتمتة متقدمة تربط كل أنظمتك ببعض، وصولًا إلى نماذج لغوية وتعلم آلة مبنية خصيصًا على بياناتك، كل شيء مصمم ليخدم طريقة عملك أنت، مش العكس.',
            'النتيجة؟ تقليل حقيقي في التكاليف، تسريع واضح في التنفيذ، وقدرة أعلى على التوسع بدون زيادة التعقيد. بدل ما فريقك يضيع وقته في مهام متكررة، بيصير يركز على القرارات والنمو. اشتغلنا مع فرق في مجالات مثل المالية، التشغيل، والتسويق، وساعدناهم يحولوا عمليات كاملة من عبء يومي إلى أنظمة تعمل بشكل شبه ذاتي. إذا الذكاء الاصطناعي عندك لسه مجرد أداة إضافية، فأنت فعليًا ما بدأت. احنا بنحوله إلى البنية الأساسية اللي يقوم عليها شغلك.',
        ],
        buttons: {
            talkTo: 'تحدث مع',
            founders: 'المؤسسين',
            ourWork: 'الخدمات',
        },
        articlesDescription: 'أنظمة ذكية مُصممة لتبسيط سير العمل المعقّد وتقديم نتائج عملية قابلة للقياس.',
        foundersTitle: 'المؤسسون',
        foundersTagline: '- نحن نحب الذكاء الاصطناعي',
        contact: {
            x: 'إكس',
            instagram: 'إنستغرام',
            linkedIn: 'لينكدإن',
        },
        testimonials: {
            title: 'آراء العملاء',
            items: [
                {
                    clientName: 'Randa Mitwalli',
                    company: 'Randa Academy',
                    quote: 'لم أشارك تقييمي بعد، لكن سأفعل ذلك قريبًا :)',
                    avatarFallback: 'RM',
                    avatarSrc: '/new%20clients/Randa%20mitwalli.webp',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'جودة التنفيذ كانت ممتازة. النظام أعطى فريقنا وضوحًا أكبر، وقرارات أسرع، وخطة أوضح للتوسع في العمليات.',
                    avatarFallback: 'EM',
                    avatarSrc: '/new%20clients/Ehab%20Mousa.jpg',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'من الاستراتيجية إلى الإطلاق، كل خطوة كانت عملية وقابلة للقياس، والنتيجة النهائية انسجمت مع أهداف العمل بشكل واضح.',
                    avatarFallback: 'YB',
                    avatarSrc: '/new%20clients/Yazan%20Al%20billeh.jpeg',
                },
            ],
        },
        ctaPanel: {
            headline: 'جاهز لبناء نظام ذكاء اصطناعي لمشروعك؟',
            description: 'نصمم وننفذ منتجات ذكاء اصطناعي عملية تناسب عملياتك، بخطة تنفيذ واضحة ونتائج قابلة للقياس.',
        },
    },
} as const

type IntegrationIconName = IconName | 'google-sheets'

const integrationIconNames: IntegrationIconName[] = [
    'google',
    'slack',
    'notion',
    'onedrive',
    'google-sheets',
    'salesforce',
    'github',
    'airtable',
    'zapier',
    'stripe',
    'openai',
    'supabase',
    'figma',
    'linear',
    'jira',
]

export default function Home({
    initialLanguage = 'en',
    showHeroImage = true,
    showTestimonials = true,
    showServicesButton = true,
    techStackIcons = [],
    brandTitleOverride,
    brandSubtitleOverride,
    showClientAvatarStrip = false,
    clientAvatarItems,
    logoPrimarySrc = '/Atmet%20Technologies%20logo.png',
    logoSecondarySrc = '/Atmet%20technogloes%20white.png',
    stackShowcaseContentTop = false,
    showTopNav = true,
    heroHeadingOverride,
    introParagraphsOverride,
    showcaseProjectCardsOverride,
    ctaHeadlineOverride,
    ctaDescriptionOverride,
}: {
    initialLanguage?: Language
    showHeroImage?: boolean
    showTestimonials?: boolean
    showServicesButton?: boolean
    techStackIcons?: IconName[]
    brandTitleOverride?: string
    brandSubtitleOverride?: string
    showClientAvatarStrip?: boolean
    clientAvatarItems?: Avatar18Item[]
    logoPrimarySrc?: string
    logoSecondarySrc?: string
    stackShowcaseContentTop?: boolean
    showTopNav?: boolean
    heroHeadingOverride?: string
    introParagraphsOverride?: string[]
    showcaseProjectCardsOverride?: ShowcaseProjectCard[]
    ctaHeadlineOverride?: string
    ctaDescriptionOverride?: string
}) {
    void showTestimonials
    void stackShowcaseContentTop
    void ctaHeadlineOverride
    void ctaDescriptionOverride
    const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
    const [activeProjectImageIndexes, setActiveProjectImageIndexes] = useState<number[]>([])
    const [isAtmetTooltipOpen, setIsAtmetTooltipOpen] = useState(false)
    const atmetTooltipTimeoutRef = useRef<number | null>(null)
    const projectTouchStartXByCardRef = useRef<Record<number, number | null>>({})
    const router = useRouter()
    const pathname = usePathname()
    const isArabic = language === 'ar'
    const t = content[language]
    const textAlignClass = isArabic ? 'text-right' : 'text-left'
    const heroHeadingLineHeightClass = isArabic ? 'leading-7' : 'leading-6'
    const headlineHighlightFontClass = isArabic ? thmanyahSerifDisplay.className : redaction50Italic.className
    const foundersFontClass = isArabic ? thmanyahSerifDisplay.className : redaction50Italic.className
    const brandTitleFontClass = isArabic ? '' : redaction50Regular.className
    const paragraphWeightClass = isArabic ? 'font-[300]' : 'font-light'
    const brandTitle = brandTitleOverride ?? t.brandTitle
    const brandSubtitle = brandSubtitleOverride ?? t.brandSubtitle
    const introParagraphs = introParagraphsOverride ?? t.introParagraphs
    const contactHref = isArabic ? '/ar/contact' : '/en/contact'
    const servicesHref = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
    const combinedServiceTags = isArabic
        ? [
            'وكيل دعم',
            'الشبكات العصبية',
            'وكلاء الذكاء الاصطناعي',
            'كشف الصور/الفيديو',
            'النماذج اللغوية الكبيرة',
            'الأتمتة',
            'التعلم العميق',
            'وكيل صوتي ذكي',
            'نمذجة البيانات',
            'نماذج تعلم الآلة',
            'دردشة ذكية',
            'الذكاء الاصطناعي التوليدي',
            'التعرف على الصوت',
        ]
        : [
            'Support Agent',
            'Neural Networks',
            'AI Agents',
            'Image/Video Detection',
            'LLMs',
            'Automation',
            'Deep Learning',
            'AI Voice Agent',
            'Data Modeling',
            'ML Models',
            'AI Chatbot',
            'Generative AI',
            'Voice Detection',
        ]
    const showcaseProjectCards = showcaseProjectCardsOverride ?? []

    const switchLanguage = (nextLanguage: Language) => {
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

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [isArabic, language])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const applyTheme = () => {
            document.documentElement.classList.toggle('dark', mediaQuery.matches)
        }

        applyTheme()
        mediaQuery.addEventListener('change', applyTheme)
        return () => mediaQuery.removeEventListener('change', applyTheme)
    }, [])

    useEffect(() => {
        return () => {
            if (atmetTooltipTimeoutRef.current) {
                window.clearTimeout(atmetTooltipTimeoutRef.current)
            }
        }
    }, [])

    const handleAtmetClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setIsAtmetTooltipOpen(true)

        if (atmetTooltipTimeoutRef.current) {
            window.clearTimeout(atmetTooltipTimeoutRef.current)
        }

        atmetTooltipTimeoutRef.current = window.setTimeout(() => {
            setIsAtmetTooltipOpen(false)
        }, 1400)
    }

    const goToNextProjectImage = (cardIndex: number) => {
        const totalImages = showcaseProjectCards[cardIndex]?.images.length ?? 0
        if (totalImages <= 1) return
        setActiveProjectImageIndexes((current) => {
            const next = [...current]
            next[cardIndex] = ((next[cardIndex] ?? 0) + 1) % totalImages
            return next
        })
    }

    const goToPreviousProjectImage = (cardIndex: number) => {
        const totalImages = showcaseProjectCards[cardIndex]?.images.length ?? 0
        if (totalImages <= 1) return
        setActiveProjectImageIndexes((current) => {
            const next = [...current]
            next[cardIndex] = ((next[cardIndex] ?? 0) - 1 + totalImages) % totalImages
            return next
        })
    }

    const handleProjectTouchStart = (cardIndex: number, event: TouchEvent<HTMLDivElement>) => {
        projectTouchStartXByCardRef.current[cardIndex] = event.touches[0]?.clientX ?? null
    }

    const handleProjectTouchEnd = (cardIndex: number, event: TouchEvent<HTMLDivElement>) => {
        const startX = projectTouchStartXByCardRef.current[cardIndex]
        const endX = event.changedTouches[0]?.clientX
        projectTouchStartXByCardRef.current[cardIndex] = null

        if (startX == null || endX == null) {
            return
        }

        const swipeDistance = startX - endX
        const minSwipeDistance = 45

        if (Math.abs(swipeDistance) < minSwipeDistance) {
            return
        }

        if (swipeDistance > 0) {
            goToNextProjectImage(cardIndex)
            return
        }

        goToPreviousProjectImage(cardIndex)
    }

    return (
        <main dir={isArabic ? 'rtl' : 'ltr'} className={`flex min-h-screen flex-col bg-white px-6 pt-16 pb-40 sm:px-8 sm:pb-32 ${isArabic ? ibmArabic.className : ''}`}>
            {showTopNav ? (
                <TopNav
                    isArabic={isArabic}
                    logo={t.nav.logo}
                    services={t.nav.services}
                    sayHi={t.nav.sayHi}
                    language={language}
                    onLanguageToggle={() => {
                        switchLanguage(language === 'en' ? 'ar' : 'en')
                    }}
                    homeHref={isArabic ? '/ar' : '/en'}
                    servicesHref={servicesHref}
                    contactHref={contactHref}
                />
            ) : null}
            <div className="pt-2 text-black">
                <div className="mx-auto mb-3 flex max-w-2xl justify-start">
                    <div className="w-full">
                        <div className="inline-flex max-w-full items-start gap-2.5">
                            <div className="group relative aspect-square w-12 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white transition-colors duration-500 ease-out group-hover:bg-black dark:border-white/10 dark:bg-black dark:group-hover:bg-white">
                                <Image
                                    src={logoPrimarySrc}
                                    alt="Atmet Technologies logo primary"
                                    width={96}
                                    height={96}
                                    className="h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-95 group-hover:opacity-0 dark:opacity-0 dark:group-hover:scale-100 dark:group-hover:opacity-100"
                                    priority
                                />
                                <Image
                                    src={logoSecondarySrc}
                                    alt="Atmet Technologies logo secondary"
                                    width={96}
                                    height={96}
                                    className="absolute inset-0 h-full w-full scale-105 object-contain opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 dark:scale-100 dark:opacity-100 dark:group-hover:scale-95 dark:group-hover:opacity-0"
                                    aria-hidden
                                />
                            </div>
                            <div className="min-w-0">
                                <div className="flex h-12 flex-col justify-center">
                                    <p className={`text-[16px] leading-5 font-normal text-black ${brandTitleFontClass}`}>{brandTitle}</p>
                                    <p className="mt-0.5 text-[12px] leading-4 font-light text-black/60">{brandSubtitle}</p>
                                </div>
                            </div>
                            {showClientAvatarStrip ? (
                                <div className="inline-flex items-center gap-2">
                                    <span className="h-7 w-px bg-black/12" aria-hidden />
                                    <AvatarGroupTooltipTransitionDemo avatars={clientAvatarItems} />
                                </div>
                            ) : null}
                        </div>
                        <div className="mt-3 flex flex-wrap justify-start gap-1.5">
                            {combinedServiceTags.map(item => (
                                <p key={item} className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <h1 className={`mx-auto mt-4 max-w-2xl text-xl font-medium tracking-normal ${heroHeadingLineHeightClass} ${textAlignClass}`}>
                    {heroHeadingOverride ? (
                        heroHeadingOverride
                    ) : (
                        <>
                            {t.heading.beforeHighlight}{' '}
                            <span
                                className={`${headlineHighlightFontClass} text-[#1063ff] ${isArabic ? '' : 'font-semibold'}`}
                                style={isArabic ? thmanyahOpenTypeStyles : undefined}
                            >
                                {t.heading.highlight}
                            </span>{' '}
                            {t.heading.afterHighlight}
                        </>
                    )}
                </h1>
                {showHeroImage ? (
                    <>
                        <div className="mx-auto mt-3 aspect-[3/2] w-full max-w-2xl overflow-hidden rounded-md border border-black/10">
                            <Image
                                src="/IMG_3242-2.png"
                                alt={isArabic ? 'صورة واجهة أتمت تيكنولوجيس' : 'Atmet Technologies hero image'}
                                width={1800}
                                height={1200}
                                unoptimized
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        <div className="mx-auto mt-2 flex w-full max-w-2xl flex-wrap items-center justify-start gap-x-2.5 gap-y-1.5">
                            <p className={`text-[11px] leading-4 text-black/45 ${isArabic ? 'font-[300] tracking-normal' : 'font-medium tracking-[0.12em] uppercase'}`}>
                                {isArabic ? 'نشتغل مع أدواتك الحالية' : 'Works with your current stack'}
                            </p>
                            <div className="flex min-w-0 items-center" dir={isArabic ? 'rtl' : 'ltr'}>
                                <div className="flex -space-x-1 rtl:space-x-reverse">
                                    {integrationIconNames.map((iconName) => (
                                        <span
                                            key={iconName}
                                            className="relative inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-site-gray-ui p-0.5 ring-2 ring-white transition-[transform,box-shadow] duration-200 ease-out hover:z-10 hover:scale-110 hover:shadow-sm dark:bg-white dark:ring-1 dark:ring-white/25 dark:hover:ring-white/45"
                                            aria-hidden
                                        >
                                            {iconName === 'google-sheets' ? (
                                                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-emerald-500 text-white">
                                                    <FileSpreadsheet className="size-3" strokeWidth={2.25} />
                                                </span>
                                            ) : (
                                                <StackIcon name={iconName} className="h-full w-full" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <span className={`${isArabic ? '-mr-1' : '-ml-1'} inline-flex h-5 shrink-0 items-center rounded-full bg-site-gray-ui px-1.5 text-[10px] leading-none font-medium tabular-nums text-black/60 ring-2 ring-white transition-[transform,box-shadow] duration-200 ease-out hover:z-10 hover:scale-110 hover:shadow-sm dark:bg-white dark:text-black/70 dark:ring-1 dark:ring-white/25 dark:hover:ring-white/45`}>
                                    +5000
                                </span>
                            </div>
                        </div>
                    </>
                ) : null}
                <div className={`mx-auto mt-4 max-w-2xl space-y-5 text-base leading-5 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                    {introParagraphs.map(paragraph => {
                        const atmetText = 'Atmet AI'

                        if (!paragraph.includes(atmetText)) {
                            return <p key={paragraph}>{paragraph}</p>
                        }

                        const [beforeAtmet, afterAtmet] = paragraph.split(atmetText)

                        return (
                            <p key={paragraph}>
                                {beforeAtmet}
                                <Tooltip
                                    open={isAtmetTooltipOpen}
                                    onOpenChange={(open) => {
                                        if (!open) {
                                            setIsAtmetTooltipOpen(false)
                                        }
                                    }}
                                >
                                    <TooltipTrigger asChild>
                                        <a
                                            href="#"
                                            onClick={handleAtmetClick}
                                            className="underline decoration-current underline-offset-2"
                                            aria-label="Atmet AI (coming soon)"
                                        >
                                            {atmetText}
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">soon</TooltipContent>
                                </Tooltip>
                                {afterAtmet}
                            </p>
                        )
                    })}
                </div>
                <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-start gap-2">
                    <ButtonDemo
                        variant="default"
                        size="default"
                        className="h-7 rounded-md border-0 ring-0 shadow-none px-2 py-0 text-xs"
                        onClick={() => {
                            window.location.href = contactHref
                        }}
                        label={
                            <span>
                                {t.buttons.talkTo}{' '}
                                <span className={foundersFontClass} style={isArabic ? thmanyahOpenTypeStyles : undefined}>
                                    {t.buttons.founders}
                                </span>
                            </span>
                        }
                    />
                    {showServicesButton ? (
                        <ButtonDemo
                            variant="outline"
                            size="default"
                            className="h-7 rounded-md border-0 bg-site-gray-ui px-2 py-0 text-xs ring-0 shadow-none hover:bg-site-gray-ui"
                            onClick={() => {
                                window.location.href = servicesHref
                            }}
                            label={
                                <span>{t.buttons.ourWork}</span>
                            }
                        />
                    ) : null}
                    {techStackIcons.length ? (
                        <>
                            <span className="text-xs text-black/45" aria-hidden>-</span>
                            {techStackIcons.map((iconName, iconIndex) => (
                                <span key={`${iconName}-${iconIndex}`} className="inline-flex h-5 w-5 items-center justify-center" aria-hidden>
                                    <StackIcon name={iconName} className="h-full w-full" />
                                </span>
                            ))}
                        </>
                    ) : null}
                </div>
            </div>

            {showcaseProjectCards.length ? (
            <section id="articles" className="mx-auto mt-10 w-full max-w-2xl">
                    <div className="space-y-7">
                        {showcaseProjectCards.map((card, cardIndex) => {
                            const activeImageIndex = activeProjectImageIndexes[cardIndex] ?? 0
                            return (
                                <div key={`${card.badge}-${cardIndex}`} className="space-y-4">
                                    <article className="overflow-hidden rounded-xl border border-black/10 bg-site-gray-surface p-0.5 sm:p-1">
                                        <div className="overflow-hidden rounded-lg">
                                            <div className="grid gap-1 grid-cols-1">
                                                <div className={`min-w-0 p-4 sm:p-5 flex h-full flex-col ${textAlignClass}`}>
                                                    <div>
                                                        <div className="flex justify-start">
                                                            <Badge variant="blue" className="bg-[#ff2c48] text-white dark:bg-[#ff2c48] dark:text-white">
                                                                {card.badge}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="mt-3 text-xl leading-6 font-medium tracking-normal text-black">{card.title}</h3>
                                                        <p className={`mt-2 text-base leading-5 ${paragraphWeightClass} text-black/65`}>{card.subtitle}</p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex flex-wrap justify-start gap-1.5">
                                                            {card.features.map((item) => (
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
                                                <div
                                                    dir="ltr"
                                                    className="relative min-h-[240px] overflow-hidden rounded-lg md:min-h-[360px]"
                                                    onTouchStart={(event) => handleProjectTouchStart(cardIndex, event)}
                                                    onTouchEnd={(event) => handleProjectTouchEnd(cardIndex, event)}
                                                >
                                                    <div
                                                        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                                        style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                                                    >
                                                        {card.images.map((image, imageIndex) => (
                                                            <div key={`${card.badge}-image-${imageIndex}`} className="relative h-full min-h-[240px] w-full shrink-0 md:min-h-[360px]">
                                                                <Image
                                                                    src={image.src}
                                                                    alt={image.alt}
                                                                    fill
                                                                    unoptimized
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {card.images.length > 1 ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => goToPreviousProjectImage(cardIndex)}
                                                                aria-label={isArabic ? 'الصورة السابقة' : 'Previous image'}
                                                                className="absolute left-2 top-1/2 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:inline-flex"
                                                            >
                                                                <ChevronLeft className="size-4" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => goToNextProjectImage(cardIndex)}
                                                                aria-label={isArabic ? 'الصورة التالية' : 'Next image'}
                                                                className="absolute right-2 top-1/2 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 md:inline-flex"
                                                            >
                                                                <ChevronRight className="size-4" />
                                                            </button>
                                                        </>
                                                    ) : null}
                                                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2 py-1 backdrop-blur-sm dark:bg-white/10">
                                                        {card.images.map((image, imageIndex) => (
                                                            <button
                                                                key={`${card.badge}-dot-${imageIndex}`}
                                                                type="button"
                                                                onClick={() => {
                                                                    setActiveProjectImageIndexes((current) => {
                                                                        const next = [...current]
                                                                        next[cardIndex] = imageIndex
                                                                        return next
                                                                    })
                                                                }}
                                                                aria-label={isArabic ? `الانتقال للصورة ${imageIndex + 1}` : `Go to image ${imageIndex + 1}`}
                                                                className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/65 hover:bg-white/90'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    {card.betweenParagraph ? (
                                        <p className={`whitespace-pre-line px-1 text-base leading-6 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                                            {card.betweenParagraph}
                                        </p>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
            </section>
            ) : null}
            <MarketingFooter isArabic={isArabic} textAlignClass={textAlignClass} contact={t.contact} />

        </main>
    )
}
