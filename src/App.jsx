import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/auth/Login'
import ForgotPassword from './Pages/auth/ForgotPassword'

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