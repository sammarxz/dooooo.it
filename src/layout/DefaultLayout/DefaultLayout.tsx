import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

export function DefaultLayout() {
  return (
    <Container maxW="container.lg" my={16}>
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
    </Container>
  )
}
