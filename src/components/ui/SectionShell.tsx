import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

export function SectionShell({ id, eyebrow, title, description, children }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-relaxed text-muted">{description}</p> : null}
      </div>
      {children}
    </motion.section>
  )
}
