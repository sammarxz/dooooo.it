import { type ProjectData } from '.'
import {
  type AddProjectAction,
  ProjectActionTypes,
  type SetActiveProjectAction,
  type UpdateProjectAction,
  type DeleteProjectAction,
  type DeleteProjectContentAction
} from './project.actions'

export function addProject({
  title,
  emoji
}: {
  title: string
  emoji: string
}): AddProjectAction {
  return {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: {
      title,
      emoji
    }
  }
}

export function setActiveProject(project: ProjectData): SetActiveProjectAction {
  return {
    type: ProjectActionTypes.SET_ACTIVE_PROJECT,
    payload: {
      project
    }
  }
}

export function updateProject(project: ProjectData): UpdateProjectAction {
  return {
    type: ProjectActionTypes.UPDATE_PROJECT,
    payload: {
      project
    }
  }
}

export function deleteProject(id: string): DeleteProjectAction {
  return {
    type: ProjectActionTypes.DELETE_PROJECT,
    payload: {
      id
    }
  }
}

export function deleteProjectContent(id: string): DeleteProjectContentAction {
  return {
    type: ProjectActionTypes.DELETE_PROJECT_CONTENT,
    payload: {
      id
    }
  }
}
