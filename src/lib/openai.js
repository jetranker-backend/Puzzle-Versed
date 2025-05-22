import OpenAI from 'openai';
import { supabase } from './supabase';

async function getUserApiKey() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user found');

    const { data, error } = await supabase
      .from('user_settings')
      .select('openai_key')
      .single();

    if (error) throw error;
    if (!data?.openai_key) throw new Error('OpenAI API key not found');

    return data.openai_key;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw new Error('Please add your OpenAI API key in settings to continue');
  }
}

export async function generateStoryIdeas(theme, ageGroup, style) {
  try {
    const apiKey = await getUserApiKey();
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a creative writer specializing in puzzle books and escape room narratives."
        },
        {
          role: "user",
          content: `Create 4 unique story ideas for a puzzle book with theme: ${theme}, age group: ${ageGroup}, and style: ${style}.
                   
                   Format as JSON array with 4 objects:
                   [{
                     "title": "string",
                     "description": "string (2-3 sentences)"
                   }]`
        }
      ],
      temperature: 0.8
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

export async function generateStoryAndPuzzles(storyTitle, theme, style, chapterCount) {
  try {
    const apiKey = await getUserApiKey();
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a creative writer specializing in puzzle books and escape room narratives. 
                   Create cohesive stories that progress logically from start to finish, maintaining 
                   the theme throughout while building tension and interest.`
        },
        {
          role: "user",
          content: `Create a detailed ${chapterCount}-chapter outline for the story: "${storyTitle}"
                   Theme: ${theme}
                   Style: ${style}
                   
                   Requirements:
                   - Each chapter should logically progress the story
                   - Maintain consistent theme throughout
                   - Build tension and complexity as the story progresses
                   - Create natural opportunities for puzzles in each chapter
                   - Final chapter should provide satisfying resolution
                   
                   Format as JSON:
                   {
                     "storyIntro": "string (overall story introduction)",
                     "sections": [
                       {
                         "title": "string (chapter title)",
                         "setting": "string (detailed chapter setting and situation)",
                         "goal": "string (specific chapter objective that progresses the story)"
                       }
                     ]
                   }`
        }
      ],
      temperature: 0.7
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

export async function generatePuzzle({ setting, goal, puzzleType }, theme) {
  try {
    const apiKey = await getUserApiKey();
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a puzzle designer specializing in creating engaging and thematic puzzles for escape rooms and puzzle books."
        },
        {
          role: "user",
          content: `Create a ${puzzleType} puzzle that fits within this setting and theme:
                   Setting: ${setting}
                   Theme: ${theme}
                   Goal: ${goal}
                   
                   Requirements:
                   - Puzzle should be challenging but solvable
                   - Include a clear puzzle description
                   - Provide a subtle hint that helps without giving away the answer
                   - Include a complete solution with explanation
                   - Ensure the puzzle type (${puzzleType}) is clearly implemented
                   
                   Format as JSON:
                   {
                     "puzzleText": "string (the puzzle description/question)",
                     "hint": "string (subtle hint that helps without giving away the answer)",
                     "solution": "string (the complete solution with explanation)"
                   }`
        }
      ],
      temperature: 0.7
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}
