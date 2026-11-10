const apiKey = process.env.OPENDART_API_KEY

if (!apiKey) {
  console.log('OpenDART 인증키를 찾을 수 없습니다.')
  process.exit(1)
}

const url = new URL('https://opendart.fss.or.kr/api/company.json')
url.searchParams.set('crtfc_key', apiKey)
url.searchParams.set('corp_code', '00126380')

try {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS001&apiId=2019002',
      'x-requested-with': 'XMLHttpRequest',
    },
    redirect: 'manual',
  })

  if (!response.ok) {
    console.log('요청에 실패했습니다. HTTP 상태:', response.status)
    process.exit(1)
  }

  const data = await response.json()

  console.log('OpenDART 상태:', data.status)
  console.log('회사 이름:', data.corp_name ?? '확인할 수 없음')
} catch {
  console.log('OpenDART에 연결하거나 응답을 읽지 못했습니다.')
}