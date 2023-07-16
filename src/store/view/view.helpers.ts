import { ViewActionTypes } from './view.actions'
import { type ViewData } from './view.data'

export function switchViewMode(viewMode: ViewData) {
  return {
    type: ViewActionTypes.SWITCH_VIEW_MODE,
    payload: viewMode
  }
}
