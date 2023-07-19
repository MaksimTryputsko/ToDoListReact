import { Component } from 'react'

interface IText {
  text: string
}
interface IProps {
  addTodo: (value: string) => void
}
class InputUsers extends Component<IProps, IText> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      text: '',
    }
  }

  onSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  render(): JSX.Element {
    return (
      <div>
        <form className="formAddTodo" onSubmit={this.onSubmitForm}>
          <input
            placeholder="Write todo"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <button
            type="submit"
            onClick={() => {
              this.props.addTodo(this.state.text)
              this.setState({ text: '' })
            }}
          >
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

export { InputUsers }
