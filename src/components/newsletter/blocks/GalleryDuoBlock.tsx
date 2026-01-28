import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface GalleryDuoBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const GalleryDuoBlock = ({ block, onUpdate }: GalleryDuoBlockProps) => {
  const photos = block.content.photos || [
    { url: '', alt: '' },
    { url: '', alt: '' }
  ];

  const updatePhoto = (index: number, url: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = { url, alt: '' };
    onUpdate({ ...block.content, photos: newPhotos });
  };

  return (
    <div className="bg-white border border-border">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2">
          {/* Both images 3:4 ratio */}
          <div className="aspect-[3/4] overflow-hidden">
          <ImageUpload
              currentImage={photos[0]?.url}
              onImageUploaded={(url) => updatePhoto(0, url)}
              aspectRatio="portrait"
              placeholder="Nahrát foto 1"
              className="w-full h-full object-cover"
              showBorder={false}
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <ImageUpload
              currentImage={photos[1]?.url}
              onImageUploaded={(url) => updatePhoto(1, url)}
              aspectRatio="portrait"
              placeholder="Nahrát foto 2"
              className="w-full h-full object-cover"
              showBorder={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
