import {
  TaskActionTypes,
  type DeleteTaskAction,
  type AddTaskAction,
  type StartTimerAction,
  type StopTimerAction,
  type UpdateTaskAction,
  type ReorderTasksAction
} from './task.actions'

import { type SectionData } from '../section'

import { type TaskData } from './task.data'

export function addTask(
  section: SectionData,
  description: string
): AddTaskAction {
  return {
    type: TaskActionTypes.ADD_TASK,
    payload: {
      section,
      description
    }
  }
}

export function stopTimer(section: SectionData, id: string): StopTimerAction {
  return {
    type: TaskActionTypes.STOP_TIMER,
    payload: {
      section,
      id
    }
  }
}

export function startTimer(
  taskId: string,
  sectionId: string,
  timeSpent: number
): StartTimerAction {
  return {
    type: TaskActionTypes.START_TIMER,
    payload: {
      taskId,
      sectionId,
      timeSpent
    }
  }
}

export function deleteTask(section: SectionData, id: string): DeleteTaskAction {
  return {
    type: TaskActionTypes.DELETE_TASK,
    payload: {
      section,
      id
    }
  }
}

export function updateTask(
  section: SectionData,
  task: TaskData
): UpdateTaskAction {
  return {
    type: TaskActionTypes.UPDATE_TASK,
    payload: {
      section,
      task
    }
  }
}

export function reorderTasks(
  section: SectionData,
  tasks: TaskData[]
): ReorderTasksAction {
  return {
    type: TaskActionTypes.REORDER_TASKS,
    payload: {
      section,
      tasks
    }
  }
}

export interface TaskState {
  tasks: TaskData[]
}

export type TaskActions =
  | AddTaskAction
  | StartTimerAction
  | StopTimerAction
  | DeleteTaskAction
  | UpdateTaskAction
  | ReorderTasksAction
