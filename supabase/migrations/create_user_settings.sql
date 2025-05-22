/*
  # Create user settings and puzzle books tables
  
  1. New Tables
    - `user_settings`
      - Store user preferences and API keys
    - `puzzle_books`
      - Store puzzle book data
    - `puzzle_content`
      - Store generated content for each puzzle book
*/

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  openai_key text,
  display_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Puzzle books table
CREATE TABLE IF NOT EXISTS puzzle_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  theme text NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Puzzle content table
CREATE TABLE IF NOT EXISTS puzzle_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  puzzle_book_id uuid REFERENCES puzzle_books ON DELETE CASCADE NOT NULL,
  step text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzle_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzle_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own settings"
  ON user_settings
  USING (auth.uid() = id);

CREATE POLICY "Users can manage their own puzzle books"
  ON puzzle_books
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own puzzle content"
  ON puzzle_content
  USING (
    auth.uid() IN (
      SELECT user_id FROM puzzle_books WHERE id = puzzle_content.puzzle_book_id
    )
  );
