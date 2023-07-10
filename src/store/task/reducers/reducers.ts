/* eslint-disable no-case-declarations */
import { differenceInSeconds } from 'date-fns'

import {
  ActionTypes,
  type DeleteTaskAction,
  type AddTaskAction,
  type StartTimerAction,
  type StopTimerAction,
  type UpdateTaskAction,
  type ReorderTasksAction
} from './actions'

export interface TaskData {
  id: string
  description: string
  completed: boolean
  startDate: Date | null
  finishDate: Date | null
  timeSpent: number
  createdDate: Date
}

export interface TaskState {
  tasks: TaskData[]
  activeTask?: TaskData | null | undefined
}

export type TaskAction =
  | AddTaskAction
  | StartTimerAction
  | StopTimerAction
  | DeleteTaskAction
  | UpdateTaskAction
  | ReorderTasksAction

export function taskReducer(state: TaskState, action: TaskAction) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      const newTask: TaskData = {
        id: String(new Date().getTime()),
        description: action.payload.description,
        completed: false,
        startDate: null,
        finishDate: null,
        timeSpent: 0,
        createdDate: new Date()
      }

      return {
        ...state,
        tasks: [...state.tasks, newTask]
      }
    case ActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.task.id) {
            return {
              ...task,
              ...action.payload.task
            }
          }
          return task
        })
      }
    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id)
      }
    case ActionTypes.REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks
      }
    case ActionTypes.START_TIMER:
      const activeTask = state.tasks.find(
        (task) => task.id === action.payload.id
      )

      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              startDate: new Date(),
              timeSpent: action.payload.timeSpent
            }
          }
          return task
        }),
        activeTask
      }
    case ActionTypes.STOP_TIMER:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id && task.startDate != null) {
            const finishDate = new Date()
            const timeSpent = differenceInSeconds(finishDate, task.startDate)
            return {
              ...task,
              startDate: null,
              finishDate,
              timeSpent: task.timeSpent + timeSpent
            }
          }
          return task
        }),
        activeTask: null
      }
    default:
      return state
  }
}
