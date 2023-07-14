import { memo } from 'react'
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBoolean,
  useDisclosure
} from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'

import { setActiveProject, type ProjectData } from '@/store/project'

import { useAppContext } from '@/hooks'

import { isActiveProject } from '../../utils'

import * as S from './Project.styles'
import { LuMoreVertical, LuEdit3, LuEraser, LuTrash2 } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { AddProject } from '..'
import {
  deleteProject,
  deleteProjectContent
} from '@/store/project/project.helpers'
import { CustomModal } from '@/components'

interface ProjectProps {
  project: ProjectData
}

export const Project = memo(function Project({ project }: ProjectProps) {
  const { state, dispatch } = useAppContext()
  const [isEditing, setIsEditing] = useBoolean(false)
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()
  const {
    isOpen: isDeleteContentOpen,
    onOpen: onDeleteContentOpen,
    onClose: onDeleteContentClose
  } = useDisclosure()

  function handleSetActiveProject(project: ProjectData) {
    dispatch(setActiveProject(project))
  }

  function handleDeleteProject() {
    dispatch(deleteProject(project.id))
    onDeleteClose()
  }

  function handleDeleteProjectContent() {
    dispatch(deleteProjectContent(project.id))
    onDeleteContentClose()
  }

  const textProps = isActiveProject(
    state.projects,
    project,
    state.activeProjectIndex
  )
    ? {
        color: 'brand.900'
      }
    : {
        color: 'gray.400'
      }

  return (
    <S.Wrapper>
      <Flex
        className="project"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        {isEditing ? (
          <>
            <AddProject project={project} onClose={setIsEditing.off} />
          </>
        ) : (
          <>
            <Flex
              as={motion.div}
              gap={2}
              alignItems="center"
              flex={1}
              cursor="pointer"
              role="button"
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 1
              }}
              onClick={() => {
                handleSetActiveProject(project)
              }}
            >
              <Emoji
                unified={project.emoji}
                emojiStyle={EmojiStyle.NATIVE}
                size={18}
              />
              <Text fontWeight="bold" {...textProps}>
                {project.title}
              </Text>
            </Flex>
            <Menu>
              <MenuButton
                className="options"
                as={IconButton}
                aria-label="Options"
                icon={<LuMoreVertical />}
                variant="ghost"
                size="sm"
              />
              <MenuList className="menu" minW="0" maxW={200}>
                <MenuItem icon={<LuEdit3 />} onClick={setIsEditing.toggle}>
                  Edit
                </MenuItem>
                <MenuItem icon={<LuEraser />} onClick={onDeleteContentOpen}>
                  Remove all tasks
                </MenuItem>
                <MenuItem icon={<LuTrash2 />} onClick={onDeleteOpen}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
      <CustomModal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <CustomModal.Header>Confirm Delete</CustomModal.Header>
        <CustomModal.Body>
          <Text>
            Are you sure you want to delete project:{' '}
            <strong>{project.title}</strong>?
          </Text>
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button mr={3} onClick={onDeleteClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDeleteProject}>
            Delete
          </Button>
        </CustomModal.Footer>
      </CustomModal>
      <CustomModal isOpen={isDeleteContentOpen} onClose={onDeleteContentClose}>
        <CustomModal.Header>Confirm Delete</CustomModal.Header>
        <CustomModal.Body>
          <Text>
            Are you sure you want to delete all the content from project:{' '}
            <strong>{project.title}</strong>?
          </Text>
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button mr={3} onClick={onDeleteContentClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDeleteProjectContent}>
            Delete
          </Button>
        </CustomModal.Footer>
      </CustomModal>
    </S.Wrapper>
  )
})
