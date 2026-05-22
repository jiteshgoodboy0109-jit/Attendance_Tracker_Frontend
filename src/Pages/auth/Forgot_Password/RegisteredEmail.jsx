import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'

function RegisteredEmail({

  setLoading,
  loading,
  setError,
  setSuccess

}) {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const handleSendOtp = async () => {

    setError('')
    setSuccess('')

    if (!email) {

      setError('Please enter your email')

      return
    }

    try {

      setLoading(true)

      const response = await api.post(
        'auth/otp/send/',
        {
          email,
          purpose: 'PASSWORD_RESET'
        }
      )

      const data = response.data

      localStorage.setItem(
        'reset_email',
        email
      )

      setSuccess(
        data.message || 'OTP sent successfully'
      )

      setTimeout(() => {

        navigate('/forgot-password/verify-otp')

      }, 1000)

    } catch (err) {

      if (err.response?.data?.message) {

        setError(err.response.data.message)

      } else {

        setError('Server error. Please try again.')

      }

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="flex flex-col gap-5">

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
  )
}

export default RegisteredEmail