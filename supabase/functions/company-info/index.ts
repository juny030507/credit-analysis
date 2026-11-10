Deno.serve(async () => {
  const apiKey = Deno.env.get('OPENDART_API_KEY')

  if (!apiKey) {
    return Response.json(
      { error: 'OpenDART 인증키가 설정되지 않았습니다.' },
      { status: 500 },
    )
  }

  const url = new URL('https://opendart.fss.or.kr/api/company.json')
  url.searchParams.set('crtfc_key', apiKey)
  url.searchParams.set('corp_code', '00126380')

  let stage = 'fetch'
  try {
    const response = await fetch(url)

    if (!response.ok) {
      return Response.json(
        { error: 'OpenDART에 요청하지 못했습니다.' },
        { status: 502 },
      )
    }

    stage = 'parse'
    const data = await response.json()

    if (data.status !== '000') {
      return Response.json(
        { error: '기업 정보를 가져오지 못했습니다.', code: data.status },
        { status: 502 },
      )
    }

    return Response.json({
      corpCode: data.corp_code,
      corpName: data.corp_name,
    })
  } catch (error) {
    const name = error instanceof Error ? error.name : 'UnknownError'
    const details = error instanceof Error ? `${error.message} ${String(error.cause ?? '')}` : ''
    const handshake = /handshake/i.test(details)
    console.error('OpenDART 요청 실패:', { stage, name, handshake })
    return Response.json(
      { error: '기업 정보를 가져오지 못했습니다.' },
      { status: 502 },
    )
  }
})
