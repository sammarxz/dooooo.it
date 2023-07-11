import { useAppContext } from '@/hooks'
import { AppActionsTypes } from '@/store/app.actions'

import { type SectionData } from '@/store/section'
import { addTask } from '@/store/task'

export function Home() {
  const { state, dispatch } = useAppContext()

  function handleAddSection() {
    dispatch({
      type: AppActionsTypes.ADD_SECTION
    })
    console.log(state)
  }

  function handleAddTask(section: SectionData) {
    dispatch(addTask(section, 'alguma coisa'))
  }

  console.log(state.sections)

  return (
    <div>
      <h1>Project Name</h1>

      <hr />
      {state.sections.map((section) => (
        <div key={section.id}>
          <h1>{section.title}</h1>
          <button
            onClick={() => {
              handleAddTask(section)
            }}
          >
            Add Task
          </button>
          {section.tasks.map((task) => (
            <div key={task.id}>
              <h1>{task.description}</h1>
            </div>
          ))}
        </div>
      ))}

      <hr />
      <button onClick={handleAddSection}>Add Section</button>
    </div>
  )
}
