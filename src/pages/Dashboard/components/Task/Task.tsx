import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Checkbox,
  Stack,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { Reorder, useDragControls } from 'framer-motion'
import useSound from 'use-sound'
import { IoPlay, IoStop } from 'react-icons/io5'
import { LuGripVertical, LuMoreVertical, LuTrash } from 'react-icons/lu'

import { useTask, useTimer } from '@/hooks'

import {
  deleteTask,
  startTimer,
  stopTimer,
  updateTask
} from '@/store/task/reducers/actions'

import { type TaskData } from '@/store/task/reducers/reducers'

import { Time } from '@/components'

import startSfx from '@/assets/sounds/start.mp3'
import stopSfx from '@/assets/sounds/stop.mp3'
interface TaskProps {
  task: TaskData
}

export function Task({ task }: TaskProps) {
  const {
    state: { activeTask },
    dispatch
  } = useTask()

  const dragControls = useDragControls()

  const [playStartSound] = useSound(startSfx)
  const [playStopSound] = useSound(stopSfx)

  const { id, description, completed, timeSpent } = task

  const isActive = activeTask !== null && activeTask?.id === id

  const { passedTime } = useTimer(timeSpent, isActive)

  function handleToggle() {
    dispatch(
      updateTask({
        ...task,
        completed: !completed
      })
    )
  }

  function handleStartTimer() {
    dispatch(startTimer(id, passedTime))
    playStartSound()
  }

  function handleStopTimer() {
    dispatch(stopTimer(id))
    playStopSound()
  }

  function handleDeleteTask() {
    dispatch(deleteTask(id))
  }

  function handleUpdateTask(nextValue: string) {
    dispatch(
      updateTask({
        ...task,
        description: nextValue
      })
    )
  }

  return (
    <Flex
      as={Reorder.Item}
      value={task}
      id={task.id}
      dragListener={false}
      dragControls={dragControls}
      listStyleType="none"
      justifyContent="space-between"
      align="center"
      w="full"
      bg="white"
      py={2}
      borderBottom="1px"
      borderColor="gray.100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex>
        <IconButton
          icon={<LuGripVertical />}
          aria-label="reorder task"
          variant="unstyled"
          fontSize="lg"
          color="gray.300"
          cursor="grab"
          display="flex"
          justifyContent="flex-start"
          onPointerDown={(event) => {
            dragControls.start(event)
          }}
        />
        <Stack direction="row" spacing={4} align="center">
          <Checkbox
            colorScheme="brand"
            size="lg"
            isChecked={completed}
            onChange={handleToggle}
          />
          <Editable
            defaultValue={description}
            onSubmit={handleUpdateTask}
            fontSize="lg"
          >
            <EditablePreview fontWeight="medium" />
            <Input
              as={EditableInput}
              variant="unstyled"
              boxShadow="none"
              outline="none"
              size="lg"
              _focus={{
                outline: 'none',
                boxShadow: 'none'
              }}
            />
          </Editable>
        </Stack>
      </Flex>
      <Stack direction="row" align="center" gap={4}>
        <Time time={passedTime} isActive={isActive} />
        {isActive ? (
          <IconButton
            icon={<IoStop />}
            rounded="full"
            fontSize="md"
            aria-label="stop task"
            colorScheme="brand"
            onClick={handleStopTimer}
          />
        ) : (
          <IconButton
            icon={<IoPlay />}
            rounded="full"
            fontSize="md"
            aria-label="play task"
            colorScheme="blackAlpha"
            opacity={0.5}
            onClick={handleStartTimer}
          />
        )}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<LuMoreVertical />}
            variant="unstyled"
            fontSize="lg"
            size="sm"
            color="gray.400"
          />
          <MenuList minW="0" maxW={160}>
            <MenuItem icon={<LuTrash />} onClick={handleDeleteTask}>
              Delete Task
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  )
}
