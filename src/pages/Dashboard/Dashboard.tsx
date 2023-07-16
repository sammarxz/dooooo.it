import { Grid, GridItem, VStack } from '@chakra-ui/react'

import { Sidebar, Header, Kanban, List } from './components'
import { useAppContext } from '@/hooks'

export function Dashboard() {
  const { state } = useAppContext()
  const { projects, activeProjectIndex, viewMode } = state

  function renderContent() {
    if (viewMode === 'list') {
      return <List />
    }

    return <Kanban />
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={viewMode === 'list' ? 3 : 2}>
        <Sidebar />
      </GridItem>
      <GridItem
        colStart={viewMode === 'list' ? 5 : 4}
        colSpan={viewMode === 'list' ? 8 : 9}
      >
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
