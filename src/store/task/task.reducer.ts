import { v4 as uuidv4 } from 'uuid'
import { type AppActions } from '../app.reducer'
import { type AppState } from '../app.data'
import { TaskActionTypes, type TaskData } from '.'

import { findIndexByProperty } from '@/utils'

export const taskReducer = (draft: AppState, action: AppActions) => {
  const { activeProjectIndex } = draft

  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      const newTask: TaskData = {
        id: uuidv4(),
        description: action.payload.description,
        completed: false,
        startDate: null,
        finishDate: null,
        timeSpent: 0,
        createdDate: new Date()
      }

      if (activeProjectIndex !== undefined) {
        const { section } = action.payload
        const sectionIndex = findIndexByProperty(
          draft.projects[activeProjectIndex].sections,
          'id',
          section.id
        )

        if (sectionIndex !== -1) {
          draft.projects[activeProjectIndex].sections[sectionIndex].tasks.push(
            newTask
          )
        }
      }
      break

    case TaskActionTypes.DELETE_TASK:
      if (activeProjectIndex !== undefined) {
        const { sectionId, id } = action.payload
        const sectionIndex = findIndexByProperty(
          draft.projects[activeProjectIndex].sections,
          'id',
          sectionId
        )

        if (sectionIndex !== -1) {
          const taskIndex = findIndexByProperty(
            draft.projects[activeProjectIndex].sections[sectionIndex].tasks,
            'id',
            id
          )

          if (taskIndex !== -1) {
            draft.projects[activeProjectIndex].sections[
              sectionIndex
            ].tasks.splice(taskIndex, 1)
          }
        }
      }
      break

    case TaskActionTypes.UPDATE_TASK:
      if (activeProjectIndex !== undefined) {
        const { sectionId, task } = action.payload
        const sectionIndex = findIndexByProperty(
          draft.projects[activeProjectIndex].sections,
          'id',
          sectionId
        )

        if (sectionIndex !== -1) {
          const taskIndex = findIndexByProperty(
            draft.projects[activeProjectIndex].sections[sectionIndex].tasks,
            'id',
            task.id
          )

          if (taskIndex !== -1) {
            draft.projects[activeProjectIndex].sections[sectionIndex].tasks[
              taskIndex
            ] = task
          }
        }
      }
      break

    case TaskActionTypes.SET_ACTIVE_TASK:
      draft.activeTask = action.payload.task ?? undefined
      break

    case TaskActionTypes.REORDER_TASKS:
      const { source, destination } = action.payload.move

      const activeProject = draft.projects[activeProjectIndex!]
      const sectionSourceIndex = findIndexByProperty(
        activeProject.sections,
        'id',
        source.droppableId
      )
      const sectionDestinationIndex = findIndexByProperty(
        activeProject.sections,
        'id',
        destination!.droppableId
      )

      if (sectionSourceIndex !== -1 && sectionDestinationIndex !== -1) {
        const [taskToMove] = activeProject.sections[
          sectionSourceIndex
        ].tasks.splice(source.index, 1)

        activeProject.sections[sectionDestinationIndex].tasks.splice(
          destination!.index,
          0,
          taskToMove
        )
      }
      break

    default:
      break
  }
}
