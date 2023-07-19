import React, { Component } from 'react'
import './App.scss'
import NameProject from './components/NameProject'
import ListTodos from './components/ListTodos'
import { InputUsers } from './components/InputUsers'
import { DeleteItems } from './components/DeleteItems'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { SinglePageNew } from './components/SinglePage'

interface IUser {
  userId: number
  id: number
  title: string
  body: string
}

interface IState {
  users: IUser[]
  url: string
}

interface IProps {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      users: [],
      url: 'https://jsonplaceholder.typicode.com/posts/',
    }

    this.deleteTodo = this.deleteTodo.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteCompletedTodo = this.deleteCompletedTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }

  workWithServer = async (
    method: string,
    body?: IUser | null,
    path: string = ''
  ) => {
    const newBody: string | undefined = body ? JSON.stringify(body) : undefined

    try {
      const response = await fetch(`${this.state.url}${path}`, {
        method,
        body: newBody,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await response.json()
      if (method === 'GET') {
        this.setState({ users: data.splice(0, 10) })
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.workWithServer('GET', null)
  }

  addTodo(value: string): void {
    this.setState({
      users: [
        ...this.state.users,
        {
          id: this.state.users.length + 1,
          title: value,
          body: 'Hello from body',
          userId: 1,
        },
      ],
    })

    this.workWithServer('POST', this.state.users.at(-1))
  }

  deleteTodo(index: number, value: number): void {
    this.setState({
      users: [...this.state.users].filter((_, indX) => indX !== index),
    })
    this.workWithServer('DELETE', null, `${value}`)
  }

  deleteCompletedTodo(): void {
    const getDeleteItem = this.state.users.filter((item) => item.userId > 1)
    getDeleteItem.forEach((item) =>
      this.workWithServer('DELETE', null, `${item.id}`)
    )
    this.setState({
      users: [...this.state.users].filter((item) => item.userId === 1),
    })
  }

  toggleTodo(id: number, changeUserId: number): void {
    this.setState({
      users: [...this.state.users].map((user) =>
        user.id === id ? { ...user, userId: changeUserId } : { ...user }
      ),
    })
  }

  render(): JSX.Element {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NameProject />
                  <InputUsers addTodo={this.addTodo} />
                  {!!this.state.users.length && (
                    <DeleteItems onClick={this.deleteCompletedTodo} />
                  )}
                  <ListTodos
                    todosItem={this.state.users}
                    deleteTodo={this.deleteTodo}
                    toggleTodo={this.toggleTodo}
                  />
                </>
              }
            />
            <Route
              path="*"
              element={
                <h1>
                  Sorry we have problems with page.<br></br>
                  <Link to="/">Click</Link>
                </h1>
              }
            />
            <Route path=":id" element={<SinglePageNew />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
