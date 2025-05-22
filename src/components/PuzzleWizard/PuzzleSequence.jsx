import React, { useState, useEffect } from 'react'

const PUZZLE_TYPES = [
  { id: 'riddle', label: 'Riddle', icon: '🤔' },
  { id: 'logic', label: 'Logic Puzzle', icon: '🧩' },
  { id: 'cipher', label: 'Cipher', icon: '🔐' },
  { id: 'maze', label: 'Maze', icon: '🌀' },
  { id: 'visual', label: 'Visual Puzzle', icon: '👁️' }
]

export default function PuzzleSequence({ story, onUpdateStory }) {
  const [editingSection, setEditingSection] = useState(null)
  const [draggedSection, setDraggedSection] = useState(null)
  const [localStory, setLocalStory] = useState(story)

  // Initialize story when it changes
  useEffect(() => {
    setLocalStory(story);
  }, [story]);

  const handleSectionDragStart = (index) => {
    setDraggedSection(index)
  }

  const handleSectionDragOver = (e, index) => {
    e.preventDefault()
    if (draggedSection === null || draggedSection === index) return

    const newSections = [...localStory.sections]
    const draggedItem = newSections[draggedSection]
    newSections.splice(draggedSection, 1)
    newSections.splice(index, 0, draggedItem)

    const updatedStory = {
      ...localStory,
      sections: newSections
    }
    setLocalStory(updatedStory)
    onUpdateStory(updatedStory)
    setDraggedSection(index)
  }

  const handleSectionUpdate = (index, field, value) => {
    const newSections = [...localStory.sections]
    newSections[index] = {
      ...newSections[index],
      [field]: value
    }
    const updatedStory = {
      ...localStory,
      sections: newSections
    }
    setLocalStory(updatedStory)
    onUpdateStory(updatedStory)
  }

  const handlePuzzleSelect = (sectionIndex, puzzleType) => {
    const newSections = [...localStory.sections]
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      puzzleType: puzzleType
    }
    const updatedStory = {
      ...localStory,
      sections: newSections
    }
    setLocalStory(updatedStory)
    onUpdateStory(updatedStory)
  }

  const handleStoryIntroUpdate = (value) => {
    const updatedStory = {
      ...localStory,
      storyIntro: value
    }
    setLocalStory(updatedStory)
    onUpdateStory(updatedStory)
  }

  return (
    <div className="space-y-8">
      {/* Story Introduction */}
      <div className="neon-card">
        <h3 className="text-xl font-bold text-[#B266FF] mb-4">Story Introduction</h3>
        <textarea
          value={localStory.storyIntro}
          onChange={(e) => handleStoryIntroUpdate(e.target.value)}
          className="w-full p-4 bg-gray-800/50 rounded-lg border border-[#B266FF]/20 text-white"
          rows={4}
        />
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {localStory.sections.map((section, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleSectionDragStart(index)}
            onDragOver={(e) => handleSectionDragOver(e, index)}
            className={`neon-card transition-all duration-300 ${
              draggedSection === index ? 'opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-[#B266FF]">☰</span>
                <h4 className="text-lg font-bold text-[#B266FF]">
                  Chapter {index + 1}
                </h4>
              </div>
              <button
                onClick={() => setEditingSection(editingSection === index ? null : index)}
                className="text-[#B266FF] hover:text-[#00FFC8]"
              >
                {editingSection === index ? '✓ Done' : '✎ Edit'}
              </button>
            </div>

            {editingSection === index ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(index, 'title', e.target.value)}
                    className="w-full p-2 bg-gray-800/50 rounded-lg border border-[#B266FF]/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Setting
                  </label>
                  <textarea
                    value={section.setting}
                    onChange={(e) => handleSectionUpdate(index, 'setting', e.target.value)}
                    className="w-full p-2 bg-gray-800/50 rounded-lg border border-[#B266FF]/20 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Goal
                  </label>
                  <textarea
                    value={section.goal}
                    onChange={(e) => handleSectionUpdate(index, 'goal', e.target.value)}
                    className="w-full p-2 bg-gray-800/50 rounded-lg border border-[#B266FF]/20 text-white"
                    rows={2}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-medium text-white">{section.title}</h5>
                </div>

                <div>
                  <h6 className="text-sm font-medium text-gray-400">Setting</h6>
                  <p className="mt-1 text-white">{section.setting}</p>
                </div>

                <div>
                  <h6 className="text-sm font-medium text-gray-400">Goal</h6>
                  <p className="mt-1 text-white">{section.goal}</p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-sm font-medium text-gray-400">Select Puzzle Type</h6>
                    {section.recommendedPuzzleType && (
                      <span className="text-sm text-[#00FFC8]">
                        Recommended: {PUZZLE_TYPES.find(p => p.id === section.recommendedPuzzleType)?.label}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PUZZLE_TYPES.map((puzzle) => (
                      <button
                        key={puzzle.id}
                        onClick={() => handlePuzzleSelect(index, puzzle.id)}
                        className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                          section.puzzleType === puzzle.id
                            ? 'bg-[#B266FF] text-white'
                            : 'bg-[#B266FF]/20 text-[#B266FF] hover:bg-[#B266FF]/30'
                        }`}
                      >
                        <span>{puzzle.icon}</span>
                        <span>{puzzle.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
