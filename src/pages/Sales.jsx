import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthModal from '../components/AuthModal'

export default function Sales() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('signup')

  const openAuth = (mode) => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  return (
    <div className="min-h-screen">
      {/* Menu Bar */}
      <nav className="fixed w-full z-50 top-0 bg-[#2a3036] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <img 
                src="https://funnelmates.com/wp-content/uploads/2025/05/PuzzleVersedLogo-1.png" 
                alt="PuzzleVersed" 
                className="h-12"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openAuth('login')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create Engaging Puzzle Books <br />
              <span className="text-[#e5816f]">in Minutes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your ideas into professional puzzle books with AI-powered assistance. 
              Perfect for educators, creators, and puzzle enthusiasts.
            </p>
            <button
              onClick={() => openAuth('signup')}
              className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#232629] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Create Amazing Puzzle Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2a3036] p-6 rounded-xl">
              <div className="text-[#e5816f] text-2xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Design</h3>
              <p className="text-gray-300">Create professional-looking puzzles with our intelligent design assistant.</p>
            </div>
            <div className="bg-[#2a3036] p-6 rounded-xl">
              <div className="text-[#e5816f] text-2xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Puzzle Types</h3>
              <p className="text-gray-300">Choose from a variety of puzzle styles to keep your audience engaged.</p>
            </div>
            <div className="bg-[#2a3036] p-6 rounded-xl">
              <div className="text-[#e5816f] text-2xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Export</h3>
              <p className="text-gray-300">Download your puzzle books in multiple formats, ready for distribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#2a3036] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[#e5816f] text-3xl mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Your Theme</h3>
              <p className="text-gray-300">Select from various themes or create your own custom style.</p>
            </div>
            <div className="text-center">
              <div className="text-[#e5816f] text-3xl mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Add Content</h3>
              <p className="text-gray-300">Input your puzzle content or let our AI help generate ideas.</p>
            </div>
            <div className="text-center">
              <div className="text-[#e5816f] text-3xl mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Customize Design</h3>
              <p className="text-gray-300">Adjust layouts, colors, and styles to match your vision.</p>
            </div>
            <div className="text-center">
              <div className="text-[#e5816f] text-3xl mb-4">4</div>
              <h3 className="text-xl font-semibold text-white mb-2">Export & Share</h3>
              <p className="text-gray-300">Download your puzzle book in your preferred format.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#232629] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#2a3036] p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-2">Basic</h3>
              <div className="text-3xl font-bold text-white mb-4">$9<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-300">✓ 5 Puzzle Books/month</li>
                <li className="text-gray-300">✓ Basic Templates</li>
                <li className="text-gray-300">✓ PDF Export</li>
              </ul>
              <button onClick={() => openAuth('signup')} className="w-full bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                Get Started
              </button>
            </div>
            <div className="bg-[#2a3036] p-8 rounded-xl border border-[#e5816f]">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-3xl font-bold text-white mb-4">$19<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-300">✓ Unlimited Puzzle Books</li>
                <li className="text-gray-300">✓ Premium Templates</li>
                <li className="text-gray-300">✓ Multiple Export Formats</li>
                <li className="text-gray-300">✓ AI Content Assistant</li>
              </ul>
              <button onClick={() => openAuth('signup')} className="w-full bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                Get Started
              </button>
            </div>
            <div className="bg-[#2a3036] p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-white mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-300">✓ All Pro Features</li>
                <li className="text-gray-300">✓ Custom Templates</li>
                <li className="text-gray-300">✓ API Access</li>
                <li className="text-gray-300">✓ Dedicated Support</li>
              </ul>
              <button onClick={() => openAuth('signup')} className="w-full bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2a3036] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your First Puzzle Book?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are engaging their audience with custom puzzle books.
          </p>
          <button
            onClick={() => openAuth('signup')}
            className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          defaultMode={authMode}
        />
      )}
    </div>
  )
}
