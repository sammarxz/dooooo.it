import { createContext } from 'react'

import { type AppActions, type AppState } from './app.reducer'

export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppActions>
}

export const initialState: AppState = {
  projects: [],
  activeProjectIndex: undefined,
  activeTask: undefined
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined
})
