import { Box, Flex, Stack, Heading, IconButton, Icon } from '@chakra-ui/react'
import { LuListChecks, LuColumns } from 'react-icons/lu'
import { Emoji, EmojiStyle } from 'emoji-picker-react'

import { useAppContext } from '@/hooks'

import { switchViewMode } from '@/store/view'

interface HeaderProps {
  title: string
  emoji: string
}

export function Header({ title, emoji }: HeaderProps) {
  const { state, dispatch } = useAppContext()

  function handleChangeViewMode(viewMode: 'list' | 'kanban') {
    dispatch(switchViewMode(viewMode))
  }

  return (
    <Box as="header" w="full">
      <Flex align="center" justify="space-between">
        <Stack direction="row" gap={4} alignItems="center">
          <Emoji unified={emoji} emojiStyle={EmojiStyle.NATIVE} />
          <Heading as="h1" size={['md', 'xl']} color="brand.500">
            {title}
          </Heading>
        </Stack>
        <Flex align="center">
          <IconButton
            icon={<Icon as={LuListChecks} />}
            aria-label="View tasks in List mode"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            color={state.viewMode === 'list' ? 'brand.900' : 'gray.300'}
            fontSize="xl"
            onClick={() => {
              handleChangeViewMode('list')
            }}
          />
          <IconButton
            icon={<Icon as={LuColumns} />}
            aria-label="View tasks in kanban mode"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            color={state.viewMode === 'kanban' ? 'brand.900' : 'gray.300'}
            fontSize="xl"
            onClick={() => {
              handleChangeViewMode('kanban')
            }}
          />
        </Flex>
      </Flex>
    </Box>
  )
}
