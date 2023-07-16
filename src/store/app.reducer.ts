import { produce } from 'immer'

import { type SectionActions, sectionReducer } from './section'
import { type TaskActions, taskReducer } from './task'
import { type ProjectActions, projectReducer } from './project'
import { type ViewActions, viewReducer } from './view'

import { type AppState } from './app.data'

export type AppActions =
  | SectionActions
  | TaskActions
  | ProjectActions
  | ViewActions

export const appReducer = produce((draft: AppState, action: AppActions) => {
  projectReducer(draft, action)
  sectionReducer(draft, action)
  taskReducer(draft, action)
  viewReducer(draft, action)
})
