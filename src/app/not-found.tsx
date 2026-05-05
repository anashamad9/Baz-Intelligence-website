import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-[#1c1917] dark:text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(17,24,39,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(120,113,108,0.16),transparent_34%),linear-gradient(to_bottom,rgba(245,245,244,0.6),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(245,245,244,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(120,113,108,0.18),transparent_34%),linear-gradient(to_bottom,rgba(41,37,36,0.45),transparent_45%)]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white/80 p-8 text-center shadow-[0_24px_90px_-40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-12 dark:border-white/15 dark:bg-[#1f1b19]/80">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55 dark:text-stone-300/80">Error 404</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-black md:text-5xl dark:text-stone-100">Page not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/70 md:text-base dark:text-stone-300/85">
            The page you are looking for does not exist or was moved. Let&apos;s get you back to the homepage.
          </p>

          <div className="mt-9">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
