'use client'

import { useEffect, useState } from 'react'
import ButtonDemo from '@/components/button-demo'
import AvatarGroupTooltipDemo from '@/components/shadcn-studio/avatar/avatar-16'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Languages } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'

type Language = 'en' | 'ar'

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

const content = {
    en: {
        nav: {
            logo: 'Baz Intelligence',
            services: 'Services',
            articles: 'Articles',
            sayHi: 'Say hi',
        },
        heading: {
            beforeHighlight: 'An',
            highlight: 'AI technologies lab',
            afterHighlight:
                'focused on helping you save time and reduce costs, built by expert engineers. We do not treat artificial intelligence as an add-on to existing software, but as a core layer that should be designed and engineered from the ground up.',
        },
        subheading: 'For founders, startups, businesses, and individuals.',
        introParagraphs: [
            'We operate as an engineering and research lab focused on designing, training, and deploying advanced AI systems, including large language models, domain-specific models, predictive analytics, generative systems, and autonomous agents. Rather than focusing only on interfaces, we work deeply at the model level, training on proprietary datasets, optimizing inference pipelines, and designing intelligent workflows powered by retrieval-augmented and multi-agent systems. Our approach combines applied research with production-grade engineering, ensuring high performance, security, scalability, and long-term maintainability. By replacing manual processes with tailored intelligent systems, we help businesses significantly reduce operational effort and costs, often by more than 50%, while improving how they operate.',
        ],
        buttons: {
            talkTo: 'Talk to',
            founders: 'Founders',
            ourWork: 'Our Services',
        },
        articlesDescription: 'Intelligent systems designed to simplify complex workflows and deliver practical, measurable outcomes.',
        foundersTitle: 'Team',
        foundersTagline: '- We just love AI',
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
            beforeHighlight: 'مختبر',
            highlight: 'تقنيات ذكاء إصطناعي',
            afterHighlight: 'يوفّر عليك الوقت والتكلفة، ويُبنى على يد مهندسين خبراء.',
        },
        subheading: 'للـمؤسسين، للشركات الناشئة، للأعمال، للأفراد.',
        introParagraphs: [
            'غالبًا ما يُنظر إلى الذكاء الاصطناعي كطبقة إضافية فوق الأنظمة البرمجية الحالية، لكن باز إينتيليجنس يتعامل معه بطريقة مختلفة. نحن مختبر هندسة وأبحاث يختص بتصميم وتدريب ونشر أنظمة ذكاء اصطناعي متقدمة، عبر النماذج اللغوية الكبيرة، وتخصيص النماذج حسب المجال، وبُنى تعلم الآلة، والنمذجة التنبؤية، والأنظمة التوليدية، ووكلاء الذكاء الاصطناعي الذاتيين. وعلى عكس الحلول التي تركز فقط على الواجهة، نحن نعمل على مستوى النموذج نفسه: تدريب وتكييف النماذج على بيانات خاصة، وتحسين خطوط الاستدلال، وتصميم سير الاستدلال، وبناء أنظمة الاسترجاع المعزز وأنظمة الوكلاء المتعددين.',
            'يجمع نهجنا بين البحث التطبيقي والهندسة الجاهزة للإنتاج. يُطوَّر كل نظام بعناية صارمة تجاه الأداء، وسلامة البيانات، والأمن، وقابلية التوسع، وسهولة الصيانة على المدى الطويل. ومن خلال استبدال العمليات اليدوية غير الفعّالة بأنظمة ذكية مصممة لكل بيئة عمل، تستطيع الشركات خفض الجهد التشغيلي والتكلفة بأكثر من 50٪ من حيث الوقت والمال.',
            'تعمل باز إينتيليجنس كمختبر حقيقي: نجرّب، ونقيّم، ونكرّر، ونُحسّن. هدفنا بناء أنظمة ذكية متينة تتجاوز التكاملات السطحية للذكاء الاصطناعي وتُحدث تحولًا فعليًا في طريقة عمل المؤسسات. نحن نركز على هندسة الذكاء، لا مجرد إضافته.',
        ],
        buttons: {
            talkTo: 'تحدث مع',
            founders: 'المؤسسين',
            ourWork: 'خدماتنا',
        },
        articlesDescription: 'أنظمة ذكية مُصممة لتبسيط سير العمل المعقّد وتقديم نتائج عملية قابلة للقياس.',
        foundersTitle: 'الفريق',
        foundersTagline: '- نحن نحب الذكاء الاصطناعي',
        contact: {
            twitter: 'إكس',
            instagram: 'إنستغرام',
            linkedIn: 'لينكدإن',
        },
    },
} as const

