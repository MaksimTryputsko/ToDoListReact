import { Component, Context } from 'react'
import PostsValues from './PostsValues'
import { InputPosts } from './InputPosts'
import { DeleteItems } from './DeleteItems'
import { PostsContext } from './context/PostsContext'
import { sendRequest } from '../module/sendRequest'
import { URL_POSTS } from '../module/sendRequest'

class PostPage extends Component {
  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  async addPostsElementsFromServer() {
    const posts = await sendRequest({ method: 'GET', path: URL_POSTS })
    this.context.addPostsElements(posts.splice(0, 10))
  }
  componentDidMount(): void {
    this.addPostsElementsFromServer()
  }

  render(): JSX.Element {
    const { posts } = this.context
    return (
      <>
        <InputPosts />
        {!!posts?.length && <DeleteItems />}
        <PostsValues />
      </>
    )
  }
}
export { PostPage }
