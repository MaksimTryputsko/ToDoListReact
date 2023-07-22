import { Component, Context } from 'react'
import PostsValues from './PostsValues'
import { InputUsers } from './InputUsers'
import { DeleteItems } from './DeleteItems'
import { PostsContext } from './context/PostsContext'

class PostPage extends Component {
  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  render(): JSX.Element {
    const { users } = this.context
    return (
      <>
        <InputUsers />
        {!!users?.length && <DeleteItems />}
        <PostsValues />
      </>
    )
  }
}
export { PostPage }
