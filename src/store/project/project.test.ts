import { ProjectActionTypes, projectReducer } from '.'
import { type AppState } from '../app.data'
import { type AppActions } from '../app.reducer'

// Test to add a new project
test('Add new project', () => {
  const initialState: AppState = {
    projects: [],
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ProjectActionTypes.ADD_PROJECT,
    payload: {
      title: 'New Project',
      emoji: '🚀'
    }
  }

  const nextState = { ...initialState }
  projectReducer(nextState, action)

  expect(nextState.projects).toHaveLength(1)
  expect(nextState.activeProjectIndex).toBe(0)
  expect(nextState.projects[0].title).toBe('New Project')
  expect(nextState.projects[0].emoji).toBe('🚀')
})

// Test to update an existing project
test('Update existing project', () => {
  const initialState: AppState = {
    projects: [
      {
        id: 'project_id',
        title: 'Old Project',
        emoji: '📁',
        sections: []
      }
    ],
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ProjectActionTypes.UPDATE_PROJECT,
    payload: {
      project: {
        id: 'project_id',
        title: 'Updated Project',
        emoji: '📝',
        sections: []
      }
    }
  }

  const nextState = { ...initialState }
  projectReducer(nextState, action)

  expect(nextState.projects[0].title).toBe('Updated Project')
  expect(nextState.projects[0].emoji).toBe('📝')
})

// Test to delete a project
test('Delete project', () => {
  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: []
      },
      {
        id: 'project2',
        title: 'Project 2',
        emoji: '✂️',
        sections: []
      }
    ],
    activeProjectIndex: 1,
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ProjectActionTypes.DELETE_PROJECT,
    payload: {
      id: 'project1'
    }
  }

  const nextState = { ...initialState }
  projectReducer(nextState, action)

  expect(nextState.projects).toHaveLength(1)
  expect(nextState.projects[0].id).toBe('project2')
  expect(nextState.activeProjectIndex).toBe(0)
})

// Test to set an active project
test('Set active project', () => {
  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: []
      },
      {
        id: 'project2',
        title: 'Project 2',
        emoji: '✂️',
        sections: []
      }
    ],
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ProjectActionTypes.SET_ACTIVE_PROJECT,
    payload: {
      project: {
        id: 'project2',
        title: 'Project 2',
        emoji: '✂️',
        sections: []
      }
    }
  }

  const nextState = { ...initialState }
  projectReducer(nextState, action)

  expect(nextState.activeProjectIndex).toBe(1)
})

// Test to delete the content of a project
test('Delete project content', () => {
  const initialState: AppState = {
    projects: [
      {
        id: 'project1',
        title: 'Project 1',
        emoji: '📋',
        sections: [
          {
            id: 'section1',
            title: 'Section 1',
            tasks: []
          },
          {
            id: 'section2',
            title: 'Section 2',
            tasks: []
          }
        ]
      }
    ],
    viewMode: 'list'
  }

  const action: AppActions = {
    type: ProjectActionTypes.DELETE_PROJECT_CONTENT,
    payload: {
      id: 'project1'
    }
  }

  const nextState = { ...initialState }
  projectReducer(nextState, action)

  expect(nextState.projects[0].sections).toHaveLength(0)
})
