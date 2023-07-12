import { Image, Box, type BoxProps } from '@chakra-ui/react'

import LogoSVG from '@/assets/doooo.svg'

export function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <Image src={LogoSVG} alt="dooooo.it logo" />
    </Box>
  )
}
