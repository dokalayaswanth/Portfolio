import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../../types/portfolio'
import { Container } from '../layout/Container'
import { SectionShell } from '../ui/SectionShell'
import { ExpandableText } from '../ui/ExpandableText'

type Props = {
  projects: Project[]
  loading: boolean
}

function OptimizedProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="aspect-[16/9] w-full object-cover"
    />
  )
}

export function ProjectsSection({ projects, loading }: Props) {
  const ordered = useMemo(() => {
    return [...projects].sort((a, b) => {
      const fa = a.featured ? 1 : 0
      const fb = b.featured ? 1 : 0
      if (fb !== fa) return fb - fa
      return (a.sort_order ?? 0) - (b.sort_order ?? 0)
    })
  }, [projects])

  const tags = useMemo(() => {
    const set = new Set<string>()
    for (const p of ordered) {
      for (const t of p.tech_stack ?? []) {
        if (t.trim()) set.add(t.trim())
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [ordered])

  const [active, setActive] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!active) return ordered
    return ordered.filter((p) => (p.tech_stack ?? []).includes(active))
  }, [ordered, active])

  return (
    <Container>
      <SectionShell
        id="projects"
        eyebrow="Selected work"
        title="Projects"
        description="Card-based case studies with full context. Featured work is highlighted for quick scanning."
      >
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border bg-elevated/40">
                <div className="aspect-[16/9] bg-border/50" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-2/3 rounded bg-border/70" />
                  <div className="h-3 w-full rounded bg-border/50" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-muted">Add rows in Supabase → projects.</p>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActive(null)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active === null
                    ? 'border-accent/50 bg-accent-dim text-fg'
                    : 'border-border bg-elevated text-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                All
              </button>
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActive(t)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active === t
                      ? 'border-accent/50 bg-accent-dim text-fg'
                      : 'border-border bg-elevated text-muted hover:border-border-strong hover:text-fg'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <motion.ul layout className="grid gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-elevated/50 shadow-sm transition hover:shadow-[0_12px_40px_-24px_rgba(225,29,72,0.45)] ${
                      p.featured
                        ? 'border-accent/45 ring-1 ring-accent/25'
                        : 'border-border hover:border-accent/25'
                    }`}
                  >
                    {p.featured ? (
                      <p className="border-b border-accent/20 bg-accent-dim/40 px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-accent">
                        Featured project
                      </p>
                    ) : null}
                    {p.image_url ? (
                      <div className="overflow-hidden border-b border-border">
                        <OptimizedProjectImage src={p.image_url} alt={p.title} />
                      </div>
                    ) : (
                      <div
                        className={`h-2 bg-gradient-to-r from-accent/50 via-accent/15 to-transparent`}
                        aria-hidden
                      />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold text-fg">{p.title}</h3>
                      <ExpandableText
                        text={p.description}
                        className="mt-2 flex-1 text-sm text-muted"
                        collapsedChars={320}
                      />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(p.tech_stack ?? []).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                        {p.live_link ? (
                          <a
                            href={p.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent underline-offset-4 transition hover:underline"
                          >
                            Live demo
                          </a>
                        ) : null}
                        {/* {p.github_link ? (
                          <a
                            href={p.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted underline-offset-4 transition hover:text-fg hover:underline"
                          >
                            Source
                          </a>
                        ) : null} */}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {filtered.length === 0 ? (
              <p className="mt-6 text-sm text-muted">No projects match this filter.</p>
            ) : null}
          </>
        )}
      </SectionShell>
    </Container>
  )
}
