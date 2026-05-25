import { Routes, Route } from 'react-router-dom'

import Login from '../Pages/auth/Login/Login'
import ForgotPassword from '../Pages/auth/Forgot_Password/ForgotPassword'
import RegisteredEmail from '../Pages/auth/Forgot_Password/RegisteredEmail'
import OTPVerify from '../Pages/auth/Forgot_Password/OTPVerify'
import ResetPassword from '../Pages/auth/Forgot_Password/ResetPassword'
import Home from '../Pages/auth/Home/Home'

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword>
            {({
              loading,
              setLoading,
              setError,
              setSuccess
            }) => (
              <RegisteredEmail
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
          </ForgotPassword>
        }
      />

      <Route
        path="/forgot-password/verify-otp"
        element={
          <ForgotPassword>
            {({
              loading,
              setLoading,
              setError,
              setSuccess
            }) => (
              <OTPVerify
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
          </ForgotPassword>
        }
      />

      <Route
        path="/forgot-password/reset-password"
        element={
          <ForgotPassword>
            {({
              loading,
              setLoading,
              setError,
              setSuccess
            }) => (
              <ResetPassword
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
          </ForgotPassword>
        }
      />
      <Route
        path="/dashboard"
        element={<Home />}
      />

    </Routes>
  )
}

export default AppRoutes