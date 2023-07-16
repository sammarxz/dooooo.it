import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  VStack,
  Input,
  Button,
  Text,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react'
import { LuTrash } from 'react-icons/lu'

import { useAppContext } from '@/hooks'

import { updateSection, type SectionData, deleteSection } from '@/store/section'

import { Task } from '../Task'
import { AddTask } from '../AddTask'

import * as S from './Section.styles'
import { CustomModal } from '@/components'

interface SectionProps {
  section: SectionData
}

export function Section({ section }: SectionProps) {
  const { dispatch } = useAppContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    <S.Wrapper>
      <VStack spacing={4} align="flex-start" w="full">
        <Accordion
          reduceMotion
          allowMultiple
          defaultIndex={[0]}
          w="full"
          p={0}
          height="auto"
        >
          <AccordionItem id={section.id} border="none" alignItems="center">
            <Flex className="header" justifyContent="space-between" gap={4}>
              <Flex flex={1} alignItems="center" gap={2}>
                <AccordionButton
                  alignItems="center"
                  justifyContent="center"
                  w={4}
                  h={4}
                  p={0}
                  _hover={{ bg: 'none' }}
                >
                  <AccordionIcon color="brand.500" />
                </AccordionButton>
                <Editable
                  defaultValue={section.title}
                  onSubmit={handleUpdateSection}
                  px={2}
                  rounded="md"
                  fontWeight="bold"
                  color="brand.500"
                  // startWithEditView={true}
                  _hover={{
                    bg: 'gray.50'
                  }}
                  w="full"
                >
                  <EditablePreview fontSize={['md', 'lg']} w="full" />
                  <Input
                    as={EditableInput}
                    variant="unstyled"
                    boxShadow="none"
                    textColor="brand.500"
                    outline="none"
                    size="lg"
                    px={2}
                    w="full"
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                      bg: 'gray.50'
                    }}
                  />
                </Editable>
              </Flex>
              <Box className="options">
                <IconButton
                  aria-label="delete section"
                  icon={<LuTrash />}
                  variant="unstyled"
                  size="sm"
                  color="gray.400"
                  onClick={onOpen}
                />
              </Box>
            </Flex>
            <AccordionPanel p={0}>
              <Flex w="full" direction="column" gap={[2, 6]}>
                <VStack alignItems="flex-start" w="full">
                  {section.tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      section={section}
                      task={task}
                      index={index}
                      mode="list"
                    />
                  ))}
                </VStack>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <AddTask section={section} />
      </VStack>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <CustomModal.Header>Confirm Delete</CustomModal.Header>
        <CustomModal.Body>
          <Text>
            Are you sure you want to delete section:{' '}
            <strong>{section.title}</strong>?
          </Text>
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDeleteSection}>
            Delete
          </Button>
        </CustomModal.Footer>
      </CustomModal>
    </S.Wrapper>
  )
}
