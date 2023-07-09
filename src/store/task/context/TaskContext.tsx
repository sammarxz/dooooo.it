import { type ReactNode, createContext, useReducer, useEffect } from 'react'

import {
  taskReducer,
  type TaskAction,
  type TaskState
} from '../reducers/reducers'

interface TaskContextType {
  state: TaskState
  dispatch: React.Dispatch<TaskAction>
}

interface TaskProviderProps {
  children: ReactNode
}

const taskLocalStorageKey = '@timerit:tasks-state-1.0.0'

const initialState: TaskState = {
  tasks: [],
  activeTask: null
}

export const TaskContext = createContext<TaskContextType>({
  state: initialState,
  dispatch: () => undefined
})

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState as never,
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(taskLocalStorageKey)

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(state)

    localStorage.setItem(taskLocalStorageKey, stateJSON)
  }, [state])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}
