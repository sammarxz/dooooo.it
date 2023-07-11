import { type SectionData } from '.'

import {
  type DeleteSectionAction,
  type ReorderSectionAction,
  type UpdateSectionAction,
  type AddSectionAction,
  SectionActionTypes
} from './section.actions'

export function addSection(): AddSectionAction {
  return {
    type: SectionActionTypes.ADD_SECTION
  }
}

export function updateSection(section: SectionData): UpdateSectionAction {
  return {
    type: SectionActionTypes.UPDATE_SECTION,
    payload: {
      section
    }
  }
}

export function deleteSection(id: string): DeleteSectionAction {
  return {
    type: SectionActionTypes.DELETE_SECTION,
    payload: {
      id
    }
  }
}

export function reorderSection(sections: SectionData[]): ReorderSectionAction {
  return {
    type: SectionActionTypes.REORDER_SECTION,
    payload: {
      sections
    }
  }
}
