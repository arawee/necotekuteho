import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface GallerySingleBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const GallerySingleBlock = ({ block, onUpdate }: GallerySingleBlockProps) => {
  const photo = block.content.photos?.[0] || { url: '', alt: '' };

  const updatePhoto = (url: string) => {
    onUpdate({ ...block.content, photos: [{ url, alt: photo.alt || '' }] });
  };

  return (
    <div className="bg-white border border-border">
      <div className="max-w-2xl mx-auto">
        {/* 3:4 ratio */}
        <div className="aspect-[3/4] overflow-hidden">
          <ImageUpload
            currentImage={photo.url}
            onImageUploaded={updatePhoto}
            aspectRatio="portrait"
            placeholder="Nahrát foto"
            className="w-full h-full object-cover"
            showBorder={false}
          />
        </div>
      </div>
    </div>
  );
};
