import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface MotionProgressProps {
  value: number
}

export function MotionProgress({ value }: MotionProgressProps) {
  return (
    <Box
      w="full"
      h={2}
      rounded="md"
      bg="gray.100"
      position="relative"
      overflow="clip"
    >
      <Box
        as={motion.div}
        rounded="md"
        position="absolute"
        top={0}
        bottom={0}
        w="10"
        bg="brand.500"
        initial={false}
        animate={{
          width: `${value}%`,
          transition: {
            duration: 0.5,
            ease: 'easeInOut'
          }
        }}
      />
    </Box>
  )
}
