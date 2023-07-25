import { Component, Context } from 'react'
import PostsValues from './PostsValues'
import { InputPosts } from './InputPosts'
import { DeleteItems } from './DeleteItems'
import { IContext, PostsContext } from './context/PostsContext'
import { sendRequest } from '../module/sendRequest'

class PostPage extends Component {
  static contextType = PostsContext
  context!: React.ContextType<Context<IContext>>

  addPostsElementsFromServer = async () => {
    const posts = await sendRequest({ method: 'GET', path: '/posts' })
    this.context.addPostsElements(posts.splice(0, 10))
  }
  componentDidMount = (): void => {
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
