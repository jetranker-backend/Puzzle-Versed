import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PuzzleWizard from '../components/PuzzleWizard'

export default function Dashboard() {
  const [puzzleBooks, setPuzzleBooks] = useState([])
  const [showWizard, setShowWizard] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUserAndPuzzleBooks()
  }, [])

  const loadUserAndPuzzleBooks = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) throw userError

      if (!user) {
        setError('No authenticated user found')
        setLoading(false)
        return
      }

      const { data: books, error: booksError } = await supabase
        .from('puzzle_books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (booksError) throw booksError

      setPuzzleBooks(books || [])
      
    } catch (error) {
      console.error('Error loading data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#e5816f] border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-red-400">
            <p>Error loading dashboard: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (puzzleBooks.length === 0 && !showWizard) {
    return (
      <div className="pt-20 min-h-screen bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to PuzzleVersed! 🎉
            </h2>
            <div className="bg-[#232629] rounded-xl p-8 max-w-3xl mx-auto mb-8 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Here's how it works:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center p-4">
                  <div className="text-[#e5816f] text-4xl mb-2">1</div>
                  <h4 className="text-white font-medium mb-2">Choose a Theme</h4>
                  <p className="text-gray-300 text-sm">Select from various themes to match your audience's interests</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-[#e5816f] text-4xl mb-2">2</div>
                  <h4 className="text-white font-medium mb-2">Generate Content</h4>
                  <p className="text-gray-300 text-sm">Our AI creates engaging puzzles and stories based on your theme</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-[#e5816f] text-4xl mb-2">3</div>
                  <h4 className="text-white font-medium mb-2">Customize & Export</h4>
                  <p className="text-gray-300 text-sm">Fine-tune your puzzle book and export it for your audience</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 flex items-center mx-auto"
            >
              <span>Create Your First Puzzle Book</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[#2a3036]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Puzzle Books</h1>
          {!showWizard && (
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 flex items-center"
            >
              <span>Create New Puzzle Book</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {showWizard ? (
          <PuzzleWizard onComplete={() => {
            setShowWizard(false)
            loadUserAndPuzzleBooks()
          }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {puzzleBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#232629] rounded-xl p-6 border border-gray-700 hover:border-[#e5816f] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#e5816f] transition-colors">
                    {book.title}
                  </h3>
                  <span className="px-3 py-1 bg-[#2a3036] rounded-full text-xs text-gray-300">
                    {book.status === 'completed' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">Theme: {book.theme}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(book.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setShowWizard(true)}
                    className="text-[#e5816f] hover:text-[#d6705f] font-medium transition-colors flex items-center"
                  >
                    <span>Continue Editing</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
