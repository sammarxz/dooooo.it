import { Heading, Flex, IconButton, Icon, VStack } from '@chakra-ui/react'
import { FiColumns, FiList } from 'react-icons/fi'
import { AnimatePresence, Reorder } from 'framer-motion'

import { useTask } from '@/hooks'

import { reorderTasks } from '@/store/task/reducers/actions'
import { type TaskData } from '@/store/task/reducers'

import { Task } from '../Task'

export function Tasks() {
  const {
    state: { tasks },
    dispatch
  } = useTask()

  function handleReorder(tasks: TaskData[]) {
    dispatch(reorderTasks(tasks))
  }

  return (
    <Flex w="full" direction="column" gap={6}>
      <Flex align="center" justifyContent="space-between">
        <Heading as="h2" size="lg" fontWeight="bold" color="brand.500">
          Tasks
        </Heading>
        <Flex align="center">
          <IconButton
            icon={<Icon as={FiColumns} />}
            aria-label="View tasks in column mode"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            color="gray.300"
            fontSize="xl"
          />
          <IconButton
            icon={<Icon as={FiList} />}
            aria-label="View tasks in List mode"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            fontSize="xl"
          />
        </Flex>
      </Flex>
      <Reorder.Group axis="y" onReorder={handleReorder} values={tasks}>
        <VStack
          as={AnimatePresence}
          initial={false}
          alignItems="flex-start"
          w="full"
        >
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </VStack>
      </Reorder.Group>
    </Flex>
  )
}
