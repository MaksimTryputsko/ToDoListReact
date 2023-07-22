import { Component, ErrorInfo, ReactNode } from 'react'
import { withRouter } from './hoc/createWithrouter'
import { Link } from 'react-router-dom'
import { workWithServer } from '../module/workWithServer'
import IUser from './context/PostsContext'
import { WithRouterProps } from './hoc/createWithrouter'

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

  componentDidMount(): void {
    workWithServer('GET', null, `${this.props.params.id}`).then((data) =>
      this.setState({ post: data })
    )
  }
  render(): JSX.Element {
    const { title, body } = this.state.post

    return (
      <div className="wrapperForSinglePage">
        <h1>Hello we have information for you</h1>
        <div>
          <span>
            This is title:<br></br>
          </span>
          {title}
        </div>
        <div>
          {' '}
          <span>
            This is body:<br></br>
          </span>
          {body}
        </div>

        <Link to="/">
          <button>Home page</button>
        </Link>
      </div>
    )
  }
}

export const SinglePageNew = withRouter(SinglePage)
