import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { History, Home } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
