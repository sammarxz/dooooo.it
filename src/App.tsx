import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@/layout/DefaultLayout'
import { History, Home } from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/history' element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
