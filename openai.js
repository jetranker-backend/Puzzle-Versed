import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function generateStoryIdeas(theme, ageGroup, style) {
  try {
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
    throw new Error('Failed to generate story ideas');
  }
}

export async function generateStoryAndPuzzles(storyTitle, theme, style, chapterCount) {
  try {
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
    throw new Error('Failed to generate story');
  }
}

export async function generatePuzzle({ setting, goal, puzzleType }, theme) {
  try {
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
    throw new Error('Failed to generate puzzle');
  }
}
