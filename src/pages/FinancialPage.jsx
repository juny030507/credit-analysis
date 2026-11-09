import { Link, useParams } from 'react-router'

function FinancialPage() {
  const { corpCode } = useParams()

  return (
    <main>
      <h1>재무분석</h1>
      <p>선택한 기업 코드: {corpCode}</p>
      <p>이곳에서 기업의 재무정보를 확인할 수 있습니다.</p>
      <Link to={`/companies/${corpCode}/cash-flow`}>
        현금흐름분석 보기
      </Link>
    </main>
  )
}

export default FinancialPage