import { VStack, Heading, Icon, useBoolean, Flex } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import { motion } from 'framer-motion'

import { Logo } from '@/components'

import { useAppContext } from '@/hooks'

import { AddProject, Project } from '..'

const variants = {
  open: { rotate: '0deg' },
  close: { rotate: '45deg' }
}

export function Sidebar() {
  const { state } = useAppContext()
  const [showAddProject, setShowAddProject] = useBoolean(false)

  return (
    <>
      <VStack as="aside" spacing={[12, 16]} align="flex-start" w="full">
        <Logo mt={4} />
        <VStack w="full" gap={8}>
          <Flex align="center" justifyContent="space-between" w="full">
            <Heading
              as="h2"
              fontSize="xs"
              textColor="brand.500"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Projects
            </Heading>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={setShowAddProject.toggle}
              variants={variants}
              animate={showAddProject ? 'close' : 'open'}
            >
              <Icon as={LuPlus} fontSize="xl" size="lg" color="brand.500" />
            </motion.button>
          </Flex>
          {showAddProject ? (
            <AddProject onClose={setShowAddProject.toggle} />
          ) : null}
          <VStack w="full" spacing={4} align="left">
            {state.projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </>
  )
}
