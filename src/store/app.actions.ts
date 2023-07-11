import { SectionActionTypes } from './section/section.actions'
import { TaskActionTypes } from './task'

export const AppActionsTypes = { ...SectionActionTypes, ...TaskActionTypes }
