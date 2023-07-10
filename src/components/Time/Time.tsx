import { Box, Text } from '@chakra-ui/react'

import { formatTimer } from '@/utils/timer'

interface TimeProps {
  time: number
  isActive: boolean
}

export function Time({ time, isActive }: TimeProps) {
  return (
    <Box as="span" role="timer" aria-live="polite" aria-atomic="true">
      <time id="timer" dateTime="PT0S">
        <Text
          color={`${isActive ? 'brand.500' : 'gray.300'}`}
          fontWeight="bold"
          fontSize="lg"
        >
          {formatTimer(time)}
        </Text>
      </time>
    </Box>
  )
}
