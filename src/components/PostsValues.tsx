import React, { Component, Context } from 'react'
import { PostElement } from './PostElement'
import { IContext, PostsContext } from './context/PostsContext'
import IPost from './context/PostsContext'

class PostsValues extends Component {
  static contextType = PostsContext
  context!: React.ContextType<Context<IContext>>

  render(): JSX.Element | null {
    const { posts } = this.context
    if (!posts) {
      return null
    }
    return (
      <div>
        {posts !== undefined && (
          <ul className="wrapperUl">
            {posts?.map((el: IPost, index: number) => {
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
        )}
      </div>
    )
  }
}

export default PostsValues
