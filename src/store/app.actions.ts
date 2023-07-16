import { SectionActionTypes } from './section'
import { TaskActionTypes } from './task'
import { ProjectActionTypes } from './project'
import { ViewActionTypes } from './view'

export const AppActionsTypes = {
  ...SectionActionTypes,
  ...TaskActionTypes,
  ...ProjectActionTypes,
  ...ViewActionTypes
}
