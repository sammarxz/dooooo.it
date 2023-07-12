import {
  VStack,
  Heading,
  Icon,
  useBoolean,
  Text,
  Flex,
  Input
} from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { Logo } from '@/components'

import { useAppContext } from '@/hooks'

import { type ProjectData, addProject, setActiveProject } from '@/store/project'

const AddProjectValidationSchema = zod.object({
  title: zod.string().min(1, 'Enter project name').max(20)
})

type AddSectionData = zod.infer<typeof AddProjectValidationSchema>

const variants = {
  open: { rotate: '0deg' },
  close: { rotate: '45deg' }
}

export function Sidebar() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<AddSectionData>({
    mode: 'onBlur',
    resolver: zodResolver(AddProjectValidationSchema),
    defaultValues: {
      title: ''
    }
  })
  const { state, dispatch } = useAppContext()
  const [showAddProject, setShowAddProject] = useBoolean(false)

  function handleCreateNewProject(data: AddSectionData): void {
    if (isValid) {
      dispatch(addProject(data))
      reset()
      setShowAddProject.off()
    }
  }

  function handleSetActiveProject(project: ProjectData) {
    dispatch(setActiveProject(project))
  }

  return (
    <LayoutGroup>
      <VStack as="aside" spacing={[12, 16]} align="flex-start" w="full">
        <Logo mt={4} />
        <VStack w="full" gap={8}>
          <Flex align="center" justifyContent="space-between" w="full" py={2}>
            <Heading as="h2" fontSize={['md', 'lg']} textColor="brand.500">
              Projects
            </Heading>
            <motion.button
              layout
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={setShowAddProject.toggle}
              variants={variants}
              animate={showAddProject ? 'close' : 'open'}
            >
              <Icon as={LuPlus} fontSize="xl" size="lg" color="brand.500" />
            </motion.button>
          </Flex>
          <AnimatePresence>
            {showAddProject ? (
              <Flex alignItems="center" gap={4} w="full">
                <form onSubmit={handleSubmit(handleCreateNewProject)}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Project title"
                        autoFocus
                        {...field}
                        colorScheme="brand"
                      />
                    )}
                  />
                </form>
              </Flex>
            ) : null}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            <VStack w="full" spacing={6} align="left">
              {state.projects.map((project) => (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  key={project.id}
                  onClick={() => {
                    handleSetActiveProject(project)
                  }}
                >
                  <Flex gap={2} alignItems="center">
                    <Text
                      fontWeight={
                        state?.activeProject?.id === project.id
                          ? 'bold'
                          : 'medium'
                      }
                    >
                      {project.title}
                    </Text>
                  </Flex>
                </motion.button>
              ))}
            </VStack>
          </AnimatePresence>
        </VStack>
      </VStack>
    </LayoutGroup>
  )
}
