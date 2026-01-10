import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface GalleryTrioBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const GalleryTrioBlock = ({ block, onUpdate }: GalleryTrioBlockProps) => {
  const photos = block.content.photos || [
    { url: '', alt: '' },
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
        <div className="grid grid-cols-1">
          {/* Main large image - 1:1 ratio */}
          <div className="aspect-square overflow-hidden">
            <ImageUpload
              currentImage={photos[0]?.url}
              onImageUploaded={(url) => updatePhoto(0, url)}
              aspectRatio="square"
              placeholder="Nahrát hlavní foto"
              className="w-full h-full"
              showBorder={false}
            />
          </div>
          
          {/* Two smaller images - 3:4 ratio */}
          <div className="grid grid-cols-2">
            <div className="aspect-[3/4] overflow-hidden">
              <ImageUpload
                currentImage={photos[1]?.url}
                onImageUploaded={(url) => updatePhoto(1, url)}
                aspectRatio="portrait"
                placeholder="Nahrát foto 2"
                className="w-full h-full"
                showBorder={false}
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <ImageUpload
                currentImage={photos[2]?.url}
                onImageUploaded={(url) => updatePhoto(2, url)}
                aspectRatio="portrait"
                placeholder="Nahrát foto 3"
                className="w-full h-full"
                showBorder={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
