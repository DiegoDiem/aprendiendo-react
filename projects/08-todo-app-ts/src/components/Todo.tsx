import React from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onToggleCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onToggleCompletedTodo, onRemoveTodo }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompletedTodo({ id, completed: event.target.checked })
  }
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
        id={id}
      />
      <label htmlFor={id}>{title}</label>
      <button
        className='destroy'
        onClick={ () => {
          onRemoveTodo({ id })
        }}
      />
    </div>
  )
}
