import { motion } from 'framer-motion'
import type { SiteProfile } from '../../types/portfolio'
import { Container } from '../layout/Container'
import { SectionShell } from '../ui/SectionShell'

type Props = {
  profile: SiteProfile | null
}

export function ContactSection({ profile }: Props) {
  const email = profile?.email

  return (
    <Container>
      <SectionShell
        id="contact"
        eyebrow="Let’s talk"
        title="Contact"
        description="Fastest path: email with your role, stack, and timeline. I respond within two business days."
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border bg-elevated/60 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted">Email</p>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block text-lg font-semibold text-fg underline-offset-4 transition hover:text-accent hover:underline"
                >
                  {email}
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted">Set email on site_profile in Supabase.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {profile?.linkedin_url ? (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border-strong bg-surface-muted px-4 py-2 text-sm font-semibold text-fg transition hover:border-accent/35 hover:text-accent"
                >
                  LinkedIn
                </a>
              ) : null}
              {profile?.github_url ? (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border-strong bg-surface-muted px-4 py-2 text-sm font-semibold text-fg transition hover:border-accent/35 hover:text-accent"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </SectionShell>
    </Container>
  )
}
