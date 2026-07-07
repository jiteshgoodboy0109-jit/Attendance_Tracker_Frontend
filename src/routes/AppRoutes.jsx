import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login/Login";
import ForgotPassword from "../pages/auth/Forgot_Password/ForgotPassword";
import RegisteredEmail from "../pages/auth/Forgot_Password/RegisteredEmail";
import OTPVerify from "../pages/auth/Forgot_Password/OTPVerify";
import ResetPassword from "../pages/auth/Forgot_Password/ResetPassword";
import Home from "../pages/Home/Home";
import Github from "../pages/Github/Github";
import Leave from "../pages/leave/Leave";

import { MainLayout } from "../layouts/MainLayout";
import Task from "../pages/Task/Task";
import Dashboard from "../pages/dashboard/Dashboard";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword>
            {({ loading, setLoading, setError, setSuccess }) => (
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
            {({ loading, setLoading, setError, setSuccess }) => (
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
            {({ loading, setLoading, setError, setSuccess }) => (
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
    
      
  

      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/leave" element={<Leave />} />
        <Route path="/github" element={<Github />} />
        <Route path="/tasks" element={<Task />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
