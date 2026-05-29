import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../../services/AuthService'

function ResetPassword({
  loading,
  setLoading,
  setError,
  setSuccess
}) {

  const navigate = useNavigate()

  const [newPassword, setNewPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPass, setShowPass] =
    useState(false)

  const [showConfirmPass, setShowConfirmPass] =
    useState(false)

  // RESET PASSWORD
  const handleResetPassword = async () => {

    setError('')
    setSuccess('')

    if (!newPassword || !confirmPassword) {

      setError('Please fill all fields')

      return
    }

    if (newPassword !== confirmPassword) {

      setError('Passwords do not match')

      return
    }

    try {

      setLoading(true)

      // GET TOKENS FROM LOCAL STORAGE
      const resetToken =
        localStorage.getItem(
          'reset_token'
        )

      const tokenIdentifier =
        localStorage.getItem(
          'token_identifier'
        )

      const data = await resetPassword(
        newPassword,
        tokenIdentifier,
        resetToken
      )

      if (data.success) {

        setSuccess(
          data.message ||
          'Password Reset Successful'
        )

        // CLEAR TOKENS
        localStorage.removeItem(
          'reset_token'
        )

        localStorage.removeItem(
          'token_identifier'
        )

        setTimeout(() => {

          navigate('/')

        }, 1500)

      } else {

        setError(
          data.message ||
          'Password reset failed'
        )

      }

    } catch (err) {

      console.error(err)

      if (err.response?.data?.message) {

        setError(
          err.response.data.message
        )

      } else {

        setError(
          'Server error. Please try again.'
        )

      }

    } finally {

      setLoading(false)

    }
  }

  return (
    <>

      {/* Heading */}
      <div className="text-center mb-8">

        <h3 className="text-3xl font-extrabold tracking-tight text-[#24292F] dark:text-[#F0F6FC]">
          Reset Password
        </h3>

        <p className="text-sm mt-2 text-[#57606A] dark:text-[#8B949E]">
          Create your new password
        </p>

      </div>

      {/* New Password */}
      <div className="flex flex-col gap-5">

        {/* New Password Input */}
        <div className="flex flex-col gap-2">

          <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
            New Password
          </label>

          <div className="relative">

            <input
              type={
                showPass
                  ? 'text'
                  : 'password'
              }

              placeholder="••••••••"

              value={newPassword}

              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }

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

              onClick={() =>
                setShowPass(!showPass)
              }

              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {showPass
                ? (
                  <HiOutlineEyeOff className="w-5 h-5" />
                )
                : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">

          <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={
                showConfirmPass
                  ? 'text'
                  : 'password'
              }

              placeholder="••••••••"

              value={confirmPassword}

              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }

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

              onClick={() =>
                setShowConfirmPass(
                  !showConfirmPass
                )
              }

              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {showConfirmPass
                ? (
                  <HiOutlineEyeOff className="w-5 h-5" />
                )
                : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
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
          {loading
            ? 'Resetting...'
            : 'Reset Password'}
        </button>

      </div>

    </>
  )
}

export default ResetPassword