import { lazy, Suspense } from 'react'
import { Header } from '../components/layout/Header'
import { Container } from '../components/layout/Container'
import { Hero } from '../components/sections/Hero'
import { usePortfolioContent } from '../hooks/usePortfolioContent'

const SkillsSection = lazy(async () => {
  const m = await import('../components/sections/SkillsSection')
  return { default: m.SkillsSection }
})
const ProjectsSection = lazy(async () => {
  const m = await import('../components/sections/ProjectsSection')
  return { default: m.ProjectsSection }
})
const ExperienceSection = lazy(async () => {
  const m = await import('../components/sections/ExperienceSection')
  return { default: m.ExperienceSection }
})
const ContactSection = lazy(async () => {
  const m = await import('../components/sections/ContactSection')
  return { default: m.ContactSection }
})

function SectionFallback({ label }: { label: string }) {
  return (
    <div
      className="border-t border-border py-16"
      aria-busy="true"
      aria-label={`Loading ${label}`}
    >
      <Container>
        <div className="h-40 animate-pulse rounded-2xl bg-elevated/40" />
      </Container>
    </div>
  )
}

export default function HomePage() {
  const { state, reload } = usePortfolioContent()

  const loading = state.status === 'loading' || state.status === 'idle'
  const data = state.status === 'success' ? state.data : null
  const error = state.status === 'error' ? state.message : null

  return (
    <div className="min-h-svh">
      <Header />
      <main>
        {error ? (
          <section className="border-b border-border bg-accent-dim/20 py-20">
            <Container>
              <div className="max-w-xl rounded-2xl border border-border-strong bg-elevated/90 p-8 text-left shadow-lg">
                <p className="font-display text-lg font-semibold text-fg">Could not load portfolio</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{error}</p>
                <button
                  type="button"
                  onClick={() => void reload()}
                  className="mt-6 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
                >
                  Retry
                </button>
              </div>
            </Container>
          </section>
        ) : (
          <>
            <Hero profile={data?.profile ?? null} loading={loading} />
            <Suspense fallback={<SectionFallback label="skills" />}>
              <SkillsSection skills={data?.skills ?? []} loading={loading} />
            </Suspense>
            <Suspense fallback={<SectionFallback label="projects" />}>
              <ProjectsSection projects={data?.projects ?? []} loading={loading} />
            </Suspense>
            <Suspense fallback={<SectionFallback label="experience" />}>
              <ExperienceSection experience={data?.experience ?? []} loading={loading} />
            </Suspense>
            <Suspense fallback={<SectionFallback label="contact" />}>
              <ContactSection profile={data?.profile ?? null} />
            </Suspense>
          </>
        )}

        <footer className="border-t border-border py-10 text-center text-xs text-muted">
          <Container>
            <p>
              © {new Date().getFullYear()} {data?.profile?.name ?? 'Portfolio'}. Built with React, Vite,
              Tailwind, Supabase.
            </p>
          </Container>
        </footer>
      </main>
    </div>
  )
}
