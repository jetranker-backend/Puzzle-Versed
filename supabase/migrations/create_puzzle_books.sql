/*
  # Create Puzzle Books Tables
  
  1. New Tables
    - `puzzle_books`: Stores main puzzle book information
    - `puzzle_content`: Stores content for each step of puzzle creation
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create puzzle_books table
CREATE TABLE IF NOT EXISTS puzzle_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create puzzle_content table
CREATE TABLE IF NOT EXISTS puzzle_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  puzzle_book_id UUID REFERENCES puzzle_books(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE puzzle_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzle_content ENABLE ROW LEVEL SECURITY;

-- Policies for puzzle_books
CREATE POLICY "Users can view their own puzzle books"
  ON puzzle_books
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own puzzle books"
  ON puzzle_books
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own puzzle books"
  ON puzzle_books
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for puzzle_content
CREATE POLICY "Users can view their own puzzle content"
  ON puzzle_content
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM puzzle_books
      WHERE id = puzzle_book_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own puzzle content"
  ON puzzle_content
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM puzzle_books
      WHERE id = puzzle_book_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own puzzle content"
  ON puzzle_content
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM puzzle_books
      WHERE id = puzzle_book_id
      AND user_id = auth.uid()
    )
  );
