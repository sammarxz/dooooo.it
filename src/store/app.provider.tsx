import { type ReactNode, useReducer } from 'react'

import { AppContext, initialState } from './app.context'

// import { appReducer } from './app.reducer'
import { appReducer } from './app.reducer'

interface AppContextProviderProps {
  children: ReactNode
}

// const LOCAL_STORAGE_KEY = '@timerit:state-1.0.0'

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState as never
    // (initialState) => {
    //   const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    //   if (storedStateAsJSON) {
    //     return JSON.parse(storedStateAsJSON)
    //   }

    //   return initialState
    // }
  )

  // useEffect(() => {
  //   const stateJSON = JSON.stringify(state)

  //   localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
  // }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
