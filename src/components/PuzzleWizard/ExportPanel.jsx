import React from 'react'

export default function ExportPanel({ sequence, storyIntro }) {
  const handleExport = () => {
    // TODO: Implement PDF generation
    console.log('Exporting puzzle book...')
  }

  return (
    <div className="space-y-8">
      <div className="neon-card">
        <h3 className="font-mono text-xl mb-4">Your Puzzle Book Summary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-[#B266FF]">Story Introduction</h4>
            <p className="mt-2 text-gray-300">{storyIntro}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-[#B266FF]">Puzzle Count</h4>
            <p className="mt-2 text-gray-300">{sequence.length} puzzles</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleExport}
          className="px-8 py-4 bg-[#B266FF] hover:bg-[#00FFC8] transition-all duration-300 
                   rounded-full text-white font-medium text-lg 
                   hover:shadow-[0_0_20px_rgba(0,255,200,0.5)]"
        >
          Generate PDF
        </button>
      </div>
    </div>
  )
}
