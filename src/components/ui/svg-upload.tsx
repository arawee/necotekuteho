import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SvgUploadProps {
  onSvgUploaded: (svgContent: string) => void;
  currentSvg?: string;
  className?: string;
  placeholder?: string;
}

export const SvgUpload = ({ 
  onSvgUploaded, 
  currentSvg, 
  className,
  placeholder = "Click to upload SVG or drag and drop"
}: SvgUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadSvg = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('Not authenticated');
        return null;
      }

      setProgress(20);

      // Upload via edge function to R2
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'svg-icons');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error('Upload error:', err);
        return null;
      }

      const result = await response.json();
      setProgress(75);

      // Fetch the SVG content from the public URL
      const svgResponse = await fetch(result.url);
      const svgContent = await svgResponse.text();

      setProgress(100);
      return svgContent;
    } catch (error) {
      console.error('Error uploading SVG:', error);
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const svgContent = await uploadSvg(file);
      if (svgContent) {
        onSvgUploaded(svgContent);
      }
    }
  }, [onSvgUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className={cn("w-full", className)}>
      {currentSvg ? (
        <div className="relative group/svg-icon">
          <div 
            className="w-8 h-8 cursor-pointer" 
            dangerouslySetInnerHTML={{ __html: currentSvg }}
          />
          <div className="absolute inset-0 opacity-0 group-hover/svg-icon:opacity-100 transition-opacity flex items-center justify-center">
            <div 
              className="bg-gray-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 shadow-lg cursor-pointer"
              {...getRootProps()}
            >
              <Upload className="h-3 w-3" />
              Replace
            </div>
          </div>
          <input {...getInputProps()} />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "w-8 h-8 border-2 border-dashed border-border transition-colors cursor-pointer rounded flex items-center justify-center",
            isDragActive && "border-primary bg-primary/5",
            uploading && "pointer-events-none opacity-50",
            "hover:border-primary hover:bg-primary/5"
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <FileImage className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      )}
      
      {uploading && (
        <div className="mt-2">
          <Progress value={progress} className="w-full h-1" />
        </div>
      )}
    </div>
  );
};
