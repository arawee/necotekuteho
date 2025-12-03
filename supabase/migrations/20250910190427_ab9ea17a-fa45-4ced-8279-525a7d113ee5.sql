-- Create storage bucket for SVG icons
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('svg-icons', 'svg-icons', true, 5242880, ARRAY['image/svg+xml']);

-- Create RLS policies for SVG icons bucket
CREATE POLICY "SVG icons are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'svg-icons');

CREATE POLICY "Anyone can upload SVG icons" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'svg-icons' AND (storage.extension(name) = 'svg'));

CREATE POLICY "Anyone can update SVG icons" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'svg-icons');

CREATE POLICY "Anyone can delete SVG icons" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'svg-icons');