import { v4 as uuidv4 } from 'uuid'
import { differenceInSeconds } from 'date-fns'
import { produce } from 'immer'

import { type SectionData, type SectionActions } from './section'
import { type TaskData, type TaskActions } from './task'
import { type ProjectActions, type ProjectData } from './project'

import { AppActionsTypes } from './app.actions'

export type AppActions = SectionActions | TaskActions | ProjectActions

export interface AppState {
  projects: ProjectData[]
  activeTask?: TaskData | null | undefined
  activeProject?: ProjectData | null | undefined
}

function updateSectionInState(
  state: AppState,
  updatedSection: SectionData
): AppState {
  return produce(state, (draftState) => {
    const sectionIndex = draftState.projects
      .flatMap((project) => project.sections)
      .findIndex((section) => section.id === updatedSection.id)

    if (sectionIndex !== -1) {
      const projectIndex = draftState.projects.findIndex((project) =>
        project.sections.some((section) => section.id === updatedSection.id)
      )
      draftState.projects[projectIndex].sections[sectionIndex] = updatedSection
    }
  })
}

// TODO: improve abstraction by creating helper functions in their place
export function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    // PROJECTS
    case AppActionsTypes.ADD_PROJECT:
      const newProject = {
        id: uuidv4(),
        title: action.payload.title,
        sections: []
      }
      return produce(state, (draft) => {
        draft.projects.push(newProject)
        draft.activeProject = newProject
      })
    case AppActionsTypes.UPDATE_PROJECT:
      const { project } = action.payload

      return produce(state, (draft) => {
        const projectIndex = draft.projects.findIndex(
          (p) => p.id === project.id
        )
        if (projectIndex !== -1) {
          draft.projects[projectIndex] = project
        }
      })
    case AppActionsTypes.DELETE_PROJECT:
      return produce(state, (draft) => {
        draft.projects = draft.projects.filter((p) => p.id === project.id)
        if (
          draft.activeProject &&
          draft.activeProject.id === action.payload.id
        ) {
          draft.activeProject = null
        }
      })
    case AppActionsTypes.SET_ACTIVE_PROJECT:
      return produce(state, (draft) => {
        draft.activeProject = action.payload.project
      })

    // SECTIONS
    case AppActionsTypes.ADD_SECTION:
      const newSection: SectionData = {
        id: uuidv4(),
        title: 'New Section',
        tasks: []
      }
      return produce(state, (draft) => {
        if (draft.activeProject) {
          draft.activeProject.sections.push(newSection)
          // draft.projects[draft.activeProject.id]
        }
      })
    case AppActionsTypes.DELETE_SECTION:
      return produce(state, (draft) => {
        const projectIndex = draft.projects.findIndex((project) => {
          return project.sections.some(
            (section) => section.id === action.payload.id
          )
        })

        if (projectIndex !== -1) {
          const sectionIndex = draft.projects[projectIndex].sections.findIndex(
            (section) => section.id === action.payload.id
          )

          if (sectionIndex !== -1) {
            draft.projects[projectIndex].sections.splice(sectionIndex, 1)
          }
        }
      })
    case AppActionsTypes.UPDATE_SECTION:
      return produce(state, (draft) => {
        const updatedSection = action.payload.section
        draft = updateSectionInState(draft, updatedSection)
      })
    case AppActionsTypes.REORDER_SECTION:
      return produce(state, (draft) => {
        if (draft.activeProject) {
          draft.activeProject.sections = action.payload.sections
        }
      })

    // TASKS
    case AppActionsTypes.ADD_TASK:
      const newTask: TaskData = {
        id: uuidv4(),
        description: action.payload.description,
        completed: false,
        startDate: null,
        finishDate: null,
        timeSpent: 0,
        createdDate: new Date()
      }

      return produce(state, (draft) => {
        if (draft.activeProject) {
          const sectionIndex = draft.activeProject.sections.findIndex(
            (section) => section.id === action.payload.section.id
          )

          if (sectionIndex !== -1) {
            draft.activeProject.sections[sectionIndex].tasks.push(newTask)
          }
        }
      })
    case AppActionsTypes.UPDATE_TASK:
      return produce(state, (draft) => {
        const { section, task } = action.payload

        draft = updateSectionInState(draft, section)
        const updatedSection = draft.projects
          .flatMap((project) => project.sections)
          .find((s) => s.id === section.id)

        if (updatedSection) {
          const taskIndex = updatedSection.tasks.findIndex(
            (t) => t.id === task.id
          )

          if (taskIndex !== -1) {
            updatedSection.tasks[taskIndex] = task
          }
        }
      })
    case AppActionsTypes.DELETE_TASK:
      return produce(state, (draft) => {
        const sectionIndex = draft.projects
          .flatMap((project) => project.sections)
          .findIndex((section) => section.id === action.payload.section.id)

        if (sectionIndex !== -1) {
          const taskIndex = draft.projects[sectionIndex].sections[
            sectionIndex
          ].tasks.findIndex((t) => t.id === action.payload.id)

          if (taskIndex !== -1) {
            draft.projects[sectionIndex].sections[sectionIndex].tasks.splice(
              taskIndex,
              1
            )
          }
        }
      })
    case AppActionsTypes.REORDER_TASKS:
      return produce(state, (draft) => {
        const { section, tasks } = action.payload

        draft = updateSectionInState(draft, section)
        const updatedSection = draft.projects
          .flatMap((project) => project.sections)
          .find((s) => s.id === section.id)

        if (updatedSection) {
          updatedSection.tasks = tasks
        }
      })
    case AppActionsTypes.START_TIMER:
      const { taskId, sectionId, timeSpent } = action.payload
      return produce(state, (draft) => {
        const projectIndex = draft.projects.findIndex(
          (project) => project.id === state.activeProject?.id
        )
        if (projectIndex !== -1) {
          const sectionIndex = draft.projects[projectIndex].sections.findIndex(
            (section) => section.id === sectionId
          )
          if (sectionIndex !== -1) {
            const taskIndex = draft.projects[projectIndex].sections[
              sectionIndex
            ].tasks.findIndex((task) => task.id === taskId)
            if (taskIndex !== -1) {
              draft.projects[projectIndex].sections[sectionIndex].tasks[
                taskIndex
              ] = {
                ...draft.projects[projectIndex].sections[sectionIndex].tasks[
                  taskIndex
                ],
                startDate: new Date(),
                timeSpent
              }
              draft.activeTask =
                draft.projects[projectIndex].sections[sectionIndex].tasks[
                  taskIndex
                ]
            }
          }
        }
      })
    case AppActionsTypes.STOP_TIMER:
      return produce(state, (draft) => {
        const sectionIndex = draft.projects
          .flatMap((project) => project.sections)
          .findIndex((section) => section.id === action.payload.section.id)

        if (sectionIndex !== -1) {
          const taskIndex = draft.projects[sectionIndex].sections[
            sectionIndex
          ].tasks.findIndex((task) => task.id === action.payload.id)

          if (
            taskIndex !== -1 &&
            draft.projects[sectionIndex].sections[sectionIndex].tasks[taskIndex]
              .startDate !== null
          ) {
            const finishDate = new Date()
            const timeSpent = differenceInSeconds(
              finishDate,
              draft.projects[sectionIndex].sections[sectionIndex].tasks[
                taskIndex
              ].startDate as Date
            )

            draft.projects[sectionIndex].sections[sectionIndex].tasks[
              taskIndex
            ] = {
              ...draft.projects[sectionIndex].sections[sectionIndex].tasks[
                taskIndex
              ],
              startDate: null,
              finishDate,
              timeSpent:
                draft.projects[sectionIndex].sections[sectionIndex].tasks[
                  taskIndex
                ].timeSpent + timeSpent
            }
          }
        }
      })
    default:
      return state
  }
}
