import { useContext } from 'react'

import { AppContext } from '@/store'

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used inside a AppContextProvder')
  }

  return context
}
