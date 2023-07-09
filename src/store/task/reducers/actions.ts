export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  TOGGLE_TASK = 'TOGGLE_TASK',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER'
}

export interface AddTaskAction {
  type: ActionTypes.ADD_TASK
  payload: {
    description: string
  }
}

export interface ToggleTaskAction {
  type: ActionTypes.TOGGLE_TASK
  payload: {
    id: string
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
