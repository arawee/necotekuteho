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
      // Generate unique filename
      const fileExt = 'svg';
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('svg-icons')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      setProgress(50);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('svg-icons')
        .getPublicUrl(filePath);

      setProgress(75);

      // Fetch the SVG content
      const response = await fetch(urlData.publicUrl);
      const svgContent = await response.text();

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