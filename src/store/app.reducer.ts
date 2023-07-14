import { produce } from 'immer'

import { type SectionActions, sectionReducer } from './section'
import { type TaskData, type TaskActions, taskReducer } from './task'
import {
  projectReducer,
  type ProjectActions,
  type ProjectData
} from './project'

export type AppActions = SectionActions | TaskActions | ProjectActions

export interface AppState {
  projects: ProjectData[]
  activeProjectIndex?: number
  activeTask?: TaskData
}

export const appReducer = produce((draft: AppState, action: AppActions) => {
  projectReducer(draft, action)
  sectionReducer(draft, action)
  taskReducer(draft, action)
})
