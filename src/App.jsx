import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import EmptyState from './components/EmptyState'
import { Link } from 'react-router'

function App() {
  const [count, setCount] = useState(0)
  const [companyName, setCompanyName] = useState('')
  const [companies, setCompanies] = useState([])
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true)
  const [companiesError, setCompaniesError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadCompanies() {
      try {
        const response = await fetch('/api/companies')

        if (!response.ok) {
          throw new Error('기업 목록 요청 실패')
        }

        const data = await response.json()

        if (isActive) {
          setCompanies(data)
        }
      } catch (error) {
        console.error(error)

        if (isActive) {
          setCompaniesError('기업 목록을 불러오지 못했습니다.')
        }
      } finally {
        if (isActive) {
          setIsLoadingCompanies(false)
        }
      }
    }

    loadCompanies()

    return () => {
      isActive = false
    }
  }, [])

  const filteredCompanies = companies.filter((company) =>
    company.name.includes(companyName)
  )

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>기업 신용분석 노트</h1>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="기업명을 입력하세요"
/>
<p>입력한 기업명: {companyName}</p>
{isLoadingCompanies && <p>기업 목록을 불러오는 중입니다...</p>}

{companiesError && <p>{companiesError}</p>}

{!isLoadingCompanies && !companiesError && companyName.trim() === '' && (
  <p>기업명을 입력해 검색해 주세요.</p>
)}

{!isLoadingCompanies && !companiesError && companyName.trim() !== '' && (
  <>
    {filteredCompanies.length === 0 ? (
      <EmptyState message="검색 결과가 없습니다." />
    ) : (
      <>
        <p>검색 결과: {filteredCompanies.length}개</p>

        <ul>
          {filteredCompanies.slice(0, 20).map((company) => (
            <li key={company.corpCode}>
              <Link to={`/companies/${company.corpCode}/financials`}>
                {company.name} ({company.stockCode})
              </Link>
            </li>
          ))}
        </ul>

        {filteredCompanies.length > 20 && (
          <p>처음 20개를 보여 주고 있어요. 기업명을 더 입력해 주세요.</p>
        )}
      </>
    )}
  </>
)}
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          분석 횟수: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
