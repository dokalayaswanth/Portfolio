import type { Experience, PortfolioPayload, Project, SiteProfile, Skill } from '../types/portfolio'
import { isSupabaseConfigured, supabase } from './supabaseClient'

export async function fetchPortfolio(): Promise<PortfolioPayload> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
    )
  }

  const empty: PortfolioPayload = {
    profile: null,
    skills: [],
    projects: [],
    experience: [],
  }

  const [profileRes, skillsRes, projectsRes, experienceRes] = await Promise.all([
    supabase.from('site_profile').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('skills').select('*').order('sort_order', { ascending: true }),
    supabase.from('projects').select('*').order('sort_order', { ascending: true }),
    supabase.from('experience').select('*').order('sort_order', { ascending: true }),
  ])

  if (!profileRes.error && profileRes.data) {
    empty.profile = profileRes.data as SiteProfile
  }
  if (!skillsRes.error && skillsRes.data) {
    empty.skills = skillsRes.data as Skill[]
  }
  if (!projectsRes.error && projectsRes.data) {
    empty.projects = projectsRes.data as Project[]
  }
  if (!experienceRes.error && experienceRes.data) {
    empty.experience = experienceRes.data as Experience[]
  }

  return empty
}
