import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FaApple,
  FaMeta
} from 'react-icons/fa6'

import { FcGoogle } from 'react-icons/fc'

import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiSun,
  HiMoon
} from 'react-icons/hi'

import { FiAlertCircle } from 'react-icons/fi'

import loginIllustration from '../../../assets/login-illustration.png'
import darkLogo from '../../../assets/Darklogo.WEBP'
import whiteLogo from '../../../assets/Whitelogo.WEBP'
import logoAtr from '../../../assets/logo atr .webp'

import api from '../../../services/api'

function Login() {

  const navigate = useNavigate()

  // ── State ─────────────────────────────────────
  const [isDark, setIsDark] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  // ── Login Submit ──────────────────────────────
  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    if (!email || !password) {

      setError('Please fill in all fields.')

      return
    }

    try {

      setLoading(true)

      const response = await api.post(
        'auth/login/',
        {
          login: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {

        localStorage.setItem(
          'access_token',
          response.data.access_token
        )

        localStorage.setItem(
          'refresh_token',
          response.data.refresh_token
        )

        localStorage.setItem(
          'user',
          JSON.stringify(response.data.user)
        )

        alert(response.data.message)

        console.log(
          'User:',
          response.data.user
        )

        navigate('/home')
      }

    } catch (err) {

      console.error(err)

      if (err.response?.data?.message) {

        setError(
          err.response.data.message
        )

      } else if (
        err.response?.status === 401
      ) {

        setError(
          'Invalid username or password.'
        )

      } else {

        setError(
          'Login failed. Please try again.'
        )

      }

    } finally {

      setLoading(false)

    }
  }

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

          {/* Left Panel */}
          <div className="w-full md:w-1/2 px-10 py-12 flex flex-col justify-center
                          min-h-[520px] transition-colors duration-300
                          bg-[#FFFFFF] dark:bg-[#161B22]">

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src={logoAtr} 
                className="h-12 w-auto object-contain" 
                alt="ATR Logo" 
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">

              <h1 className="text-3xl font-extrabold tracking-tight text-[#24292F] dark:text-[#F0F6FC]">
                Welcome Back !!
              </h1>

              <p className="text-sm mt-2 text-[#57606A] dark:text-[#8B949E]">
                Login to your ATR panel
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 justify-center px-4 py-2.5 mb-6 rounded-lg text-xs font-semibold
                              bg-[#CF222E]/10 dark:bg-[#F85149]/10
                              text-[#CF222E] dark:text-[#F85149]
                              border border-[#CF222E]/20 dark:border-[#F85149]/20">

                <FiAlertCircle className="w-4 h-4 text-[#CF222E] dark:text-[#F85149]" />

                <span>{error}</span>

              </div>
            )}

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >

              {/* Email */}
              <div className="flex flex-col gap-2">

                <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
                  Email / Username
                </label>

                <input
                  type="text"

                  placeholder="Username or Email"

                  value={email}

                  onChange={(e) =>
                    setEmail(e.target.value)
                  }

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

              {/* Password */}
              <div className="flex flex-col gap-2">

                <div className="flex items-center justify-between">

                  <label className="text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
                    Password
                  </label>

                  <button
                    type="button"

                    onClick={() =>
                      navigate('/forgot-password')
                    }

                    className="text-xs font-medium text-[#0969DA] dark:text-[#58A6FF] hover:underline"
                  >
                    Forgot your password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    type={
                      showPass
                        ? 'text'
                        : 'password'
                    }

                    placeholder="••••••••"

                    value={password}

                    onChange={(e) =>
                      setPassword(e.target.value)
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

              {/* Login Button */}
              <button
                type="submit"

                disabled={loading}

                className="w-full py-2.5 mt-2 text-sm font-semibold rounded-lg text-white
                           transition-all duration-200 active:scale-[0.98]
                           bg-[#238636] hover:bg-[#2EA043]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {loading
                  ? 'Logging in…'
                  : 'Login'}
              </button>

            </form>

            {/* Signup */}
            <p className="text-center text-xs mt-6 text-[#57606A] dark:text-[#8B949E]">

              Don't have an account?{' '}

              <a
                href="/register"

                className="font-semibold text-[#0969DA] dark:text-[#58A6FF] hover:underline"
              >
                Sign up
              </a>

            </p>

            {/* Powered By */}
            <div className="flex flex-col items-start mt-8 pt-4 border-t border-gray-100 dark:border-[#30363D]">

              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#57606A] dark:text-[#8B949E] transition-colors duration-300">
                Powered By
              </p>

              {isDark ? (
                <img
                  src={darkLogo}

                  alt="Powered by GEN>IT"

                  className="h-14 object-contain opacity-90 hover:opacity-100 transition-opacity mix-blend-screen mt-[-6px]"
                />
              ) : (
                <img
                  src={whiteLogo}

                  alt="Powered by GEN>IT"

                  className="h-10 object-contain opacity-90 hover:opacity-100 transition-opacity mix-blend-multiply mt-[-4px]"
                />
              )}

            </div>

          </div>

          {/* Right Panel */}
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

export default Login