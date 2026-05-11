import { useId, useMemo, useState } from 'react'

const DEFAULT_COLLAPSED_LEN = 320

type Props = {
  text: string
  className?: string
  collapsedChars?: number
}

export function ExpandableText({ text, className = '', collapsedChars = DEFAULT_COLLAPSED_LEN }: Props) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const needsToggle = useMemo(() => text.trim().length > collapsedChars, [text, collapsedChars])

  if (!text.trim()) return null

  if (!needsToggle) {
    return <p className={className}>{text}</p>
  }

  const preview = open ? text : `${text.slice(0, collapsedChars).trimEnd()}…`

  return (
    <div className={className}>
      <p id={id} className="whitespace-pre-line leading-relaxed">
        {open ? text : preview}
      </p>
      <button
        type="button"
        className="mt-2 text-sm font-semibold text-accent underline-offset-4 transition hover:underline"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </div>
  )
}
