import React, { Component } from 'react'
import { workWithServer } from '../../module/workWithServer'

const defaultValues = {
  users: [],
  addPost: () => {},
  deletePost: () => {},
  deleteCompletedPost: () => {},
  togglePost: () => {},
  setPosts: () => {},
}

interface PortalProps {
  children: React.ReactNode
}

type IContext = {
  addPost: (value: string) => void
  deletePost: (index: number, value: string | number) => void
  deleteCompletedPost: () => void
  togglePost: (id: number, changeUserId: number) => void
  users?: IUser[]
}

interface IUser {
  userId: number
  id: number
  title: string
  body: string
}

const PostsContext = React.createContext<IContext>(defaultValues)

class PostsProvider extends Component<PortalProps, { users: IUser[] }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)

    this.state = {
      users: [],
    }
    this.addPost = this.addPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.deleteCompletedPost = this.deleteCompletedPost.bind(this)
    this.togglePost = this.togglePost.bind(this)
  }

  componentDidMount(): void {
    workWithServer('GET', null).then((data) =>
      this.setState({ users: data.splice(0, 10) })
    )
  }

  addPost(value: string): void {
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
    workWithServer('POST', this.state.users.at(-1))
  }

  deletePost(index: number, value: string | number): void {
    this.setState({
      users: [...this.state.users].filter((_, indX) => indX !== index),
    })
    workWithServer('DELETE', null, `${value}`)
  }

  deleteCompletedPost(): void {
    const getDeleteItem = this.state.users.filter(
      (item: IUser) => item.userId > 1
    )
    getDeleteItem.forEach((item: IUser) =>
      workWithServer('DELETE', null, `${item.id}`)
    )
    this.setState({
      users: [...this.state.users].filter((item) => item.userId === 1),
    })
  }

  togglePost(id: number, changeUserId: number): void {
    this.setState({
      users: [...this.state.users].map((user) =>
        user.id === id ? { ...user, userId: changeUserId } : { ...user }
      ),
    })
  }

  render(): React.ReactElement<PortalProps> {
    const users = this.state.users
    const { children } = this.props
    const { addPost, deletePost, deleteCompletedPost, togglePost } = this

    return (
      <PostsContext.Provider
        value={{
          addPost,
          deletePost,
          deleteCompletedPost,
          togglePost,
          users,
        }}
      >
        {children}
      </PostsContext.Provider>
    )
  }
}
export default IUser
export { PostsProvider, PostsContext }
