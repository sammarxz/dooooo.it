import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import {
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box
} from '@chakra-ui/react'
import EmojiPicker, {
  type EmojiClickData,
  Emoji,
  EmojiStyle
} from 'emoji-picker-react'

import { useAppContext } from '@/hooks'

import { type ProjectData, addProject } from '@/store/project'
import { updateProject } from '@/store/project/project.helpers'

const AddProjectValidationSchema = zod.object({
  title: zod.string().min(1, 'Enter project name').max(20)
})

type ProjectFormData = zod.infer<typeof AddProjectValidationSchema>

interface AddProjectProps {
  project?: ProjectData
  onClose: () => void
}

export function AddProject({ project, onClose }: AddProjectProps) {
  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm<ProjectFormData>({
    mode: 'onBlur',
    resolver: zodResolver(AddProjectValidationSchema),
    defaultValues: {
      title: project?.title ?? ''
    }
  })
  const [selectedEmoji, setSelectedEmoji] = useState(
    project ? project.emoji : '1f4bb'
  ) // 💻
  const { dispatch } = useAppContext()

  function handleAddProject(data: ProjectFormData) {
    const newProject = {
      emoji: selectedEmoji,
      ...data
    }

    dispatch(addProject(newProject))
  }

  function handleUpdateProject(project: ProjectData, data: ProjectFormData) {
    dispatch(
      updateProject({
        ...project,
        title: data.title,
        emoji: selectedEmoji
      })
    )
  }

  function handleProjectSubmit(data: ProjectFormData) {
    if (isValid) {
      if (project) {
        handleUpdateProject(project, data)
        onClose()
        return
      }

      console.log(data)
      handleAddProject(data)
      onClose()
    }
  }

  function handleEmojiClick(emojiData: EmojiClickData) {
    setSelectedEmoji(emojiData.unified)
  }

  return (
    <Flex alignItems="center" gap={2}>
      <Menu placement="bottom-start">
        <MenuButton>
          <Box
            as={Emoji}
            unified={selectedEmoji}
            size={18}
            display="flex"
            alignItems="center"
            justifyContent="center"
            emojiStyle={EmojiStyle.NATIVE}
          />
        </MenuButton>
        <MenuList p={0} border="none">
          <MenuItem p={0}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              emojiStyle={EmojiStyle.NATIVE}
              previewConfig={{
                defaultCaption: 'Pick an emoji for your project!'
              }}
            />
          </MenuItem>
        </MenuList>
      </Menu>
      <form onSubmit={handleSubmit(handleProjectSubmit)}>
        <Input
          placeholder="Project title"
          variant="unstyled"
          fontWeight="bold"
          autoFocus
          {...register('title')}
        />
      </form>
    </Flex>
  )
}
