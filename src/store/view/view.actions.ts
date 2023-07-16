import { type ViewData } from './view.data'

export enum ViewActionTypes {
  SWITCH_VIEW_MODE = 'SWITCH_VIEW_MODE'
}

export interface SwitchViewModeAction {
  type: ViewActionTypes.SWITCH_VIEW_MODE
  payload: ViewData
}

export type ViewActions = SwitchViewModeAction
