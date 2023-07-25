import React, { Component } from 'react'
import { sendRequest } from '../../module/sendRequest'

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

export type IContext = {
  addPost: (value: string) => void
  deletePost: (index: number, value: string | number) => void
  deleteCompletedPost: () => void
  togglePost: (id: number, changeUserId: number) => void
  addPostsElements: (value: IPost[]) => void
  posts?: IPost[]
}

interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

const PostsContext = React.createContext<IContext>(defaultValues)

class PostsProvider extends Component<PortalProps, { posts: IPost[] }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  addPost = async (value: string) => {
    const postElement: Omit<IPost, 'id'> = {
      userId: 1,
      title: value,
      body: 'Hello from body',
    }

    const post = await sendRequest({
      method: 'POST',
      body: postElement,
      path: '/posts',
    })
    if (!!post) {
      this.setState({
        posts: [
          ...this.state.posts,
          {
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId,
          },
        ],
      })
    }
  }

  addPostsElements = (value: IPost[]): void => {
    this.setState({ posts: value })
  }

  deletePost = async (index: number, value: string | number) => {
    const removePost = await sendRequest({
      method: 'DELETE',
      path: `/posts/${value}`,
    })
    if (!!removePost) {
      this.setState({
        posts: [...this.state.posts].filter((_, indX) => indX !== index),
      })
    }
  }

  deleteCompletedPost = async () => {
    const getDeleteItem = this.state.posts.filter(
      (item: IPost) => item.userId > 1
    )
    const filterCompetedPosts = (): void => {
      this.setState({
        posts: this.state.posts.filter((item) => item.userId === 1),
      })
    }
    const onSuccess = (filter: () => void) => {
      getDeleteItem.forEach((item: IPost) =>
        sendRequest({ method: 'DELETE', path: `/posts/${item.id}` }).then(() =>
          filter()
        )
      )
    }

    onSuccess(filterCompetedPosts)
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

export default IPost
export { PostsProvider, PostsContext }
