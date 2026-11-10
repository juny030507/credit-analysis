import { useState } from 'react'
import FormField from '../components/FormField'
import { useNavigate } from 'react-router'
import { createNote } from '../lib/notes'

function NewNotePage() {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')

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
      const note = await createNote(title.trim(), content.trim())
      navigate(`/notes/${note.id}`)
    } catch (error) {
      console.error(error)
      setMessage('저장하지 못했습니다. 다시 시도해 주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main>
      <h1>분석 노트 작성</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="제목"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setMessage('')
          }}
        />

        <label htmlFor="content">분석 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
            setMessage('')
          }}
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? '저장 중...' : '제출하기'}
        </button>
        
      </form>

      <p>입력한 제목: {title}</p>
      <p>입력한 내용: {content}</p>
      {message && <p>{message}</p>}
    </main>
  )
}

export default NewNotePage