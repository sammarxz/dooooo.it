import { NewTaskForm, Tasks } from './components'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <NewTaskForm />
      <br />
      <Tasks />
    </div>
  )
}
