'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'
import { Languages } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { ComingSoonOverlay } from '@/components/coming-soon-overlay'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'

type Language = 'en' | 'ar'

type LocalizedText = Record<Language, string>

type SubService = {
  id: string
  title: LocalizedText
  description: LocalizedText
}

type Service = {
  id: string
  title: LocalizedText
  intro: LocalizedText
  subServices: SubService[]
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
      beforeHighlight: 'Our',
      highlight: 'AI Services',
      afterHighlight: 'for measurable business outcomes',
    },
    subheading:
      'Explore six core service tracks. Click a main service to reveal its subservices and detailed scope.',
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
      beforeHighlight: 'خدماتنا في',
      highlight: 'الذكاء الاصطناعي',
      afterHighlight: 'لنتائج عملية قابلة للقياس',
    },
    subheading:
      'استكشف ستة مسارات رئيسية للخدمات. اضغط على الخدمة الرئيسية لإظهار الخدمات الفرعية والتفاصيل.',
    contact: {
      twitter: 'إكس',
      instagram: 'إنستغرام',
      linkedIn: 'لينكدإن',
    },
  },
} as const

const services: Service[] = [
  {
    id: 'ml-models',
    title: { en: 'ML Models', ar: 'نماذج تعلم الآلة' },
    intro: {
      en: 'Production-ready machine learning systems for forecasting, behavior modeling, and intelligent decision support.',
      ar: 'أنظمة تعلم آلة جاهزة للإنتاج للتنبؤ وتحليل السلوك ودعم اتخاذ القرار الذكي.',
    },
    subServices: [
      {
        id: 'prediction-models',
        title: { en: 'Prediction Models', ar: 'نماذج التنبؤ' },
        description: {
          en: 'Build predictive models that estimate future outcomes from historical operational and commercial data.',
          ar: 'نبني نماذج تنبؤية تقدّر النتائج المستقبلية اعتمادًا على بيانات التشغيل والأعمال التاريخية.',
        },
      },
      {
        id: 'image-detection',
        title: { en: 'Image Detection', ar: 'كشف الصور' },
        description: {
          en: 'Deploy computer vision pipelines for visual inspection, object detection, and image-based quality control.',
          ar: 'نطوّر خطوط رؤية حاسوبية للفحص البصري واكتشاف العناصر وضبط الجودة اعتمادًا على الصور.',
        },
      },
      {
        id: 'customer-behavior',
        title: { en: 'Customer Behavior', ar: 'سلوك العملاء' },
        description: {
          en: 'Analyze interaction patterns to identify churn risk, segment users, and optimize lifecycle actions.',
          ar: 'نحلل أنماط التفاعل لتحديد احتمالية التسرب وتقسيم العملاء وتحسين خطوات دورة الحياة.',
        },
      },
      {
        id: 'demand-forecasting',
        title: { en: 'Demand Forecasting', ar: 'توقع الطلب' },
        description: {
          en: 'Forecast product and service demand with seasonality-aware models to improve planning and inventory.',
          ar: 'نتوقع الطلب على المنتجات والخدمات بنماذج تراعي الموسمية لتحسين التخطيط والمخزون.',
        },
      },
      {
        id: 'anomaly-detection',
        title: { en: 'Anomaly Detection', ar: 'كشف الشذوذ' },
        description: {
          en: 'Detect outliers and operational anomalies early to reduce incidents and protect business continuity.',
          ar: 'نكتشف القيم الشاذة والانحرافات التشغيلية مبكرًا لتقليل الأعطال وضمان استمرارية الأعمال.',
        },
      },
      {
        id: 'recommendation-systems',
        title: { en: 'Recommendation Systems', ar: 'أنظمة التوصية' },
        description: {
          en: 'Create recommendation engines that increase relevance, engagement, and conversion across channels.',
          ar: 'نصمم محركات توصية ترفع الملاءمة والتفاعل ومعدلات التحويل عبر القنوات المختلفة.',
        },
      },
    ],
  },
  {
    id: 'ai-agents',
    title: { en: 'AI Agents', ar: 'وكلاء AI' },
    intro: {
      en: 'Autonomous and semi-autonomous agents that execute workflows, answer requests, and support teams.',
      ar: 'وكلاء ذكيون مستقلون أو شبه مستقلين ينفذون سير العمل ويجيبون الطلبات ويدعمون الفرق.',
    },
    subServices: [
      {
        id: 'support-agents',
        title: { en: 'Support Agents', ar: 'وكلاء الدعم' },
        description: {
          en: 'Provide 24/7 customer and internal support with context-aware answers and escalation rules.',
          ar: 'نوفّر دعمًا متواصلًا للعملاء والفرق الداخلية بإجابات مدركة للسياق وآليات تصعيد واضحة.',
        },
      },
      {
        id: 'sales-assistants',
        title: { en: 'Sales Assistants', ar: 'مساعدو المبيعات' },
        description: {
          en: 'Equip sales teams with AI assistants for lead qualification, follow-ups, and proposal drafting.',
          ar: 'نزوّد فرق المبيعات بمساعدين ذكيين لتأهيل العملاء المحتملين والمتابعة وصياغة العروض.',
        },
      },
      {
        id: 'workflow-agents',
        title: { en: 'Workflow Agents', ar: 'وكلاء سير العمل' },
        description: {
          en: 'Automate multi-step internal processes with agent orchestration and human-in-the-loop checkpoints.',
          ar: 'نؤتمت العمليات متعددة الخطوات عبر تنسيق الوكلاء مع نقاط مراجعة بشرية عند الحاجة.',
        },
      },
      {
        id: 'research-agents',
        title: { en: 'Research Agents', ar: 'وكلاء البحث' },
        description: {
          en: 'Use research agents to gather, summarize, and structure information for faster decision making.',
          ar: 'نستخدم وكلاء بحث لجمع المعلومات وتلخيصها وتنظيمها لتسريع اتخاذ القرار.',
        },
      },
      {
        id: 'ops-copilots',
        title: { en: 'Ops Copilots', ar: 'مساعدو العمليات' },
        description: {
          en: 'Assist operations teams with monitoring, incident guidance, and routine task automation.',
          ar: 'ندعم فرق العمليات بالمراقبة وإرشادات التعامل مع الحوادث وأتمتة المهام المتكررة.',
        },
      },
      {
        id: 'knowledge-agents',
        title: { en: 'Knowledge Agents', ar: 'وكلاء المعرفة' },
        description: {
          en: 'Build agents connected to company knowledge bases for precise policy and process retrieval.',
          ar: 'نبني وكلاء مرتبطين بقواعد معرفة المؤسسة لاسترجاع السياسات والإجراءات بدقة.',
        },
      },
    ],
  },
  {
    id: 'llms',
    title: { en: 'LLMs', ar: 'النماذج اللغوية الكبيرة' },
    intro: {
      en: 'Large language model solutions customized for your domain, data sensitivity, and deployment constraints.',
      ar: 'حلول نماذج لغوية كبيرة مخصصة لمجالك وحساسية بياناتك ومتطلبات الإطلاق الخاصة بك.',
    },
    subServices: [
      {
        id: 'fine-tuning',
        title: { en: 'Fine-Tuning', ar: 'الضبط الدقيق' },
        description: {
          en: 'Fine-tune foundation models on private datasets to improve domain accuracy and tone consistency.',
          ar: 'ننفذ ضبطًا دقيقًا للنماذج الأساسية على بيانات خاصة لرفع الدقة وتوحيد نبرة المخرجات.',
        },
      },
      {
        id: 'rag-systems',
        title: { en: 'RAG Systems', ar: 'أنظمة RAG' },
        description: {
          en: 'Implement retrieval-augmented generation systems for grounded, up-to-date, and auditable responses.',
          ar: 'نطبّق أنظمة توليد معزّزة بالاسترجاع لتقديم إجابات موثوقة وحديثة وقابلة للتدقيق.',
        },
      },
      {
        id: 'prompt-engineering',
        title: { en: 'Prompt Engineering', ar: 'هندسة المطالبات' },
        description: {
          en: 'Design robust prompting frameworks that reduce hallucinations and improve response reliability.',
          ar: 'نصمم أطر مطالبات متينة تقلل الهلوسة وتحسن موثوقية الاستجابات.',
        },
      },
      {
        id: 'private-llm-deployment',
        title: { en: 'Private LLM Deployment', ar: 'نشر نماذج خاصة' },
        description: {
          en: 'Deploy private LLM stacks with controlled access, security hardening, and infrastructure fit.',
          ar: 'نطلق بنى نماذج لغوية خاصة بصلاحيات محكمة وتعزيز أمني وتوافق مع البنية التحتية.',
        },
      },
      {
        id: 'evaluation-pipelines',
        title: { en: 'Evaluation Pipelines', ar: 'خطوط التقييم' },
        description: {
          en: 'Create evaluation pipelines with custom benchmarks to track quality and business impact over time.',
          ar: 'نبني خطوط تقييم بمعايير مخصصة لقياس الجودة والأثر التجاري بشكل مستمر.',
        },
      },
      {
        id: 'guardrails-safety',
        title: { en: 'Guardrails & Safety', ar: 'ضوابط الأمان' },
        description: {
          en: 'Apply policy guardrails, moderation layers, and fallback logic to keep AI usage safe and compliant.',
          ar: 'نطبق ضوابط سياسات وطبقات مراقبة ومنطق بديل لضمان استخدام آمن ومتوافق للذكاء الاصطناعي.',
        },
      },
    ],
  },
  {
    id: 'data',
    title: { en: 'Data', ar: 'البيانات' },
    intro: {
      en: 'Data foundations and pipelines that make AI systems reliable, scalable, and continuously improvable.',
      ar: 'أسس بيانات وخطوط معالجة تجعل أنظمة الذكاء الاصطناعي موثوقة وقابلة للتوسع والتحسين المستمر.',
    },
    subServices: [
      {
        id: 'data-pipelines',
        title: { en: 'Data Pipelines', ar: 'خطوط البيانات' },
        description: {
          en: 'Build robust data pipelines for ingestion, validation, transformation, and downstream AI use.',
          ar: 'نبني خطوط بيانات متينة للالتقاط والتحقق والتحويل والاستخدام اللاحق في تطبيقات الذكاء.',
        },
      },
      {
        id: 'data-cleaning',
        title: { en: 'Data Cleaning', ar: 'تنظيف البيانات' },
        description: {
          en: 'Improve dataset quality by handling duplicates, missing values, inconsistencies, and noisy labels.',
          ar: 'نحسن جودة البيانات عبر معالجة التكرار والقيم المفقودة والتناقضات والتوسيم غير الدقيق.',
        },
      },
      {
        id: 'feature-engineering',
        title: { en: 'Feature Engineering', ar: 'هندسة السمات' },
        description: {
          en: 'Engineer high-signal features that raise model performance and explainability in production.',
          ar: 'نطوّر سمات عالية الإشارة ترفع أداء النماذج وقابليتها للتفسير في بيئة الإنتاج.',
        },
      },
      {
        id: 'etl-orchestration',
        title: { en: 'ETL Orchestration', ar: 'تنسيق ETL' },
        description: {
          en: 'Coordinate ETL jobs with scheduling, monitoring, and fault recovery for dependable operations.',
          ar: 'ننسق وظائف ETL بالجدولة والمراقبة والتعافي من الأخطاء لضمان تشغيل موثوق.',
        },
      },
      {
        id: 'data-warehousing',
        title: { en: 'Data Warehousing', ar: 'مستودعات البيانات' },
        description: {
          en: 'Design analytical data warehouses optimized for reporting, BI workloads, and model training.',
          ar: 'نصمم مستودعات بيانات تحليلية محسنة للتقارير وأعمال ذكاء الأعمال وتدريب النماذج.',
        },
      },
      {
        id: 'data-recovery',
        title: { en: 'Data Recovery', ar: 'استعادة البيانات' },
        description: {
          en: 'Set recovery strategies and backups to minimize data loss and reduce downtime risk.',
          ar: 'نضع استراتيجيات استعادة ونسخ احتياطي لتقليل فقدان البيانات ومخاطر التوقف.',
        },
      },
    ],
  },
  {
    id: 'automation',
    title: { en: 'Automation', ar: 'الأتمتة' },
    intro: {
      en: 'End-to-end process automation that removes repetitive work and improves execution consistency.',
      ar: 'أتمتة شاملة للعمليات تقلل العمل المتكرر وترفع الاتساق والكفاءة في التنفيذ.',
    },
    subServices: [
      {
        id: 'task-automation',
        title: { en: 'Task Automation', ar: 'أتمتة المهام' },
        description: {
          en: 'Automate repetitive daily tasks to free teams for high-value work and decision making.',
          ar: 'نؤتمت المهام اليومية المتكررة لتفريغ وقت الفرق للأعمال الأعلى قيمة.',
        },
      },
      {
        id: 'crm-automation',
        title: { en: 'CRM Automation', ar: 'أتمتة إدارة العملاء' },
        description: {
          en: 'Automate lead routing, follow-up triggers, and customer lifecycle actions inside CRM stacks.',
          ar: 'نؤتمت توزيع العملاء المحتملين وإشعارات المتابعة وخطوات دورة العميل داخل أنظمة CRM.',
        },
      },
      {
        id: 'email-workflows',
        title: { en: 'Email Workflows', ar: 'سير عمل البريد' },
        description: {
          en: 'Create intelligent email flows for onboarding, nurture sequences, and operational alerts.',
          ar: 'نبني تدفقات بريد ذكية للإعداد الأولي وسلاسل الرعاية والتنبيهات التشغيلية.',
        },
      },
      {
        id: 'back-office-ops',
        title: { en: 'Back-Office Ops', ar: 'عمليات المكاتب الخلفية' },
        description: {
          en: 'Automate internal back-office processes including approvals, reconciliation, and document routing.',
          ar: 'نؤتمت عمليات المكاتب الخلفية مثل الموافقات والمطابقة وتوجيه المستندات.',
        },
      },
      {
        id: 'process-monitoring',
        title: { en: 'Process Monitoring', ar: 'مراقبة العمليات' },
        description: {
          en: 'Monitor critical workflows in real time with alerts and performance indicators.',
          ar: 'نراقب سير العمليات الحيوية لحظيًا عبر تنبيهات ومؤشرات أداء واضحة.',
        },
      },
      {
        id: 'approval-flows',
        title: { en: 'Approval Flows', ar: 'مسارات الموافقة' },
        description: {
          en: 'Design structured approval flows with role-based routing and clear accountability.',
          ar: 'نصمم مسارات موافقات منظمة بتوجيه قائم على الأدوار ومسؤوليات واضحة.',
        },
      },
    ],
  },
  {
    id: 'generative-ai',
    title: { en: 'Generative AI', ar: 'AI توليدي' },
    intro: {
      en: 'Generative systems for content, media, and creative operations aligned with your brand and goals.',
      ar: 'أنظمة توليدية للمحتوى والوسائط والعمليات الإبداعية بما يتوافق مع هوية علامتك وأهدافك.',
    },
    subServices: [
      {
        id: 'content-generation',
        title: { en: 'Content Generation', ar: 'توليد المحتوى' },
        description: {
          en: 'Generate long-form and short-form content with brand-aware style controls and review workflows.',
          ar: 'نولد محتوى قصيرًا وطويلًا مع تحكم بالنبرة المتوافقة مع العلامة وآليات مراجعة.',
        },
      },
      {
        id: 'image-generation',
        title: { en: 'Image Generation', ar: 'توليد الصور' },
        description: {
          en: 'Produce campaign and product visuals using prompt pipelines tuned for consistency and quality.',
          ar: 'ننتج صورًا للحملات والمنتجات عبر خطوط توليد مضبوطة للاتساق والجودة.',
        },
      },
      {
        id: 'voice-generation',
        title: { en: 'Voice Generation', ar: 'توليد الصوت' },
        description: {
          en: 'Build voice generation workflows for narration, assistants, and multilingual media assets.',
          ar: 'نطوّر سير عمل لتوليد الصوت للتعليق الصوتي والمساعدات والوسائط متعددة اللغات.',
        },
      },
      {
        id: 'creative-copilots',
        title: { en: 'Creative Copilots', ar: 'مساعدو الإبداع' },
        description: {
          en: 'Deploy creative copilots for ideation, drafts, and rapid iteration across teams.',
          ar: 'نوفّر مساعدين إبداعيين لتوليد الأفكار والمسودات وتسريع التكرار بين الفرق.',
        },
      },
      {
        id: 'brand-assets',
        title: { en: 'Brand Assets', ar: 'أصول العلامة' },
        description: {
          en: 'Generate reusable brand assets while preserving tone, identity rules, and campaign consistency.',
          ar: 'ننشئ أصول علامة قابلة لإعادة الاستخدام مع الحفاظ على الهوية والنبرة والاتساق.',
        },
      },
      {
        id: 'marketing-creatives',
        title: { en: 'Marketing Creatives', ar: 'مواد تسويقية إبداعية' },
        description: {
          en: 'Create ad creatives and marketing variants quickly for testing and channel-specific optimization.',
          ar: 'نصنع موادًا تسويقية ونسخًا متعددة بسرعة للاختبار والتحسين حسب كل قناة.',
        },
      },
    ],
  },
]

