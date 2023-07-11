import { createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { type AppActions, type AppState } from './app.reducer'

export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppActions>
}

export const initialState: AppState = {
  sections: [
    {
      id: uuidv4(),
      title: 'Tasks',
      tasks: []
    }
  ],
  activeTask: null
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined
})
