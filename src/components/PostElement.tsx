import { RiDeleteBin2Fill, RiFileListLine } from 'react-icons/ri'
import { Component, Context } from 'react'
import { Link } from 'react-router-dom'
import { PostsContext } from './context/PostsContext'
import IUser from './context/PostsContext'
import { POST_PAGE } from './path/path'
interface IPropsValues extends IUser {
  key: number
  index: number
}

interface IState {
  changeChecked: boolean
}

class PostElement extends Component<IPropsValues, IState> {
  constructor(props: IPropsValues) {
    super(props)

    this.state = {
      changeChecked: false,
    }
  }

  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  onChangeElements = (): void => {
    this.setState({ changeChecked: !this.state.changeChecked })
    this.context.togglePost(this.props.id, this.state.changeChecked ? 1 : 2)
  }
  deletePost = (): void => {
    this.context.deletePost(this.props.index, this.props.id)
  }
  render(): JSX.Element {
    return (
      <li key={this.props.id}>
        <div>
          <RiFileListLine className="icon" />
          <input
            className="checkBox"
            type="checkbox"
            checked={this.state.changeChecked}
            onChange={this.onChangeElements}
          />
        </div>
        <Link to={`${POST_PAGE}/${this.props.id}`}>{this.props.title}</Link>

        <button onClick={this.deletePost}>
          <RiDeleteBin2Fill className="icon" />
        </button>
      </li>
    )
  }
}
export { PostElement }
