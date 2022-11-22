import { CheckCircle, Circle, Trash } from "phosphor-react"
import { ChangeEvent, useState } from "react"
import styles from './TodoItem.module.css'

export interface Todo {
  id: string,
  content: string
  done: boolean
}

interface TodoItemProps {
  todo: Todo
  onChecked: (id: string, checked: boolean) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onChecked, onDelete }: TodoItemProps) {
  const [itemChecked, setItemChecked] = useState(todo.done)

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    setItemChecked(event.target.checked)
    onChecked(todo.id, event.target.checked)
  }

  function handleDelete() {
    onDelete(todo.id)
  }


  return (
    <div className={styles.item}>
      <label className={styles.checkbox} htmlFor={`todo-checkbox-${todo.id}`}>
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          checked={itemChecked}
          onChange={handleCheck}
        />
        <span>
          {!itemChecked && (
            <Circle size={22} weight="bold" />
          )}
          {itemChecked && (
            <CheckCircle size={22} weight="fill" />
          )}
        </span>
      </label>
      <p>{todo.content}</p>
      <button>
        <Trash size={16} weight="bold" onClick={handleDelete} />
      </button>
    </div>
  )
}
