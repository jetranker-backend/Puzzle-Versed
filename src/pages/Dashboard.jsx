import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PuzzleWizard from '../components/PuzzleWizard'

export default function Dashboard() {
  const [puzzleBooks, setPuzzleBooks] = useState([])
  const [showWizard, setShowWizard] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPuzzleBooks()
  }, [])

  const loadPuzzleBooks = async () => {
    try {
      const { data: books, error } = await supabase
        .from('puzzle_books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPuzzleBooks(books || [])
    } catch (error) {
      console.error('Error loading puzzle books:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#e5816f] border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (puzzleBooks.length === 0 && !showWizard) {
    return (
      <div className="min-h-screen bg-[#2a3036]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to PuzzleVersed
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Create your first puzzle book and start engaging your audience with custom-designed puzzles.
            </p>
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105"
            >
              Create Your First Puzzle Book
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2a3036]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Puzzle Books</h1>
          {!showWizard && (
            <button
              onClick={() => setShowWizard(true)}
              className="bg-[#e5816f] hover:bg-[#d6705f] text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
            >
              Create New Puzzle Book
            </button>
          )}
        </div>

        {showWizard ? (
          <PuzzleWizard onComplete={() => {
            setShowWizard(false)
            loadPuzzleBooks()
          }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {puzzleBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#232629] rounded-xl p-6 border border-gray-700 hover:border-[#e5816f] transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-gray-300 mb-4">Theme: {book.theme}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(book.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setShowWizard(true)}
                    className="text-[#e5816f] hover:text-[#d6705f] font-medium transition-colors"
                  >
                    Continue Editing
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
