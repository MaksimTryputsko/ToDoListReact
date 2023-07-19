import { RiDeleteBin2Fill, RiFileListLine } from 'react-icons/ri'
import { Component } from 'react'
import { Link } from 'react-router-dom'

interface IPropsValues {
  key: number
  userId: number
  id: number
  title: string
  body: string
  index: number
  delete: (index: number, value: number) => void
  toggleTodo: (id: number, changeUserId: number) => void
}

class Todo extends Component<IPropsValues, { changeChecked: boolean }> {
  constructor(props: IPropsValues) {
    super(props)
    this.state = {
      changeChecked: false,
    }
  }

  render(): JSX.Element {
    return (
      <li key={this.props.id}>
        <div>
          <RiFileListLine className="icon" />
          <input
            className="checkBox"
            type="checkbox"
            checked={this.state.changeChecked}
            onChange={() => {
              this.setState({ changeChecked: !this.state.changeChecked })

              if (!this.state.changeChecked) {
                this.props.toggleTodo(this.props.id, 2)
              } else {
                this.props.toggleTodo(this.props.id, 1)
              }
            }}
          />
        </div>
        <Link to={`${this.props.id}`}>{this.props.title}</Link>
        <button
          onClick={() => {
            this.props.delete(this.props.index, this.props.id)
          }}
        >
          <RiDeleteBin2Fill className="icon" />
        </button>
      </li>
    )
  }
}

export { Todo }
