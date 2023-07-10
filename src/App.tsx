import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { TaskContextProvider } from '@/store/task'

import { DefaultLayout } from '@/layout/DefaultLayout'

import { Dashboard, Home } from '@/pages'

import { theme } from '@/theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TaskContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskContextProvider>
    </ChakraProvider>
  )
}

export default App
