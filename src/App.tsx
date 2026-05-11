import { lazy, Suspense } from 'react'
import { PageSkeleton } from './components/ui/Skeleton'

const HomePage = lazy(async () => import('./pages/HomePage'))
console.log(import.meta.env.VITE_SUPABASE_URL)
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomePage />
    </Suspense>
  )
}

export default App
