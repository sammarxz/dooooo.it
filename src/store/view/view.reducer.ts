import { ViewActionTypes } from '.'
import { type AppState } from '../app.data'
import { type AppActions } from '../app.reducer'

export const viewReducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case ViewActionTypes.SWITCH_VIEW_MODE:
      draft.viewMode = action.payload
      break
    default:
      break
  }
}
