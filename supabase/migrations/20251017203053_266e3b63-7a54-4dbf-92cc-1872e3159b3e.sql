-- Add user_id column to uploaded_images table for ownership tracking
ALTER TABLE public.uploaded_images 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Set default for new uploads
ALTER TABLE public.uploaded_images 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Update existing images to set user_id to null (will require manual assignment or can be left as is)
-- Note: Existing images won't have ownership tracking, but new ones will

-- Drop the overly permissive public access policy
DROP POLICY IF EXISTS "Uploaded images are publicly accessible" ON public.uploaded_images;

-- Create ownership-based RLS policies for uploaded_images
CREATE POLICY "Users can view their own images"
ON public.uploaded_images
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own images"
ON public.uploaded_images
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images"
ON public.uploaded_images
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images"
ON public.uploaded_images
FOR DELETE
USING (auth.uid() = user_id);