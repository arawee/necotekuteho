import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Location {
  image: string;
  name: string;
  address: string;
  hours: string;
  weekendHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

interface LocationsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const LocationsBlock = ({ block, onUpdate }: LocationsBlockProps) => {
  const [editingLocation, setEditingLocation] = useState<number | null>(null);

  const defaultLocations: Location[] = [
    { 
      image: '', 
      name: 'Pivovar v Lounech', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      facebookUrl: '#',
      instagramUrl: '#',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    },
    { 
      image: '', 
      name: 'Sklad Louny', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      facebookUrl: '#',
      instagramUrl: '#',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    },
    { 
      image: '', 
      name: 'Pivní bar Louny', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      facebookUrl: '#',
      instagramUrl: '#',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    },
    { 
      image: '', 
      name: 'Restaurace Zichovec', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      facebookUrl: '#',
      instagramUrl: '#',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    }
  ];

  const locations = (block.content as any).locations || defaultLocations;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = block.content.viewAllText || 'zobrazit vše';
  const viewAllUrl = block.content.viewAllUrl || '#';

  const updateLocation = (index: number, field: keyof Location, value: any) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    onUpdate({ ...block.content, locations: newLocations } as any);
  };

  return (
    <div className="border border-border p-6 bg-white">
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
                style={{ color: '#212121' }}
                onClick={() => setEditingLocation(-1)}
              >
                → {viewAllText}
              </span>
            )}
          </div>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-4 gap-4">
          {locations.map((location: Location, index: number) => (
            <div 
              key={index} 
              className="group p-3"
              style={{ backgroundColor: '#F4F4F4' }}
            >
              {/* Location image */}
              <div className="relative mb-3 aspect-[4/3] overflow-hidden">
                <ImageUpload
                  currentImage={location.image}
                  onImageUploaded={(url) => updateLocation(index, 'image', url)}
                  aspectRatio="landscape"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Location info */}
              <h3 
                className="font-medium text-sm mb-1 cursor-pointer"
                onClick={() => setEditingLocation(index)}
                style={{ color: '#212121' }}
              >
                {location.name}
              </h3>
              <p 
                className="text-xs text-muted-foreground mb-1 whitespace-pre-line cursor-pointer"
                onClick={() => setEditingLocation(index)}
              >
                {location.address}
              </p>
              <p 
                className="text-xs text-muted-foreground mb-1 cursor-pointer"
                onClick={() => setEditingLocation(index)}
              >
                {location.hours}
              </p>
              <p 
                className="text-xs text-muted-foreground mb-2 cursor-pointer"
                onClick={() => setEditingLocation(index)}
              >
                {location.weekendHours}
              </p>
              
              {/* Social links - clickable and editable */}
              <div className="flex gap-2 text-xs mb-2">
                <a 
                  href={location.facebookUrl || '#'} 
                  className="underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingLocation(index);
                  }}
                >
                  Facebook
                </a>
                <a 
                  href={location.instagramUrl || '#'} 
                  className="underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingLocation(index);
                  }}
                >
                  Instagram
                </a>
              </div>

              {/* Action buttons - same style as Místa */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-6 h-6 flex items-center justify-center border"
                  style={{ borderColor: '#00C322' }}
                  onClick={() => setEditingLocation(index)}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: '#00C322' }} />
                </button>
                <span 
                  className="text-xs cursor-pointer"
                  onClick={() => setEditingLocation(index)}
                >
                  → {location.secondaryButtonText || 'Rezervace'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingLocation !== null} onOpenChange={(open) => !open && setEditingLocation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingLocation === -1 ? 'Upravit "zobrazit vše"' : 'Upravit lokaci'}</DialogTitle>
          </DialogHeader>
          {editingLocation === -1 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={viewAllText}
                  onChange={(e) => onUpdate({ ...block.content, viewAllText: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={viewAllUrl}
                  onChange={(e) => onUpdate({ ...block.content, viewAllUrl: e.target.value })}
                />
              </div>
            </div>
          ) : editingLocation !== null && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="text-sm font-medium">Název</label>
                <Input
                  value={locations[editingLocation]?.name || ''}
                  onChange={(e) => updateLocation(editingLocation, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Adresa</label>
                <textarea
                  className="w-full border p-2 text-sm"
                  rows={2}
                  value={locations[editingLocation]?.address || ''}
                  onChange={(e) => updateLocation(editingLocation, 'address', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Hodiny (týden)</label>
                  <Input
                    value={locations[editingLocation]?.hours || ''}
                    onChange={(e) => updateLocation(editingLocation, 'hours', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Hodiny (víkend)</label>
                  <Input
                    value={locations[editingLocation]?.weekendHours || ''}
                    onChange={(e) => updateLocation(editingLocation, 'weekendHours', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Facebook URL</label>
                  <Input
                    value={locations[editingLocation]?.facebookUrl || ''}
                    onChange={(e) => updateLocation(editingLocation, 'facebookUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Instagram URL</label>
                  <Input
                    value={locations[editingLocation]?.instagramUrl || ''}
                    onChange={(e) => updateLocation(editingLocation, 'instagramUrl', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">URL hlavního tlačítka</label>
                <Input
                  value={locations[editingLocation]?.primaryButtonUrl || ''}
                  onChange={(e) => updateLocation(editingLocation, 'primaryButtonUrl', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Text druhého tlačítka</label>
                  <Input
                    value={locations[editingLocation]?.secondaryButtonText || ''}
                    onChange={(e) => updateLocation(editingLocation, 'secondaryButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL druhého tlačítka</label>
                  <Input
                    value={locations[editingLocation]?.secondaryButtonUrl || ''}
                    onChange={(e) => updateLocation(editingLocation, 'secondaryButtonUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
