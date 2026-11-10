import { supabase } from './supabase'

let pendingUser = null

async function findOrCreateUser() {
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

export async function ensureUser() {
  if (!pendingUser) {
    pendingUser = findOrCreateUser()
  }

  try {
    return await pendingUser
  } finally {
    pendingUser = null
  }
}