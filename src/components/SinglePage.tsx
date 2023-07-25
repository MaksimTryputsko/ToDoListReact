import { Component } from 'react'
import { withRouter } from './hoc/createWithrouter'
import { Link } from 'react-router-dom'
import { sendRequest } from '../module/sendRequest'
import IPost from './context/PostsContext'
import { WithRouterProps } from './hoc/createWithrouter'
import { POST_PAGE } from './path/path'

type IComponent = Partial<IPost>

interface IState {
  post: IComponent | null
}

class SinglePage extends Component<WithRouterProps, IState> {
  constructor(props: WithRouterProps) {
    super(props)

    this.state = {
      post: null,
    }
  }
  sendRequestCreateOnePost = async () => {
    const post = await sendRequest({
      method: 'GET',
      path: `/posts/${this.props.params.id}`,
    })
    if (!!post) {
      this.setState({ post: post })
    }
  }
  componentDidMount = (): void => {
    this.sendRequestCreateOnePost()
  }
  render(): JSX.Element | null {
    if (!this.state.post) {
      return null
    }
    const { title, body } = this.state.post
    return (
      <div className="wrapperForSinglePage">
        <h1>Hello we have information for you</h1>
        <div>
          <div>This is title</div>
          {title}
        </div>
        <div>
          <div>This is body</div>
          {body}
        </div>

        <Link to={POST_PAGE}>
          <button>Home page</button>
        </Link>
      </div>
    )
  }
}

export const SinglePageNew = withRouter(SinglePage)
