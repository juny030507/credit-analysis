import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import FormField from '../components/FormField'
import { getNote, updateNote } from '../lib/notes'

function EditNotePage() {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadNote() {
      setIsLoading(true)
      setError('')

      try {
        const note = await getNote(noteId)

        if (!isActive) return

        if (!note) {
          setError('노트를 찾을 수 없습니다.')
          return
        }

        setTitle(note.title)
        setContent(note.content)
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

    async function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === '') {
      setMessage('제목을 입력해 주세요.')
      return
    }

    if (content.trim() === '') {
      setMessage('분석 내용을 입력해 주세요.')
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      const updatedNote = await updateNote(
        noteId,
        title.trim(),
        content.trim(),
      )

      if (!updatedNote) {
        setMessage('수정할 노트를 찾을 수 없습니다.')
        return
      }

      navigate(`/notes/${noteId}`)
    } catch (error) {
      console.error(error)
      setMessage('수정 내용을 저장하지 못했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main>
      <h1>분석 노트 수정</h1>

      {isLoading && <p>노트를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <form onSubmit={handleSubmit}>
          <FormField
            id="title"
            label="제목"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="content">분석 내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button type="submit" disabled={isSaving}>
            {isSaving ? '저장 중...' : '수정 내용 저장'}
          </button>

          {message && <p>{message}</p>}
        </form>
      )}

      <p>
        <Link to={`/notes/${noteId}`}>상세 화면으로 돌아가기</Link>
      </p>
    </main>
  )
}

export default EditNotePage