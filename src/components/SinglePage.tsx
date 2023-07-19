import { Component, ReactNode } from 'react'
import { withRouter } from './hoc/createWithrouter'
import { Link } from 'react-router-dom'

interface IComponent {
  userId?: number
  id?: number
  title?: string
  body?: string
}

interface IPromsExtra {
  location: {
    pathname: string
    search: string
    hash: string
    state: null | string
    key: string
  }
  navigate: () => void
  params: { id: string }
}

class SinglePage extends Component<IPromsExtra, { post: IComponent }> {
  constructor(props: IPromsExtra) {
    super(props)

    this.state = {
      post: {},
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.props.params.id}`
      )
      const data = await response.json()
      this.setState({ post: data })
    } catch (err) {
      console.log(err)
    }
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
