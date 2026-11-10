import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { deleteNote, getNote } from '../lib/notes'

function NoteDetailPage() {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState('')
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

    async function handleDelete() {
    const confirmed = window.confirm('이 노트를 삭제하시겠어요?')

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setDeleteMessage('')

    try {
      const deletedNote = await deleteNote(noteId)

      if (!deletedNote) {
        setDeleteMessage('삭제할 노트를 찾을 수 없습니다.')
        return
      }

      navigate('/notes')
    } catch (error) {
      console.error(error)
      setDeleteMessage('노트를 삭제하지 못했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

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
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '삭제 중...' : '노트 삭제하기'}
          </button>

          {deleteMessage && <p>{deleteMessage}</p>}
        </section>
      )}

      <p>
        <Link to="/notes">목록으로 돌아가기</Link>
      </p>
    </main>
  )
}

export default NoteDetailPage