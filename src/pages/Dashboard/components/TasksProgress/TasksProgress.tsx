import { Stack, Flex, Text } from '@chakra-ui/react'

import { getTasksCount } from '../../utils'

import { type ProjectData } from '@/store/project'

import { MotionProgress } from '@/components'

interface TaskProgresProps {
  project: ProjectData
}

export function TasksProgress({ project }: TaskProgresProps) {
  return (
    <Stack w="full" spacing={4}>
      <MotionProgress value={getTasksCount(project)} />
      <Flex justifyContent="space-between">
        <Text color="gray.400" fontWeight="semibold">
          Progress
        </Text>
        <Text color="gray.400" display="flex" gap={1}>
          <Text as="span" fontWeight="semibold">
            {getTasksCount(project)}%
          </Text>
          <Text>of completed tasks</Text>
        </Text>
      </Flex>
    </Stack>
  )
}
