import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { useTask } from '@/hooks'

import { ActionTypes } from '@/store/task/reducers/actions'

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

const newTaskFormValidationSchema = zod.object({
  description: zod.string().min(1, 'Enter the task')
})

export function NewTaskForm() {
  const { dispatch } = useTask()

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<NewTaskFormData>({
    mode: 'onChange',
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      description: ''
    }
  })

  function handleCreateNewTask(data: NewTaskFormData) {
    if (isValid) {
      dispatch({
        type: ActionTypes.ADD_TASK,
        payload: data
      })
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNewTask)}>
      <div>
        <label htmlFor="task">Task: </label>
        <input
          id="task"
          placeholder="Task name"
          autoFocus
          {...register('description')}
        />
      </div>
    </form>
  )
}
