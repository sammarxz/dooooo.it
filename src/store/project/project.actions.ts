import { type ProjectData } from './project.data'

export enum ProjectActionTypes {
  ADD_PROJECT = 'ADD_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT',
  DELETE_PROJECT_CONTENT = 'DELETE_PROJECT_CONTENT'
}

export interface AddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT
  payload: {
    title: string
    emoji: string
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

export interface DeleteProjectContentAction {
  type: ProjectActionTypes.DELETE_PROJECT_CONTENT
  payload: {
    id: string
  }
}

export type ProjectActions =
  | AddProjectAction
  | UpdateProjectAction
  | DeleteProjectAction
  | SetActiveProjectAction
  | DeleteProjectContentAction
