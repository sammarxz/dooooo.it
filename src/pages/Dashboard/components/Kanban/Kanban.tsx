import {
  DragDropContext,
  Droppable,
  type DropResult
} from 'react-beautiful-dnd'
import { Flex, VStack } from '@chakra-ui/react'

import { useAppContext } from '@/hooks'

import { Task } from '..'

import { Column } from './components'

import { reorderTasks } from '@/store/task'

export function Kanban() {
  const {
    state: { projects, activeProjectIndex },
    dispatch
  } = useAppContext()

  function handleDragEnd(move: DropResult) {
    if (!move.destination) return
    dispatch(reorderTasks(move))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex gap={10} w="full">
        {projects[activeProjectIndex!].sections.map((section) => (
          <Column key={section.id} section={section}>
            <Column.Content>
              <Droppable droppableId={section.id}>
                {(provided) => (
                  <VStack
                    align="stretch"
                    spacing={3}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {section.tasks.map((task, index) => (
                      <Task
                        key={task.id}
                        task={task}
                        section={section}
                        index={index}
                        mode="kanban"
                      />
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </Column.Content>
          </Column>
        ))}
        {/* <AddSection /> */}
      </Flex>
    </DragDropContext>
  )
}
