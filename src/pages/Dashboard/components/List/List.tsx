import { useAppContext } from '@/hooks'
import { AddSection, Section, TasksProgress } from '..'
import { Box } from '@chakra-ui/react'

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
