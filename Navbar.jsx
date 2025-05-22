import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isWizardPage = location.pathname.includes('/create')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? 'bg-[#0D0D0D]/80 backdrop-blur-lg' : 'bg-[#0D0D0D]'}
      border-b border-[#B266FF]/20
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img 
                src="https://funnelmates.com/wp-content/uploads/2025/05/ZMHgMsZ8QxKjb3IC8CLvUQ-1.png" 
                alt="PuzzleVerse"
                className="h-8"
              />
            </Link>
          </div>
          <div className="flex items-center">
            {!isWizardPage && (
              <Link 
                to="/create" 
                className="bg-[#B266FF] hover:bg-[#00FFC8] transition-all duration-300 
                         text-white px-6 py-2 rounded-full text-sm font-medium 
                         hover:shadow-[0_0_20px_rgba(0,255,200,0.5)]
                         flex items-center space-x-2"
              >
                <span className="text-lg">✨</span>
                <span>New Project</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
