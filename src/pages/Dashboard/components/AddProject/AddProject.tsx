import { useForm, Controller } from 'react-hook-form'
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
import { memo, useState } from 'react'
import { useAppContext } from '@/hooks'
import { addProject } from '@/store/project'

const AddProjectValidationSchema = zod.object({
  title: zod.string().min(1, 'Enter project name').max(20)
})

type AddSectionData = zod.infer<typeof AddProjectValidationSchema>

interface AddProjectProps {
  onClose: () => void
}

export const AddProject = memo(function AddProject({
  onClose
}: AddProjectProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<AddSectionData>({
    mode: 'onBlur',
    resolver: zodResolver(AddProjectValidationSchema),
    defaultValues: {
      title: ''
    }
  })
  const [selectedEmoji, setSelectedEmoji] = useState('1f4bb') // 💻
  const { dispatch } = useAppContext()

  function handleCreateNewProject(data: AddSectionData) {
    if (isValid) {
      const newProject = {
        emoji: selectedEmoji,
        ...data
      }

      dispatch(addProject(newProject))
      onClose()
    }
  }

  function handleEmojiClick(emojiData: EmojiClickData) {
    setSelectedEmoji(emojiData.unified)
  }

  function handleClose() {
    // onClose()
  }

  return (
    <Flex alignItems="center" gap={4}>
      <Menu placement="bottom-start">
        <MenuButton>
          <Box
            as={Emoji}
            unified={selectedEmoji}
            size={18}
            display="flex"
            alignItems="center"
            justifyContent="center"
            emojiStyle={EmojiStyle.GOOGLE}
          />
        </MenuButton>
        <MenuList p={0} border="none">
          <MenuItem p={0}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              emojiStyle={EmojiStyle.GOOGLE}
              previewConfig={{
                defaultCaption: 'Pick an emoji for your project!'
              }}
            />
          </MenuItem>
        </MenuList>
      </Menu>
      <form onSubmit={handleSubmit(handleCreateNewProject)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Project title"
              variant="unstyled"
              autoFocus
              {...field}
              onBlur={handleClose}
            />
          )}
        />
      </form>
    </Flex>
  )
})
