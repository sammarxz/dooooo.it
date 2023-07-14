import { v4 as uuidv4 } from 'uuid'

import { type AppActions, type AppState } from '../app.reducer'

import { ProjectActionTypes, type ProjectData } from '.'

export const projectReducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
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
    case ProjectActionTypes.UPDATE_PROJECT:
      if (draft.activeProjectIndex !== undefined)
        draft.projects[draft.activeProjectIndex] = {
          ...draft.projects[draft.activeProjectIndex],
          ...action.payload.project
        }
      break
    case ProjectActionTypes.DELETE_PROJECT:
      draft.projects = draft.projects.filter(
        (project) => project.id !== action.payload.id
      )
      break
    case ProjectActionTypes.SET_ACTIVE_PROJECT:
      draft.activeProjectIndex = draft.projects.findIndex(
        (project) => project.id === action.payload.project.id
      )
      draft.activeTask = undefined
      break
    default:
      break
  }
}
