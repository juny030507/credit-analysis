import EmptyState from '../components/EmptyState'

function NotesPage() {
  return (
    <main>
      <h1>분석 노트</h1>
      <EmptyState message="아직 저장된 분석 노트가 없습니다." />
    </main>
  )
}

export default NotesPage