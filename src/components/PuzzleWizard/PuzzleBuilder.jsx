import React, { useState } from 'react';
import PuzzleSequence from './PuzzleSequence';
import { generatePuzzle } from '../../lib/openai';

export default function PuzzleBuilder({ theme, storyData, onComplete }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStory, setCurrentStory] = useState(storyData);

  const handleUpdateStory = (updatedStory) => {
    setCurrentStory(updatedStory);
  };

  const handleComplete = async () => {
    // Validate that all sections have a puzzle type selected
    const missingPuzzleTypes = currentStory.sections.some(section => !section.puzzleType);
    if (missingPuzzleTypes) {
      alert('Please select a puzzle type for all chapters before generating');
      return;
    }

    setIsGenerating(true);
    try {
      // Generate puzzles for each section
      const sectionsWithPuzzles = await Promise.all(
        currentStory.sections.map(async (section) => {
          const puzzle = await generatePuzzle(section, theme);
          return {
            ...section,
            puzzle: {
              ...puzzle,
              puzzleType: section.puzzleType,
              imagePrompt: `Create an illustration for a ${section.puzzleType} puzzle in a ${theme} themed story. The scene: ${section.setting}. The puzzle involves: ${puzzle.puzzleText}`
            }
          };
        })
      );

      const completedPuzzleBook = {
        outline: currentStory,
        puzzles: sectionsWithPuzzles.map(section => ({
          puzzleType: section.puzzleType,
          puzzleText: section.puzzle.puzzleText,
          hint: section.puzzle.hint,
          answer: section.puzzle.solution,
          imagePrompt: section.puzzle.imagePrompt,
          title: section.title,
          setting: section.setting
        }))
      };

      onComplete(completedPuzzleBook);
    } catch (error) {
      console.error('Failed to generate puzzles:', error);
      alert('Failed to generate puzzles. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-200">Build Your Puzzle Sequence</h2>
      <PuzzleSequence 
        story={currentStory} 
        onUpdateStory={handleUpdateStory}
      />
      <div className="flex justify-end mt-8">
        <button
          onClick={handleComplete}
          disabled={isGenerating}
          className="px-6 py-2 bg-[#B266FF] text-white rounded-lg hover:bg-[#B266FF]/80 transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Generating Puzzles...' : 'Complete Puzzle Generation'}
        </button>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-white">Generating Puzzles...</p>
          </div>
        </div>
      )}
    </div>
  );
}
