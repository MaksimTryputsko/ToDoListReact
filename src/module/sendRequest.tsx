import IUser from '../components/context/PostsContext'

const URL = 'https://jsonplaceholder.typicode.com/'
const URL_POSTS = 'posts/'
interface ISendRequest {
  method?: string
  body?: IUser | null | Omit<IUser, 'id'>
  path?: string
}
const sendRequest = async ({ method, body, path = '' }: ISendRequest = {}) => {
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

export { sendRequest, URL_POSTS }
