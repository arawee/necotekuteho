import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { CustomPlusIcon, CustomArrowIcon } from '@/components/icons/CustomIcons';
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

// Helper function to determine if a color is dark
const isColorDark = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25;
};

export const PoziceBlock = ({ block, onUpdate }: PoziceBlockProps) => {
  const [editingPosition, setEditingPosition] = useState<number | null>(null);

  const defaultPositions: Position[] = [
    { 
      title: 'Správce sociálních sítí', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. repudiand ae labor um comma se ac representa tiveed accumsan minim adip iscing dolor en ea nostrud representé parida tur adipisicing adig ad pis labe.',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
    },
    { 
      title: 'Obsluha v Zichoveckém baru', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod ac representa tiveed accusam is tempor. In dolor.',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
    },
    { 
      title: 'Sládek', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod acupidat laboré commod accusam is tempor. In dolore magna adip iscing dolor en ea aliqu ea nostrud lorem repre henderit parida tur adip isicing adig amet de nulla. Elit mollit',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
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

  const addPosition = () => {
    const newPosition: Position = {
      title: 'Nová pozice',
      description: 'Popis pozice...',
      buttonText: 'Mám zájem',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
    };
    onUpdate({ ...block.content, positions: [...positions, newPosition] } as any);
  };

  const removePosition = (index: number) => {
    const newPositions = positions.filter((_: any, i: number) => i !== index);
    onUpdate({ ...block.content, positions: newPositions } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header - title 20px bold */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h2 
            className="font-bold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121', fontSize: '20px' }}
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
                style={{ color: '#000000', textUnderlineOffset: '2px' }}
                onClick={() => setEditingPosition(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Positions grid - flex, max 3, fill container */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {positions.slice(0, 3).map((position: Position, index: number) => (
            <div 
              key={index} 
              className="group p-4 flex flex-col relative"
              style={{ backgroundColor: position.bgColor || '#F4F4F4', flex: '1 1 0' }}
            >
              {/* Remove button */}
              <button
                onClick={() => removePosition(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

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

              {/* Position title - 16px, font-weight 700, dynamic text color */}
              <h3 
                className="mb-3 cursor-pointer"
                onClick={() => setEditingPosition(index)}
                style={{ color: isColorDark(position.bgColor || '#F4F4F4') ? '#FFFFFF' : '#000000', fontSize: '16px', fontWeight: 700 }}
              >
                {position.title}
              </h3>

              {/* Position description - dynamic text color */}
              <p 
                className="text-xs cursor-pointer"
                onClick={() => setEditingPosition(index)}
                style={{ color: isColorDark(position.bgColor || '#F4F4F4') ? '#FFFFFF' : '#000000', marginBottom: '1rem' }}
              >
                {position.description}
              </p>

              {/* Action button - sized to text like promo boxes, dynamic colors */}
              <button 
                className="text-xs border inline-flex items-center self-start"
                style={{ 
                  borderColor: isColorDark(position.bgColor || '#F4F4F4') ? '#FFFFFF' : '#212121', 
                  color: isColorDark(position.bgColor || '#F4F4F4') ? '#FFFFFF' : '#212121',
                  backgroundColor: 'transparent',
                  padding: '12px 24px',
                  borderWidth: '1px',
                  width: 'auto'
                }}
                onClick={() => setEditingPosition(index)}
                >
                  <CustomArrowIcon color={isColorDark(position.bgColor || '#F4F4F4') ? '#FFFFFF' : '#212121'} style={{ marginRight: '8px' }} />
                  {position.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Add position button */}
        {positions.length < 3 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addPosition}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
            >
              <CustomPlusIcon color="currentColor" />
              Přidat pozici
            </button>
          </div>
        )}
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
