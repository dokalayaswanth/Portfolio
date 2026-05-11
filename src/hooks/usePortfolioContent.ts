import { useCallback, useEffect, useState } from 'react'
import { fetchPortfolio } from '../services/portfolioService'
import { isSupabaseConfigured } from '../services/supabaseClient'
import type { PortfolioPayload } from '../types/portfolio'

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: PortfolioPayload }
  | { status: 'error'; message: string }

const missingEnvMessage =
  'Supabase environment variables are missing. Copy .env.example to .env and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'

async function loadPortfolio(): Promise<State> {
  if (!isSupabaseConfigured) {
    return { status: 'error', message: missingEnvMessage }
  }
  try {
    const data = await fetchPortfolio()
    return { status: 'success', data }
  } catch (e) {
    return {
      status: 'error',
      message: e instanceof Error ? e.message : 'Failed to load portfolio',
    }
  }
}

export function usePortfolioContent() {
  const [state, setState] = useState<State>({ status: 'idle' })

  useEffect(() => {
    let active = true
    void (async () => {
      await Promise.resolve()
      if (!active) return
      setState({ status: 'loading' })
      const next = await loadPortfolio()
      if (!active) return
      setState(next)
    })()
    return () => {
      active = false
    }
  }, [])

  const reload = useCallback(() => {
    void (async () => {
      setState({ status: 'loading' })
      setState(await loadPortfolio())
    })()
  }, [])

  return { state, reload }
}
