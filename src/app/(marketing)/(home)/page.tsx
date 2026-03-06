'use client'

import { useEffect, useState } from 'react'
import ButtonDemo from '@/components/button-demo'
import AnimatedUnderlineTabsDemo from '@/components/shadcn-studio/tabs/tabs-29'
import AvatarGroupTooltipDemo from '@/components/shadcn-studio/avatar/avatar-16'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { Languages, MinusIcon, PlusIcon } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'

type Language = 'en' | 'ar'

const STORAGE_KEY = 'baz-language'
const EMAIL_ADDRESS = 'hi@bazintelligence.com'
const ibmArabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
})
const unixel = localFont({
    src: '../../../../public/unixel/font/unixel-Regular.woff2',
    display: 'swap',
})
const csRobert = localFont({
    src: '../../../../public/cs-robert-demo.regular.otf',
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
            afterHighlight: 'that saves you time and money, built by expert engineers.',
        },
        subheading: 'For founders, startups, businesses, and individuals.',
        introParagraphs: [
            'Artificial intelligence is often treated as a layer added on top of existing software, but Baz Intelligence approaches it differently. We operate as an engineering and research lab dedicated to designing, training, and deploying advanced AI systems, working across large language models, domain-specific model fine-tuning, machine learning architectures, predictive modeling, generative systems, and autonomous AI agents. Unlike solutions that focus only on the interface, we work at the model level, training and adapting models on proprietary datasets, optimizing inference pipelines, designing reasoning workflows, and building retrieval-augmented and multi-agent systems.',
            'Our approach combines applied research with production-grade engineering. Each system is developed with strict attention to performance, data integrity, security, scalability, and long-term maintainability. By replacing inefficient manual processes with intelligent systems tailored to each environment, businesses can reduce operational effort and overhead by more than 50%, both in time and cost.',
            'Baz Intelligence operates as a true lab: we experiment, evaluate, iterate, and refine. Our objective is to build robust intelligent systems that go beyond superficial AI integrations and materially transform how organizations operate. We are focused on engineering intelligence, not just integrating it.',
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
        subheading: 'للـمؤسسين، والشركات الناشئة، والأعمال، والأفراد.',
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
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === 'undefined') {
            return initialLanguage
        }
        const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
        return savedLanguage === 'ar' ? 'ar' : initialLanguage
    })
    const isArabic = language === 'ar'
    const t = content[language]
    const textAlignClass = isArabic ? 'text-right' : 'text-left'
    const headlineHighlightFontClass = isArabic ? unixel.className : redaction50Italic.className
    const foundersFontClass = isArabic ? unixel.className : redaction50Italic.className
    const [isServicesOpen, setIsServicesOpen] = useState(false)

    const toggleServices = () => {
        setIsServicesOpen(current => !current)
    }

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [isArabic, language])

    return (
        <main dir={isArabic ? 'rtl' : 'ltr'} className={`min-h-screen bg-stone-50 px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}>
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
                        <Link href={isArabic ? '/ar/services' : '/en/services'} className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.services}</Link>
                        <a href="#articles" className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.articles}</a>
                        <a href="#contact" className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.sayHi}</a>
                    </div>
                </nav>
            </div>
            <div className="pt-2 text-black">
                <div className="mx-auto mb-3 flex max-w-xl justify-start">
                    <div className="group relative inline-block">
                        <Image
                            src="/Baz Intelligence Logo.png"
                            alt="Baz Intelligence logo"
                            width={360}
                            height={90}
                            className="h-14 w-auto object-contain transition-opacity duration-200 group-hover:opacity-0"
                            priority
                        />
                        <Image
                            src="/baz intelligence logo white.png"
                            alt="Baz Intelligence logo white"
                            width={360}
                            height={90}
                            className="absolute top-0 left-0 h-14 w-auto object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />
                    </div>
                </div>
                <h1 className={`mx-auto max-w-xl text-xl leading-7 font-medium tracking-normal ${textAlignClass}`}>
                    {t.heading.beforeHighlight}{' '}
                    <span className={`${headlineHighlightFontClass} text-[#1063ff]`}>{t.heading.highlight}</span>{' '}
                    {t.heading.afterHighlight}
                </h1>
                <p className={`mx-auto mt-1 max-w-xl text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                    {t.subheading}
                </p>
                <div className={`mx-auto mt-4 max-w-xl space-y-5 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                    {t.introParagraphs.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="mx-auto mt-4 flex max-w-xl items-center gap-2">
                    <ButtonDemo
                        variant="default"
                        size="default"
                        className="h-7 rounded-full border-0 ring-0 shadow-none px-2 py-0 text-xs"
                        label={
                            <span>
                                {t.buttons.talkTo} <span className={foundersFontClass}>{t.buttons.founders}</span>
                            </span>
                        }
                    />
                    <ButtonDemo
                        variant="outline"
                        size="default"
                        className="h-7 rounded-full border-0 bg-neutral-200/70 px-2 py-0 text-xs ring-0 shadow-none hover:bg-neutral-200/85"
                        onClick={toggleServices}
                        aria-controls="services"
                        aria-expanded={isServicesOpen}
                        label={
                            <span className={`inline-flex items-center gap-0.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                                <span className="relative inline-flex size-3 items-center justify-center">
                                    <PlusIcon className={`absolute size-3 transition-all duration-300 ${isServicesOpen ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
                                    <MinusIcon className={`absolute size-3 transition-all duration-300 ${isServicesOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-90 opacity-0'}`} />
                                </span>
                                <span>{t.buttons.ourWork}</span>
                            </span>
                        }
                    />
                </div>
                <section
                    id="services"
                    dir={isArabic ? 'rtl' : 'ltr'}
                    aria-hidden={!isServicesOpen}
                    className={`mx-auto max-w-xl scroll-mt-24 transition-[margin-top] duration-500 ease-out ${isServicesOpen ? 'mt-8' : 'mt-0'}`}
                >
                    <div
                        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${isServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                        <div className="min-h-0">
                            <div>
                                <AnimatedUnderlineTabsDemo language={language} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section id="articles" className="mx-auto mt-10 max-w-xl">
                <div className="aspect-[16/9] w-full rounded-md border border-black/15 bg-black/[0.03]" />
                <p className={`mt-3 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                    {t.articlesDescription}
                </p>
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
                    <a href="#" className="transition-colors hover:text-black">{t.contact.twitter}</a>
                    <a href="#" className="transition-colors hover:text-black">{t.contact.instagram}</a>
                    <a href="#" className="transition-colors hover:text-black">{t.contact.linkedIn}</a>
                </div>
            </footer>

        </main>
    )
}
