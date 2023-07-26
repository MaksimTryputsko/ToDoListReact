import { Component } from 'react'
import { Link } from 'react-router-dom'
import { POST_PAGE } from './path/path'
class ErrorPage extends Component {
  render(): JSX.Element {
    return (
      <h1>
        Sorry we have problems with page.<br></br>
        <Link to={POST_PAGE}>Click</Link>
      </h1>
    )
  }
}

export { ErrorPage }
