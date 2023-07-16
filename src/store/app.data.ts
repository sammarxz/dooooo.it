import { type ProjectData } from './project'
import { type TaskData } from './task'
import { type ViewData } from './view/view.data'

export interface AppState {
  projects: ProjectData[]
  activeProjectIndex?: number
  activeTask?: TaskData
  viewMode: ViewData
}
