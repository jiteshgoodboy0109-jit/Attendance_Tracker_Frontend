import api from './api'

// Login
export const loginUser = async (
  email,
  password
) => {

  const response = await api.post(
    'auth/login/',
    {
      login: email,
      password
    }
  )

  return response.data
}

// Send OTP
export const sendOtp = async (
  email
) => {

  const response = await api.post(
    'auth/otp/send/',
    {
      email,
      purpose: 'PASSWORD_RESET'
    }
  )

  return response.data
}

// Verify OTP
export const verifyOtp = async (
  otp,
  email
) => {

  const response = await api.post(
    'auth/otp/verify/',
    {
      otp: Number(otp),
      email,
      purpose: 'PASSWORD_RESET'
    }
  )

  return {
    data: response.data,
    status: response.status
  }
}

// Reset Password
export const resetPassword = async (
  newPassword,
  tokenIdentifier,
  resetToken
) => {

  const response = await api.post(
    'auth/password/reset/',
    {
      new_password: newPassword,
      token_identifier: tokenIdentifier,
      reset_token: resetToken
    }
  )

  return response.data
}