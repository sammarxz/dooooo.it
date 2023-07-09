import { useContext } from 'react'

import { TaskContext } from '@/store/task'

export function useTask() {
  const context = useContext(TaskContext)

  if (context === undefined) {
    throw new Error('useTask must be used inside a TaskContextProvder')
  }

  return context
}
