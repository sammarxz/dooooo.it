import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { AppContextProvider } from '@/store'

import { DefaultLayout } from '@/layout/DefaultLayout'

import { Dashboard } from '@/pages'

import { theme } from '@/theme'

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </ChakraProvider>
  )
}

export default App
