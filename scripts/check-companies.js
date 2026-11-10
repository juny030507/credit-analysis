import { strFromU8, unzipSync } from 'fflate'
import { XMLParser } from 'fast-xml-parser'

const apiKey = process.env.OPENDART_API_KEY

if (!apiKey) {
  console.log('OpenDART 인증키를 찾을 수 없습니다.')
  process.exit(1)
}

const url = new URL('https://opendart.fss.or.kr/api/corpCode.xml')
url.searchParams.set('crtfc_key', apiKey)

try {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS001&apiId=2019018',
      'x-requested-with': 'XMLHttpRequest',
    },
    redirect: 'manual',
  })

  if (!response.ok) {
    throw new Error('기업 목록 요청 실패')
  }

  const zipBuffer = await response.arrayBuffer()
  const zipBytes = new Uint8Array(zipBuffer)
  const files = unzipSync(zipBytes)

  const xmlBytes = files['CORPCODE.xml']

  if (!xmlBytes) {
    throw new Error('기업 목록 XML 파일을 찾을 수 없습니다.')
  }

  const xmlText = strFromU8(xmlBytes)
  const parser = new XMLParser({ parseTagValue: false })
  const data = parser.parse(xmlText)
  const companies = data.result.list

  const samsung = companies.find(
    (company) => company.corp_code === '00126380',
  )

  console.log('전체 기업 수:', companies.length)
  console.log('삼성전자:', samsung?.corp_name)
  console.log('기업 고유번호:', samsung?.corp_code)
  console.log('종목코드:', samsung?.stock_code)
} catch {
  console.log('기업 목록을 가져오거나 읽지 못했습니다.')
}
