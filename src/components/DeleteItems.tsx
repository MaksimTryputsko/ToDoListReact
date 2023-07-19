import { Component, ReactNode } from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'

class DeleteItems extends Component<{ onClick: () => void }> {
  constructor(props: any) {
    super(props)
  }
  render(): JSX.Element {
    return (
      <div>
        {' '}
        <button
          onClick={() => {
            this.props.onClick()
          }}
        >
          <BsFillTrash3Fill className="deleteIcon" />
        </button>
      </div>
    )
  }
}
export { DeleteItems }
