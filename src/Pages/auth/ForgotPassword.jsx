import { useState } from 'react'
import {
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi'
import api from '../../services/api'

function ForgotPassword({ onBack }) {

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSendOtp = async () => {

    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    try {

      setLoading(true)

      const response = await api.post(
        'auth/otp/send/',
        {
          email: email,
          purpose: 'PASSWORD_RESET'
        }
      )

      const data = response.data

      console.log(data)

      alert(data.message || 'OTP sent successfully')

      // Navigate to OTP section
      setStep(2)

    } catch (err) {

      console.error(err)

      if (err.response?.data?.message) {

        setError(err.response.data.message)

      } else {

        setError('Server error. Please try again.')

      }

    } finally {

      setLoading(false)

    }
  }
  const handleVerifyOtp = async () => {

    setError('')
    if (!otp) {
      setError('Please enter OTP')
      return
    }
    try {
      setLoading(true)
      const response = await api.post(
        'auth/otp/verify/',
        {
          otp: Number(otp),
          email: email,
          purpose: 'PASSWORD_RESET'
        }
      )

      const data = response.data
     if (response.status === 200) {
        localStorage.setItem(
          'reset_token',
          data.reset_token
        )
        localStorage.setItem(
          'token_identifier',
          data.token_identifier
        )
        setSuccess(data.message || 'OTP Verified Successfully')
        setTimeout(() => {
          setStep(3)
        }, 1000)
      } else {
        setError(data.message || 'OTP verification failed')
      }

    } catch (err) {
      console.error(err)
      if (err.response?.data?.message) {

        setError(err.response.data.message)
      } else {
        setError('Server error. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = () => {

    setError('')

    if (!newPassword || !confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setTimeout(() => {

      setLoading(false)

      alert('Password Reset Successful')

      // Go back to login
      onBack()

    }, 1500)
  }

  return (
    <>
      <button
        onClick={onBack}
        className="group mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider
                   text-[#57606A] dark:text-[#8B949E]
                   hover:text-[#bf40bf] dark:hover:text-[#58A6FF] transition-colors"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Login
      </button>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#24292F] dark:text-[#F0F6FC]">
          Forgot Password
        </h1>
        <p className="text-sm mt-2 text-[#57606A] dark:text-[#8B949E]">
          Reset your password securely
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 justify-center px-4 py-2.5 mb-6 rounded-lg text-xs font-semibold
                        bg-[#CF222E]/10 dark:bg-[#F85149]/10 
                        text-[#CF222E] dark:text-[#F85149]
                        border border-[#CF222E]/20 dark:border-[#F85149]/20">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2 justify-center px-4 py-2.5 mb-6 rounded-lg text-xs font-semibold
                        bg-[#238636]/10 dark:bg-[#3FB950]/10 
                        text-[#238636] dark:text-[#3FB950]
                        border border-[#238636]/20 dark:border-[#3FB950]/20">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      {/* Step 1: Send OTP */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none
                         bg-[#FFFFFF] dark:bg-[#0D1117]
                         border-[#D0D7DE] dark:border-[#30363D]
                         text-[#24292F] dark:text-[#C9D1D9]
                         placeholder:text-[#8B949E] dark:placeholder:text-[#484F58]
                         transition-all duration-300
                         hover:border-[#bf40bf]/50 dark:hover:border-[#bf40bf]/60
                         focus:border-[#bf40bf] focus:ring-2 focus:ring-[#bf40bf]/20 dark:focus:ring-[#bf40bf]/40"
            />
          </div>

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full py-2.5 mt-2 text-sm font-semibold rounded-lg text-white
                       transition-all duration-200 active:scale-[0.98]
                       bg-[#238636] hover:bg-[#2EA043]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          {/* OTP Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none
                         bg-[#FFFFFF] dark:bg-[#0D1117]
                         border-[#D0D7DE] dark:border-[#30363D]
                         text-[#24292F] dark:text-[#C9D1D9]
                         placeholder:text-[#8B949E] dark:placeholder:text-[#484F58]
                         transition-all duration-300
                         hover:border-[#bf40bf]/50 dark:hover:border-[#bf40bf]/60
                         focus:border-[#bf40bf] focus:ring-2 focus:ring-[#bf40bf]/20 dark:focus:ring-[#bf40bf]/40"
            />
          </div>

          {/* Verify OTP Button */}
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full py-2.5 mt-2 text-sm font-semibold rounded-lg text-white
                       transition-all duration-200 active:scale-[0.98]
                       bg-[#238636] hover:bg-[#2EA043]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          {/* New Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-11 text-sm rounded-lg border outline-none
                           bg-[#FFFFFF] dark:bg-[#0D1117]
                           border-[#D0D7DE] dark:border-[#30363D]
                           text-[#24292F] dark:text-[#C9D1D9]
                           placeholder:text-[#8B949E] dark:placeholder:text-[#484F58]
                           transition-all duration-300
                           hover:border-[#bf40bf]/50 dark:hover:border-[#bf40bf]/60
                           focus:border-[#bf40bf] focus:ring-2 focus:ring-[#bf40bf]/20 dark:focus:ring-[#bf40bf]/40"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showPass
                  ? <HiOutlineEyeOff className="w-5 h-5" />
                  : <HiOutlineEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-11 text-sm rounded-lg border outline-none
                           bg-[#FFFFFF] dark:bg-[#0D1117]
                           border-[#D0D7DE] dark:border-[#30363D]
                           text-[#24292F] dark:text-[#C9D1D9]
                           placeholder:text-[#8B949E] dark:placeholder:text-[#484F58]
                           transition-all duration-300
                           hover:border-[#bf40bf]/50 dark:hover:border-[#bf40bf]/60
                           focus:border-[#bf40bf] focus:ring-2 focus:ring-[#bf40bf]/20 dark:focus:ring-[#bf40bf]/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showConfirmPass
                  ? <HiOutlineEyeOff className="w-5 h-5" />
                  : <HiOutlineEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full py-2.5 mt-2 text-sm font-semibold rounded-lg text-white
                       transition-all duration-200 active:scale-[0.98]
                       bg-[#238636] hover:bg-[#2EA043]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      )}

    </>
  )
}

export default ForgotPassword