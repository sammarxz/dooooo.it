import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Icon, Input, useBoolean } from '@chakra-ui/react'
import zod from 'zod'
import { LuPlus } from 'react-icons/lu'
import { AnimatePresence, motion } from 'framer-motion'

import { useTask } from '@/hooks'

import { ActionTypes } from '@/store/task/reducers/actions'

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

const newTaskFormValidationSchema = zod.object({
  description: zod.string().min(1, 'Enter the task')
})

export function NewTaskForm() {
  const { dispatch } = useTask()
  const [showForm, setShowForm] = useBoolean()

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<NewTaskFormData>({
    mode: 'onChange',
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      description: ''
    }
  })

  function handleCreateNewTask(data: NewTaskFormData) {
    if (isValid) {
      dispatch({
        type: ActionTypes.ADD_TASK,
        payload: data
      })
      reset()
      setShowForm.off()
    }
  }

  return (
    <AnimatePresence>
      {showForm ? (
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.6
            }
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6
            }
          }}
          w="full"
        >
          <Box as="form" onSubmit={handleSubmit(handleCreateNewTask)} w="full">
            <Input
              id="task"
              placeholder="Task name"
              w="full"
              autoFocus
              colorScheme="brand"
              {...register('description')}
              onBlur={setShowForm.off}
            />
          </Box>
        </Box>
      ) : (
        <Button
          as={motion.button}
          variant="unstyled"
          onClick={setShowForm.on}
          fontWeight="normal"
          color="gray.400"
          _hover={{ color: 'brand.500' }}
          w="full"
          textAlign="left"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.6
            }
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6
            }
          }}
        >
          <Icon as={LuPlus} mr={2} color="brand.500" />
          Add Task
        </Button>
      )}
    </AnimatePresence>
  )
}
