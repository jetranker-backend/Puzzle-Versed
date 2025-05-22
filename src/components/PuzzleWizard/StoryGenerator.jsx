import React, { useState } from 'react';
import { generateStoryIdeas, generateStoryAndPuzzles } from '../../lib/openai';
import { supabase } from '../../lib/supabase';

export default function StoryGenerator({ theme, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [storyIdeas, setStoryIdeas] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [ageGroup, setAgeGroup] = useState('young-adult');
  const [style, setStyle] = useState('adventure');

  const checkApiKey = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_settings')
        .select('openai_key')
        .single();

      if (error) throw error;
      if (!data?.openai_key) {
        throw new Error('Please add your OpenAI API key in settings first');
      }
    } catch (error) {
      setError(error.message);
      return false;
    }
    return true;
  };

  const handleGenerateIdeas = async () => {
    setLoading(true);
    setError(null);

    try {
      const hasApiKey = await checkApiKey();
      if (!hasApiKey) return;

      const ideas = await generateStoryIdeas(theme, ageGroup, style);
      setStoryIdeas(ideas);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStorySelect = async (story) => {
    setSelectedStory(story);
    setLoading(true);
    setError(null);

    try {
      const storyData = await generateStoryAndPuzzles(
        story.title,
        theme,
        style,
        5 // Default to 5 chapters
      );
      onComplete({ ...storyData, title: story.title });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-800">{error}</p>
        {error.includes('API key') && (
          <a
            href="/profile"
            className="text-red-600 hover:text-red-800 font-medium mt-2 inline-block"
          >
            Go to Settings
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rest of the component remains the same */}
    </div>
  );
}
