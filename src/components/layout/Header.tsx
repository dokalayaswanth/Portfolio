import { motion } from 'framer-motion'
import { Container } from './Container'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-md"
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-fg transition-colors hover:text-accent"
        >
          Portfolio
        </a>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-md border border-border-strong bg-elevated px-3 py-1.5 text-sm font-medium text-fg shadow-sm transition hover:border-accent/40 hover:text-accent"
        >
          Hire
        </a>
      </Container>
    </motion.header>
  )
}
