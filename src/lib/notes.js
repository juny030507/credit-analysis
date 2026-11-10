import { supabase } from './supabase'
import { ensureUser } from './auth'

export async function createNote(title, content) {
  await ensureUser()

  const { data, error } = await supabase
    .from('analysis_notes')
    .insert({
      title: title,
      content: content,
    })
    .select('id')
    .single()

  if (error) {
    throw error
  }

  return data
}