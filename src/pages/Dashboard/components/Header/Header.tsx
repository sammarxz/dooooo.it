import { Box, Flex, Heading, Button, Icon } from '@chakra-ui/react'
import { BiDownload, BiDotsVerticalRounded } from 'react-icons/bi'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Box as="header" w="full">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={2}>
          <Heading as="h1" size="xl" color="brand.500">
            {title}
          </Heading>
          <Icon as={BiDotsVerticalRounded} boxSize="24px" color="brand.500" />
        </Flex>
        <Button variant="outline" leftIcon={<BiDownload />}>
          Download PDF Report
        </Button>
      </Flex>
    </Box>
  )
}
