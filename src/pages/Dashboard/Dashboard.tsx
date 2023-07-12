import { Grid, GridItem, Box, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Sidebar, AddSection, Header, Section } from './components'
import { useAppContext } from '@/hooks'

export function Dashboard() {
  const { state } = useAppContext()

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={3}>
        <Sidebar />
      </GridItem>
      <GridItem colStart={5} colSpan={8}>
        <VStack spacing={[12, 16]} align="flex-start">
          <Header title={state.activeProject?.title} />
          <Box as={AnimatePresence} w="full">
            {state.activeProject !== null &&
            state.activeProject !== undefined ? (
              <>
                {state.activeProject.sections.map((section) => (
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
                <AddSection />
              </>
            ) : null}
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  )
}
