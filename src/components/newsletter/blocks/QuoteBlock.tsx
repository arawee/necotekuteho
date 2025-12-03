import { NewsletterBlock } from '@/types/newsletter';

interface QuoteBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const QuoteBlock = ({ block, onUpdate }: QuoteBlockProps) => {
  return (
    <div 
      className="rounded-lg border border-border p-6"
      style={{ backgroundColor: block.content.backgroundColor || '#F8F3EE' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-sm">
          <span 
            className="font-semibold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, quoteSubheading: e.currentTarget.textContent || '' })}
          >
            {block.content.quoteSubheading}
          </span>
          <span className="mx-4 text-gray-400">•</span>
          <span 
            className="text-gray-700"
            style={{ fontSize: '42px', lineHeight: '100%' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, quote: e.currentTarget.textContent || '' })}
          >
            {block.content.quote}
          </span>
        </div>
      </div>
    </div>
  );
};