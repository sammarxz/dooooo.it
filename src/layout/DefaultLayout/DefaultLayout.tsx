import { Outlet } from 'react-router-dom'
import { Center, Container } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

export function DefaultLayout() {
  return (
    <Center h="100vh">
      <Container maxW="container.md" transition="all">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </Container>
    </Center>
  )
}
