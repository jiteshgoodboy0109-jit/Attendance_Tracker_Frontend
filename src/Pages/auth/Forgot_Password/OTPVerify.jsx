import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyOtp } from '../../../services/AuthService'

function OTPVerify({

  loading,
  setLoading,
  setError,
  setSuccess

}) {

  const navigate = useNavigate()

  const [otp, setOtp] = useState('')

  const email = localStorage.getItem(
    'reset_email'
  )

  const handleVerifyOtp = async () => {

    setError('')
    setSuccess('')

    if (!otp) {

      setError('Please enter OTP')

      return

    }

    try {

      setLoading(true)

      const {
        data,
        status
      } = await verifyOtp(
        otp,
        email
      )

      if (status === 200) {

        localStorage.setItem(
          'reset_token',
          data.reset_token
        )

        localStorage.setItem(
          'token_identifier',
          data.token_identifier
        )

        setSuccess(
          data.message ||
          'OTP Verified Successfully'
        )

        setTimeout(() => {

          navigate(
            '/forgot-password/reset-password'
          )

        }, 1000)

      } else {

        setError(
          data.message ||
          'OTP verification failed'
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

      {/* Verify Button */}
      <button
        onClick={handleVerifyOtp}
        disabled={loading}
        className="w-full py-2.5 mt-2 text-sm font-semibold rounded-lg text-white
                   transition-all duration-200 active:scale-[0.98]
                   bg-[#238636] hover:bg-[#2EA043]
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading
          ? 'Verifying...'
          : 'Verify OTP'}
      </button>

    </div>
  )
}

export default OTPVerify