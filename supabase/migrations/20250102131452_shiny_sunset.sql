/*
  # Create stores table

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `latitude` (double precision)
      - `longitude` (double precision)
      - `phone` (text, optional)
      - `email` (text, optional)
      - `description` (text, optional)
      - `opening_hours` (jsonb, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `stores` table
    - Add policies for public read access
    - Add policies for authenticated users to manage stores
*/

CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  phone text,
  email text,
  description text,
  opening_hours jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON stores
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated users to manage stores
CREATE POLICY "Allow authenticated users to manage stores"
  ON stores
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_stores_updated_at
  BEFORE UPDATE ON stores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();