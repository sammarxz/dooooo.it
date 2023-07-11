import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  ButtonGroup,
  useEditableControls,
  Input,
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Reorder, AnimatePresence } from 'framer-motion'
import { LuEdit, LuCheck, LuX, LuTrash } from 'react-icons/lu'

import { useAppContext } from '@/hooks'

import { updateSection, type SectionData, deleteSection } from '@/store/section'
import { type TaskData, reorderTasks } from '@/store/task'

import { Task } from '../Task'
import { AddTask } from '../AddTask'

interface SectionProps {
  section: SectionData
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label=""
        icon={<LuCheck />}
        variant="unstyled"
        color="green.400"
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label=""
        icon={<LuX />}
        variant="unstyled"
        color="gray.400"
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label=""
        size="sm"
        icon={<LuEdit />}
        variant="unstyled"
        color="gray.400"
        {...getEditButtonProps()}
      />
    </Flex>
  )
}

export function Section({ section }: SectionProps) {
  const { dispatch } = useAppContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleReorder(tasks: TaskData[]) {
    dispatch(reorderTasks(section, tasks))
  }

  function handleUpdateSection(nextValue: string) {
    dispatch(
      updateSection({
        ...section,
        title: nextValue
      })
    )
  }

  function handleDeleteSection() {
    dispatch(deleteSection(section.id))
  }

  return (
    <>
      <VStack spacing={[2, 4]} align="flex-start" w="full">
        <Editable
          defaultValue={section.title}
          onSubmit={handleUpdateSection}
          fontSize={['lg', '3xl']}
          isPreviewFocusable={false}
          display="flex"
          flex={1}
          w="full"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
          startWithEditView={true}
        >
          <EditablePreview fontWeight="bold" color="brand.500" />
          <Input
            as={EditableInput}
            variant="unstyled"
            boxShadow="none"
            outline="none"
            fontSize={['lg', '3xl']}
            fontWeight="bold"
            textColor="brand.500"
            _focus={{
              outline: 'none',
              boxShadow: 'none'
            }}
          />
          <Flex gap={2}>
            <EditableControls />
            <IconButton
              aria-label=""
              icon={<LuTrash />}
              variant="unstyled"
              size="sm"
              color="gray.400"
              onClick={onOpen}
            />
          </Flex>
        </Editable>
        <Flex w="full" direction="column" gap={[2, 6]}>
          <Reorder.Group
            axis="y"
            onReorder={handleReorder}
            values={section.tasks}
          >
            <VStack
              as={AnimatePresence}
              initial={false}
              alignItems="flex-start"
              w="full"
            >
              {section.tasks.map((task) => (
                <Task key={task.id} section={section} task={task} />
              ))}
            </VStack>
          </Reorder.Group>
        </Flex>
        <AddTask section={section} />
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete section:{' '}
              <strong>{section.title}</strong>?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleDeleteSection}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
