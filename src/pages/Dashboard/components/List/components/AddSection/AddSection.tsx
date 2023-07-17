import { useAppContext } from '@/hooks'
import { addSection } from '@/store/section'
import { Button, Divider, AbsoluteCenter } from '@chakra-ui/react'

export function AddSection() {
  const { dispatch } = useAppContext()

  function handleAddSection() {
    dispatch(addSection())
  }

  return (
    <Button
      variant="untyled"
      position="relative"
      py={[4, 10]}
      px={0}
      w="full"
      fontWeight="regular"
      color="gray.400"
      _hover={{
        color: 'brand.500',
        borderColor: 'brand.500'
      }}
      onClick={handleAddSection}
    >
      <Divider />
      <AbsoluteCenter bg="white" px="4">
        Add Section
      </AbsoluteCenter>
    </Button>
  )
}
