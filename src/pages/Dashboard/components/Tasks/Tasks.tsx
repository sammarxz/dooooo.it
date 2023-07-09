import { useTask } from '@/hooks'

import { Task } from '../Task'

export function Tasks() {
  const {
    state: { tasks }
  } = useTask()

  return (
    <table border={1} width={400}>
      <thead>
        <tr>
          <th></th>
          <th>Task</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  )
}
