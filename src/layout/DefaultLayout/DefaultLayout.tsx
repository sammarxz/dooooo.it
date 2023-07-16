import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

import { useAppContext } from '@/hooks'

export function DefaultLayout() {
  const { state } = useAppContext()

  return (
    <Container
      maxW={state.viewMode === 'list' ? 'container.lg' : '8xl'}
      my={16}
      textColor="brand.900"
    >
      <Outlet />
    </Container>
  )
}
