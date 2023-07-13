import { type SectionData } from '../section'

import { type TaskData } from './task.data'

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REORDER_TASKS = 'REORDER_TASKS',
  SET_ACTIVE_TASK = 'SET_ACTIVE_TASK'
}

export interface AddTaskAction {
  type: TaskActionTypes.ADD_TASK
  payload: {
    section: SectionData
    description: string
  }
}

export interface UpdateTaskAction {
  type: TaskActionTypes.UPDATE_TASK
  payload: {
    sectionId: string
    task: TaskData
  }
}

export interface DeleteTaskAction {
  type: TaskActionTypes.DELETE_TASK
  payload: {
    sectionId: string
    id: string
  }
}

export interface ReorderTasksAction {
  type: TaskActionTypes.REORDER_TASKS
  payload: {
    section: SectionData
    tasks: TaskData[]
  }
}

export interface SetActiveTaskAction {
  type: TaskActionTypes.SET_ACTIVE_TASK
  payload: {
    task?: TaskData
  }
}

export type TaskActions =
  | AddTaskAction
  | DeleteTaskAction
  | UpdateTaskAction
  | ReorderTasksAction
  | SetActiveTaskAction
