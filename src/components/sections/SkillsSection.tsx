import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Skill } from '../../types/portfolio'
import { Container } from '../layout/Container'
import { SectionShell } from '../ui/SectionShell'
import { SkillsSkeleton } from '../ui/Skeleton'

type Props = {
  skills: Skill[]
  loading: boolean
}

export function SkillsSection({ skills, loading }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, Skill[]>()
    for (const s of skills) {
      const list = map.get(s.category) ?? []
      list.push(s)
      map.set(s.category, list)
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.sort_order - b.sort_order)
    }
    const order = [
      'Languages',
      'Frontend',
      'Backend & APIs',
      'Databases',
      'Cloud & DevOps',
      'Machine Learning & AI',
      'Tools & Platforms',
      'Concepts',
    ]
    const entries = Array.from(map.entries())
    entries.sort(([a], [b]) => {
      const ia = order.indexOf(a)
      const ib = order.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
    return entries
  }, [skills])

  return (
    <div className="border-t border-border bg-surface-muted/30">
      <Container>
        <SectionShell
          id="skills"
          eyebrow="Capabilities"
          title="Skills across the stack"
          description="Organized by domain. Each item includes a proficiency indicator based on hands-on delivery."
        >
          {loading ? (
            <SkillsSkeleton />
          ) : skills.length === 0 ? (
            <p className="text-muted">Add rows in Supabase → skills.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {grouped.map(([category, items], gIdx) => (
                <motion.article
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gIdx * 0.04, duration: 0.35 }}
                  className="rounded-2xl border border-border bg-elevated/55 p-5 shadow-sm"
                >
                  <h3 className="border-b border-border pb-3 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                    {category}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li
                        key={skill.id}
                        className="min-w-[140px] max-w-full flex-1 rounded-xl border border-border bg-surface-muted/40 px-3 py-2 sm:min-w-[160px] sm:max-w-[calc(50%-0.25rem)]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium leading-snug text-fg">{skill.name}</span>
                          {skill.icon ? (
                            <span
                              className="shrink-0 rounded-md border border-border bg-elevated px-1.5 py-0.5 text-[10px] font-semibold text-muted"
                              aria-hidden
                            >
                              {skill.icon}
                            </span>
                          ) : null}
                        </div>
                        <div
                          className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.proficiency}
                          aria-label={`${skill.name} proficiency ${skill.proficiency} percent`}
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-accent/85 to-accent"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          )}
        </SectionShell>
      </Container>
    </div>
  )
}
