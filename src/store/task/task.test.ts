import { TaskActionTypes, type TaskData, taskReducer } from '.'
import { type AppState, type AppActions } from '../app.reducer'

test('Add new task to a section', () => {
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
          }
        ]
      }
    ],
    activeProjectIndex: 0
  }

  const action: AppActions = {
    type: TaskActionTypes.ADD_TASK,
    payload: {
      description: 'New Task',
      section: { id: 'section1', title: 'Section 1', tasks: [] }
    }
  }

  const nextState = { ...initialState }
  taskReducer(nextState, action)

  expect(nextState.projects[0].sections[0].tasks).toHaveLength(1)
  expect(nextState.projects[0].sections[0].tasks[0].description).toBe(
    'New Task'
  )
})

test('Delete a task from a section', () => {
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
            tasks: [
              {
                id: 'task1',
                description: 'Task 1',
                completed: false,
                startDate: null,
                finishDate: null,
                timeSpent: 0,
                createdDate: new Date()
              }
            ]
          }
        ]
      }
    ],
    activeProjectIndex: 0
  }

  const action: AppActions = {
    type: TaskActionTypes.DELETE_TASK,
    payload: {
      id: 'task1',
      sectionId: 'section1'
    }
  }

  const nextState = { ...initialState }
  taskReducer(nextState, action)

  expect(nextState.projects[0].sections[0].tasks).toHaveLength(0)
})

test('Update a task in a section', () => {
  const taskToUpdate: TaskData = {
    id: 'task1',
    description: 'Task 1',
    completed: false,
    startDate: null,
    finishDate: null,
    timeSpent: 0,
    createdDate: new Date()
  }

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
            tasks: [taskToUpdate]
          }
        ]
      }
    ],
    activeProjectIndex: 0
  }

  const updatedTask: TaskData = {
    ...taskToUpdate,
    description: 'Updated Task'
  }

  const action: AppActions = {
    type: TaskActionTypes.UPDATE_TASK,
    payload: {
      task: updatedTask,
      sectionId: 'section1'
    }
  }

  const nextState = { ...initialState }
  taskReducer(nextState, action)

  expect(nextState.projects[0].sections[0].tasks[0].description).toBe(
    'Updated Task'
  )
})

test('Set active task', () => {
  const taskToSetActive: TaskData = {
    id: 'task1',
    description: 'Task 1',
    completed: false,
    startDate: null,
    finishDate: null,
    timeSpent: 0,
    createdDate: new Date()
  }

  const initialState: AppState = {
    projects: [],
    activeTask: undefined
  }

  const action: AppActions = {
    type: TaskActionTypes.SET_ACTIVE_TASK,
    payload: {
      task: taskToSetActive
    }
  }

  const nextState = { ...initialState }
  taskReducer(nextState, action)

  expect(nextState.activeTask).toBe(taskToSetActive)
})
