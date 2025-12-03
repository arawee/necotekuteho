import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface PhotosBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const PhotosBlock = ({ block, onUpdate }: PhotosBlockProps) => {
  const photos = block.content.photos || [];
  
  const updatePhoto = (index: number, url: string) => {
    const newPhotos = [...photos];
    if (newPhotos[index]) {
      newPhotos[index] = { url, alt: '' };
    } else {
      newPhotos[index] = { url, alt: '' };
    }
    onUpdate({ ...block.content, photos: newPhotos });
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-0">
          {/* Left column */}
          <div className="space-y-0">
            <ImageUpload
              currentImage={photos[0]?.url}
              onImageUploaded={(url) => updatePhoto(0, url)}
              aspectRatio="3/5"
              placeholder="Upload first photo"
              showBorder={false}
            />
            <ImageUpload
              currentImage={photos[1]?.url}
              onImageUploaded={(url) => updatePhoto(1, url)}
              aspectRatio="3/5"
              placeholder="Upload second photo"
              showBorder={false}
            />
          </div>
          
          {/* Right column with offset */}
          <div className="space-y-0">
            <div className="h-16" /> {/* Spacer for offset */}
            <ImageUpload
              currentImage={photos[2]?.url}
              onImageUploaded={(url) => updatePhoto(2, url)}
              aspectRatio="3/5"
              placeholder="Upload third photo"
              showBorder={false}
            />
            <ImageUpload
              currentImage={photos[3]?.url}
              onImageUploaded={(url) => updatePhoto(3, url)}
              aspectRatio="3/5"
              placeholder="Upload fourth photo"
              showBorder={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};