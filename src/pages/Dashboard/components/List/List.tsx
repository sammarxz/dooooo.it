import { useAppContext } from '@/hooks'
import { Box } from '@chakra-ui/react'

import { TasksProgress } from '..'

import { Section, AddSection } from './components'

export function List() {
  const {
    state: { projects, activeProjectIndex }
  } = useAppContext()

  return (
    <>
      <TasksProgress project={projects[activeProjectIndex!]} />
      {projects[activeProjectIndex!].sections.map((section) => (
        <Box key={section.id} w="full">
          <Section section={section} />
        </Box>
      ))}
      <AddSection />
    </>
  )
}
