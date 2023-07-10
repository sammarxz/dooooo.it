import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { LuDownload } from 'react-icons/lu'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Box as="header" w="full">
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="xl" color="brand.500">
          {title}
        </Heading>
        <Button variant="outline" leftIcon={<LuDownload />}>
          Download PDF Report
        </Button>
      </Flex>
    </Box>
  )
}
