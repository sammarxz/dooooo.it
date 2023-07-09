import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { TaskContextProvider } from '@/store/task'

import { DefaultLayout } from '@/layout/DefaultLayout'

import { Dashboard, Home } from '@/pages'

function App() {
  return (
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
  )
}

export default App
