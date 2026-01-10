import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Place {
  image: string;
  name: string;
  buttonText: string;
  buttonUrl: string;
}

interface MistaBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const MistaBlock = ({ block, onUpdate }: MistaBlockProps) => {
  const [editingPlace, setEditingPlace] = useState<number | null>(null);

  const defaultPlaces: Place[] = [
    { image: '', name: 'Kolbenova 9', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'Pizza Rosa', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'Koprteenka', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'BarBar', buttonText: '+', buttonUrl: '#' }
  ];

  const places: Place[] = (block.content as any).places || defaultPlaces;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = (block.content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (block.content as any).viewAllUrl || '#';

  const updatePlace = (index: number, field: keyof Place, value: string) => {
    const newPlaces = [...places];
    newPlaces[index] = { ...newPlaces[index], [field]: value };
    onUpdate({ ...block.content, places: newPlaces } as any);
  };

  const addPlace = () => {
    const newPlaces = [...places, { image: '', name: 'Nové místo', buttonText: '+', buttonUrl: '#' }];
    onUpdate({ ...block.content, places: newPlaces } as any);
  };

  const removePlace = (index: number) => {
    const newPlaces = places.filter((_, i) => i !== index);
    onUpdate({ ...block.content, places: newPlaces } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-lg font-normal"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {block.content.title || 'Kde nás ochutnáte?'}
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
                onClick={() => setEditingPlace(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Places grid - flex with gap 12px */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {places.slice(0, 4).map((place, index) => (
            <div key={index} className="group relative" style={{ flex: 1 }}>
              {/* Remove button */}
              <button
                onClick={() => removePlace(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Place image */}
              <div className="relative mb-3 aspect-[4/3] overflow-hidden">
                <ImageUpload
                  currentImage={place.image}
                  onImageUploaded={(url) => updatePlace(index, 'image', url)}
                  aspectRatio="landscape"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Button and name row */}
              <div className="flex items-center gap-2">
                <button 
                  className="flex items-center justify-center flex-shrink-0 rounded-full"
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#00C322',
                    border: 'none'
                  }}
                  onClick={() => setEditingPlace(index)}
                >
                  <ArrowRight style={{ width: '12px', height: '12px', color: '#FFFFFF' }} />
                </button>
                <h3 
                  className="font-medium text-sm truncate cursor-pointer"
                  onClick={() => setEditingPlace(index)}
                  style={{ color: '#212121' }}
                >
                  {place.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        {places.length < 4 && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={addPlace}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Přidat místo
            </Button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingPlace !== null} onOpenChange={(open) => !open && setEditingPlace(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPlace === -1 ? 'Upravit "zobrazit vše"' : 'Upravit místo'}</DialogTitle>
          </DialogHeader>
          {editingPlace === -1 ? (
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
          ) : editingPlace !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Název</label>
                <Input
                  value={places[editingPlace]?.name || ''}
                  onChange={(e) => updatePlace(editingPlace, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL tlačítka</label>
                <Input
                  value={places[editingPlace]?.buttonUrl || ''}
                  onChange={(e) => updatePlace(editingPlace, 'buttonUrl', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
