import { createContext } from 'react'

import { type AppActions } from './app.reducer'
import { type AppState } from './app.data'

export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppActions>
}

export const initialState: AppState = {
  projects: [],
  activeProjectIndex: undefined,
  activeTask: undefined,
  viewMode: 'list'
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined
})
