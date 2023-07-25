import { Component } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { SinglePageNew } from './SinglePage'
import { PostPage } from './PostPage'
import { ErrorPage } from './ErrorPage'
import { POST_PAGE, ERROR_PAGE, SINGLE_PAGE_NEW, MAIN_PAGE } from './path/path'

class PostMain extends Component {
  render(): JSX.Element {
    return (
      <Routes>
        <Route path={MAIN_PAGE} element={<Navigate replace to={POST_PAGE} />} />
        <Route path={POST_PAGE} element={<PostPage />} />
        <Route path={ERROR_PAGE} element={<ErrorPage />} />
        <Route path={SINGLE_PAGE_NEW} element={<SinglePageNew />} />
      </Routes>
    )
  }
}

export { PostMain }
