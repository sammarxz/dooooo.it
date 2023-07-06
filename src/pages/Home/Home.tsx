import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Enter the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle needs to be at least 5 minutes')
    .max(60, 'The cycle needs to be a maximum of 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<NewCycleFormData>({
    mode: 'onChange',
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <div>
          <label htmlFor="task">I&apos;m going to work on</label>
          <input
            id="task"
            list="task-suggestions"
            placeholder="Name your project"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <input
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit" disabled={!isValid}>
          Start
        </button>
      </form>
    </div>
  )
}
