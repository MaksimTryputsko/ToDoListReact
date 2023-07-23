import React, { Component } from 'react'
import { sendRequest } from '../../module/sendRequest'
import { URL_POSTS } from '../../module/sendRequest'
const defaultValues = {
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  deleteCompletedPost: () => {},
  togglePost: () => {},
  addPostsElements: () => {},
}

interface PortalProps {
  children: React.ReactNode
}

type IContext = {
  addPost: (value: string) => void
  deletePost: (index: number, value: string | number) => void
  deleteCompletedPost: () => void
  togglePost: (id: number, changeUserId: number) => void
  addPostsElements: (value: IUser[]) => void
  posts?: IUser[]
}

interface IUser {
  userId: number
  id: number
  title: string
  body: string
}

const PostsContext = React.createContext<IContext>(defaultValues)

class PostsProvider extends Component<PortalProps, { posts: IUser[] }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  addPost = (value: string): void => {
    const postElement: Omit<IUser, 'id'> = {
      userId: 1,
      title: value,
      body: 'Hello from body',
    }

    sendRequest({ method: 'POST', body: postElement, path: URL_POSTS }).then(
      (data) =>
        this.setState({
          posts: [
            ...this.state.posts,
            {
              id: data.id,
              title: data.title,
              body: data.body,
              userId: data.userId,
            },
          ],
        })
    )
  }

  addPostsElements = (value: IUser[]): void => {
    this.setState({ posts: value })
  }

  deletePost = (index: number, value: string | number): void => {
    sendRequest({ method: 'DELETE', path: `${URL_POSTS}${value}` }).then(() =>
      this.setState({
        posts: [...this.state.posts].filter((_, indX) => indX !== index),
      })
    )
  }

  deleteCompletedPost = (): void => {
    const getDeleteItem = this.state.posts.filter(
      (item: IUser) => item.userId > 1
    )

    getDeleteItem.forEach((item: IUser) =>
      sendRequest({ method: 'DELETE', path: `${URL_POSTS}${item.id}` }).then(
        () => {
          this.setState({
            posts: this.state.posts.filter((item) => item.userId === 1),
          })
        }
      )
    )
  }

  togglePost = (id: number, changeUserId: number): void => {
    this.setState({
      posts: this.state.posts.map((user) =>
        user.id === id ? { ...user, userId: changeUserId } : { ...user }
      ),
    })
  }

  render(): React.ReactElement<PortalProps> {
    const { children } = this.props
    return (
      <PostsContext.Provider
        value={{
          addPost: this.addPost,
          deletePost: this.deletePost,
          deleteCompletedPost: this.deleteCompletedPost,
          togglePost: this.togglePost,
          addPostsElements: this.addPostsElements,
          posts: this.state.posts,
        }}
      >
        {children}
      </PostsContext.Provider>
    )
  }
}

export default IUser
export { PostsProvider, PostsContext }
