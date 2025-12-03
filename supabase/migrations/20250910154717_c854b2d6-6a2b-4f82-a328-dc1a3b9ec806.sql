-- Create storage bucket for newsletter images
INSERT INTO storage.buckets (id, name, public) VALUES ('newsletter-images', 'newsletter-images', true);

-- Create storage policies for newsletter images
CREATE POLICY "Newsletter images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'newsletter-images');

CREATE POLICY "Anyone can upload newsletter images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'newsletter-images');

CREATE POLICY "Anyone can update newsletter images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'newsletter-images');

CREATE POLICY "Anyone can delete newsletter images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'newsletter-images');

-- Create newsletters table
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletters
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletters (public access for now)
CREATE POLICY "Newsletters are publicly accessible" 
ON public.newsletters 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create uploaded_images table for tracking image metadata
CREATE TABLE public.uploaded_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on uploaded_images
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

-- Create policies for uploaded_images (public access for now)
CREATE POLICY "Uploaded images are publicly accessible" 
ON public.uploaded_images 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on newsletters
CREATE TRIGGER update_newsletters_updated_at
BEFORE UPDATE ON public.newsletters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();