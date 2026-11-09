import { useState } from 'react'

function NewNotePage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === '') {
      setMessage('제목을 입력해 주세요.')
      return
    }

    setMessage('제목이 확인됐어요. 저장 기능은 준비 중입니다.')
  }

  return (
    <main>
      <h1>분석 노트 작성</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setMessage('')
          }}
        />

        <button type="submit">제출하기</button>
      </form>

      <p>입력한 제목: {title}</p>
      {message && <p>{message}</p>}
    </main>
  )
}

export default NewNotePage