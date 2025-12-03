import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface SinglePhotoSquareBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const SinglePhotoSquareBlock = ({ block, onUpdate }: SinglePhotoSquareBlockProps) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="max-w-1xl mx-auto">
        <div className="relative h-full aspect-[3/2] md:aspect-[5/3]">
          <div
            className="h-full w-full rounded-[32px] overflow-hidden"
            style={{ height: '100%', marginLeft: '50%', transform: 'translateX(-50%)' }}
          >
            <ImageUpload
              currentImage={block.content.image}
              onImageUploaded={(url) => onUpdate({ ...block.content, image: url })}
              placeholder="Nahrát fotku"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};