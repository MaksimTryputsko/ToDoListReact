import React, { Component } from 'react'
import { Todo } from './Todo'

interface IUser {
  userId: number
  id: number
  title: string
  body: string
}

interface ITodos {
  todosItem: IUser[]
  deleteTodo: (index: number, value: number) => void
  toggleTodo: (id: number, changeUserId: number) => void
}

class ListTodos extends Component<ITodos> {
  constructor(props: ITodos) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <div>
        <ul className="wrapperUl">
          {this.props.todosItem.map((el, index) => {
            return (
              <Todo
                key={el.id}
                title={el.title}
                body={el.body}
                id={el.id}
                userId={el.userId}
                index={index}
                delete={this.props.deleteTodo}
                toggleTodo={this.props.toggleTodo}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ListTodos
