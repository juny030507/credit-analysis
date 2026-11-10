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

export async function getNotes() {
  await ensureUser()

  const { data, error } = await supabase
    .from('analysis_notes')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getNote(noteId) {
  await ensureUser()

  const { data, error } = await supabase
    .from('analysis_notes')
    .select('id, title, content, created_at')
    .eq('id', noteId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function updateNote(noteId, title, content) {
  await ensureUser()

  const { data, error } = await supabase
    .from('analysis_notes')
    .update({
      title: title,
      content: content,
    })
    .eq('id', noteId)
    .select('id')
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}