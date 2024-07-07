import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Sighup } from './pages/Sighup'
import { Signin } from './pages/Sighup'
import { Blog } from './pages/Blog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Sighup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App