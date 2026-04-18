'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Languages, Moon, Sun } from 'lucide-react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { usePersistedLanguage } from '@/hooks/use-persisted-language'
import AvatarGroupTooltipDemo from '@/components/shadcn-studio/avatar/avatar-16'
import { usePersistedTheme } from '@/hooks/use-persisted-theme'

type Language = 'en' | 'ar'
type ContactIntent = 'learn' | 'know'
type SelectOption = {
  value: string
  label: string
}
type SelectSection = {
  label?: string
  options: SelectOption[]
}

type ContactCopy = {
  nav: {
    logo: string
    whatWeDo: string
    articles: string
    sayHi: string
  }
  title: string
  subtitle: string
  actions: {
    directMeeting: string
    fillForm: string
  }
  form: {
    title: string
    fullName: string
    companyName: string
    role: string
    roleElse: string
    employees: string
    email: string
    phoneCode: string
    phone: string
    country: string
    intentQuestion: string
    intentLearn: string
    intentKnow: string
    tellUsMore: string
    arabCountriesSection: string
    otherCountriesSection: string
    arabPhoneCodesSection: string
    otherPhoneCodesSection: string
    selectRequired: string
    submit: string
    submitFailed: string
  }
  postSubmit: {
    title: string
    bookMeeting: string
    skip: string
    skippedMessage: string
    backHome: string
  }
}

const STORAGE_KEY = 'baz-language'
const THEME_STORAGE_KEY = 'baz-theme'
const CAL_BOOKING_URL = 'https://cal.com/bazintelligence/'
const ARAB_COUNTRY_CODES = [
  'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MR',
  'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE',
]
const FALLBACK_COUNTRY_CODES = [
  'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BT',
  'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CR',
  'CI', 'HR', 'CU', 'CY', 'CZ', 'CD', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI',
  'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ',
  'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU',
  'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR',
  'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'KP', 'MK', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA',
  'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA',
  'KR', 'SS', 'ES', 'LK', 'SD', 'SR', 'SE', 'CH', 'SY', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'TV',
  'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'YE', 'ZM', 'ZW', 'PS',
]
const DIAL_CODE_BY_COUNTRY: Record<string, string> = {
  DZ: '+213', BH: '+973', KM: '+269', DJ: '+253', EG: '+20', IQ: '+964', JO: '+962', KW: '+965', LB: '+961', LY: '+218',
  MR: '+222', MA: '+212', OM: '+968', PS: '+970', QA: '+974', SA: '+966', SO: '+252', SD: '+249', SY: '+963', TN: '+216',
  AE: '+971', YE: '+967',
  US: '+1', CA: '+1', GB: '+44', FR: '+33', DE: '+49', IT: '+39', ES: '+34', NL: '+31', SE: '+46', NO: '+47',
  CH: '+41', AT: '+43', BE: '+32', IE: '+353', PT: '+351', PL: '+48', CZ: '+420', RO: '+40', HU: '+36', GR: '+30',
  TR: '+90', RU: '+7', UA: '+380',
  IN: '+91', PK: '+92', BD: '+880', LK: '+94', NP: '+977', CN: '+86', JP: '+81', KR: '+82', MY: '+60', SG: '+65',
  ID: '+62', PH: '+63', TH: '+66', VN: '+84',
  AU: '+61', NZ: '+64',
  MX: '+52', BR: '+55', AR: '+54', CL: '+56', CO: '+57', PE: '+51',
  ZA: '+27', NG: '+234', KE: '+254', ET: '+251', GH: '+233',
}

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const content: Record<Language, ContactCopy> = {
  en: {
    nav: {
      logo: 'Intelligence',
      whatWeDo: 'What We Do',
      articles: 'Articles',
      sayHi: 'Say hi',
    },
    title: 'How would you like to continue?',
    subtitle: 'Choose a direct meeting, or fill the form and we will follow up with the right scope.',
    actions: {
      directMeeting: 'Book a direct meeting',
      fillForm: 'Fill the form',
    },
    form: {
      title: 'Tell us about your company',
      fullName: 'Full name',
      companyName: 'Company name',
      role: 'Role',
      roleElse: 'Tell us your role',
      employees: 'Number of employees',
      email: 'Email',
      phoneCode: 'Country key',
      phone: 'Phone',
      country: 'Country',
      intentQuestion: 'What best describes your need?',
      intentLearn: 'I want to know what you provide',
      intentKnow: 'I know what I want',
      tellUsMore: 'Tell us more',
      arabCountriesSection: 'Arabic Countries',
      otherCountriesSection: 'All Other Countries',
      arabPhoneCodesSection: 'Arabic Keys',
      otherPhoneCodesSection: 'International Keys',
      selectRequired: 'Please select an option.',
      submit: 'Submit',
      submitFailed: 'Something went wrong while saving your form. Please try again.',
    },
    postSubmit: {
      title: 'Would you like to book a direct meeting now?',
      bookMeeting: 'Book meeting',
      skip: 'Skip',
      skippedMessage: 'Great, we received your details and will contact you soon.',
      backHome: 'Back to home',
    },
  },
  ar: {
    nav: {
      logo: 'إنتيليجنس',
      whatWeDo: 'ماذا نفعل',
      articles: 'المقالات',
      sayHi: 'تواصل',
    },
    title: 'كيف تفضّل المتابعة؟',
    subtitle: 'يمكنك حجز اجتماع مباشر، أو تعبئة النموذج وسنتواصل معك بالنطاق المناسب.',
    actions: {
      directMeeting: 'حجز اجتماع مباشر',
      fillForm: 'تعبئة النموذج',
    },
    form: {
      title: 'أخبرنا أكثر عن شركتك',
      fullName: 'الاسم الكامل',
      companyName: 'اسم الشركة',
      role: 'الدور الوظيفي',
      roleElse: 'اكتب دورك الوظيفي',
      employees: 'عدد الموظفين',
      email: 'البريد الإلكتروني',
      phoneCode: 'مفتاح الدولة',
      phone: 'رقم الهاتف',
      country: 'الدولة',
      intentQuestion: 'ما الذي يصف احتياجك بشكل أدق؟',
      intentLearn: 'أريد معرفة ما الذي تقدمونه',
      intentKnow: 'أنا أعرف ما أريده',
      tellUsMore: 'أخبرنا أكثر',
      arabCountriesSection: 'الدول العربية',
      otherCountriesSection: 'باقي الدول',
      arabPhoneCodesSection: 'المفاتيح العربية',
      otherPhoneCodesSection: 'المفاتيح الدولية',
      selectRequired: 'يرجى اختيار قيمة.',
      submit: 'إرسال',
      submitFailed: 'حدث خطأ أثناء حفظ النموذج. يرجى المحاولة مرة أخرى.',
    },
    postSubmit: {
      title: 'هل تريد حجز اجتماع مباشر الآن؟',
      bookMeeting: 'حجز اجتماع',
      skip: 'تخطي',
      skippedMessage: 'ممتاز، استلمنا بياناتك وسنتواصل معك قريبًا.',
      backHome: 'العودة للرئيسية',
    },
  },
}

type CustomSelectProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  sections: SelectSection[]
  isArabic: boolean
  hasError?: boolean
  rootClassName?: string
  triggerClassName?: string
  getTriggerLabel?: (selectedOption: SelectOption | undefined) => string
}

function CustomSelect({
  value,
  onChange,
  placeholder,
  sections,
  isArabic,
  hasError = false,
  rootClassName = '',
  triggerClassName = '',
  getTriggerLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = sections.flatMap((section) => section.options).find((option) => option.value === value)

  const triggerText = selectedOption
    ? (getTriggerLabel ? getTriggerLabel(selectedOption) : selectedOption.label)
    : placeholder

  return (
    <div ref={rootRef} className={`relative ${rootClassName}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) {
            setIsOpen(true)
          }
        }}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget as Node | null
          if (!rootRef.current?.contains(nextTarget)) {
            setIsOpen(false)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false)
            return
          }
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm outline-none transition-colors ${
          hasError
            ? 'border-red-400'
            : isOpen
              ? 'border-[#1063ff]'
              : 'border-black/15 hover:border-black/25 focus-visible:border-[#1063ff]'
        } ${triggerClassName}`}
      >
        <span className={selectedOption ? 'text-black' : 'text-black/55'}>
          {triggerText}
        </span>
        <ChevronDown className={`size-4 shrink-0 text-black/55 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        role="listbox"
        aria-hidden={!isOpen}
        className={`absolute z-30 mt-1 w-full overflow-hidden rounded-md border border-black/15 bg-white shadow-sm transition-all duration-200 ${
          isOpen ? 'pointer-events-auto max-h-64 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className={`max-h-64 overflow-y-auto p-1 ${isArabic ? 'text-right' : 'text-left'}`}>
          {sections.map((section) => (
            <div key={section.label ?? 'default-section'} className="pb-1 last:pb-0">
              {section.label ? (
                <p className="px-2 py-1 text-xs font-medium text-black/45">{section.label}</p>
              ) : null}
              {section.options.map((option) => {
                const isSelected = option.value === value
                return (
                  <button
                    key={option.value}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isSelected ? 'bg-site-gray-ui text-black' : 'text-black/80 hover:bg-site-gray-ui'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected ? <Check className="size-3.5 text-black/60" /> : null}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ContactPage({ initialLanguage = 'en' }: { initialLanguage?: Language }) {
  const [language, setLanguage] = usePersistedLanguage(initialLanguage, STORAGE_KEY)
  const [theme, setTheme] = usePersistedTheme('light', THEME_STORAGE_KEY)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [skippedMeeting, setSkippedMeeting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [intent, setIntent] = useState<ContactIntent>('learn')
  const [fieldErrors, setFieldErrors] = useState({
    role: false,
    employees: false,
    phoneCode: false,
    country: false,
  })
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    role: '',
    roleElse: '',
    employees: '',
    email: '',
    phoneCode: '',
    phone: '',
    country: '',
    details: '',
  })

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
  const homeHref = isArabic ? '/ar' : '/en'
  const contactHref = isArabic ? '/ar/contact' : '/en/contact'
  const employeeSections: SelectSection[] = useMemo(
    () => [
      {
        options: [
          { value: '1-8', label: '1-8' },
          { value: '9-20', label: '9-20' },
          { value: '21-50', label: '21-50' },
          { value: '50+', label: '50+' },
        ],
      },
    ],
    [],
  )
  const roleSections: SelectSection[] = useMemo(
    () => [
      {
        options: isArabic
          ? [
              { value: 'founder', label: 'Founder (مؤسس)' },
              { value: 'management', label: 'Managment (الإدارة)' },
              { value: 'engineering', label: 'Eningeering (الهندسة)' },
              { value: 'marketing', label: 'Marketing (التسويق)' },
              { value: 'sales', label: 'Sales (المبيعات)' },
              { value: 'it', label: 'IT (تقنية المعلومات)' },
              { value: 'support', label: 'Support (الدعم)' },
              { value: 'else', label: 'Else (أخرى)' },
            ]
          : [
              { value: 'founder', label: 'Founder' },
              { value: 'management', label: 'Managment' },
              { value: 'engineering', label: 'Eningeering' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
              { value: 'it', label: 'IT' },
              { value: 'support', label: 'Support' },
              { value: 'else', label: 'Else' },
            ],
      },
    ],
    [isArabic],
  )
  const countrySections: SelectSection[] = useMemo(() => {
    let runtimeRegionCodes: string[] = []
    try {
      const supportedValuesOf = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
        .supportedValuesOf
      runtimeRegionCodes = (supportedValuesOf?.('region') ?? []).filter((code) =>
        /^[A-Z]{2}$/.test(code),
      )
    } catch {
      runtimeRegionCodes = []
    }
    const mergedCodes = Array.from(
      new Set([
        ...(runtimeRegionCodes.length > 0 ? runtimeRegionCodes : FALLBACK_COUNTRY_CODES),
        ...ARAB_COUNTRY_CODES,
      ]),
    )
    const displayNames = new Intl.DisplayNames([isArabic ? 'ar' : 'en'], { type: 'region' })
    const toOption = (code: string): SelectOption => ({
      value: code,
      label: displayNames.of(code) ?? code,
    })
    const arabCodeSet = new Set(ARAB_COUNTRY_CODES)
    const arabOptions = ARAB_COUNTRY_CODES
      .filter((code) => mergedCodes.includes(code))
      .map(toOption)
      .sort((a, b) => a.label.localeCompare(b.label, isArabic ? 'ar' : 'en'))
    const otherOptions = mergedCodes
      .filter((code) => !arabCodeSet.has(code))
      .map(toOption)
      .sort((a, b) => a.label.localeCompare(b.label, isArabic ? 'ar' : 'en'))

    return [
      { label: t.form.arabCountriesSection, options: arabOptions },
      { label: t.form.otherCountriesSection, options: otherOptions },
    ]
  }, [isArabic, t.form.arabCountriesSection, t.form.otherCountriesSection])
  const phoneCodeSections: SelectSection[] = useMemo(() => {
    const displayNames = new Intl.DisplayNames([isArabic ? 'ar' : 'en'], { type: 'region' })
    const formatOption = (countryCode: string): SelectOption => {
      const dialCode = DIAL_CODE_BY_COUNTRY[countryCode] ?? ''
      const countryLabel = displayNames.of(countryCode) ?? countryCode
      return {
        value: `${countryCode}:${dialCode}`,
        label: `${countryLabel} (${dialCode})`,
      }
    }
    const arabOptions = ARAB_COUNTRY_CODES
      .filter((code) => DIAL_CODE_BY_COUNTRY[code])
      .map(formatOption)
      .sort((a, b) => a.label.localeCompare(b.label, isArabic ? 'ar' : 'en'))
    const otherCodes = Object.keys(DIAL_CODE_BY_COUNTRY).filter((code) => !ARAB_COUNTRY_CODES.includes(code))
    const otherOptions = otherCodes
      .map(formatOption)
      .sort((a, b) => a.label.localeCompare(b.label, isArabic ? 'ar' : 'en'))

    return [
      { label: t.form.arabPhoneCodesSection, options: arabOptions },
      { label: t.form.otherPhoneCodesSection, options: otherOptions },
    ]
  }, [isArabic, t.form.arabPhoneCodesSection, t.form.otherPhoneCodesSection])

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white px-6 pt-16 sm:px-8 ${isArabic ? ibmArabic.className : ''}`}
    >
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-[560px] items-center justify-between rounded-md bg-neutral-200/70 px-3 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Link href={homeHref} className="text-sm leading-6 font-medium text-black">
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
            <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black">{t.nav.sayHi}</Link>
          </div>
        </nav>
      </div>

      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-2xl items-center pt-10">
        <div className={`w-full ${textAlignClass}`}>
          <div className="mb-3 flex justify-start">
            <AvatarGroupTooltipDemo language={language} tooltipClassName={isArabic ? ibmArabic.className : undefined} />
          </div>
          <h1 className="text-xl leading-6 font-medium tracking-normal text-black">{t.title}</h1>
          <p className="mt-2 text-base leading-6 font-light text-black/65">{t.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
            >
              {t.actions.directMeeting}
            </a>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center rounded-md bg-site-gray-ui px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-site-gray-ui"
            >
              {t.actions.fillForm}
            </button>
          </div>

          <div className={`grid transition-all duration-500 ease-out ${showForm ? 'mt-5 grid-rows-[1fr] overflow-visible opacity-100' : 'mt-0 grid-rows-[0fr] overflow-hidden opacity-0'}`}>
            <div className={showForm ? 'overflow-visible' : 'overflow-hidden'}>
              <form
                onSubmit={async (event) => {
                  event.preventDefault()
                  if (!event.currentTarget.reportValidity()) {
                    return
                  }
                  const nextErrors = {
                    role: formData.role.length === 0,
                    employees: formData.employees.length === 0,
                    phoneCode: formData.phoneCode.length === 0,
                    country: formData.country.length === 0,
                  }
                  setFieldErrors(nextErrors)
                  if (nextErrors.role || nextErrors.employees || nextErrors.phoneCode || nextErrors.country) {
                    return
                  }
                  setSubmitError('')
                  setIsSubmitting(true)
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        language,
                        intent,
                        fullName: formData.fullName,
                        companyName: formData.companyName,
                        role: formData.role,
                        roleElse: formData.roleElse,
                        employees: formData.employees,
                        email: formData.email,
                        phoneCode: formData.phoneCode,
                        phone: formData.phone,
                        country: formData.country,
                        details: formData.details,
                      }),
                    })

                    if (!response.ok) {
                      throw new Error(`Request failed with status ${response.status}`)
                    }

                    setSkippedMeeting(false)
                    setSubmitted(true)
                  } catch (error) {
                    console.error('Failed to submit contact form:', error)
                    setSubmitError(t.form.submitFailed)
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="preserve-form-borders space-y-3"
              >
                <h2 className="text-base font-medium text-black">{t.form.title}</h2>

                <div className="grid gap-3">
                  <input
                    required
                    value={formData.fullName}
                    onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))}
                    placeholder={t.form.fullName}
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff]"
                  />
                  <input
                    required
                    value={formData.companyName}
                    onChange={(event) => setFormData((current) => ({ ...current, companyName: event.target.value }))}
                    placeholder={t.form.companyName}
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff]"
                  />
                  <div>
                    <CustomSelect
                      value={formData.role}
                      onChange={(value) => {
                        setFormData((current) => ({
                          ...current,
                          role: value,
                          roleElse: value === 'else' ? current.roleElse : '',
                        }))
                        setFieldErrors((current) => ({ ...current, role: false }))
                      }}
                      placeholder={t.form.role}
                      sections={roleSections}
                      isArabic={isArabic}
                      hasError={fieldErrors.role}
                    />
                    {fieldErrors.role ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                  <div className={`grid overflow-hidden transition-all duration-300 ease-out ${formData.role === 'else' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <input
                        required={formData.role === 'else'}
                        value={formData.roleElse}
                        onChange={(event) => setFormData((current) => ({ ...current, roleElse: event.target.value }))}
                        placeholder={t.form.roleElse}
                        className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff]"
                      />
                    </div>
                  </div>
                  <div>
                    <CustomSelect
                      value={formData.employees}
                      onChange={(value) => {
                        setFormData((current) => ({ ...current, employees: value }))
                        setFieldErrors((current) => ({ ...current, employees: false }))
                      }}
                      placeholder={t.form.employees}
                      sections={employeeSections}
                      isArabic={isArabic}
                      hasError={fieldErrors.employees}
                    />
                    {fieldErrors.employees ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                  <input
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t.form.email}
                    type="email"
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff]"
                  />
                  <div>
                    <div className="flex items-stretch gap-2">
                      <CustomSelect
                        value={formData.phoneCode}
                        onChange={(value) => {
                          setFormData((current) => ({ ...current, phoneCode: value }))
                          setFieldErrors((current) => ({ ...current, phoneCode: false }))
                        }}
                        placeholder="+000"
                        sections={phoneCodeSections}
                        isArabic={isArabic}
                        hasError={fieldErrors.phoneCode}
                        rootClassName="w-28 shrink-0"
                        triggerClassName="px-2"
                        getTriggerLabel={(selectedOption) => {
                          if (!selectedOption) {
                            return '+000'
                          }
                          const [, dialCode = ''] = selectedOption.value.split(':')
                          return dialCode
                        }}
                      />
                      <input
                        required
                        value={formData.phone}
                        onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                        placeholder={t.form.phone}
                        type="tel"
                        inputMode="tel"
                        dir={isArabic ? 'rtl' : 'ltr'}
                        disabled={!formData.phoneCode}
                        className={`flex-1 rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff] disabled:cursor-not-allowed disabled:bg-site-gray-surface disabled:text-black/45 ${isArabic ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                    {fieldErrors.phoneCode ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                  <div>
                    <CustomSelect
                      value={formData.country}
                      onChange={(value) => {
                        setFormData((current) => ({ ...current, country: value }))
                        setFieldErrors((current) => ({ ...current, country: false }))
                      }}
                      placeholder={t.form.country}
                      sections={countrySections}
                      isArabic={isArabic}
                      hasError={fieldErrors.country}
                    />
                    {fieldErrors.country ? (
                      <p className="mt-1 text-xs text-red-500">{t.form.selectRequired}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-black/75">{t.form.intentQuestion}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIntent('learn')}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${intent === 'learn' ? 'border-[#1063ff] bg-[#1063ff] text-white' : 'border-black/15 bg-white text-black hover:bg-white'}`}
                    >
                      {t.form.intentLearn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntent('know')}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${intent === 'know' ? 'border-[#1063ff] bg-[#1063ff] text-white' : 'border-black/15 bg-white text-black hover:bg-white'}`}
                    >
                      {t.form.intentKnow}
                    </button>
                  </div>
                </div>

                <div className={`grid overflow-hidden transition-all duration-300 ease-out ${intent === 'know' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <textarea
                      value={formData.details}
                      onChange={(event) => setFormData((current) => ({ ...current, details: event.target.value }))}
                      placeholder={t.form.tellUsMore}
                      className="min-h-24 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-[#1063ff]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
                >
                  {t.form.submit}
                </button>
                {submitError ? (
                  <p className="text-sm text-red-500">{submitError}</p>
                ) : null}
              </form>
            </div>
          </div>

          <div className={`grid overflow-hidden transition-all duration-500 ease-out ${submitted ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="rounded-md border border-black/10 bg-site-gray-surface p-3">
                <p className="text-sm font-medium text-black">{t.postSubmit.title}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-black/85"
                  >
                    {t.postSubmit.bookMeeting}
                  </a>
                  <button
                    type="button"
                    onClick={() => setSkippedMeeting(true)}
                    className="inline-flex items-center rounded-md bg-site-gray-ui px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-site-gray-ui"
                  >
                    {t.postSubmit.skip}
                  </button>
                </div>
                <div className={`grid overflow-hidden transition-all duration-300 ease-out ${skippedMeeting ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-black/65">{t.postSubmit.skippedMessage}</p>
                    <div className="mt-2">
                      <Link
                        href={homeHref}
                        className="inline-flex items-center rounded-md bg-site-gray-ui px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-site-gray-ui"
                      >
                        {t.postSubmit.backHome}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
