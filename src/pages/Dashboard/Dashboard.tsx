import { Grid, GridItem, Box, VStack } from '@chakra-ui/react'

import {
  Sidebar,
  AddSection,
  Header,
  Section,
  TasksProgress
} from './components'
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
          {state.activeProjectIndex !== undefined ? (
            <>
              <Header
                title={state.projects[state.activeProjectIndex].title}
                emoji={state.projects[state.activeProjectIndex].emoji}
              />
              <TasksProgress
                project={state.projects[state.activeProjectIndex]}
              />
              {state.projects[state.activeProjectIndex].sections.map(
                (section) => (
                  <Box key={section.id} w="full">
                    <Section section={section} />
                  </Box>
                )
              )}
              <AddSection />
            </>
          ) : null}
        </VStack>
      </GridItem>
    </Grid>
  )
}
