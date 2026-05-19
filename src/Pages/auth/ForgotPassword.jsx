import { useState } from 'react'
import {
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi'

function ForgotPassword({ onBack }) {

  // ── Steps ─────────────────────────────────────
  // 1 = Email
  // 2 = OTP Verify
  // 3 = Reset Password
  const [step, setStep] = useState(1)

  // ── Form States ───────────────────────────────
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // ── Password Visibility ───────────────────────
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  // ── UI States ─────────────────────────────────
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ──────────────────────────────────────────────
  // SEND OTP
  // ──────────────────────────────────────────────
  const handleSendOtp = () => {

    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    setLoading(true)

    // Fake API Call
    setTimeout(() => {

      setLoading(false)
      setStep(2)

      alert('OTP sent successfully')

    }, 1500)
  }

  // ──────────────────────────────────────────────
  // VERIFY OTP
  // ──────────────────────────────────────────────
  const handleVerifyOtp = () => {

    setError('')

    if (!otp) {
      setError('Please enter OTP')
      return
    }

    setLoading(true)

    // Fake Verification
    setTimeout(() => {

      setLoading(false)
      setStep(3)

      alert('OTP Verified')

    }, 1500)
  }

  // ──────────────────────────────────────────────
  // RESET PASSWORD
  // ──────────────────────────────────────────────
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

    // Fake Reset
    setTimeout(() => {

      setLoading(false)

      alert('Password Reset Successful')

      // Go back to login
      onBack()

    }, 1500)
  }

  return (
    <>

      {/* ───────────────────────────────────── */}
      {/* Back Button */}
      {/* ───────────────────────────────────── */}
      <button
        onClick={onBack}
        className="mb-5 text-sm
                   text-[#0969DA] dark:text-[#58A6FF]
                   hover:underline"
      >
        ← Back to Login
      </button>

      {/* ───────────────────────────────────── */}
      {/* Heading */}
      {/* ───────────────────────────────────── */}
      <h1 className="text-2xl font-bold text-center mb-2
                     text-[#24292F] dark:text-[#F0F6FC]">
        Forgot Password
      </h1>

      <p className="text-sm text-center mb-8
                    text-[#57606A] dark:text-[#8B949E]">
        Reset your password securely
      </p>

      {/* ───────────────────────────────────── */}
      {/* Error */}
      {/* ───────────────────────────────────── */}
      {error && (
        <p className="text-xs text-center mb-4
                      text-[#CF222E] dark:text-[#F85149]">
          ⚠️ {error}
        </p>
      )}

      {/* ═════════════════════════════════════ */}
      {/* STEP 1 — EMAIL */}
      {/* ═════════════════════════════════════ */}
      {step === 1 && (

        <div className="flex flex-col gap-4">

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border outline-none
                       transition-all duration-300
                       bg-[#FFFFFF] dark:bg-[#0D1117]
                       border-[#D0D7DE] dark:border-[#30363D]
                       text-[#24292F] dark:text-[#C9D1D9]
                       placeholder:text-[#A0A7AE] dark:placeholder:text-[#484F58]
                       focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                       focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
          />

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                       transition-all duration-300
                       bg-[#238636]
                       hover:bg-[#2EA043]
                       hover:scale-[1.02]"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

        </div>
      )}

      {/* ═════════════════════════════════════ */}
      {/* STEP 2 — VERIFY OTP */}
      {/* ═════════════════════════════════════ */}
      {step === 2 && (

        <div className="flex flex-col gap-4">

          {/* OTP Input */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border outline-none
                       transition-all duration-300
                       bg-[#FFFFFF] dark:bg-[#0D1117]
                       border-[#D0D7DE] dark:border-[#30363D]
                       text-[#24292F] dark:text-[#C9D1D9]
                       placeholder:text-[#A0A7AE] dark:placeholder:text-[#484F58]
                       focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                       focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
          />

          {/* Verify OTP Button */}
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                       transition-all duration-300
                       bg-[#238636]
                       hover:bg-[#2EA043]
                       hover:scale-[1.02]"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

        </div>
      )}

      {/* ═════════════════════════════════════ */}
      {/* STEP 3 — RESET PASSWORD */}
      {/* ═════════════════════════════════════ */}
      {step === 3 && (

        <div className="flex flex-col gap-4">

          {/* New Password */}
          <div className="relative">

            <input
              type={showPass ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 pr-11 rounded-lg border outline-none
                         transition-all duration-300
                         bg-[#FFFFFF] dark:bg-[#0D1117]
                         border-[#D0D7DE] dark:border-[#30363D]
                         text-[#24292F] dark:text-[#C9D1D9]
                         placeholder:text-[#A0A7AE] dark:placeholder:text-[#484F58]
                         focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                         focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[#57606A] dark:text-[#8B949E]"
            >
              {showPass
                ? <HiOutlineEyeOff className="w-5 h-5" />
                : <HiOutlineEye className="w-5 h-5" />}
            </button>

          </div>

          {/* Confirm Password */}
          <div className="relative">

            <input
              type={showConfirmPass ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 pr-11 rounded-lg border outline-none
                         transition-all duration-300
                         bg-[#FFFFFF] dark:bg-[#0D1117]
                         border-[#D0D7DE] dark:border-[#30363D]
                         text-[#24292F] dark:text-[#C9D1D9]
                         placeholder:text-[#A0A7AE] dark:placeholder:text-[#484F58]
                         focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                         focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[#57606A] dark:text-[#8B949E]"
            >
              {showConfirmPass
                ? <HiOutlineEyeOff className="w-5 h-5" />
                : <HiOutlineEye className="w-5 h-5" />}
            </button>

          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                       transition-all duration-300
                       bg-[#238636]
                       hover:bg-[#2EA043]
                       hover:scale-[1.02]"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

        </div>
      )}

    </>
  )
}

export default ForgotPassword