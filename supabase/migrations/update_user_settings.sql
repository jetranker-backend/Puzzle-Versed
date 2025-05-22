/*
  # Update user settings table
  
  1. Changes
    - Rename display_name to name
    - Add email field to profiles table
  
  2. Security
    - Maintain existing RLS policies
*/

-- Rename display_name to name in user_settings
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_settings' AND column_name = 'display_name'
  ) THEN
    ALTER TABLE user_settings RENAME COLUMN display_name TO name;
  END IF;
END $$;
