import { VStack } from '@chakra-ui/react'

import { Header, NewTaskForm, Tasks } from './components'

export function Dashboard() {
  return (
    <VStack spacing={16} align="flex-start">
      <Header title="Project 1" />
      <VStack spacing={4} align="flex-start" w="full">
        <Tasks />
        <NewTaskForm />
      </VStack>
    </VStack>
  )
}
