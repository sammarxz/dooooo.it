import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import useSound from 'use-sound'

import startSfx from '@/assets/sounds/start.mp3'
import endSfx from '@/assets/sounds/finish.mp3'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Enter the task')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  timeSpentInSeconds: number
  startDate: Date
  interruptedDate?: Date
  finshedDate?: Date
}

function formatTimer(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`
}

function padNumber(number: number): string {
  return number.toString().padStart(2, '0')
}

export function Home() {
  // sound effects
  const [playStart] = useSound(startSfx)
  const [playEnd] = useSound(endSfx)

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<NewCycleFormData>({
    mode: 'onChange',
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ''
    }
  })

  const activeCycle: Cycle | undefined = useMemo(() => {
    return cycles.find((cycle) => cycle.id === activeCycleId)
  }, [cycles, activeCycleId])

  useEffect(() => {
    let startTime: number
    let requestId: number

    const updateStopwatch = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }

      const elapsedTime = Math.floor((currentTime - startTime) / 1000)

      if (activeCycle !== undefined) {
        setAmountPassedSeconds(activeCycle.timeSpentInSeconds + elapsedTime)
      }

      requestId = requestAnimationFrame(updateStopwatch)
    }

    if (activeCycleId !== null) {
      requestId = requestAnimationFrame(updateStopwatch)
    }

    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [activeCycle, activeCycleId])

  useEffect(() => {
    if (activeCycle !== undefined) {
      document.title = `${formatTimer(activeCycle.timeSpentInSeconds)} - ${
        activeCycle.task
      }`
    } else {
      document.title = 'Time it - Free time tracking app'
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const { task } = data
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      timeSpentInSeconds: 0,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])

    reset()
  }

  function handleStartCycle(id: string) {
    if (activeCycleId !== null) {
      setCycles((state) =>
        state.map((cycle) =>
          cycle.id === activeCycleId
            ? { ...cycle, timeSpentInSeconds: amountPassedSeconds }
            : cycle
        )
      )
    }

    setActiveCycleId(id)
    setAmountPassedSeconds(0)

    playStart()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? {
              ...cycle,
              interruptedDate: new Date(),
              timeSpentInSeconds: amountPassedSeconds
            }
          : cycle
      )
    )

    setActiveCycleId(null)
    setAmountPassedSeconds(0)
    playEnd()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <div>
          <label htmlFor="task">Task: </label>
          <input
            id="task"
            list="task-suggestions"
            placeholder="Name your project"
            autoFocus
            {...register('task')}
          />
          <button type="submit" disabled={!isValid}>
            Add Task
          </button>
        </div>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map(({ id, task, timeSpentInSeconds }) => {
            const isActive = activeCycleId === id
            const time = isActive ? amountPassedSeconds : timeSpentInSeconds
            return (
              <tr key={id}>
                <td>{isActive ? <strong>{task}</strong> : <>{task}</>}</td>
                <td>
                  <div role="timer" aria-live="polite" aria-atomic="true">
                    <time id="timer" dateTime="PT0S">
                      {formatTimer(time)}
                    </time>
                  </div>
                </td>
                <td>
                  {isActive ? (
                    <button onClick={handleInterruptCycle}>stop</button>
                  ) : (
                    <button
                      onClick={() => {
                        handleStartCycle(id)
                      }}
                    >
                      play
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
