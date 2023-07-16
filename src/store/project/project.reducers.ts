import { v4 as uuidv4 } from 'uuid'

import { type AppActions } from '../app.reducer'
import { type AppState } from '../app.data'

import { ProjectActionTypes, type ProjectData } from './'
import { findIndexByProperty } from '@/utils'

export const projectReducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT: {
      const newProject: ProjectData = {
        id: uuidv4(),
        title: action.payload.title,
        emoji: action.payload.emoji,
        sections: []
      }

      draft.projects.push(newProject)

      const projectIndex = draft.projects.findIndex(
        (project) => project.id === newProject.id
      )

      draft.activeProjectIndex = projectIndex
      break
    }
    case ProjectActionTypes.UPDATE_PROJECT: {
      const projectIdx = draft.projects.findIndex(
        (project) => project.id === action.payload.project.id
      )

      draft.projects[projectIdx] = action.payload.project
      break
    }
    case ProjectActionTypes.DELETE_PROJECT: {
      draft.projects = draft.projects.filter(
        (project) => project.id !== action.payload.id
      )
      draft.activeProjectIndex =
        draft.projects.length > 0 ? draft.projects.length - 1 : undefined
      break
    }
    case ProjectActionTypes.SET_ACTIVE_PROJECT: {
      draft.activeProjectIndex = draft.projects.findIndex(
        (project) => project.id === action.payload.project.id
      )
      draft.activeTask = undefined
      break
    }
    case ProjectActionTypes.DELETE_PROJECT_CONTENT: {
      if (findIndexByProperty(draft.projects, 'id', action.payload.id) !== -1) {
        const index = findIndexByProperty(
          draft.projects,
          'id',
          action.payload.id
        )
        draft.projects[index].sections = []
        draft.activeTask = undefined
      }
      break
    }
    default:
      break
  }
}
