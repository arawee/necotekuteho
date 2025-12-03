import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface SinglePhotoBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const SinglePhotoBlock = ({ block, onUpdate }: SinglePhotoBlockProps) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div 
          className="relative h-full aspect-[4/5] md:aspect-[3/4]"
        >
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