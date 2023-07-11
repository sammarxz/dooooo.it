import { v4 as uuidv4 } from 'uuid'
import { differenceInSeconds } from 'date-fns'

import { type SectionData, type SectionActions } from './section'
import { type TaskData, type TaskActions } from './task'

import { AppActionsTypes } from './app.actions'

export type AppActions = SectionActions | TaskActions

export interface AppState {
  sections: SectionData[]
  activeTask?: TaskData | null | undefined
}

// TODO: improve abstraction by creating helper functions in their place
export function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    // SECTIONS
    case AppActionsTypes.ADD_SECTION:
      const newSection: SectionData = {
        id: uuidv4(),
        title: 'New Section',
        tasks: []
      }
      return {
        ...state,
        sections: [...state.sections, newSection]
      }
    case AppActionsTypes.DELETE_SECTION:
      return {
        ...state,
        sections: state.sections.filter(
          (section) => section.id !== action.payload.id
        )
      }
    case AppActionsTypes.UPDATE_SECTION:
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              ...action.payload.section
            }
          }
          return section
        })
      }
    case AppActionsTypes.REORDER_SECTION:
      return {
        ...state,
        sections: action.payload.sections
      }

    // TASKS
    case AppActionsTypes.ADD_TASK:
      const newTask: TaskData = {
        id: uuidv4(),
        description: action.payload.description,
        completed: false,
        startDate: null,
        finishDate: null,
        timeSpent: 0,
        createdDate: new Date()
      }

      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: [...section.tasks, newTask]
            }
          }
          return section
        })
      }
    case AppActionsTypes.UPDATE_TASK:
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: section.tasks.map((task) => {
                if (task.id === action.payload.task.id) {
                  return {
                    ...task,
                    ...action.payload.task
                  }
                }
                return task
              })
            }
          }
          return section
        })
      }
    case AppActionsTypes.DELETE_TASK:
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: section.tasks.filter(
                (task) => task.id !== action.payload.id
              )
            }
          }
          return section
        })
      }
    case AppActionsTypes.REORDER_TASKS:
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: action.payload.tasks
            }
          }

          return section
        })
      }
    case AppActionsTypes.START_TIMER:
      const activeTask = action.payload.section.tasks.find(
        (task) => task.id === action.payload.id
      )

      return {
        ...state,
        activeTask,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: section.tasks.map((task) => {
                if (task.id === action.payload.id) {
                  return {
                    ...task,
                    startDate: new Date(),
                    timeSpent: action.payload.timeSpent
                  }
                }
                return task
              })
            }
          }
          return section
        })
      }
    case AppActionsTypes.STOP_TIMER:
      return {
        ...state,
        activeTask: null,
        sections: state.sections.map((section) => {
          if (section.id === action.payload.section.id) {
            return {
              ...section,
              tasks: section.tasks.map((task) => {
                if (task.id === action.payload.id && task.startDate !== null) {
                  const finishDate = new Date()
                  const timeSpent = differenceInSeconds(
                    finishDate,
                    task.startDate
                  )

                  return {
                    ...task,
                    startDate: null,
                    finishDate,
                    timeSpent: task.timeSpent + timeSpent
                  }
                }
                return task
              })
            }
          }
          return section
        })
      }
    default:
      return state
  }
}
