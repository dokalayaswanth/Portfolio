function Bar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-border/60 ${className}`}
      aria-hidden
    />
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-svh" aria-busy="true" aria-label="Loading portfolio">
      <div className="border-b border-border bg-surface-muted/50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Bar className="h-4 w-24" />
          <Bar className="h-8 w-20" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Bar className="h-10 w-2/3 max-w-md" />
          <Bar className="h-5 w-full max-w-xl" />
          <Bar className="h-5 w-5/6 max-w-lg" />
          <div className="flex gap-3 pt-4">
            <Bar className="h-10 w-28" />
            <Bar className="h-10 w-28" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Bar key={i} className="h-32" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-border bg-elevated/40 p-4">
          <div className="mb-3 h-4 w-1/3 rounded bg-border/70" />
          <div className="mb-2 h-3 w-full rounded bg-border/50" />
          <div className="h-2 w-full rounded bg-border/40" />
        </div>
      ))}
    </div>
  )
}
