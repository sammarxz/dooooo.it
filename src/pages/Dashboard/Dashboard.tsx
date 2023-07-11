import { VStack } from '@chakra-ui/react'

import { AddSection, Header, Section } from './components'
import { useAppContext } from '@/hooks'

export function Dashboard() {
  const { state } = useAppContext()

  return (
    <VStack spacing={16} align="flex-start">
      <Header title="Project 1" />
      {state.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
      <AddSection />
    </VStack>
  )
}
