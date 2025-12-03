-- Fix security vulnerability: Restrict newsletter access to authenticated users only
-- Currently anyone can read newsletters, which exposes business content to competitors

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Anyone can view newsletters" ON public.newsletters;

-- Create a new policy that requires authentication to view newsletters
CREATE POLICY "Authenticated users can view newsletters" 
ON public.newsletters 
FOR SELECT 
TO authenticated
USING (true);