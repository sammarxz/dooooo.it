import { ViewActionTypes, viewReducer } from '.'
import { type AppState } from '../app.data'
import { type AppActions } from '../app.reducer'

test('Switch view mode', () => {
  const initialState: AppState = {
    projects: [],
    activeProjectIndex: undefined,
    activeTask: undefined,
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ViewActionTypes.SWITCH_VIEW_MODE,
    payload: 'kanban'
  }

  const nextState = { ...initialState }
  viewReducer(nextState, action)

  expect(nextState.viewMode).toBe('kanban')
})
