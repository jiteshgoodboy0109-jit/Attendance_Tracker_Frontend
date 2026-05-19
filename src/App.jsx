import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import ForgotPassword from './components/Login/ForgotPassword'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App