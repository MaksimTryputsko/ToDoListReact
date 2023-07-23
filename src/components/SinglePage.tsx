import { Component, ErrorInfo, ReactNode } from 'react'
import { withRouter } from './hoc/createWithrouter'
import { Link } from 'react-router-dom'
import { sendRequest } from '../module/sendRequest'
import IUser from './context/PostsContext'
import { WithRouterProps } from './hoc/createWithrouter'
import { POST_PAGE } from './path/path'
import { URL_POSTS } from '../module/sendRequest'
type IComponent = Partial<IUser>

interface IState {
  post: IComponent
}

class SinglePage extends Component<WithRouterProps, IState> {
  constructor(props: WithRouterProps) {
    super(props)

    this.state = {
      post: {},
    }
  }
  async sendRequestCreateOnePost() {
    const getItems = await sendRequest({
      method: 'GET',
      path: `${URL_POSTS}/${this.props.params.id}`,
    })
    this.setState({ post: getItems })
  }
  componentDidMount(): void {
    this.sendRequestCreateOnePost()
  }
  render(): JSX.Element {
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
