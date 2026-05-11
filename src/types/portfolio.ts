export type SiteProfile = {
  id: string
  name: string
  tagline: string
  email: string | null
  linkedin_url: string | null
  github_url: string | null
  resume_url: string | null
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  category: string
  proficiency: number
  icon: string | null
  sort_order: number
  created_at: string
}

export type Project = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_link: string | null
  live_link: string | null
  image_url: string | null
  featured?: boolean
  sort_order: number
  created_at: string
}

export type Experience = {
  id: string
  role: string
  company: string
  description: string | null
  start_date: string
  end_date: string | null
  sort_order: number
  created_at: string
}

export type PortfolioPayload = {
  profile: SiteProfile | null
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
}
