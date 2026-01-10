import { NewsletterBlock } from '@/types/newsletter';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TextTwoColumnsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const TextTwoColumnsBlock = ({ block, onUpdate }: TextTwoColumnsBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const leftColumn = (block.content as any).leftColumn || 'Slovníček';
  const rightColumn = (block.content as any).rightColumn || 'NEIPA, neboli New England India Pale Ale, je moderní, svrchně kvašený styl piva, který je charakteristický svým kalným vzhledem, šťavnatou ovocnou chutí a krémovým tělem s nízkou hořkostí. Tyto vlastnosti jsou dosaženy použitím pšeničných a ovesných vloček nebo sladů a masivním chmelením za studena americkými odrůdami chmele, které dodávají aroma tropického ovoce, jako je mango, ananas nebo citrusy.';

  return (
    <div className="bg-white border border-border p-6">
      <div 
        className="max-w-2xl mx-auto cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        <div className="flex gap-8">
          {/* Left column (1/6) */}
          <div className="w-1/6">
            <p 
              style={{ color: '#212121', fontWeight: 900, fontSize: '12px' }}
            >
              {leftColumn}
            </p>
          </div>

          {/* Right column (5/6) */}
          <div className="w-5/6">
            <p 
              style={{ color: '#212121', fontWeight: 700, fontSize: '12px', lineHeight: '150%' }}
            >
              {rightColumn}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit text</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Levý sloupec (titulek)</label>
              <input
                className="w-full border p-2 text-sm"
                value={leftColumn}
                onChange={(e) => onUpdate({ ...block.content, leftColumn: e.target.value } as any)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pravý sloupec (text)</label>
              <textarea
                className="w-full border p-2 text-sm"
                rows={6}
                value={rightColumn}
                onChange={(e) => onUpdate({ ...block.content, rightColumn: e.target.value } as any)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
