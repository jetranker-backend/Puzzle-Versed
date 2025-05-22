import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ThemeSelector from './ThemeSelector';
import StoryGenerator from './StoryGenerator';
import PuzzleBuilder from './PuzzleBuilder';
import CustomizationPanel from './CustomizationPanel';
import ExportPanel from './ExportPanel';
import WizardNav from './WizardNav';

const steps = [
  { id: 'theme', title: 'Choose Theme' },
  { id: 'story', title: 'Generate Story' },
  { id: 'build', title: 'Build Puzzles' },
  { id: 'customize', title: 'Customize' },
  { id: 'export', title: 'Export' }
];

export default function PuzzleWizard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [theme, setTheme] = useState('');
  const [storyData, setStoryData] = useState(null);
  const [puzzleBook, setPuzzleBook] = useState(null);
  const [isPuzzlesGenerated, setIsPuzzlesGenerated] = useState(false);
  const [bookId, setBookId] = useState(null);

  const saveToDatabase = async (step, content) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      if (step === 'theme') {
        // Create new puzzle book
        const { data, error } = await supabase
          .from('puzzle_books')
          .insert({
            user_id: user.id,
            theme: content,
            title: `${content} Puzzle Book`,
            status: 'draft'
          })
          .select()
          .single()

        if (error) throw error
        setBookId(data.id)
      } else {
        // Save step content
        const { error } = await supabase
          .from('puzzle_content')
          .upsert({
            puzzle_book_id: bookId,
            step,
            content
          })

        if (error) throw error
      }
    } catch (error) {
      console.error('Error saving to database:', error)
    }
  }

  const handleThemeSelect = async (selectedTheme) => {
    setTheme(selectedTheme);
    await saveToDatabase('theme', selectedTheme);
    setCurrentStep(1);
  };

  const handleStoryGenerated = async (data) => {
    setStoryData(data);
    await saveToDatabase('story', data);
    setCurrentStep(2);
    setIsPuzzlesGenerated(false);
  };

  const handlePuzzlesComplete = async (data) => {
    setPuzzleBook(data);
    await saveToDatabase('puzzles', data);
    setIsPuzzlesGenerated(true);
    setCurrentStep(3);
  };

  const handleCustomizationComplete = async (customizedData) => {
    const updatedBook = { ...puzzleBook, ...customizedData };
    setPuzzleBook(updatedBook);
    await saveToDatabase('customization', customizedData);
    setCurrentStep(4);
  };

  const handleExportComplete = async () => {
    await supabase
      .from('puzzle_books')
      .update({ status: 'completed' })
      .eq('id', bookId);
    
    if (onComplete) onComplete();
  };

  const handleStepChange = (stepIndex) => {
    if (stepIndex === 3 && !isPuzzlesGenerated) {
      alert('Please complete the puzzle generation first');
      return;
    }
    setCurrentStep(stepIndex);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ThemeSelector onSelect={handleThemeSelect} />;
      case 1:
        return <StoryGenerator theme={theme} onComplete={handleStoryGenerated} />;
      case 2:
        return (
          <PuzzleBuilder 
            theme={theme} 
            storyData={storyData}
            onComplete={handlePuzzlesComplete} 
          />
        );
      case 3:
        return (
          <CustomizationPanel
            puzzleBook={puzzleBook}
            onComplete={handleCustomizationComplete}
          />
        );
      case 4:
        return <ExportPanel puzzleBook={puzzleBook} onComplete={handleExportComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <WizardNav
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      />
      <div className="mt-8">{renderStep()}</div>
    </div>
  );
}
