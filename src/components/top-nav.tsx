'use client'

import Link from 'next/link'

type TopNavProps = {
  isArabic: boolean
  logo: string
  services: string
  articles?: string
  sayHi: string
  homeHref: string
  servicesHref: string
  articlesHref?: string
  contactHref: string
  aiTechnologiesHref?: string
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
  aiTechnologiesHref: _aiTechnologiesHref,
}: TopNavProps) {
  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="top-nav-glass relative z-10 flex w-full max-w-[560px] items-center justify-between rounded-md px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <Link href={homeHref} className="text-sm leading-6 font-medium text-black dark:text-white/90">{logo}</Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link href={servicesHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">{services}</Link>
          <Link href={contactHref} className="text-sm leading-6 font-light text-black/65 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white">{sayHi}</Link>
        </div>
      </nav>
    </div>
  )
}
