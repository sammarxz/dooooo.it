import { VStack, Button, AbsoluteCenter, Divider } from '@chakra-ui/react'

import { Header, NewTaskForm, Tasks } from './components'

export function Dashboard() {
  return (
    <VStack spacing={16} align="flex-start">
      <Header title="Project 1" />
      <VStack spacing={4} align="flex-start" w="full">
        <Tasks />
        <NewTaskForm />
      </VStack>
      <Button
        variant="untyled"
        position="relative"
        padding="10"
        w="full"
        fontWeight="regular"
        color="gray.400"
        _hover={{
          color: 'brand.500',
          borderColor: 'brand.500'
        }}
      >
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Add Section
        </AbsoluteCenter>
      </Button>
    </VStack>
  )
}
