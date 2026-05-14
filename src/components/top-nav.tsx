'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

type TopNavProps = {
  isArabic: boolean
  logo: string
  services: string
  articles: string
  sayHi: string
  homeHref: string
  servicesHref: string
  articlesHref: string
  contactHref: string
  aiTechnologiesHref: string
  appsWebsitesHref?: string
  ourWorkLabel?: string
  aiTechnologiesLabel?: string
  appsWebsitesLabel?: string
}

export function TopNav({
  isArabic,
  logo,
  services,
  articles: _articles,
  sayHi,
  homeHref,
  servicesHref,
  articlesHref: _articlesHref,
  contactHref,
  aiTechnologiesHref,
  appsWebsitesHref = isArabic ? '/ar/our-work/apps-websites' : '/en/our-work/apps-websites',
  ourWorkLabel,
  aiTechnologiesLabel,
  appsWebsitesLabel,
}: TopNavProps) {
  const navMenusRef = useRef<HTMLDivElement | null>(null)
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node
      if (!navMenusRef.current?.contains(targetNode)) {
        navMenusRef.current
          ?.querySelectorAll<HTMLDetailsElement>('details[open]')
          .forEach((menu) => menu.removeAttribute('open'))
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const workLabel = ourWorkLabel ?? (isArabic ? 'أعمالنا' : 'Our Work')
  const aiLabel = aiTechnologiesLabel ?? (isArabic ? 'إنتيلجنس لاب: لتقنيات الذكاء الاصطناعي' : 'Intelligence Lab: for AI Technologies')
  const appsLabel = appsWebsitesLabel ?? (isArabic ? 'إنتيلجنس لاب: للتطبيقات والمواقع' : 'Intelligence Lab: for Apps & Websites')
  const aiDescription = isArabic ? 'وكلاء ذكية، أتمتة، ونماذج مخصصة' : 'AI agents, automation, and custom models'
  const appsDescription = isArabic ? 'تطبيقات ومواقع حديثة وقابلة للتوسع' : 'Modern apps and websites built to scale'
  const dropdownRadiusClass = 'rounded-md'

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`fixed inset-0 bg-white/10 transition-[opacity,backdrop-filter] duration-300 ease-out ${
          isWorkMenuOpen ? 'pointer-events-auto opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0 backdrop-blur-none'
        }`}
        aria-hidden
      />
      <nav className="top-nav-glass relative z-10 flex w-full max-w-[560px] items-center justify-between rounded-md px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <Link href={homeHref} className="text-sm leading-6 font-medium text-black dark:text-white/90">{logo}</Link>
        </div>
        <div ref={navMenusRef} className="flex items-center justify-end gap-2">
          <details
            className="group"
            onToggle={(event) => {
              setIsWorkMenuOpen(event.currentTarget.open)
            }}
          >
            <summary className="list-none [&::-webkit-details-marker]:hidden inline-flex cursor-pointer items-center gap-1 text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">
              <span>{workLabel}</span>
              <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="absolute top-full left-1/2 z-20 mt-1 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2">
              <div className="pointer-events-none origin-top grid grid-rows-[0fr] -translate-y-1 scale-[0.985] overflow-hidden opacity-0 transition-[grid-template-rows,opacity,transform] duration-300 ease-out group-open:pointer-events-auto group-open:grid-rows-[1fr] group-open:translate-y-0 group-open:scale-100 group-open:opacity-100">
                <div className={`top-nav-dropdown-glass min-h-0 ${dropdownRadiusClass} p-1 shadow-sm`}>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Link
                      href={aiTechnologiesHref}
                      className={`group/item overflow-hidden ${dropdownRadiusClass} border border-black/5 bg-white/20 transition-colors hover:bg-white/45 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10`}
                      onClick={(event) => {
                        event.currentTarget.closest('details')?.removeAttribute('open')
                      }}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src="/ai.png"
                          alt={aiLabel}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/item:scale-[1.03]"
                        />
                      </div>
                      <div className="bg-white/35 px-2 py-1.5 dark:bg-black/25">
                        <p className="text-sm leading-5 font-light text-black/80 transition-colors group-hover/item:text-black dark:text-white/85 dark:group-hover/item:text-white">
                          {aiLabel}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 font-light text-black/55 transition-colors group-hover/item:text-black/70 dark:text-white/60 dark:group-hover/item:text-white/75">
                          {aiDescription}
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={appsWebsitesHref}
                      className={`group/item overflow-hidden ${dropdownRadiusClass} border border-black/5 bg-white/20 transition-colors hover:bg-white/45 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10`}
                      onClick={(event) => {
                        event.currentTarget.closest('details')?.removeAttribute('open')
                      }}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src="/art.png"
                          alt={appsLabel}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/item:scale-[1.03]"
                        />
                      </div>
                      <div className="bg-white/35 px-2 py-1.5 dark:bg-black/25">
                        <p className="text-sm leading-5 font-light text-black/80 transition-colors group-hover/item:text-black dark:text-white/85 dark:group-hover/item:text-white">
                          {appsLabel}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 font-light text-black/55 transition-colors group-hover/item:text-black/70 dark:text-white/60 dark:group-hover/item:text-white/75">
                          {appsDescription}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </details>
          <Link href={servicesHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">{services}</Link>
          <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">{sayHi}</Link>
        </div>
      </nav>
    </div>
  )
}
