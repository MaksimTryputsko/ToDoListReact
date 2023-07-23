import { Component } from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { PostsContext } from './context/PostsContext'

class DeleteItems extends Component {
  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

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
