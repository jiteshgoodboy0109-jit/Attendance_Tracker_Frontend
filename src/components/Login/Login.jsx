// ─────────────────────────────────────────────────────────────────────────────
// Login.jsx — Attendify Attendance Tracker
// Features: Dark / Light theme toggle, GitHub color system, social login
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { FaApple, FaMeta } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineEye, HiOutlineEyeOff, HiSun, HiMoon } from 'react-icons/hi'
import loginIllustration from '../../assets/login-illustration.png'

function Login() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [isDark, setIsDark]     = useState(true)   // Theme toggle
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // ── Form Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    // TODO: replace with real API call
    setTimeout(() => {
      setLoading(false)
      alert(`Logged in as: ${email}`)
    }, 1500)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 🖼️ RENDER
  // We apply the "dark" class dynamically to the wrapper if isDark is true.
  // Tailwind's dark: prefix handles all the theme switching elegantly inline.
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center
                      px-4 py-8 transition-colors duration-300
                      bg-[#FFFFFF] dark:bg-[#0D1117]">

        {/* ── Theme Toggle (top-right) ─────────────────────────────────────── */}
        <div className="w-full max-w-3xl flex justify-end mb-3">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium
                       transition-all duration-300 hover:scale-105 hover:shadow-md
                       bg-[#FFFFFF] dark:bg-[#21262D]
                       border-[#D0D7DE] dark:border-[#30363D]
                       text-[#57606A] dark:text-[#C9D1D9]
                       hover:bg-[#F6F8FA] dark:hover:bg-[#30363D]
                       hover:text-[#0969DA] dark:hover:text-[#58A6FF]
                       hover:border-[#0969DA]/30 dark:hover:border-[#58A6FF]/30"
          >
            {isDark
              ? <><HiSun  className="w-4 h-4" /> Light</>
              : <><HiMoon className="w-4 h-4" /> Dark</>}
          </button>
        </div>

        {/* ── Main Card ────────────────────────────────────────────────────── */}
        <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden
                        transition-all duration-500 hover:-translate-y-1
                        shadow-2xl shadow-black/10 dark:shadow-black/50
                        hover:shadow-[0_25px_50px_-12px_rgba(9,105,218,0.15)] dark:hover:shadow-[0_25px_50px_-12px_rgba(31,111,235,0.15)]
                        border border-[#D0D7DE] dark:border-[#30363D]
                        hover:border-[#0969DA]/20 dark:hover:border-[#1F6FEB]/30">

          {/* ════════════════════════════════════════════════════════════════
              LEFT PANEL — Login Form
          ════════════════════════════════════════════════════════════════ */}
          <div className="flex-1 px-10 py-12 flex flex-col justify-center transition-colors duration-300
                          bg-[#FFFFFF] dark:bg-[#161B22]">

            {/* Heading */}
            <h1 className="text-2xl font-bold text-center mb-1
                           text-[#24292F] dark:text-[#F0F6FC]">
              Back on Track 😎
            </h1>
            <p className="text-sm text-center mb-8
                          text-[#57606A] dark:text-[#8B949E]">
              Login to your ATR panel 
            </p>

            {/* Error message */}
            {error && (
              <p className="text-xs text-center mb-4 text-[#CF222E] dark:text-[#F85149]">
                ⚠️ {error}
              </p>
            )}

            {/* ── Form ────────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[#24292F] dark:text-[#C9D1D9]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border outline-none
                             transition-all duration-300
                             bg-[#FFFFFF] dark:bg-[#0D1117]
                             hover:bg-[#F6F8FA] dark:hover:bg-[#161B22]
                             border-[#D0D7DE] dark:border-[#30363D]
                             hover:border-[#B0B8C1] dark:hover:border-[#484F58]
                             text-[#24292F] dark:text-[#C9D1D9]
                             placeholder:text-[#A0A7AE] dark:placeholder:text-[#484F58]
                             focus:bg-[#FFFFFF] dark:focus:bg-[#0D1117]
                             focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                             focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">

                {/* Label row: "Password" + "Forgot?" */}
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-[#24292F] dark:text-[#C9D1D9]">
                    Password
                  </label>
                  <a href="/forgot-password"
                     className="text-xs transition-all duration-200
                                text-[#0969DA] dark:text-[#58A6FF]
                                hover:text-[#218BFF] dark:hover:text-[#388BFD]
                                hover:underline decoration-[#0969DA]/40 dark:decoration-[#58A6FF]/40 underline-offset-4">
                    Forgot your password?
                  </a>
                </div>

                {/* Input + show/hide toggle */}
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full px-3 py-2.5 pr-11 text-sm rounded-lg border outline-none
                               transition-all duration-300
                               bg-[#FFFFFF] dark:bg-[#0D1117]
                               hover:bg-[#F6F8FA] dark:hover:bg-[#161B22]
                               border-[#D0D7DE] dark:border-[#30363D]
                               hover:border-[#B0B8C1] dark:hover:border-[#484F58]
                               text-[#24292F] dark:text-[#C9D1D9]
                               focus:bg-[#FFFFFF] dark:focus:bg-[#0D1117]
                               focus:border-[#0969DA] dark:focus:border-[#1F6FEB]
                               focus:ring-2 focus:ring-[#0969DA]/15 dark:focus:ring-[#1F6FEB]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                               transition-all duration-200 hover:scale-110 active:scale-95
                               text-[#57606A] dark:text-[#8B949E]
                               hover:text-[#0969DA] dark:hover:text-[#58A6FF]"
                  >
                    {showPass
                      ? <HiOutlineEyeOff className="w-5 h-5" />
                      : <HiOutlineEye    className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-1 text-sm font-semibold rounded-lg text-white
                           transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           bg-[#2DA44E] dark:bg-[#238636]
                           hover:bg-[#2C974B] dark:hover:bg-[#2EA043]
                           active:bg-[#26874B] dark:active:bg-[#196C2E]
                           shadow-[0_1px_3px_rgba(27,31,36,0.12)] dark:shadow-lg dark:shadow-[#238636]/30
                           hover:shadow-[0_8px_20px_rgba(45,164,78,0.3)] dark:hover:shadow-[0_8px_20px_rgba(46,160,67,0.4)]"
              >
                {loading ? 'Logging in…' : 'Login'}
              </button>

            </form>

            {/* ── Sign Up Link ────────────────────────────────────────────── */}
            <p className="text-center text-xs mt-6 text-[#57606A] dark:text-[#8B949E]">
              Don't have an account?{' '}
              <a href="/register"
                 className="font-semibold transition-all duration-200
                            text-[#0969DA] dark:text-[#58A6FF]
                            hover:text-[#218BFF] dark:hover:text-[#388BFD]
                            hover:underline decoration-[#0969DA]/40 dark:decoration-[#58A6FF]/40 underline-offset-4">
                Sign up
              </a>
            </p>

          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT PANEL — Illustration
          ════════════════════════════════════════════════════════════════ */}
          <div className="hidden md:block flex-1 transition-colors duration-300 overflow-hidden
                          bg-[#F6F8FA] dark:bg-[#21262D]">
            <img
              src={loginIllustration}
              alt="Attendance tracking illustration"
              className="w-full h-full object-cover animate-zoom"
            />
          </div>

        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <p className="mt-5 text-xs text-center max-w-md transition-colors duration-300
                      text-[#6E7781] dark:text-[#6E7681]">
          By clicking continue, you agree to our{' '}
          <a href="/terms"
             className="font-medium transition-all duration-200
                        text-[#57606A] dark:text-[#8B949E]
                        hover:text-[#0969DA] dark:hover:text-[#58A6FF]
                        hover:underline decoration-[#0969DA]/40 dark:decoration-[#58A6FF]/40 underline-offset-4">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy"
             className="font-medium transition-all duration-200
                        text-[#57606A] dark:text-[#8B949E]
                        hover:text-[#0969DA] dark:hover:text-[#58A6FF]
                        hover:underline decoration-[#0969DA]/40 dark:decoration-[#58A6FF]/40 underline-offset-4">
            Privacy Policy
          </a>.
        </p>

      </div>
    </div>
  )
}

export default Login
