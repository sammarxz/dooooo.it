import { SectionActionTypes } from './section'
import { TaskActionTypes } from './task'
import { ProjectActionTypes } from './project'

export const AppActionsTypes = {
  ...SectionActionTypes,
  ...TaskActionTypes,
  ...ProjectActionTypes
}
