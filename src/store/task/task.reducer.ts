import { v4 as uuidv4 } from 'uuid'

import { type AppActions } from '../app.reducer'
import { type AppState } from '../app.data'

import { TaskActionTypes, type TaskData } from '.'

export const taskReducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      const newTask: TaskData = {
        id: uuidv4(),
        description: action.payload.description,
        completed: false,
        startDate: null,
        finishDate: null,
        timeSpent: 0,
        createdDate: new Date()
      }

      if (draft.activeProjectIndex !== undefined) {
        const sectionIndex = draft.projects[
          draft.activeProjectIndex
        ].sections.findIndex((s) => s.id === action.payload.section.id)

        if (sectionIndex !== -1) {
          draft.projects[draft.activeProjectIndex].sections[
            sectionIndex
          ].tasks.push(newTask)
        }
      }
      break
    case TaskActionTypes.DELETE_TASK:
      if (draft.activeProjectIndex !== undefined) {
        const sectionIndex = draft.projects[
          draft.activeProjectIndex
        ].sections.findIndex((s) => s.id === action.payload.sectionId)

        const updatedTasks = draft.projects[draft.activeProjectIndex].sections[
          sectionIndex
        ].tasks.filter((task) => task.id !== action.payload.id)

        draft.projects[draft.activeProjectIndex].sections[sectionIndex].tasks =
          updatedTasks
      }
      break
    case TaskActionTypes.UPDATE_TASK:
      if (draft.activeProjectIndex !== undefined) {
        const index = draft.projects[
          draft.activeProjectIndex
        ].sections.findIndex((s) => s.id === action.payload.sectionId)

        if (index !== -1) {
          const taskIndex = draft.projects[draft.activeProjectIndex].sections[
            index
          ].tasks.findIndex((task) => task.id === action.payload.task.id)

          if (taskIndex !== -1) {
            draft.projects[draft.activeProjectIndex].sections[index].tasks[
              taskIndex
            ] = action.payload.task
          }
        }
      }
      break
    case TaskActionTypes.SET_ACTIVE_TASK:
      if (action.payload.task) {
        draft.activeTask = action.payload.task
      } else {
        draft.activeTask = undefined
      }
      break
    default:
      break
  }
}
