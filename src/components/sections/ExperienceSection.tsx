import { motion } from 'framer-motion'
import type { Experience } from '../../types/portfolio'
import { Container } from '../layout/Container'
import { SectionShell } from '../ui/SectionShell'
import { ExpandableText } from '../ui/ExpandableText'

type Props = {
  experience: Experience[]
  loading: boolean
}

function formatRange(start: string, end: string | null) {
  const s = new Date(start)
  const formatter = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' })
  const startLabel = formatter.format(s)
  if (!end) return `${startLabel} — Present`
  const e = new Date(end)
  return `${startLabel} — ${formatter.format(e)}`
}

export function ExperienceSection({ experience, loading }: Props) {
  return (
    <div className="border-t border-border bg-surface-muted/20">
      <Container>
        <SectionShell
          id="experience"
          eyebrow="Trajectory"
          title="Experience"
          description="Full context on scope, systems, and collaboration — expand any entry to read the complete narrative."
        >
          {loading ? (
            <div className="space-y-4" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl border border-border bg-elevated/40 p-6">
                  <div className="mb-2 h-4 w-40 rounded bg-border/70" />
                  <div className="mb-3 h-3 w-56 rounded bg-border/50" />
                  <div className="h-3 w-full rounded bg-border/40" />
                </div>
              ))}
            </div>
          ) : experience.length === 0 ? (
            <p className="text-muted">Add rows in Supabase → experience.</p>
          ) : (
            <ol className="relative space-y-0 border-l border-border pl-6 sm:pl-8">
              {experience.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    className="absolute -left-[29px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-accent/60 bg-accent shadow-[0_0_0_4px_rgba(7,7,8,0.9)] sm:-left-[33px]"
                    aria-hidden
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {formatRange(item.start_date, item.end_date)}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-fg">
                    {item.role}{' '}
                    <span className="text-muted">· {item.company}</span>
                  </h3>
                  {item.description ? (
                    <ExpandableText
                      text={item.description}
                      className="mt-3 max-w-2xl text-sm text-muted"
                      collapsedChars={360}
                    />
                  ) : null}
                </motion.li>
              ))}
            </ol>
          )}
        </SectionShell>
      </Container>
    </div>
  )
}
