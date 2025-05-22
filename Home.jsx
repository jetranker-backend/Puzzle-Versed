import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-tech bg-clip-text text-transparent bg-gradient-to-r from-[#B266FF] to-[#FF4FF8]">
            Create Cosmic Puzzle Books with AI
          </h1>
          <p className="mt-6 text-xl text-[#C5C5C5] max-w-3xl mx-auto">
            Turn wild ideas into beautiful, story-driven puzzle adventures — crafted by AI and ready to publish.
          </p>
          <div className="mt-10">
            <Link 
              to="/create"
              className="px-8 py-4 bg-[#B266FF] hover:bg-[#00FFC8] transition-all duration-300 rounded-full text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(0,255,200,0.5)]"
            >
              Start Your First Puzzle Book
            </Link>
            <p className="mt-4 text-sm text-[#C5C5C5]">You'll be guided step-by-step to create something unique.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#1E3A8A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How PuzzleVerse Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Pick a Theme",
                description: "Choose from classic adventures or dream up your own setting."
              },
              {
                title: "Let AI Do the Heavy Lifting",
                description: "It builds your story, puzzles, answers, and logic — instantly."
              },
              {
                title: "Customize & Download",
                description: "Make it yours and get a formatted puzzle book you can sell, share, or print."
              }
            ].map((step, index) => (
              <div key={index} className="p-6 rounded-lg bg-[#1E3A8A]/20 border border-[#B266FF]/20 hover:border-[#B266FF]/50 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 text-[#00FFC8]">{step.title}</h3>
                <p className="text-[#C5C5C5]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made for Creators */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">No Tech? No Problem. This Is Creativity, Reimagined.</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-[#C5C5C5] mb-6">
              PuzzleVerse isn't just a tool — it's a launchpad for your ideas.
            </p>
            <p className="text-lg text-[#C5C5C5] mb-6">
              Whether you're an aspiring author, educator, side hustler, or someone who just loves puzzles, 
              you'll be amazed at what you can make.
            </p>
            <p className="text-lg text-[#C5C5C5]">
              Everything is beginner-friendly and powered by smart AI behind the scenes.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-[#1E3A8A]/20 to-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to See What You Can Create?</h2>
          <p className="text-xl text-[#C5C5C5] mb-10">Your first puzzle adventure is just a few clicks away.</p>
          <Link 
            to="/create"
            className="px-8 py-4 bg-[#B266FF] hover:bg-[#00FFC8] transition-all duration-300 rounded-full text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(0,255,200,0.5)]"
          >
            Start Creating Now
          </Link>
        </div>
      </section>
    </div>
  )
}
