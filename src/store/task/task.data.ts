export interface TaskData {
  id: string
  description: string
  completed: boolean
  startDate: Date | null
  finishDate: Date | null
  timeSpent: number
  createdDate: Date
}
