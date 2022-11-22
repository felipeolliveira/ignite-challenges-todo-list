import { ClipboardText } from "phosphor-react"
import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { TodoInsertForm } from "./TodoInsertForm"
import { Todo, TodoItem } from "./TodoItem"
import styles from './Todos.module.css'

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const completedTodos = todos.reduce((acc, curr) => curr.done ? acc + 1 : 0, 0)
  const createdTodos = todos.length
  const restCompleteTodos = createdTodos > 0 ? `${completedTodos} de ${createdTodos}` : "0"

  function addTodo(todoText: string) {
    setTodos(state => [
      {
        id: uuid(),
        content: todoText,
        done: false
      },
      ...state
    ])
  }

  function toggleCheckedTodo(id: string, checked: boolean) {
    setTodos(state => {
      const foundIndexTodoById = state.findIndex(todo => todo.id === id)

      if (foundIndexTodoById > -1) {
        state[foundIndexTodoById].done = checked
        return [...state]
      }

      return state
    })
  }

  function deleteTodo(id: string) {
    setTodos(state => {
      return state.filter(todo => todo.id !== id)
    })
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.todoInsertForm}>
        <TodoInsertForm onCreateTodo={addTodo} />
      </section>

      <section>
        <header className={styles.overviewPanel}>
          <div className={styles.created}>
            <strong>Tarefas criadas</strong>
            <span className={styles.tag}>{createdTodos}</span>
          </div>
          <div className={styles.completed}>
            <strong>Concluídas</strong>
            <span className={styles.tag}>{restCompleteTodos}</span>
          </div>
        </header>

        <div className={styles.list}>
          {!!todos.length && todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onChecked={toggleCheckedTodo} onDelete={deleteTodo} />
          ))}

          {!todos.length && (
            <div className={styles.empty}>
              <ClipboardText size={56} weight="thin" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>

      </section>
    </main>
  )
}
