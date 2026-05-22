import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  HiSun,
  HiMoon
} from 'react-icons/hi'

import loginIllustration from '../../../assets/login-illustration.png'

function ForgotPassword({ children }) {

  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  return (

    <div className={isDark ? 'dark' : ''}>

      <div className="min-h-screen w-full flex flex-col items-center justify-center
                      px-6 py-10 transition-colors duration-300
                      bg-[#FFFFFF] dark:bg-[#0D1117]">

        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">

          <button
            onClick={() =>
              setIsDark(!isDark)
            }

            aria-label="Toggle theme"

            className="flex items-center justify-center w-12 h-12 rounded-xl border text-sm font-medium
                       transition-all duration-300 hover:scale-105 hover:shadow-md
                       bg-[#FFFFFF] dark:bg-[#21262D]
                       border-[#D0D7DE] dark:border-[#30363D]
                       text-[#57606A] dark:text-[#C9D1D9]
                       hover:bg-[#F6F8FA] dark:hover:bg-[#30363D]
                       hover:text-[#bf40bf] dark:hover:text-[#58A6FF]
                       hover:border-[#bf40bf]/30 dark:hover:border-[#58A6FF]/30"
          >
            {isDark
              ? (
                <HiSun className="w-6 h-6 animate-pulse" />
              )
              : (
                <HiMoon className="w-6 h-6" />
              )}
          </button>

        </div>

        {/* Main Card */}
        <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden
                        transition-all duration-500
                        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_0_40px_rgba(191,64,191,0.06),0_1px_3px_rgba(0,0,0,0.03)]
                        dark:shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_45px_rgba(191,64,191,0.15)]
                        hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.08),0_30px_65px_-10px_rgba(191,64,191,0.28),0_0_50px_rgba(191,64,191,0.15)]
                        dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(191,64,191,0.4)]
                        border border-[#D0D7DE] dark:border-[#30363D]
                        hover:border-[#bf40bf]/40 dark:hover:border-[#bf40bf]/60">

          {/* LEFT PANEL */}
          <div className="w-full md:w-1/2 px-10 py-12 flex flex-col justify-center
                          min-h-[520px] transition-colors duration-300
                          bg-[#FFFFFF] dark:bg-[#161B22]">

            {/* Back */}
            <button
              onClick={() => navigate('/')}

              className="group mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider
                         text-[#57606A] dark:text-[#8B949E]
                         hover:text-[#bf40bf] dark:hover:text-[#58A6FF] transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>

              Back to Login
            </button>

            {/* Heading */}
            {/* <div className="text-center mb-8">

              <h1 className="text-3xl font-extrabold tracking-tight text-[#24292F] dark:text-[#F0F6FC]">
                Forgot Password
              </h1>

              <p className="text-sm mt-2 text-[#57606A] dark:text-[#8B949E]">
                Reset your password securely
              </p>

            </div> */}

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

            {children({
              loading,
              setLoading,
              setError,
              setSuccess
            })}

          </div>

          {/* RIGHT PANEL */}
          <div className="hidden md:block md:w-1/2 transition-colors duration-300 overflow-hidden
                          bg-[#F6F8FA] dark:bg-[#21262D]">

            <img
              src={loginIllustration}

              alt="Attendance tracking illustration"

              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

export default ForgotPassword