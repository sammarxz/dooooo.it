import { type ProjectData } from '@/store/project'

export function getTasksCount(project: ProjectData): number {
  let totalTasks = 0
  let completedTasks = 0

  project.sections.forEach((section) => {
    totalTasks += section.tasks.length
    completedTasks += section.tasks.filter((task) => task.completed).length
  })

  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return Math.round(percentage)
}
