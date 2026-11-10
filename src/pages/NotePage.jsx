import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import EmptyState from '../components/EmptyState'
import { getNotes } from '../lib/notes'

function NotesPage() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadNotes() {
      try {
        const result = await getNotes()

        if (isActive) {
          setNotes(result)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError('노트를 불러오지 못했습니다.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadNotes()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main>
      <h1>분석 노트</h1>
      <Link to="/notes/new">새 분석 노트 작성</Link>

      {isLoading && <p>노트를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && notes.length === 0 && (
        <EmptyState message="아직 저장된 분석 노트가 없습니다." />
      )}

      {!isLoading && !error && notes.length > 0 && (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default NotesPage