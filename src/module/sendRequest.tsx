const URL = 'https://jsonplaceholder.typicode.com'

interface ISendRequest {
  method: string
  body?: unknown
  path: string
}
const sendRequest = async (
  { method, body, path }: ISendRequest = {} as ISendRequest
) => {
  const newBody: string | undefined = body ? JSON.stringify(body) : undefined

  try {
    const response = await fetch(`${URL}${path}`, {
      method,
      body: newBody,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export { sendRequest }
