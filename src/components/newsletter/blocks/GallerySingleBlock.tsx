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
        <div className="aspect-[16/9] overflow-hidden">
          <ImageUpload
            currentImage={photo.url}
            onImageUploaded={updatePhoto}
            aspectRatio="landscape"
            placeholder="Nahrát foto"
            className="w-full h-full"
            showBorder={false}
          />
        </div>
      </div>
    </div>
  );
};
