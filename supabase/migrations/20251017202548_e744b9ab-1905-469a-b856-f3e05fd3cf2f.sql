-- Add user_id column to newsletters table
ALTER TABLE public.newsletters 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Set user_id for existing newsletters to null (will need manual assignment or deletion)
-- For new newsletters, we'll make it NOT NULL with a default
ALTER TABLE public.newsletters 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view newsletters" ON public.newsletters;
DROP POLICY IF EXISTS "Authenticated users can create newsletters" ON public.newsletters;
DROP POLICY IF EXISTS "Authenticated users can update newsletters" ON public.newsletters;
DROP POLICY IF EXISTS "Authenticated users can delete newsletters" ON public.newsletters;

-- Create ownership-based RLS policies
CREATE POLICY "Users can view their own newsletters"
ON public.newsletters
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own newsletters"
ON public.newsletters
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own newsletters"
ON public.newsletters
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own newsletters"
ON public.newsletters
FOR DELETE
USING (auth.uid() = user_id);