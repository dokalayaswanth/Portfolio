import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && String(supabaseUrl).length > 0 && supabaseAnonKey && String(supabaseAnonKey).length > 0,
)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(String(supabaseUrl), String(supabaseAnonKey), {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null
