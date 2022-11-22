
import todoLogo from '../assets/todo_logo.svg'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={todoLogo} alt="Logo do Todo" />
    </header>
  )
}
