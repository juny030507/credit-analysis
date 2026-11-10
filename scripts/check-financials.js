const apiKey = process.env.OPENDART_API_KEY

if (!apiKey) {
  console.log('OpenDART 인증키를 찾을 수 없습니다.')
  process.exit(1)
}

const url = new URL(
  'https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
)

url.searchParams.set('crtfc_key', apiKey)
url.searchParams.set('corp_code', '00126380')
url.searchParams.set('bsns_year', '2025')
url.searchParams.set('reprt_code', '11011')
url.searchParams.set('fs_div', 'CFS')

try {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS003&apiId=2019020',
      'x-requested-with': 'XMLHttpRequest',
    },
    redirect: 'manual',
  })

  if (!response.ok) {
    throw new Error('재무제표 요청 실패')
  }

  const data = await response.json()

  if (data.status !== '000') {
    console.log('OpenDART 응답:', data.status, data.message)
    process.exit(1)
  }

  const assets = data.list.find(
    (item) => item.sj_div === 'BS' && item.account_nm === '자산총계',
  )

  const operatingCashFlow = data.list.find(
    (item) =>
      item.sj_div === 'CF' &&
      item.account_nm === '영업활동현금흐름',
  )

  console.log('응답 상태:', data.status)
  console.log('전체 계정 항목 수:', data.list.length)
  console.log('자산총계:', assets?.thstrm_amount, assets?.currency)
  console.log(
    '영업활동현금흐름:',
    operatingCashFlow?.thstrm_amount,
    operatingCashFlow?.currency,
  )
} catch {
  console.log('재무제표를 가져오거나 읽지 못했습니다.')
}