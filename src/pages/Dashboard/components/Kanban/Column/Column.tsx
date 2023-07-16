import { Stack, Box, Heading, Flex, Text, IconButton } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'

import { type SectionData } from '@/store/section'
import { useAppContext } from '@/hooks'
import { addTask } from '@/store/task'

function ColumnContent({ children }: { children: React.ReactNode }) {
  return <Box>{children}</Box>
}

interface ColumnProps {
  section: SectionData
  children: React.ReactNode
}

export function Column({ section, children }: ColumnProps) {
  const { dispatch } = useAppContext()

  function handleAddTask() {
    dispatch(
      addTask({
        description: 'New Task',
        section
      })
    )
  }

  return (
    <Stack as="section" spacing={2} w="full" flex={1}>
      <Flex align="center" justifyContent="space-between">
        <Flex gap={2} align="center">
          <Heading as="h2" fontWeight="bold" fontSize="md">
            {section.title}
          </Heading>
          <Text textColor="gray.400">({section.tasks.length})</Text>
        </Flex>
        <IconButton
          icon={<LuPlus />}
          aria-label="add task"
          size="sm"
          variant="ghost"
          onClick={handleAddTask}
        />
      </Flex>
      {children}
    </Stack>
  )
}

Column.Content = ColumnContent
