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
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="aspect-[16/9] rounded-lg overflow-hidden">
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
