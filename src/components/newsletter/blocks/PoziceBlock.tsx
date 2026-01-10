import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Position {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  bgColor: string;
}

interface PoziceBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const PoziceBlock = ({ block, onUpdate }: PoziceBlockProps) => {
  const [editingPosition, setEditingPosition] = useState<number | null>(null);

  const defaultPositions: Position[] = [
    { 
      title: 'Správce sociálních sítí', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. repudiand ae labor um comma se ac representa tiveed accumsan minim adip iscing dolor en ea nostrud representé parida tur adipisicing adig ad pis labe.',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    },
    { 
      title: 'Obsluha v Zichoveckém baru', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod ac representa tiveed accusam is tempor. In dolor.',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    },
    { 
      title: 'Sládek', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod acupidat laboré commod accusam is tempor. In dolore magna adip iscing dolor en ea aliqu ea nostrud lorem repre henderit parida tur adip isicing adig amet de nulla. Elit mollit',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
    },
    { 
      title: 'Skladník', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. expreat sit alqua re cupidat laboré commod tempor. In dolore magna adip isicing dolor en ea aliqu ea nostrud lorem repre henderit parida tur',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    }
  ];

  const positions = (block.content as any).positions || defaultPositions;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = (block.content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (block.content as any).viewAllUrl || '#';

  const updatePosition = (index: number, field: keyof Position, value: any) => {
    const newPositions = [...positions];
    newPositions[index] = { ...newPositions[index], [field]: value };
    onUpdate({ ...block.content, positions: newPositions } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-2xl font-normal"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {block.content.title || 'Volné pozice'}
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox
                checked={showViewAll}
                onCheckedChange={(checked) => onUpdate({ ...block.content, showViewAll: checked } as any)}
              />
              Zobrazit vše
            </label>
            {showViewAll && (
              <span 
                className="text-sm cursor-pointer"
                style={{ color: '#212121' }}
                onClick={() => setEditingPosition(-1)}
              >
                → {viewAllText}
              </span>
            )}
          </div>
        </div>

        {/* Positions grid */}
        <div className="grid grid-cols-4 gap-4">
          {positions.map((position: Position, index: number) => (
            <div 
              key={index} 
              className="group p-4 flex flex-col"
              style={{ backgroundColor: position.bgColor || '#FFFFFF' }}
            >
              {/* HEX Color picker */}
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="color"
                  value={position.bgColor}
                  onChange={(e) => updatePosition(index, 'bgColor', e.target.value)}
                  className="w-6 h-6 cursor-pointer border-0"
                  title="Vybrat barvu"
                />
                <span className="text-[10px] text-muted-foreground">{position.bgColor}</span>
              </div>

              {/* Position title */}
              <h3 
                className="font-medium text-sm mb-3 cursor-pointer"
                onClick={() => setEditingPosition(index)}
                style={{ color: '#212121' }}
              >
                {position.title}
              </h3>

              {/* Position description */}
              <p 
                className="text-xs text-muted-foreground mb-4 flex-grow cursor-pointer"
                onClick={() => setEditingPosition(index)}
              >
                {position.description}
              </p>

              {/* Action button - with border and arrow */}
              <button 
                className="text-xs px-3 py-2 border flex items-center justify-center gap-2"
                style={{ 
                  borderColor: '#212121', 
                  color: '#212121',
                  borderWidth: '1px'
                }}
                onClick={() => setEditingPosition(index)}
              >
                <ArrowRight className="w-3 h-3" />
                {position.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingPosition !== null} onOpenChange={(open) => !open && setEditingPosition(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPosition === -1 ? 'Upravit "zobrazit vše"' : 'Upravit pozici'}</DialogTitle>
          </DialogHeader>
          {editingPosition === -1 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={viewAllText}
                  onChange={(e) => onUpdate({ ...block.content, viewAllText: e.target.value } as any)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={viewAllUrl}
                  onChange={(e) => onUpdate({ ...block.content, viewAllUrl: e.target.value } as any)}
                />
              </div>
            </div>
          ) : editingPosition !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titulek</label>
                <Input
                  value={positions[editingPosition]?.title || ''}
                  onChange={(e) => updatePosition(editingPosition, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Popis</label>
                <textarea
                  className="w-full border p-2 text-sm"
                  rows={4}
                  value={positions[editingPosition]?.description || ''}
                  onChange={(e) => updatePosition(editingPosition, 'description', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Text tlačítka</label>
                <Input
                  value={positions[editingPosition]?.buttonText || ''}
                  onChange={(e) => updatePosition(editingPosition, 'buttonText', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={positions[editingPosition]?.buttonUrl || ''}
                  onChange={(e) => updatePosition(editingPosition, 'buttonUrl', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
