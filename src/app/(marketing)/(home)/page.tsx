'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import ButtonDemo from '@/components/button-demo'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Languages, Moon, Sun } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { Badge } from '@/components/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'

type Language = 'en' | 'ar'
type ShowcaseSlide = {
    badge: string
    title: string
    subtitle: string
    cta: string
    features: string[]
    imageSrc: string
    imageAlt: string
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
const unixel = localFont({
    src: '../../../../public/unixel/font/unixel-Regular.woff2',
    display: 'swap',
})
const redaction50Italic = localFont({
    src: '../../../../public/redaction/Redaction_50-Italic.woff2',
    display: 'swap',
})

const content = {
    en: {
        nav: {
            logo: 'Intelligence',
            services: 'What We Do',
            articles: 'Articles',
            sayHi: 'Say hi',
        },
        brandTitle: 'Intelligence',
        brandSubtitle: 'AI Technologies Lab',
        heading: {
            beforeHighlight: 'An',
            highlight: 'AI technologies lab',
            afterHighlight:
                'focused on helping you save time and reduce costs, built by expert engineers. We do not treat artificial intelligence as an add-on to existing software, but as a core layer that should be designed and engineered from the ground up.',
        },
        subheading: 'For founders, startups, businesses, and individuals.',
        introParagraphs: [
            'We operate as an engineering and research lab focused on designing, training, and deploying advanced AI systems, including large language models, domain-specific models, predictive analytics, generative systems, and autonomous agents. Rather than focusing only on interfaces, we work deeply at the model level, training on proprietary datasets, optimizing inference pipelines, and designing intelligent workflows powered by retrieval-augmented and multi-agent systems. Our approach combines applied research with production-grade engineering, ensuring high performance, security, scalability, and long-term maintainability. By replacing manual processes with tailored intelligent systems, we help businesses significantly reduce operational effort and costs, often by more than 50%, while improving how they operate. We are also building Atmet AI, an agent for your business, and it is coming soon.',
        ],
        buttons: {
            talkTo: 'Talk to',
            founders: 'Founders',
            ourWork: 'What We Do',
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
                    quote: 'Working with Intelligence felt like unlocking a hidden operational advantage. They simplified how our team works and helped us launch smarter AI workflows without adding complexity.',
                    avatarFallback: 'RM',
                    avatarSrc: '',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'Execution quality was exceptional. Their system gave our team better visibility, faster decisions, and a much clearer way to scale internal processes.',
                    avatarFallback: 'EM',
                    avatarSrc: '',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'From strategy to rollout, every step was practical and measurable. The final product matched our business goals and improved our day-to-day operations.',
                    avatarFallback: 'YB',
                    avatarSrc: '',
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
            logo: 'إنتيليجنس',
            services: 'ماذا نفعل',
            articles: 'المقالات',
            sayHi: 'تواصل',
        },
        brandTitle: 'إنتيليجنس',
        brandSubtitle: 'مختبر تقنيات ذكاء إصطناعي',
        heading: {
            beforeHighlight: 'مختبر',
            highlight: 'تقنيات ذكاء إصطناعي',
            afterHighlight:
                'يركّز على مساعدتك في توفير الوقت وخفض التكاليف، ويُبنى على يد مهندسين خبراء. نحن لا نتعامل مع الذكاء الاصطناعي كإضافة سطحية فوق البرمجيات الحالية، بل كطبقة أساسية يجب تصميمها وهندستها من الجذور.',
        },
        subheading: 'للمؤسسين، للشركات الناشئة، للأعمال، وللأفراد.',
        introParagraphs: [
            'نعمل كمختبر هندسة وأبحاث يركّز على تصميم وتدريب ونشر أنظمة ذكاء اصطناعي متقدمة، بما يشمل النماذج اللغوية الكبيرة، والنماذج المتخصصة حسب المجال، والتحليلات التنبؤية، والأنظمة التوليدية، والوكلاء الذاتيين. وبدل التركيز على الواجهات فقط، نعمل بعمق على مستوى النموذج: تدريب على بيانات خاصة، وتحسين خطوط الاستدلال، وتصميم تدفقات ذكية مدعومة بأنظمة الاسترجاع المعزّز والوكلاء المتعددين. يجمع نهجنا بين البحث التطبيقي والهندسة الجاهزة للإنتاج، مع عناية عالية بالأداء والأمان وقابلية التوسع وسهولة الصيانة على المدى الطويل. ومن خلال استبدال العمليات اليدوية بأنظمة ذكية مخصصة، نساعد الشركات على خفض الجهد التشغيلي والتكلفة بشكل كبير، غالبًا بأكثر من 50٪، مع تحسين طريقة العمل. كما نعمل حاليًا على بناء Atmet AI، وهو وكيل لأعمالك، وسيتم إطلاقه قريبًا.',
        ],
        buttons: {
            talkTo: 'تحدث مع',
            founders: 'المؤسسين',
            ourWork: 'ماذا نفعل',
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
                    quote: 'العمل مع إنتيليجنس كان كأنه فتح قدرة تشغيلية جديدة. بسّطوا طريقة عمل الفريق وساعدونا على إطلاق تدفقات ذكاء اصطناعي فعالة بدون تعقيد.',
                    avatarFallback: 'RM',
                    avatarSrc: '',
                },
                {
                    clientName: 'Ehab Mousa',
                    company: 'Aivomed',
                    quote: 'جودة التنفيذ كانت ممتازة. النظام أعطى فريقنا وضوحًا أكبر، وقرارات أسرع، وخطة أوضح للتوسع في العمليات.',
                    avatarFallback: 'EM',
                    avatarSrc: '',
                },
                {
                    clientName: 'Yazan Billeh',
                    company: 'Dark Quanta',
                    quote: 'من الاستراتيجية إلى الإطلاق، كل خطوة كانت عملية وقابلة للقياس، والنتيجة النهائية انسجمت مع أهداف العمل بشكل واضح.',
                    avatarFallback: 'YB',
                    avatarSrc: '',
                },
            ],
        },
        ctaPanel: {
            headline: 'جاهز لبناء نظام ذكاء اصطناعي لمشروعك؟',
            description: 'نصمم وننفذ منتجات ذكاء اصطناعي عملية تناسب عملياتك، بخطة تنفيذ واضحة ونتائج قابلة للقياس.',
        },
    },
} as const

