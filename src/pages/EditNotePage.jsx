import { useParams } from 'react-router'

function EditNotePage() {
  const { noteId } = useParams()

  return (
    <main>
      <h1>분석 노트 수정</h1>
      <p>수정할 노트 번호: {noteId}</p>
    </main>
  )
}

export default EditNotePage