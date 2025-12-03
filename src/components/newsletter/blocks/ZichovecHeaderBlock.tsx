import { NewsletterBlock } from '@/types/newsletter';
import { SvgUpload } from '@/components/ui/svg-upload';

interface ZichovecHeaderBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ZichovecHeaderBlock = ({ block, onUpdate }: ZichovecHeaderBlockProps) => {
  return (
    <div 
      className="w-full flex items-center justify-center py-16"
      style={{ backgroundColor: '#00D954', minHeight: '200px' }}
    >
      <div className="w-full max-w-md">
        <SvgUpload
          currentSvg={block.content.image || ''}
          onSvgUploaded={(svgContent) => onUpdate({ ...block.content, image: svgContent })}
          placeholder="Nahrát logo (SVG)"
          className="w-full"
        />
        {!block.content.image && (
          <div className="text-center">
            <h1 
              className="text-6xl font-black tracking-tight"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontStyle: 'italic',
                color: '#212121'
              }}
            >
              ZICHOVEC
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
