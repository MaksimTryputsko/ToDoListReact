import { Component } from 'react'
import { PostsContext } from './context/PostsContext'

class InputUsers extends Component {
  state = {
    text: '',
  }

  static contextType = PostsContext
  context!: React.ContextType<typeof PostsContext>

  onSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }
  createInput(): JSX.Element {
    return (
      <input
        placeholder="Write post"
        value={this.state.text}
        onChange={(e) => this.setState({ text: e.target.value })}
      />
    )
  }
  clickBtn(): void {
    this.context.addPost(this.state.text)
    this.setState({ text: '' })
  }
  render(): JSX.Element {
    return (
      <div>
        <h1>Posts List</h1>
        <form className="formAddPost" onSubmit={this.onSubmitForm}>
          {this.createInput()}
          <button type="submit" onClick={() => this.clickBtn()}>
            Add Post
          </button>
        </form>
      </div>
    )
  }
}

export { InputUsers }
