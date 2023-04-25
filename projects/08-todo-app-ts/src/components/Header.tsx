import React from 'react'
import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className="header">
        <h1>Todo
            <img
                style={{ width: '60px', height: 'auto' }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjSGlq41qfHRoSlrapRkhdT2GjniE_LPnoRfC8lCetLV-z7V1sUf7JVe9Yc7kJciQ6NI&usqp=CAU" alt=""
            />
        </h1>

        <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}
