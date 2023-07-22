import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorPage extends Component {
  render(): JSX.Element {
    return (
      <>
        <h1>
          Sorry we have problems with page.<br></br>
          <Link to="/">Click</Link>
        </h1>
      </>
    )
  }
}

export { ErrorPage }