export default function Home({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
    const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
    const [theme, setTheme] = usePersistedTheme('light', THEME_STORAGE_KEY)
    const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0)
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
    const [isAtmetTooltipOpen, setIsAtmetTooltipOpen] = useState(false)
    const atmetTooltipTimeoutRef = useRef<number | null>(null)
    const isArabic = language === 'ar'
    const isDark = theme === 'dark'
    const t = content[language]
    const textAlignClass = isArabic ? 'text-right' : 'text-left'
    const headlineHighlightFontClass = isArabic ? unixel.className : redaction50Italic.className
    const foundersFontClass = isArabic ? unixel.className : redaction50Italic.className
    const paragraphWeightClass = isArabic ? 'font-[300]' : 'font-light'
    const contactHref = isArabic ? '/ar/contact' : '/en/contact'
    const articlesHref = isArabic ? '/ar/articles' : '/en/articles'
    const servicesPanel = isArabic
        ? {
            industriesTitle: 'حسب التقنية',
            capabilitiesTitle: 'حسب حالة الاستخدام',
            industries: ['وكلاء الذكاء الاصطناعي', 'نماذج تعلم الآلة', 'النماذج اللغوية الكبيرة', 'التعلم العميق', 'الذكاء الاصطناعي التوليدي', 'الشبكات العصبية', 'هندسة البيانات', 'عمليات تعلم الآلة/الذكاء الاصطناعي', 'نمذجة البيانات'],
            capabilities: ['الأتمتة', 'وكيل دعم', 'التنبؤ المستقبلي', 'دردشة ذكية', 'وكيل صوتي ذكي', 'كشف الاحتيال', 'التعرف على الصوت', 'كشف الصور/الفيديو', '+ المزيد'],
        }
        : {
            industriesTitle: 'By Technology',
            capabilitiesTitle: 'By Use Case',
            industries: ['AI Agents', 'ML Models', 'LLMs', 'Deep Learning', 'Generative AI', 'Neural Networks', 'Data Engineering', 'MLOps/AIOps', 'Data Modeling'],
            capabilities: ['Automation', 'Support Agent', 'Future Forecasting', 'AI Chatbot', 'AI Voice Agent', 'Fraud Detection', 'Voice Detection', 'Image/Video Detection', '+ More'],
        }
    const showcaseSlides: ShowcaseSlide[] = isArabic
        ? [
            {
                badge: 'Intelligence Use Case 1',
                title: 'وكيل صوتي',
                subtitle: 'يرد على مكالمات العملاء 24/7، يقلل زمن الاستجابة ويخفّض تكلفة فرق الدعم.',
                cta: 'اكتشف الحالة',
                features: ['تغطية 24/7', 'تكلفة دعم أقل', 'استجابة أسرع'],
                imageSrc: '/images%20part/drool-is-shut-down.CgPgS3_0_1QSogs.avif',
                imageAlt: 'واجهة عرض إنتيليجنس 1',
            },
            {
                badge: 'Intelligence Use Case 2',
                title: 'أتمتة سير العمل',
                subtitle: 'يؤتمت الموافقات والتقارير وتسليم المهام، فيلغي التكرار ويوفّر ساعات عمل أسبوعيًا.',
                cta: 'اكتشف الحالة',
                features: ['مهام يدوية أقل', 'تشغيل أسرع', 'تكلفة تشغيل أقل'],
                imageSrc: '/images%20part/google-custom-search-astro.C-sgXeVB_2vUNQJ.avif',
                imageAlt: 'واجهة عرض إنتيليجنس 2',
            },
            {
                badge: 'Intelligence Use Case 3',
                title: 'نموذج تعلم آلة',
                subtitle: 'يتنبأ بالطلب والمخاطر والتسرّب مبكرًا، لتقليل الهدر وتجنب قرارات مكلفة.',
                cta: 'اكتشف الحالة',
                features: ['تنبؤ أدق', 'هدر أقل', 'قرارات أسرع'],
                imageSrc: '/images%20part/linkedin-automation.m-LHqa5x_OL9P8.avif',
                imageAlt: 'واجهة عرض إنتيليجنس 3',
            },
            {
                badge: 'Intelligence Use Case 4',
                title: 'نموذج لغوي كبير (LLM)',
                subtitle: 'يسرّع البحث الداخلي والتلخيص وكتابة المسودات، فيختصر الوقت التشغيلي اليومي.',
                cta: 'اكتشف الحالة',
                features: ['وصول أسرع للمعرفة', 'وقت إداري أقل', 'إنتاجية أعلى'],
                imageSrc: '/images%20part/orama-astro.CEysS80e_1t9OiV.avif',
                imageAlt: 'واجهة عرض إنتيليجنس 4',
            },
            {
                badge: 'Intelligence Use Case 5',
                title: 'ذكاء اصطناعي توليدي',
                subtitle: 'ينتج محتوى وأصولًا وتسويقًا بسرعة، ما يقلل وقت التنفيذ وتكلفة الإنتاج.',
                cta: 'اكتشف الحالة',
                features: ['إنتاج محتوى أسرع', 'تكلفة إنتاج أقل', 'جودة متسقة'],
                imageSrc: '/images%20part/scaling-highly-personalized-outbound.BLsWG_WN_IrHCc.avif',
                imageAlt: 'واجهة عرض إنتيليجنس 5',
            },
        ]
        : [
            {
                badge: 'Intelligence Use Case 1',
                title: 'Voice Agent',
                subtitle: 'Handles customer calls 24/7, reduces response time, and lowers support payroll costs.',
                cta: 'Explore use case',
                features: ['24/7 coverage', 'Lower support cost', 'Faster response'],
                imageSrc: '/images%20part/drool-is-shut-down.CgPgS3_0_1QSogs.avif',
                imageAlt: 'Intelligence showcase preview 1',
            },
            {
                badge: 'Intelligence Use Case 2',
                title: 'Workflow Automation',
                subtitle: 'Automates approvals, reporting, and handoffs to remove repetitive work and save weekly team hours.',
                cta: 'Explore use case',
                features: ['Fewer manual tasks', 'Faster operations', 'Lower ops cost'],
                imageSrc: '/images%20part/google-custom-search-astro.C-sgXeVB_2vUNQJ.avif',
                imageAlt: 'Intelligence showcase preview 2',
            },
            {
                badge: 'Intelligence Use Case 3',
                title: 'ML Model',
                subtitle: 'Predicts demand, risk, and churn earlier so teams reduce waste and avoid costly decisions.',
                cta: 'Explore use case',
                features: ['Better forecasting', 'Less waste', 'Smarter decisions'],
                imageSrc: '/images%20part/linkedin-automation.m-LHqa5x_OL9P8.avif',
                imageAlt: 'Intelligence showcase preview 3',
            },
            {
                badge: 'Intelligence Use Case 4',
                title: 'LLM',
                subtitle: 'Accelerates internal search, summarization, and drafting to save operational time every day.',
                cta: 'Explore use case',
                features: ['Faster knowledge access', 'Less admin time', 'Higher output'],
                imageSrc: '/images%20part/orama-astro.CEysS80e_1t9OiV.avif',
                imageAlt: 'Intelligence showcase preview 4',
            },
            {
                badge: 'Intelligence Use Case 5',
                title: 'Generative AI',
                subtitle: 'Creates content, assets, and campaign copy in minutes, cutting production time and spend.',
                cta: 'Explore use case',
                features: ['Faster content creation', 'Lower production spend', 'Consistent quality'],
                imageSrc: '/images%20part/scaling-highly-personalized-outbound.BLsWG_WN_IrHCc.avif',
                imageAlt: 'Intelligence showcase preview 5',
            },
        ]
    const activeShowcaseSlide = showcaseSlides[activeShowcaseIndex] ?? showcaseSlides[0]
    const testimonials = t.testimonials.items
    const activeTestimonial = testimonials[activeTestimonialIndex] ?? testimonials[0]

    useEffect(() => {
        setActiveShowcaseIndex(0)
        setActiveTestimonialIndex(0)
    }, [language])

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveShowcaseIndex((current) => (current + 1) % showcaseSlides.length)
        }, 4200)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [showcaseSlides.length])

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
        document.documentElement.classList.toggle('dark', isDark)
    }, [isArabic, isDark, language])

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

    return (
        <main dir={isArabic ? 'rtl' : 'ltr'} className={`min-h-screen bg-white px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}>
            <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
                <nav className="flex w-full max-w-[560px] items-center justify-between rounded-md bg-neutral-200/70 px-3 py-1.5 backdrop-blur-md">
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
                        <button
                            type="button"
                            onClick={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))}
                            aria-label={isDark ? (isArabic ? 'تفعيل الوضع الفاتح' : 'Switch to light mode') : (isArabic ? 'تفعيل الوضع الداكن' : 'Switch to dark mode')}
                            className="inline-flex size-5 cursor-pointer items-center justify-center text-black/70 transition-opacity hover:opacity-100 hover:text-black"
                        >
                            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                        </button>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Link href={isArabic ? '/ar/what-we-do' : '/en/what-we-do'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.services}</Link>
                        <Link href={isArabic ? '/ar/articles' : '/en/articles'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.articles}</Link>
                        <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">
                            {t.nav.sayHi}
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="pt-2 text-black">
                <div className="mx-auto mb-3 flex max-w-2xl justify-start">
                    <div className="inline-flex items-center gap-2.5">
                        <div className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white">
                            <Image
                                src="/intelligence%201.png"
                                alt="Intelligence logo primary"
                                width={96}
                                height={96}
                                className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-95 group-hover:opacity-0"
                                priority
                            />
                            <Image
                                src="/intelligence%202.png"
                                alt="Intelligence logo alternate"
                                width={96}
                                height={96}
                                className="absolute h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                                aria-hidden
                            />
                        </div>
                        <div className="flex h-12 flex-col justify-center">
                            <p className="text-[16px] leading-5 font-medium text-black">{t.brandTitle}</p>
                            <p className="mt-0.5 text-[12px] leading-4 font-light text-black/60">{t.brandSubtitle}</p>
                        </div>
                    </div>
                </div>
                <h1 className={`mx-auto max-w-2xl text-xl leading-6 font-medium tracking-normal ${textAlignClass}`}>
                    {t.heading.beforeHighlight}{' '}
                    <span className={`${headlineHighlightFontClass} text-[#1063ff]`}>{t.heading.highlight}</span>{' '}
                    {t.heading.afterHighlight}
                </h1>
                <div className="mx-auto mt-3 aspect-[3/2] w-full max-w-2xl overflow-hidden rounded-md border border-black/10">
                    <Image
                        src="/IMG_3242.heic"
                        alt={isArabic ? 'صورة واجهة إنتيليجنس' : 'Intelligence hero image'}
                        width={1800}
                        height={1200}
                        unoptimized
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>
                <div className={`mx-auto mt-4 max-w-2xl space-y-5 text-base leading-5 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                    {t.introParagraphs.map(paragraph => {
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
                                {t.buttons.talkTo} <span className={foundersFontClass}>{t.buttons.founders}</span>
                            </span>
                        }
                    />
                    <ButtonDemo
                        variant="outline"
                        size="default"
                        className="h-7 rounded-md border-0 bg-site-gray-ui px-2 py-0 text-xs ring-0 shadow-none hover:bg-site-gray-ui"
                        onClick={() => {
                            window.location.href = isArabic ? '/ar/what-we-do' : '/en/what-we-do'
                        }}
                        label={
                            <span>{t.buttons.ourWork}</span>
                        }
                    />
                </div>
            </div>

            <section id="articles" className="mx-auto mt-10 w-full max-w-2xl">
                <div className="overflow-hidden rounded-xl border border-black/10 bg-site-gray-surface p-0.5 sm:p-1">
                    <div className="grid gap-1 md:min-h-[350px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch">
                        <div className={`min-w-0 p-4 sm:p-5 flex h-full flex-col ${textAlignClass}`}>
                            <div>
                                <div className="flex justify-start">
                                    <Badge variant="blue" className="bg-[#1063ff] text-white dark:bg-[#1063ff] dark:text-white">
                                        {activeShowcaseSlide.badge}
                                    </Badge>
                                </div>
                                <h3 className="mt-3 text-xl leading-6 font-medium tracking-normal text-black">{activeShowcaseSlide.title}</h3>
                                <p className={`mt-2 text-base leading-5 ${paragraphWeightClass} text-black/65`}>{activeShowcaseSlide.subtitle}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <div className="flex justify-start">
                                    <ButtonDemo
                                        variant="default"
                                        size="default"
                                        className="h-7 rounded-md border-0 px-2 py-0 text-xs ring-0 shadow-none"
                                        onClick={() => {
                                            window.location.href = articlesHref
                                        }}
                                        label={<span>{activeShowcaseSlide.cta}</span>}
                                    />
                                </div>
                                <div className="mt-4 flex flex-wrap justify-start gap-1.5">
                                    {activeShowcaseSlide.features.map((item) => (
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
                        <div dir="ltr" className="relative min-h-[240px] overflow-hidden rounded-lg md:min-h-full">
                            <div
                                className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                style={{ transform: `translateX(-${activeShowcaseIndex * 100}%)` }}
                            >
                                {showcaseSlides.map((slide, index) => (
                                    <div key={`${slide.badge}-${index}`} className="relative h-full min-h-[240px] w-full shrink-0 md:min-h-full">
                                        <Image
                                            src={slide.imageSrc}
                                            alt={slide.imageAlt}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2 py-1 backdrop-blur-sm dark:bg-white/10">
                                {showcaseSlides.map((slide, index) => (
                                    <button
                                        key={`${slide.badge}-dot-${index}`}
                                        type="button"
                                        onClick={() => setActiveShowcaseIndex(index)}
                                        aria-label={isArabic ? `الانتقال للشريحة ${index + 1}` : `Go to slide ${index + 1}`}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeShowcaseIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/65 hover:bg-white/90'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="services"
                dir={isArabic ? 'rtl' : 'ltr'}
                aria-hidden={false}
                className="mx-auto mt-8 max-w-2xl scroll-mt-24"
            >
                <div className="grid overflow-hidden grid-rows-[1fr] opacity-100">
                    <div className={`min-h-0 ${textAlignClass}`}>
                        <div className="grid grid-cols-2 items-start gap-x-10 gap-y-6 pt-1">
                            <div className="min-w-0">
                                <h3 className="text-xl leading-6 font-medium tracking-normal text-black">{servicesPanel.industriesTitle}</h3>
                                <div className="mt-3 flex flex-wrap justify-start gap-1.5">
                                    {servicesPanel.industries.map(item => (
                                        <p key={item} className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-xl leading-6 font-medium tracking-normal text-black">{servicesPanel.capabilitiesTitle}</h3>
                                <div className="mt-3 flex flex-wrap justify-start gap-1.5">
                                    {servicesPanel.capabilities.map(item => (
                                        <p key={item} className="inline-flex rounded-md bg-site-gray-ui px-1.5 py-0.5 text-xs leading-4 font-light text-black/70">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-8 w-full max-w-2xl">
                <h3 className={`text-xl leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                    {t.testimonials.title}
                </h3>
                <div className="mt-3">
                    <article
                        key={`${activeTestimonial.clientName}-${activeTestimonial.company}-${activeTestimonialIndex}`}
                        className="transition-opacity duration-300"
                    >
                        <span className={`-mb-1 block text-[30px] leading-[0.7] text-black/35 ${textAlignClass}`}>“</span>
                        <p className={`mt-0 text-xl leading-6 font-light text-black sm:text-[22px] sm:leading-7 ${textAlignClass}`}>
                            {activeTestimonial.quote}
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <Avatar className="size-10 border-[1px] border-black/10 bg-site-gray-ui">
                                {activeTestimonial.avatarSrc ? <AvatarImage src={activeTestimonial.avatarSrc} alt={activeTestimonial.clientName} className="object-cover" /> : null}
                                <AvatarFallback className="bg-site-gray-ui text-xs text-black/65">{activeTestimonial.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <div className={`min-w-0 ${textAlignClass}`}>
                                <p className="text-sm leading-5 font-medium text-black">
                                    {activeTestimonial.clientName}
                                </p>
                                <p className="text-sm leading-5 font-light text-black/55">
                                    {activeTestimonial.company}
                                </p>
                            </div>
                        </div>
                    </article>
                    <div className="mt-4 flex items-center justify-start gap-2">
                        <div className="flex items-center gap-1">
                            {testimonials.map((item, index) => (
                                <button
                                    key={`${item.clientName}-dot-${index}`}
                                    type="button"
                                    onClick={() => setActiveTestimonialIndex(index)}
                                    aria-label={isArabic ? `الانتقال إلى الشهادة ${index + 1}` : `Go to testimonial ${index + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        index === activeTestimonialIndex
                                            ? 'w-4 bg-black/65 dark:bg-white/65'
                                            : 'w-1.5 bg-black/20 hover:bg-black/35 dark:bg-white/25 dark:hover:bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-8 w-full max-w-2xl">
                <div className="overflow-hidden rounded-xl border border-black/10 bg-site-gray-surface p-0.5 sm:p-1">
                    <div className={`rounded-lg p-4 sm:p-5 ${textAlignClass}`}>
                        <h3 className="text-xl leading-6 font-medium tracking-normal text-black">
                            {t.ctaPanel.headline}
                        </h3>
                        <p className={`mt-2 text-base leading-5 ${paragraphWeightClass} text-black/65`}>
                            {t.ctaPanel.description}
                        </p>
                        <div className="mt-4 flex justify-start">
                            <ButtonDemo
                                variant="default"
                                size="default"
                                className="h-7 rounded-md border-0 ring-0 shadow-none px-2 py-0 text-xs"
                                onClick={() => {
                                    window.location.href = contactHref
                                }}
                                label={
                                    <span>
                                        {t.buttons.talkTo} <span className={foundersFontClass}>{t.buttons.founders}</span>
                                    </span>
                                }
                            />
                        </div>
                    </div>
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
