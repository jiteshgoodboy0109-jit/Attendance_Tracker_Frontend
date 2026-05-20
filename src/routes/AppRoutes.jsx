import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/auth/Login'
import ForgotPassword from '../Pages/auth/ForgotPassword'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default AppRoutes