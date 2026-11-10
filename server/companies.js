import { strFromU8, unzipSync } from 'fflate'
import { XMLParser } from 'fast-xml-parser'

export async function getCompanies() {
  const apiKey = process.env.OPENDART_API_KEY

  if (!apiKey) {
    throw new Error('OpenDART 인증키가 설정되지 않았습니다.')
  }

  const url = new URL('https://opendart.fss.or.kr/api/corpCode.xml')
  url.searchParams.set('crtfc_key', apiKey)

  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS001&apiId=2019018',
      'x-requested-with': 'XMLHttpRequest',
    },
    redirect: 'manual',
  })

  if (!response.ok) {
    throw new Error('기업 목록을 요청하지 못했습니다.')
  }

  const zipBuffer = await response.arrayBuffer()
  const files = unzipSync(new Uint8Array(zipBuffer))
  const xmlBytes = files['CORPCODE.xml']

  if (!xmlBytes) {
    throw new Error('기업 목록 파일을 찾을 수 없습니다.')
  }

  const xmlText = strFromU8(xmlBytes)
  const parser = new XMLParser({ parseTagValue: false })
  const data = parser.parse(xmlText)

  return data.result.list
    .filter((company) => /^\d{6}$/.test(company.stock_code))
    .map((company) => ({
      name: company.corp_name,
      corpCode: company.corp_code,
      stockCode: company.stock_code,
    }))
}