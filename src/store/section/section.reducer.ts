import { v4 as uuidv4 } from 'uuid'

import { type AppActions } from '../app.reducer'
import { type AppState } from '../app.data'

import { SectionActionTypes, type SectionData } from '.'

export const sectionReducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case SectionActionTypes.ADD_SECTION:
      const newSection: SectionData = {
        id: uuidv4(),
        title: 'New Section',
        tasks: []
      }
      if (draft.activeProjectIndex !== undefined) {
        draft.projects[draft.activeProjectIndex].sections.push(newSection)
      }
      break
    case SectionActionTypes.UPDATE_SECTION:
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
    case SectionActionTypes.DELETE_SECTION:
      const { sectionId } = action.payload

      if (draft.activeProjectIndex !== undefined)
        draft.projects[draft.activeProjectIndex].sections = draft.projects[
          draft.activeProjectIndex
        ].sections.filter((section) => section.id !== sectionId)

      break
    default:
      break
  }
}
