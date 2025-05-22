import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A2E]">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(178,102,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,200,0.1),transparent_50%)]" />
      </div>
    </div>
  )
}
