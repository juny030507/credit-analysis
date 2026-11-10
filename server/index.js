import { createServer } from 'node:http'
import { getCompanies } from './companies.js'

const server = createServer(async (request, response) => {
    if (request.url === '/api/companies') {
    try {
      const companies = await getCompanies()

      response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
      })
      response.end(JSON.stringify(companies))
    } catch {
      response.writeHead(502, {
        'Content-Type': 'application/json; charset=utf-8',
      })
      response.end(JSON.stringify({
        error: '기업 목록을 가져오지 못했습니다.',
      }))
    }

    return
  }
  if (request.url !== '/api/company-info') {
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ error: '주소를 찾을 수 없습니다.' }))
    return
  }

  const apiKey = process.env.OPENDART_API_KEY

  if (!apiKey) {
    response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ error: '인증키가 설정되지 않았습니다.' }))
    return
  }

  const url = new URL('https://opendart.fss.or.kr/api/company.json')
  url.searchParams.set('crtfc_key', apiKey)
  url.searchParams.set('corp_code', '00126380')

  try {
    const dartResponse = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0',
        referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS001&apiId=2019002',
        'x-requested-with': 'XMLHttpRequest',
      },
      redirect: 'manual',
    })

    if (!dartResponse.ok) {
      throw new Error('OpenDART 요청 실패')
    }

    const data = await dartResponse.json()

    if (data.status !== '000') {
      throw new Error('OpenDART 응답 오류')
    }

    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({
      corpCode: data.corp_code,
      corpName: data.corp_name,
    }))
  } catch {
    response.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ error: '기업 정보를 가져오지 못했습니다.' }))
  }
})

server.listen(3001, '127.0.0.1', () => {
  console.log('서버가 http://localhost:3001 에서 실행 중입니다.')
})