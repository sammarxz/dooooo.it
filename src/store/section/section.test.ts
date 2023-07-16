import { SectionActionTypes, sectionReducer, type SectionData } from '.'

import { type AppState } from '../app.data'
import { type AppActions } from '../app.reducer'

test('Add new section to a project', () => {
  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: []
      }
    ],
    activeProjectIndex: 0,
    viewMode: 'list'
  }

  const action: AppActions = {
    type: SectionActionTypes.ADD_SECTION
  }

  const nextState = { ...initialState }
  sectionReducer(nextState, action)

  expect(nextState.projects[0].sections).toHaveLength(1)
  expect(nextState.projects[0].sections[0].title).toBe('New Section')
})

test('Update an existing section', () => {
  const sectionToUpdate: SectionData = {
    id: 'section1',
    title: 'Section 1',
    tasks: []
  }

  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: [sectionToUpdate]
      }
    ],
    activeProjectIndex: 0,
    viewMode: 'list'
  }

  const updatedSection: SectionData = {
    ...sectionToUpdate,
    title: 'Updated Section'
  }

  const action: AppActions = {
    type: SectionActionTypes.UPDATE_SECTION,
    payload: {
      section: updatedSection
    }
  }

  const nextState = { ...initialState }
  sectionReducer(nextState, action)

  expect(nextState.projects[0].sections[0].title).toBe('Updated Section')
})

test('Delete a section from a project', () => {
  const sectionToDelete: SectionData = {
    id: 'section1',
    title: 'Section 1',
    tasks: []
  }

  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: [sectionToDelete]
      }
    ],
    activeProjectIndex: 0,
    viewMode: 'list'
  }

  const action: AppActions = {
    type: SectionActionTypes.DELETE_SECTION,
    payload: {
      sectionId: 'section1'
    }
  }

  const nextState = { ...initialState }
  sectionReducer(nextState, action)

  expect(nextState.projects[0].sections).toHaveLength(0)
})
