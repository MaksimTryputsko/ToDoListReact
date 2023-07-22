import React, { Component } from 'react'
import './App.scss'
import { PostMain } from './components/PostMain'
import { PostsProvider } from './components/context/PostsContext'

class App extends Component {
  render(): JSX.Element {
    return (
      <div className="App">
        <PostsProvider>
          <PostMain />
        </PostsProvider>
      </div>
    )
  }
}

export default App
