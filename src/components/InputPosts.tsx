import { Component } from 'react'
import { PostsContext } from './context/PostsContext'

class InputPosts extends Component {
  state = {
    text: '',
  }

  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  onSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }
  clickBtn = (): void => {
    this.context.addPost(this.state.text)
    this.setState({ text: '' })
  }
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: e.target.value })
  }
  render(): JSX.Element {
    return (
      <div>
        <h1>Posts List</h1>
        <form className="formAddPost" onSubmit={this.onSubmitForm}>
          <input
            placeholder="Write post"
            value={this.state.text}
            onChange={(e) => {
              this.onChange(e)
            }}
          />
          <button type="submit" onClick={this.clickBtn}>
            Add Post
          </button>
        </form>
      </div>
    )
  }
}

export { InputPosts }
