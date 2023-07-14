import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

export function DefaultLayout() {
  return (
    <Container maxW="container.lg" my={16} textColor="brand.900">
      <Outlet />
    </Container>
  )
}
