import { type TaskData } from '.'

export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REORDER_TASKS = 'REORDER_TASKS',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER'
}

export interface AddTaskAction {
  type: ActionTypes.ADD_TASK
  payload: {
    description: string
  }
}

export interface DeleteTaskAction {
  type: ActionTypes.DELETE_TASK
  payload: {
    id: string
  }
}

export interface UpdateTaskAction {
  type: ActionTypes.UPDATE_TASK
  payload: {
    task: TaskData
  }
}

export interface ReorderTasksAction {
  type: ActionTypes.REORDER_TASKS
  payload: {
    tasks: TaskData[]
  }
}

export interface StartTimerAction {
  type: ActionTypes.START_TIMER
  payload: {
    id: string
    timeSpent: number
  }
}

export interface StopTimerAction {
  type: ActionTypes.STOP_TIMER
  payload: {
    id: string
  }
}

export function stopTimer(id: string): StopTimerAction {
  return {
    type: ActionTypes.STOP_TIMER,
    payload: {
      id
    }
  }
}

export function startTimer(id: string, timeSpent: number): StartTimerAction {
  return {
    type: ActionTypes.START_TIMER,
    payload: {
      id,
      timeSpent
    }
  }
}

export function deleteTask(id: string): DeleteTaskAction {
  return {
    type: ActionTypes.DELETE_TASK,
    payload: {
      id
    }
  }
}

export function updateTask(task: TaskData): UpdateTaskAction {
  return {
    type: ActionTypes.UPDATE_TASK,
    payload: {
      task
    }
  }
}

export function reorderTasks(tasks: TaskData[]): ReorderTasksAction {
  return {
    type: ActionTypes.REORDER_TASKS,
    payload: {
      tasks
    }
  }
}
