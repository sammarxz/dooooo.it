import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    DEFAULT: '#321DBF',
    50: '#E2DEFA',
    100: '#CCC6F6',
    200: '#A195EF',
    300: '#7665E8',
    400: '#4A34E0',
    500: '#321DBF',
    600: '#2B19A4',
    700: '#24158A',
    800: '#1D116F',
    900: '#160D55',
    950: '#130B47'
  }
}

export const theme = extendTheme({
  colors
})
