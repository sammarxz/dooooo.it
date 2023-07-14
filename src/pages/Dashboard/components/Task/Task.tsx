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
  MenuList,
  useDisclosure,
  Button,
  Text
} from '@chakra-ui/react'
import useSound from 'use-sound'
import { IoPlay, IoStop } from 'react-icons/io5'
import { LuGripVertical, LuMoreVertical, LuTrash } from 'react-icons/lu'
import { differenceInSeconds } from 'date-fns'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

import { useAppContext, useTimer } from '@/hooks'

import { deleteTask, updateTask, setActiveTask } from '@/store/task'

import { type TaskData } from '@/store/task'
import { type SectionData } from '@/store/section'

import { CustomModal, Time } from '@/components'

import startSfx from '@/assets/sounds/start.mp3'
import stopSfx from '@/assets/sounds/stop.mp3'
interface TaskProps {
  section: SectionData
  task: TaskData
}

export function Task({ section, task }: TaskProps) {
  const {
    state: { activeTask },
    dispatch
  } = useAppContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [playStartSound] = useSound(startSfx)
  const [playStopSound] = useSound(stopSfx)

  const { id, description, completed, timeSpent } = task

  const isActive = activeTask !== null && activeTask?.id === id

  const { passedTime } = useTimer(timeSpent, isActive)

  function handleToggle() {
    dispatch(
      updateTask(section.id, {
        ...task,
        completed: !completed
      })
    )
  }

  function handleStartTimer() {
    dispatch(
      updateTask(section.id, {
        ...task,
        startDate: new Date(),
        timeSpent: passedTime
      })
    )

    dispatch(setActiveTask(task))

    playStartSound()
  }

  function handleStopTimer() {
    if (task.startDate !== null) {
      const finishDate = new Date()
      const timeSpent = differenceInSeconds(finishDate, task.startDate)

      dispatch(
        updateTask(section.id, {
          ...task,
          startDate: null,
          finishDate,
          timeSpent: task.timeSpent + timeSpent
        })
      )
    }

    dispatch(setActiveTask())

    playStopSound()
  }

  function handleDeleteTask() {
    dispatch(deleteTask(section.id, id))
    onClose()
  }

  function handleUpdateTask(nextValue: string) {
    dispatch(
      updateTask(section.id, {
        ...task,
        description: nextValue
      })
    )
  }

  function renderTimerButtons() {
    if (isActive) {
      return (
        <IconButton
          as={motion.button}
          icon={<IoStop color="white" />}
          rounded="full"
          fontSize={['sm', 'md']}
          aria-label="stop task"
          bg="brand.500"
          _hover={{
            bg: 'brand.600'
          }}
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.05,
              type: 'spring',
              stiffness: 100
            }
          }}
          whileTap={{
            scale: 1
          }}
          onClick={handleStopTimer}
        />
      )
    }

    return (
      <IconButton
        as={motion.button}
        icon={<IoPlay color="white" />}
        rounded="full"
        fontSize="md"
        aria-label="play task"
        bg="gray.100"
        _hover={{
          bg: 'brand.500'
        }}
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 0.05,
            type: 'spring',
            stiffness: 100
          }
        }}
        whileTap={{
          scale: 1
        }}
        onClick={handleStartTimer}
      />
    )
  }

  return (
    <>
      <Flex
        id={task.id}
        listStyleType="none"
        justifyContent="space-between"
        align="center"
        w="full"
        bg="white"
        py={[2, 4]}
        borderBottom="1px"
        borderColor="gray.100"
      >
        <Flex>
          <IconButton
            icon={<LuGripVertical />}
            aria-label="reorder task"
            variant="unstyled"
            fontSize={['md', 'lg']}
            color="gray.400"
            cursor="grab"
            display="flex"
            justifyContent="flex-start"
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
              fontSize={['md', 'lg']}
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
        <Stack direction="row" gap={4} align="center">
          <LayoutGroup>
            <motion.div key={'s'}>
              <Time time={passedTime} isActive={isActive} />
            </motion.div>
            <AnimatePresence initial={false}>
              {!task.completed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  {renderTimerButtons()}
                </motion.div>
              ) : null}
            </AnimatePresence>
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
                <MenuItem icon={<LuTrash />} onClick={onOpen}>
                  Delete Task
                </MenuItem>
              </MenuList>
            </Menu>
          </LayoutGroup>
        </Stack>
      </Flex>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <CustomModal.Header>Confirm Delete</CustomModal.Header>
        <CustomModal.Body>
          <Text>
            Are you sure you want to delete task: <strong>{description}</strong>
            ?
          </Text>
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDeleteTask}>
            Delete
          </Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  )
}
