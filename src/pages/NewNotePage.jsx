import { useState } from 'react'

function NewNotePage() {
  const [title, setTitle] = useState('')

  return (
    <main>
      <h1>분석 노트 작성</h1>

      <label htmlFor="title">제목</label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <p>입력한 제목: {title}</p>
    </main>
  )
}

export default NewNotePage