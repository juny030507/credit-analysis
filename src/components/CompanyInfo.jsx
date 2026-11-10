import { useEffect, useState } from 'react'

function CompanyInfo() {
  const [company, setCompany] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadCompany() {
      try {
        const response = await fetch('/api/company-info')

        if (!response.ok) {
          throw new Error('기업 정보 요청 실패')
        }

        const data = await response.json()

        if (isActive) {
          setCompany(data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setError('기업 정보를 불러오지 못했습니다.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadCompany()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return <p>기업 정보를 불러오는 중입니다...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h2>OpenDART 기업 정보 연결 확인</h2>
      <p>기업명: {company.corpName}</p>
      <p>기업 고유번호: {company.corpCode}</p>
    </section>
  )
}

export default CompanyInfo
