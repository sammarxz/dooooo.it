import { useEffect } from 'react'
import useSound from 'use-sound'

import { useTask, useTimer } from '@/hooks'

import { ActionTypes } from '@/store/task/reducers/actions'

import { type TaskData } from '@/store/task/reducers/reducers'

import { formatTimer } from '@/utils/timer'

import startSfx from '@/assets/sounds/start.mp3'
import stopSfx from '@/assets/sounds/stop.mp3'

interface TaskProps {
  task: TaskData
}

export function Task({ task }: TaskProps) {
  const {
    state: { activeTask },
    dispatch
  } = useTask()
  const [playStartSound] = useSound(startSfx)
  const [playStopSound] = useSound(stopSfx)

  const { id, description, completed, timeSpent } = task

  const isActive = activeTask !== null && activeTask?.id === id

  const { passedTime } = useTimer(timeSpent, isActive)

  useEffect(() => {
    if (activeTask !== null) {
      document.title = `${formatTimer(passedTime)} - ${description}`
    } else {
      document.title = 'Time it - Free time tracking app'
    }
  }, [activeTask, passedTime])

  function handleToggle() {
    dispatch({
      type: ActionTypes.TOGGLE_TASK,
      payload: {
        id
      }
    })
  }

  function handleStartTimer() {
    dispatch({
      type: ActionTypes.START_TIMER,
      payload: {
        id,
        timeSpent: passedTime
      }
    })
    playStartSound()
  }

  function handleStopTimer() {
    dispatch({
      type: ActionTypes.STOP_TIMER,
      payload: {
        id
      }
    })
    playStopSound()
  }

  return (
    <tr>
      <td>
        <input type="checkbox" checked={completed} onChange={handleToggle} />
      </td>
      <td>{isActive ? <strong>{description}</strong> : <>{description}</>}</td>
      <td>
        <span role="timer" aria-live="polite" aria-atomic="true">
          <time id="timer" dateTime="PT0S">
            {formatTimer(passedTime)}
          </time>
        </span>
      </td>
      <td>
        {isActive ? (
          <button onClick={handleStopTimer}>Stop</button>
        ) : (
          <button onClick={handleStartTimer}>Start</button>
        )}
      </td>
    </tr>
  )
}
