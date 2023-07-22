import { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SinglePageNew } from './SinglePage'
import { PostPage } from './PostPage'
import { ErrorPage } from './ErrorPage'
import { postPage, errorPage, singlePageNew } from './path/path'
class PostMain extends Component {
  render(): JSX.Element {
    return (
      <BrowserRouter>
        <>
          <Routes>
            <Route path={postPage} element={<PostPage />} />
            <Route path={errorPage} element={<ErrorPage />} />
            <Route path={singlePageNew} element={<SinglePageNew />} />
          </Routes>
        </>
      </BrowserRouter>
    )
  }
}

export { PostMain }
