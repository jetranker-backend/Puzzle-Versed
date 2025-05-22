import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Sales from './pages/Sales'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2a3036] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#e5816f] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={!session ? <Sales /> : <Navigate to="/dashboard" />} />

        {/* Protected routes */}
        <Route element={session ? <Layout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
