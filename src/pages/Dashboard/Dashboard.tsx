import { Box, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { AddSection, Header, Section } from './components'
import { useAppContext } from '@/hooks'

export function Dashboard() {
  const { state } = useAppContext()

  return (
    <VStack spacing={16} align="flex-start">
      <Header title="Project 1" />
      <Box as={AnimatePresence} w="full">
        {state.sections.map((section) => (
          <Box
            as={motion.div}
            key={section.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            w="full"
          >
            <Section section={section} />
          </Box>
        ))}
      </Box>
      <AddSection />
    </VStack>
  )
}
