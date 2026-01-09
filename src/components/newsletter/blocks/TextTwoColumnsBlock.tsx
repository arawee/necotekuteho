import { NewsletterBlock } from '@/types/newsletter';

interface TextTwoColumnsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const TextTwoColumnsBlock = ({ block, onUpdate }: TextTwoColumnsBlockProps) => {
  const leftColumn = (block.content as any).leftColumn || 'Slovníček';
  const rightColumn = (block.content as any).rightColumn || 'NEIPA, neboli New England India Pale Ale, je moderní, svrchně kvašený styl piva, který je charakteristický svým kalným vzhledem, šťavnatou ovocnou chutí a krémovým tělem s nízkou hořkostí. Tyto vlastnosti jsou dosaženy použitím pšeničných a ovesných vloček nebo sladů a masivním chmelením za studena americkými odrůdami chmele, které dodávají aroma tropického ovoce, jako je mango, ananas nebo citrusy.';

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-8">
          {/* Left column (1/6) */}
          <div className="w-1/6">
            <p 
              className="text-sm font-medium"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate({ ...block.content, leftColumn: e.currentTarget.textContent || '' } as any)}
              style={{ color: '#212121' }}
            >
              {leftColumn}
            </p>
          </div>

          {/* Right column (5/6) */}
          <div className="w-5/6">
            <p 
              className="text-sm leading-relaxed"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate({ ...block.content, rightColumn: e.currentTarget.textContent || '' } as any)}
              style={{ color: '#212121' }}
            >
              {rightColumn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
