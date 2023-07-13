import { v4 as uuidv4 } from 'uuid'
import { produce } from 'immer'

import { type SectionData, type SectionActions } from './section'
import { type TaskData, type TaskActions } from './task'
import { type ProjectActions, type ProjectData } from './project'

import { AppActionsTypes } from './app.actions'

export type AppActions = SectionActions | TaskActions | ProjectActions

export interface AppState {
  projects: ProjectData[]
  activeProjectIndex?: number
  activeTask?: TaskData
}

export const appReducer = produce((draft: AppState, action: AppActions) => {
  switch (action.type) {
    case AppActionsTypes.ADD_PROJECT:
      const newProject: ProjectData = {
        id: uuidv4(),
        title: action.payload.title,
        sections: []
      }

      draft.projects.push(newProject)

      const projectIndex = draft.projects.findIndex(
        (project) => project.id === newProject.id
      )

      draft.activeProjectIndex = projectIndex
      break
    case AppActionsTypes.UPDATE_PROJECT: {
      if (draft.activeProjectIndex !== undefined)
        draft.projects[draft.activeProjectIndex] = {
          ...draft.projects[draft.activeProjectIndex],
          ...action.payload.project
        }
      break
    }
    case AppActionsTypes.DELETE_PROJECT:
      draft.projects = draft.projects.filter(
        (project) => project.id !== action.payload.id
      )
      break
    case AppActionsTypes.SET_ACTIVE_PROJECT:
      draft.activeProjectIndex = draft.projects.findIndex(
        (project) => project.id === action.payload.project.id
      )
      draft.activeTask = undefined
      break
    case AppActionsTypes.ADD_SECTION:
      const newSection: SectionData = {
        id: uuidv4(),
        title: 'New Section',
        tasks: []
      }
      if (draft.activeProjectIndex !== undefined)
        draft.projects[draft.activeProjectIndex].sections.push(newSection)
      break
    case AppActionsTypes.UPDATE_SECTION:
      const { section } = action.payload

      if (draft.activeProjectIndex !== undefined) {
        const sectionIndex = draft.projects[
          draft.activeProjectIndex
        ].sections.findIndex((s) => s.id === section.id)

        if (sectionIndex !== -1) {
          draft.projects[draft.activeProjectIndex].sections[sectionIndex] = {
            ...draft.projects[draft.activeProjectIndex].sections[sectionIndex],
            ...section
          }
        }
      }

      break
    case AppActionsTypes.DELETE_SECTION:
      const { sectionId } = action.payload

      if (draft.activeProjectIndex !== undefined)
        draft.projects[draft.activeProjectIndex].sections = draft.projects[
          draft.activeProjectIndex
        ].sections.filter((section) => section.id !== sectionId)

      break
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
    case AppActionsTypes.UPDATE_TASK:
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
    case AppActionsTypes.DELETE_TASK:
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
    case AppActionsTypes.SET_ACTIVE_TASK:
      if (action.payload.task) {
        draft.activeTask = action.payload.task
      } else {
        draft.activeTask = undefined
      }
      break
    default:
      return draft
  }
})
