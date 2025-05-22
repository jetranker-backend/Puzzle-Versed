import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#2a3036]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
