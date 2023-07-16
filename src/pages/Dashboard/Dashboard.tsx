import { Grid, GridItem, Box, VStack } from '@chakra-ui/react'

import {
  Sidebar,
  AddSection,
  Header,
  Section,
  TasksProgress,
  Kanban
} from './components'
import { useAppContext } from '@/hooks'

export function Dashboard() {
  const { state } = useAppContext()
  const { projects, activeProjectIndex, viewMode } = state

  function renderContent() {
    if (viewMode === 'list' && activeProjectIndex !== undefined) {
      return (
        <>
          <TasksProgress project={projects[activeProjectIndex]} />
          {projects[activeProjectIndex].sections.map((section) => (
            <Box key={section.id} w="full">
              <Section section={section} />
            </Box>
          ))}
          <AddSection />
        </>
      )
    }

    return <Kanban />
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={3}>
        <Sidebar />
      </GridItem>
      <GridItem colStart={5} colSpan={8}>
        <VStack spacing={[12, 16]} align="flex-start">
          {activeProjectIndex !== undefined ? (
            <>
              <Header
                title={projects[activeProjectIndex].title}
                emoji={projects[activeProjectIndex].emoji}
              />
              {renderContent()}
            </>
          ) : null}
        </VStack>
      </GridItem>
    </Grid>
  )
}
