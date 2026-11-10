import { supabase } from './supabase'

export async function ensureUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError) {
    throw sessionError
  }

  if (sessionData.session) {
    return sessionData.session.user
  }

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    throw error
  }

  return data.user
}