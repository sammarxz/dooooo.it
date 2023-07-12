import { type ProjectData } from '.'
import {
  type AddProjectAction,
  ProjectActionTypes,
  type SetActiveProjectAction
} from './project.actions'

export function addProject({ title }: { title: string }): AddProjectAction {
  return {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: {
      title
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
