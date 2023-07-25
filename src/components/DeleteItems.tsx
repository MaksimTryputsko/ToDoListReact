import { Component, Context } from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { IContext, PostsContext } from './context/PostsContext'

class DeleteItems extends Component {
  static contextType = PostsContext
  context!: React.ContextType<Context<IContext>>

  render(): JSX.Element {
    const { deleteCompletedPost } = this.context

    return (
      <button onClick={deleteCompletedPost}>
        <BsFillTrash3Fill className="deleteIcon" />
      </button>
    )
  }
}
export { DeleteItems }
