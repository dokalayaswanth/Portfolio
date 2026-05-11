import { motion } from 'framer-motion'
import type { SiteProfile } from '../../types/portfolio'
import { Container } from '../layout/Container'

type Props = {
  profile: SiteProfile | null
  loading?: boolean
}

export function Hero({ profile, loading }: Props) {
  const name = profile?.name ?? 'Your name'
  const tagline = profile?.tagline ?? 'Add your tagline in Supabase → site_profile.'

  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-6 sm:pt-20 sm:pb-10">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {loading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading profile">
              <div className="h-4 w-32 animate-pulse rounded bg-border/70" />
              <div className="h-12 w-4/5 max-w-lg animate-pulse rounded-lg bg-border/60 sm:h-14" />
              <div className="h-5 w-full max-w-xl animate-pulse rounded bg-border/50" />
              <div className="h-5 w-11/12 max-w-lg animate-pulse rounded bg-border/40" />
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-28 animate-pulse rounded-lg bg-border/60" />
                <div className="h-10 w-24 animate-pulse rounded-lg bg-border/50" />
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-accent">Open to opportunities</p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
                {name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(0,0,0,0.04)] transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-elevated px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent/35 hover:text-accent"
                >
                  Contact
                </a>
                {profile?.resume_url ? (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-muted underline-offset-4 transition hover:text-fg"
                  >
                    Résumé
                  </a>
                ) : null}
              </div>
            </>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
