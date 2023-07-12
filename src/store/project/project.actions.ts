import { type ProjectData } from './project.data'

export enum ProjectActionTypes {
  ADD_PROJECT = 'ADD_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT'
}

export interface AddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT
  payload: {
    title: string
  }
}

export interface UpdateProjectAction {
  type: ProjectActionTypes.UPDATE_PROJECT
  payload: {
    project: ProjectData
  }
}

export interface DeleteProjectAction {
  type: ProjectActionTypes.DELETE_PROJECT
  payload: {
    id: string
  }
}

export interface SetActiveProjectAction {
  type: ProjectActionTypes.SET_ACTIVE_PROJECT
  payload: {
    project: ProjectData
  }
}

export type ProjectActions =
  | AddProjectAction
  | UpdateProjectAction
  | DeleteProjectAction
  | SetActiveProjectAction
