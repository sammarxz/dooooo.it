import { Flex, type FlexProps, Heading, Icon } from '@chakra-ui/react'
import { LuPackageCheck } from 'react-icons/lu'

// import LogoSVG from '@/assets/doooo.svg'

export function Logo(props: FlexProps) {
  return (
    <Flex align="center" gap={2} {...props}>
      <Icon as={LuPackageCheck} fontSize="3xl" color="brand.500" />
      <Heading size="md" fontWeight="extrabold" textColor="brand.900">
        taskbox
      </Heading>

      {/* <Image src={LogoSVG} alt="dooooo.it logo" /> */}
    </Flex>
  )
}
