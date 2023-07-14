import { Box, Flex, Stack, Heading, IconButton, Icon } from '@chakra-ui/react'
import { LuListChecks, LuColumns } from 'react-icons/lu'
import { Emoji, EmojiStyle } from 'emoji-picker-react'

interface HeaderProps {
  title: string
  emoji: string
}

export function Header({ title, emoji }: HeaderProps) {
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
            fontSize="xl"
          />
          <IconButton
            icon={<Icon as={LuColumns} />}
            aria-label="View tasks in column mode"
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            color="gray.300"
            fontSize="xl"
          />
        </Flex>
      </Flex>
    </Box>
  )
}
