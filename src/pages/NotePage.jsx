import EmptyState from '../components/EmptyState'
import { Link } from 'react-router'

function NotesPage() {
  return (
    <main>
      <h1>분석 노트</h1>
      <Link to="/notes/new">새 분석 노트 작성</Link>
      <EmptyState message="아직 저장된 분석 노트가 없습니다." />
    </main>
  )
}

export default NotesPage