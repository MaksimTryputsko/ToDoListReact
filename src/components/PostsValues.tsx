import React, { Component } from 'react'
import { PostElement } from './PostElement'
import { PostsContext } from './context/PostsContext'
import IUser from './context/PostsContext'

class PostsValues extends Component {
  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  render(): JSX.Element {
    const { users } = this.context

    return (
      <div>
        <ul className="wrapperUl">
          {users?.map((el: IUser, index: number) => {
            return (
              <PostElement
                key={el.id}
                title={el.title}
                body={el.body}
                id={el.id}
                userId={el.userId}
                index={index}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default PostsValues
