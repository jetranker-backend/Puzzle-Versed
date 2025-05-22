import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthModal({ isOpen, onClose, defaultMode = 'signup' }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState(defaultMode)
  const [loading, setLoading] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: window.location.origin
          }
        })

        if (signUpError) throw signUpError
        setSignupComplete(true)
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })

        if (signInError) throw signInError
        
        if (data.user) {
          // Check if the user's email is confirmed
          if (data.user.email_confirmed_at || data.user.confirmed_at) {
            onClose()
            navigate('/dashboard')
          } else {
            throw new Error('Please confirm your email address before signing in.')
          }
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  if (signupComplete) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-tech">Welcome!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your account has been created successfully. You can now sign in to start creating amazing puzzle books!
          </p>
          <button
            onClick={() => {
              setMode('login')
              setSignupComplete(false)
            }}
            className="bg-gradient-to-r from-[#e5816f] to-[#d6705f] text-white px-8 py-3 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:scale-105 w-full"
          >
            Continue to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-tech">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-500 mb-6">
          {mode === 'signup' ? 'Start creating amazing puzzle books' : 'Sign in to your account'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-base focus:border-[#e5816f] focus:ring-[#e5816f] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-base focus:border-[#e5816f] focus:ring-[#e5816f] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-base focus:border-[#e5816f] focus:ring-[#e5816f] transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#e5816f] to-[#d6705f] text-white px-8 py-3 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-base text-gray-600 hover:text-[#e5816f] transition-colors"
          >
            {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
