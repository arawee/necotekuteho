-- Create storage bucket for newsletter images
INSERT INTO storage.buckets (id, name, public)
VALUES ('newsletter-images', 'newsletter-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anyone to read images (public bucket)
CREATE POLICY "Public read access for newsletter images"
ON storage.objects FOR SELECT
USING (bucket_id = 'newsletter-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload newsletter images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'newsletter-images' AND auth.uid() IS NOT NULL);

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update newsletter images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'newsletter-images' AND auth.uid() IS NOT NULL);

-- Allow authenticated users to delete their uploaded images
CREATE POLICY "Authenticated users can delete newsletter images"
ON storage.objects FOR DELETE
USING (bucket_id = 'newsletter-images' AND auth.uid() IS NOT NULL);