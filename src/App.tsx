import React, { Component } from 'react'
import './App.scss'
import { PostMain } from './components/PostMain'
import { PostsProvider } from './components/context/PostsContext'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render(): JSX.Element {
    return (
      <div className="App">
        <BrowserRouter>
          <PostsProvider>
            <PostMain />
          </PostsProvider>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
