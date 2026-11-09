import { Link, useParams } from 'react-router'

function CashFlowPage() {
  const { corpCode } = useParams()

  return (
    <main>
      <h1>현금흐름분석</h1>
      <p>선택한 기업 코드: {corpCode}</p>
      <p>이곳에서 기업의 현금흐름을 확인할 수 있습니다.</p>
      <Link to={`/companies/${corpCode}/financials`}>
        재무분석 보기
      </Link>
    </main>
  )
}

export default CashFlowPage