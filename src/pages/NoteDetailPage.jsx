import { Link, useParams } from 'react-router'

function NoteDetailPage() {
  const { noteId } = useParams()

  return (
    <main>
      <h1>분석 노트 상세</h1>
      <p>선택한 노트 번호: {noteId}</p>
      <Link to={`/notes/${noteId}/edit`}>노트 수정하기</Link>
    </main>
  )
}

export default NoteDetailPage