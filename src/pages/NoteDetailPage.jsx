import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getNote } from '../lib/notes'

function NoteDetailPage() {
  const { noteId } = useParams()
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadNote() {
      setIsLoading(true)
      setError('')
      setNote(null)

      try {
        const result = await getNote(noteId)

        if (isActive) {
          setNote(result)
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

    loadNote()

    return () => {
      isActive = false
    }
  }, [noteId])

  return (
    <main>
      <h1>분석 노트 상세</h1>

      {isLoading && <p>노트를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && !note && (
        <p>노트를 찾을 수 없습니다.</p>
      )}

      {!isLoading && !error && note && (
        <section>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <Link to={`/notes/${noteId}/edit`}>노트 수정하기</Link>
        </section>
      )}

      <p>
        <Link to="/notes">목록으로 돌아가기</Link>
      </p>
    </main>
  )
}

export default NoteDetailPage