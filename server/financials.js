export async function getFinancials(corpCode, year) {
  const apiKey = process.env.OPENDART_API_KEY

  if (!apiKey) {
    throw new Error('OpenDART 인증키가 설정되지 않았습니다.')
  }

  const url = new URL(
    'https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
  )

  url.searchParams.set('crtfc_key', apiKey)
  url.searchParams.set('corp_code', corpCode)
  url.searchParams.set('bsns_year', year)
  url.searchParams.set('reprt_code', '11011')
  url.searchParams.set('fs_div', 'CFS')

  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      referer: 'https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS003&apiId=2019020',
      'x-requested-with': 'XMLHttpRequest',
    },
    redirect: 'manual',
  })

  if (!response.ok) {
    throw new Error('OpenDART에 재무제표를 요청하지 못했습니다.')
  }

  const data = await response.json()

  if (data.status === '013') {
    return {
      corpCode,
      year,
      status: 'empty',
      items: [],
    }
  }

  if (data.status !== '000' || !Array.isArray(data.list)) {
    throw new Error('OpenDART가 재무제표를 반환하지 않았습니다.')
  }

  return {
    corpCode,
    year,
    status: 'ok',
    items: data.list,
  }
}