import { type ReactNode, useReducer } from 'react'

import { AppContext, initialState } from './app.context'

import { appReducer } from './app.reducer'

interface AppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState as never)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
