import { type SectionData } from '../section'

import { type TaskData } from './task.data'

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REORDER_TASKS = 'REORDER_TASKS',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER'
}

export interface AddTaskAction {
  type: TaskActionTypes.ADD_TASK
  payload: {
    section: SectionData
    description: string
  }
}

export interface DeleteTaskAction {
  type: TaskActionTypes.DELETE_TASK
  payload: {
    section: SectionData
    id: string
  }
}

export interface UpdateTaskAction {
  type: TaskActionTypes.UPDATE_TASK
  payload: {
    section: SectionData
    task: TaskData
  }
}

export interface ReorderTasksAction {
  type: TaskActionTypes.REORDER_TASKS
  payload: {
    section: SectionData
    tasks: TaskData[]
  }
}

export interface StartTimerAction {
  type: TaskActionTypes.START_TIMER
  payload: {
    section: SectionData
    id: string
    timeSpent: number
  }
}

export interface StopTimerAction {
  type: TaskActionTypes.STOP_TIMER
  payload: {
    section: SectionData
    id: string
  }
}

export type TaskActions =
  | AddTaskAction
  | DeleteTaskAction
  | UpdateTaskAction
  | ReorderTasksAction
  | StartTimerAction
  | StopTimerAction
