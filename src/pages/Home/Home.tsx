import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import useSound from 'use-sound'

import startSfx from '@/assets/sounds/start.mp3'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Enter the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle needs to be at least 5 minutes')
    .max(60, 'The cycle needs to be a maximum of 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [play] = useSound(startSfx)
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
      task: '',
      minutesAmount: 5
    }
  })

  const activeCycle: Cycle | undefined = useMemo(() => {
    return cycles.find((cycle) => cycle.id === activeCycleId)
  }, [cycles, activeCycleId])

  const totalSeconds =
    activeCycle !== undefined ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds =
    activeCycle !== undefined ? totalSeconds - amountPassedSeconds : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle !== undefined) {
      interval = setInterval(() => {
        setAmountPassedSeconds(
          differenceInSeconds(new Date(), activeCycle.startDate)
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle !== undefined) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
    }
  }, [activeCycle, minutes, seconds])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const { task, minutesAmount } = data
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountPassedSeconds(0)

    play()
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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <span>:</span>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </div>

        <button type="submit" disabled={!isValid}>
          Start
        </button>
      </form>
    </div>
  )
}