export default function ServicesPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)

  const isArabic = language === 'ar'
  const t = uiCopy[language]
  const headlineHighlightFontClass = isArabic ? unixel.className : redaction50Italic.className
  const textAlignClass = isArabic ? 'text-right' : 'text-left'
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? '')
  const selectedService = services.find(service => service.id === selectedServiceId) ?? services[0]
  const [activeSubServiceId, setActiveSubServiceId] = useState(
    services[0]?.subServices[0]?.id ?? ''
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    if (!selectedService) {
      return
    }

    const updateActiveSubService = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-service-id="${selectedService.id}"][data-subservice-id]`)
      )

      if (!elements.length) {
        return
      }

      const offset = 170
      let currentId = selectedService.subServices[0]?.id ?? ''

      for (const element of elements) {
        const subId = element.dataset.subserviceId
        if (!subId) {
          continue
        }
        if (element.getBoundingClientRect().top <= offset) {
          currentId = subId
        } else {
          break
        }
      }

      if (currentId) {
        setActiveSubServiceId(prev => (prev === currentId ? prev : currentId))
      }
    }

    updateActiveSubService()
    window.addEventListener('scroll', updateActiveSubService, { passive: true })
    window.addEventListener('resize', updateActiveSubService)

    return () => {
      window.removeEventListener('scroll', updateActiveSubService)
      window.removeEventListener('resize', updateActiveSubService)
    }
  }, [selectedService])

  const scrollToSubService = (subServiceId: string) => {
    const target = document.getElementById(`subservice-${subServiceId}`)
    if (!target) {
      return
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSubServiceId(subServiceId)
  }

  const selectService = (serviceId: string) => {
    const service = services.find(item => item.id === serviceId)
    if (!service) {
      return
    }
    setSelectedServiceId(service.id)
    setActiveSubServiceId(service.subServices[0]?.id ?? '')
    const panel = document.getElementById('service-panel')
    panel?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
              <Link href={isArabic ? '/ar/articles' : '/en/articles'} className="text-base leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.articles}</Link>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
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

          <div className="mt-5 md:hidden">
            <div className="-mx-1 flex overflow-x-auto px-1">
              {services.map(service => (
                <button
                  key={`mobile-${service.id}`}
                  type="button"
                  onClick={() => selectService(service.id)}
                  className={`shrink-0 cursor-pointer px-2 py-1 text-sm leading-6 font-light whitespace-nowrap transition-colors ${
                    selectedServiceId === service.id
                      ? 'text-black underline decoration-black/70 underline-offset-4'
                      : 'text-black/55'
                  }`}
                >
                  {service.title[language]}
                </button>
              ))}
            </div>
          </div>

          <div id="services-content" className="mt-8 grid gap-3 md:grid-cols-[6.75rem_minmax(0,1fr)]">
            <aside
              className={`hidden self-start md:sticky md:top-24 md:block md:border-black/10 ${isArabic ? 'md:border-l md:pl-2' : 'md:border-r md:pr-2'}`}
            >
              <div className="space-y-0.5 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
                {services.map(service => (
                  <section key={service.id}>
                    <button
                      type="button"
                      onClick={() => selectService(service.id)}
                      className={`w-full cursor-pointer text-base leading-6 font-medium tracking-normal transition-colors ${isArabic ? 'text-right' : 'text-left'} ${selectedServiceId === service.id ? 'text-black' : 'text-black/55 hover:text-black/80'}`}
                    >
                      {service.title[language]}
                    </button>
                    <div
                      aria-hidden={selectedServiceId !== service.id}
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                        selectedServiceId === service.id
                          ? 'mt-0.5 grid-rows-[1fr] opacity-100'
                          : 'mt-0 grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className={`min-h-0 ${isArabic ? 'pr-2' : 'pl-2'}`}>
                        {service.subServices.map(subService => {
                          const isActive = activeSubServiceId === subService.id
                          return (
                            <button
                              key={subService.id}
                              type="button"
                              onClick={() => scrollToSubService(subService.id)}
                              className={`block w-full cursor-pointer text-[11px] leading-5 font-light transition-colors ${isArabic ? 'text-right' : 'text-left'} ${
                                isActive
                                  ? 'text-black'
                                  : 'text-black/45 hover:text-black/75'
                              }`}
                            >
                              {subService.title[language]}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </aside>

            <div id="service-panel" className={`space-y-6 ${isArabic ? 'md:pr-1' : 'md:pl-1'}`}>
              {selectedService && (
                <section
                  key={selectedService.id}
                  id={`service-${selectedService.id}`}
                  className="scroll-mt-28 pb-1"
                >
                  <h2 className={`text-base leading-6 font-medium tracking-normal text-black ${textAlignClass}`}>
                    {selectedService.title[language]}
                  </h2>
                  <p className={`mt-1 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                    {selectedService.intro[language]}
                  </p>

                  <div className="mt-3 space-y-3">
                    {selectedService.subServices.map(subService => (
                      <div
                        key={subService.id}
                        id={`subservice-${subService.id}`}
                        data-subservice-id={subService.id}
                        data-service-id={selectedService.id}
                        className="scroll-mt-28"
                      >
                        <h3
                          className={`text-[15px] leading-6 font-light tracking-normal ${textAlignClass} ${
                            activeSubServiceId === subService.id ? 'text-black' : 'text-black/75'
                          }`}
                        >
                          {subService.title[language]}
                        </h3>
                        <p className={`mt-1 text-base leading-6 font-light text-black/65 ${textAlignClass}`}>
                          {subService.description[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
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
