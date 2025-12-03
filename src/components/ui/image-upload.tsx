import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | '2/1' | '3/5';
  placeholder?: string;
  showBorder?: boolean;
}

export const ImageUpload = ({ 
  onImageUploaded, 
  currentImage, 
  className,
  aspectRatio,
  placeholder = "Click to upload or drag and drop",
  showBorder = true
}: ImageUploadProps) => {
  const { uploadImage, uploading, progress } = useImageUpload();
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const result = await uploadImage(file);
      if (result) {
        onImageUploaded(result.url);
      }
    }
  }, [uploadImage, onImageUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const removeImage = () => {
    onImageUploaded('');
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[3/5]',
    '2/1': 'aspect-[2/1]',
    '3/5': 'aspect-[3/5]'
  };

  return (
    <div className={cn("w-full", className, aspectRatio ? aspectRatioClasses[aspectRatio] : "")}>
      {currentImage ? (
        <div className={cn("relative overflow-hidden h-full", showBorder && "border border-border")} style={{ borderRadius: '32px' }}>
          <img 
            src={currentImage} 
            alt="Uploaded" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
            <Button
              variant="destructive"
              size="sm"
              onClick={removeImage}
              className="absolute top-2 right-2 flex items-center justify-center z-10 rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Button
                variant="secondary"
                size="sm"
                {...getRootProps()}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 flex items-center pointer-events-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace
              </Button>
            </div>
          </div>
          <input {...getInputProps()} />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            showBorder ? "border-2 border-dashed border-border" : "",
            "transition-colors cursor-pointer h-full",
            isDragActive && "border-primary bg-primary/5",
            uploading && "pointer-events-none opacity-50",
            showBorder && "hover:border-primary hover:bg-primary/5"
          )}
          style={showBorder ? { borderRadius: '32px' } : {}}
        >
          <input {...getInputProps()} />
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 mb-4 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground mb-2">Uploading...</p>
                <Progress value={progress} className="w-full max-w-xs" />
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">{placeholder}</p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};