import React, { useState } from 'react';

export default function CustomizationPanel({ puzzleBook, onComplete }) {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [localPuzzleBook, setLocalPuzzleBook] = useState(puzzleBook);
  const [uploadedImages, setUploadedImages] = useState({});

  // Early return if puzzleBook is not properly structured
  if (!localPuzzleBook?.outline?.sections || !localPuzzleBook?.puzzles) {
    console.log('PuzzleBook structure:', localPuzzleBook); // Debug log
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-200">Please complete the puzzle generation first.</p>
      </div>
    );
  }

  const handlePuzzleUpdate = (index, field, value) => {
    const updatedPuzzles = [...localPuzzleBook.puzzles];
    updatedPuzzles[index] = { ...updatedPuzzles[index], [field]: value };
    const updatedPuzzleBook = {
      ...localPuzzleBook,
      puzzles: updatedPuzzles
    };
    setLocalPuzzleBook(updatedPuzzleBook);
    onComplete(updatedPuzzleBook);
  };

  const handleStoryUpdate = (newIntro) => {
    const updatedPuzzleBook = {
      ...localPuzzleBook,
      outline: {
        ...localPuzzleBook.outline,
        storyIntro: newIntro
      }
    };
    setLocalPuzzleBook(updatedPuzzleBook);
    onComplete(updatedPuzzleBook);
  };

  const handleImageUpload = async (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages(prev => ({
        ...prev,
        [index]: reader.result
      }));
      handlePuzzleUpdate(index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="neon-card">
        <h3 className="font-mono text-xl mb-4 text-gray-200">Story Introduction</h3>
        <textarea
          value={localPuzzleBook.outline.storyIntro}
          onChange={(e) => handleStoryUpdate(e.target.value)}
          className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-white"
          rows={4}
        />
      </div>

      <div className="space-y-6">
        {localPuzzleBook.puzzles.map((puzzle, index) => (
          <div key={index} className="neon-card">
            <h4 className="font-mono text-lg mb-4 text-gray-200">
              Chapter {index + 1}: {puzzle.title}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puzzle Type
                </label>
                <input
                  type="text"
                  value={puzzle.puzzleType}
                  readOnly
                  className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Setting
                </label>
                <textarea
                  value={puzzle.setting}
                  readOnly
                  className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puzzle Description
                </label>
                <textarea
                  value={puzzle.puzzleText}
                  onChange={(e) => handlePuzzleUpdate(index, 'puzzleText', e.target.value)}
                  className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hint
                </label>
                <input
                  type="text"
                  value={puzzle.hint}
                  onChange={(e) => handlePuzzleUpdate(index, 'hint', e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Answer
                </label>
                <input
                  type="text"
                  value={puzzle.answer}
                  onChange={(e) => handlePuzzleUpdate(index, 'answer', e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image Generation Prompt
                </label>
                <div className="space-y-2">
                  <textarea
                    value={puzzle.imagePrompt}
                    onChange={(e) => handlePuzzleUpdate(index, 'imagePrompt', e.target.value)}
                    className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-white"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <a
                      href={`https://ideogram.ai/t/create?prompt=${encodeURIComponent(puzzle.imagePrompt || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Create in Ideogram
                    </a>
                  </div>
                </div>
              </div>

              {uploadedImages[index] && (
                <div className="mt-4">
                  <img
                    src={uploadedImages[index]}
                    alt={`Chapter ${index + 1} illustration`}
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
