'use client'

import { ArrowUpRight } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'

const EMAIL_ADDRESS = 'team@atmetai.com'
const X_URL = 'https://x.com/intlgnc_lab'
const INSTAGRAM_URL = 'https://www.instagram.com/intelligencelab.dev?igsh=N2t4c2J4c2lpb3Zh'
const LINKEDIN_URL = 'https://www.linkedin.com/company/intelligence-lab-dev'

type MarketingFooterProps = {
  isArabic: boolean
  textAlignClass: string
  contact: {
    x: string
    instagram: string
    linkedIn: string
  }
}

export function MarketingFooter({ isArabic, textAlignClass, contact }: MarketingFooterProps) {
  return (
    <footer
      id="contact"
      className={`fixed bottom-0 left-1/2 z-40 flex w-[calc(100%-3rem)] max-w-2xl -translate-x-1/2 flex-col gap-4 border-t border-black/10 bg-white pt-6 pb-10 sm:w-[calc(100%-4rem)] md:flex-row md:items-center md:justify-between ${isArabic ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`w-full text-base leading-6 font-light text-black/65 md:w-auto ${textAlignClass}`}>
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
      <div className={`flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-base leading-6 font-light text-black/65 md:w-auto ${isArabic ? 'justify-end md:justify-start' : 'justify-start'}`}>
        <a
          href={X_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.x}
          <ArrowUpRight className="size-3" />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.instagram}
          <ArrowUpRight className="size-3" />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-black"
        >
          {contact.linkedIn}
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </footer>
  )
}