export default function Home({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
    const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
    const [currentSlide, setCurrentSlide] = useState(0)
    const isArabic = language === 'ar'
    const t = content[language]
    const articleSlides = Array.from({ length: 5 }, () => '/Baz Intelligence.HEIC')
    const totalSlides = articleSlides.length
    const textAlignClass = isArabic ? 'text-right' : 'text-left'
    const headlineHighlightFontClass = isArabic ? unixel.className : redaction50Italic.className
    const foundersFontClass = isArabic ? unixel.className : redaction50Italic.className
    const paragraphWeightClass = isArabic ? 'font-[300]' : 'font-light'
    const servicesPanel = isArabic
        ? {
            industriesTitle: 'القطاعات',
            capabilitiesTitle: 'القدرات',
            industries: ['تقنيات المناخ', 'الروبوتات', 'الذكاء الاصطناعي/تعلم الآلة/الذكاء الاصطناعي المادي', 'تقنيات الفضاء', 'التقنيات الصحية', 'التقنيات الحيوية', 'المواد المتقدمة', 'برمجيات B2B', 'صناديق الاستثمار'],
            capabilities: ['الاستراتيجية', 'تصميم وتطوير الويب', 'أنظمة العلامة التجارية', 'الثلاثي الأبعاد والحركة', 'التواصل التقني', 'استراتيجية المنتج [قريبًا]', 'تجارب AR/VR الرقمية [قريبًا]'],
        }
        : {
            industriesTitle: 'By Technogloy',
            capabilitiesTitle: 'By Use Case',
            industries: ['AI Agents', 'ML Models', 'LLMs', 'Deep Learning', 'Generative AI', 'Neural Networks', 'Data Engineering', 'MLOps/AIOps', 'Data Modeling'],
            capabilities: ['Automation', 'Support Agent', 'Future Forecasting', 'AI Chatbot', 'AI Voice Agent', 'Fraud Detection', 'Voice Detection', 'Image/ideo Detection', '+ More'],
        }
    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [isArabic, language])

    return (
        <main dir={isArabic ? 'rtl' : 'ltr'} className={`min-h-screen bg-stone-50 px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}>
            <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
                <nav className="flex w-full max-w-[420px] items-center justify-between rounded-md bg-neutral-200/70 px-3 py-1.5 backdrop-blur-md">
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
                    <div className={`flex items-center justify-end gap-2 ${isArabic ? 'ml-2' : 'ml-4'}`}>
                        <Link href={isArabic ? '/ar/services' : '/en/services'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.services}</Link>
                        <Link href={isArabic ? '/ar/articles' : '/en/articles'} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.articles}</Link>
                        <a
                            href={CAL_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black"
                        >
                            {t.nav.sayHi}
                        </a>
                    </div>
                </nav>
            </div>
            <div className="pt-2 text-black">
                <div className="mx-auto mb-3 flex max-w-xl justify-start">
                    <div className="group relative inline-block">
                        <Image
                            src="/Baz Intelligence Logo.png"
                            alt="Baz Intelligence logo"
                            width={480}
                            height={120}
                            className="h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-0"
                            priority
                        />
                        <Image
                            src="/baz intelligence logo white.png"
                            alt="Baz Intelligence logo white"
                            width={480}
                            height={120}
                            className="absolute top-0 left-0 h-20 w-auto object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />
                    </div>
                </div>
                <h1 className={`mx-auto max-w-xl text-xl leading-6 font-medium tracking-normal ${textAlignClass}`}>
                    {t.heading.beforeHighlight}{' '}
                    <span className={`${headlineHighlightFontClass} text-[#1063ff]`}>{t.heading.highlight}</span>{' '}
                    {t.heading.afterHighlight}
                </h1>
                <div className={`mx-auto mt-4 max-w-xl space-y-5 text-base leading-5 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                    {t.introParagraphs.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="mx-auto mt-4 flex max-w-xl items-center gap-2">
                    <ButtonDemo
                        variant="default"
                        size="default"
                        className="h-7 rounded-md border-0 ring-0 shadow-none px-2 py-0 text-xs"
                        onClick={() => {
                            window.open(CAL_BOOKING_URL, '_blank', 'noopener,noreferrer')
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
                        className="h-7 rounded-md border-0 bg-neutral-200/70 px-2 py-0 text-xs ring-0 shadow-none hover:bg-neutral-200/85"
                        onClick={() => {
                            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        aria-controls="services"
                        aria-expanded={true}
                        label={
                            <span>{t.buttons.ourWork}</span>
                        }
                    />
                </div>
            </div>

            <section id="articles" className="mx-auto mt-10 max-w-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-black/15 bg-black/[0.03]">
                    <div
                        className="flex h-full w-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {articleSlides.map((slide, index) => (
                            <div key={`article-slide-${index}`} className="relative h-full w-full shrink-0">
                                <Image
                                    src={slide}
                                    alt={`Baz Intelligence article preview ${index + 1}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                        <button
                            type="button"
                            aria-label={isArabic ? 'الصورة السابقة' : 'Previous image'}
                            onClick={() => setCurrentSlide(current => (current - 1 + totalSlides) % totalSlides)}
                            className="pointer-events-auto inline-flex size-6 items-center justify-center rounded-md bg-stone-50/90 text-black/75 backdrop-blur-sm transition-colors hover:bg-stone-50"
                        >
                            <ChevronLeft className="size-3.5" />
                        </button>
                        <button
                            type="button"
                            aria-label={isArabic ? 'الصورة التالية' : 'Next image'}
                            onClick={() => setCurrentSlide(current => (current + 1) % totalSlides)}
                            className="pointer-events-auto inline-flex size-6 items-center justify-center rounded-md bg-stone-50/90 text-black/75 backdrop-blur-sm transition-colors hover:bg-stone-50"
                        >
                            <ChevronRight className="size-3.5" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1">
                        {articleSlides.map((_, index) => (
                            <button
                                key={`slide-${index}`}
                                type="button"
                                aria-label={isArabic ? `الانتقال إلى الصورة ${index + 1}` : `Go to image ${index + 1}`}
                                onClick={() => setCurrentSlide(index)}
                                className={`size-1.5 rounded-full transition-colors ${index === currentSlide ? 'bg-black/70' : 'bg-black/25 hover:bg-black/45'}`}
                            />
                        ))}
                    </div>
                </div>
                <p className={`mt-3 text-base leading-6 ${paragraphWeightClass} text-black/65 ${textAlignClass}`}>
                    {t.articlesDescription}
                </p>
            </section>
            <section
                id="services"
                dir={isArabic ? 'rtl' : 'ltr'}
                aria-hidden={false}
                className="mx-auto mt-8 max-w-xl scroll-mt-24"
            >
                <div className="grid overflow-hidden grid-rows-[1fr] opacity-100">
                    <div className={`min-h-0 ${textAlignClass}`}>
                        <div className="grid grid-cols-2 gap-6 pt-1">
                            <div>
                                <h3 className="text-xl leading-6 font-medium tracking-normal text-black">{servicesPanel.industriesTitle}</h3>
                                <div className={`mt-3 flex flex-col gap-1 ${isArabic ? 'items-end' : 'items-start'}`}>
                                    {servicesPanel.industries.map(item => (
                                        <p key={item} className="inline-flex rounded-md bg-neutral-200/70 px-1 py-0.5 text-xs leading-4 font-light text-black/60">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl leading-6 font-medium tracking-normal text-black">{servicesPanel.capabilitiesTitle}</h3>
                                <div className={`mt-3 flex flex-col gap-1 ${isArabic ? 'items-end' : 'items-start'}`}>
                                    {servicesPanel.capabilities.map(item => (
                                        <p key={item} className="inline-flex rounded-md bg-neutral-200/70 px-1 py-0.5 text-xs leading-4 font-light text-black/60">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-12 max-w-xl">
                <h2 className={`text-xl leading-7 font-medium tracking-normal text-black ${textAlignClass}`}>{t.foundersTitle}</h2>
                <div className="mt-4 flex items-center gap-2 text-base leading-6 font-light text-black/65">
                    <AvatarGroupTooltipDemo language={language} tooltipClassName={isArabic ? ibmArabic.className : undefined} />
                    <span>{t.foundersTagline}</span>
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
    )
}
