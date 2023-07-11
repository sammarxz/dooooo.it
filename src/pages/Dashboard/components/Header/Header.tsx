import { Box, Flex, Heading } from '@chakra-ui/react'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Box as="header" w="full">
      <Flex align="center" justify="space-between">
        <Heading as="h1" size={['md', 'xl']} color="brand.500">
          {title}
        </Heading>
        {/* <Flex align="center">
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
        </Flex> */}
      </Flex>
    </Box>
  )
}
