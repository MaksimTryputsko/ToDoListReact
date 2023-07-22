import IUser from '../components/context/PostsContext'

const url = 'https://jsonplaceholder.typicode.com/posts/'

const workWithServer = async (
  method: string,
  body?: IUser | null,
  path: string = ''
) => {
  const newBody: string | undefined = body ? JSON.stringify(body) : undefined

  try {
    const response = await fetch(`${url}${path}`, {
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

export { workWithServer }
