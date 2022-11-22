
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import styles from './TodoInsertForm.module.css'

interface InsertFormProps {
  onCreateTodo: (todoText: string) => void
}

export function TodoInsertForm({ onCreateTodo }: InsertFormProps) {
  const [newTodoText, setNewTodoText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onCreateTodo(newTodoText)

    setNewTodoText('')
    inputRef.current?.focus()
  }

  function handleChangeNewTodoText(event: ChangeEvent<HTMLInputElement>) {
    setNewTodoText(event.target.value)
    event.target.setCustomValidity('')
  }

  function handleInvalidTodoInput(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo obrigatório')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTodoText}
        onInvalid={handleInvalidTodoInput}
        onChange={handleChangeNewTodoText}
        required
      />
      <button type='submit'>Criar</button>
    </form>
  )
}
