import { type SectionData } from './section.data'

export enum SectionActionTypes {
  ADD_SECTION = 'ADD_SECTION',
  UPDATE_SECTION = 'UPDATE_SECTION',
  DELETE_SECTION = 'DELETE_SECTION',
  REORDER_SECTION = 'REORDER_SECTION'
}

export interface AddSectionAction {
  type: SectionActionTypes.ADD_SECTION
}

export interface UpdateSectionAction {
  type: SectionActionTypes.UPDATE_SECTION
  payload: {
    section: SectionData
  }
}

export interface DeleteSectionAction {
  type: SectionActionTypes.DELETE_SECTION
  payload: {
    sectionId: string
  }
}

export interface ReorderSectionAction {
  type: SectionActionTypes.REORDER_SECTION
  payload: {
    sections: SectionData[]
  }
}

export type SectionActions =
  | AddSectionAction
  | UpdateSectionAction
  | DeleteSectionAction
  | ReorderSectionAction
