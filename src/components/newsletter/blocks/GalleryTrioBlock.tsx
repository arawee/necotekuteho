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
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {/* Main large image */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <ImageUpload
              currentImage={photos[0]?.url}
              onImageUploaded={(url) => updatePhoto(0, url)}
              aspectRatio="landscape"
              placeholder="Nahrát hlavní foto"
              className="w-full h-full"
              showBorder={false}
            />
          </div>
          
          {/* Two smaller images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <ImageUpload
                currentImage={photos[1]?.url}
                onImageUploaded={(url) => updatePhoto(1, url)}
                aspectRatio="landscape"
                placeholder="Nahrát foto 2"
                className="w-full h-full"
                showBorder={false}
              />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <ImageUpload
                currentImage={photos[2]?.url}
                onImageUploaded={(url) => updatePhoto(2, url)}
                aspectRatio="landscape"
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
