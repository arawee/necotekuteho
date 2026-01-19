import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CustomPlusIcon, CustomArrowIcon } from '@/components/icons/CustomIcons';
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
      hours: 'Po–Pá 9–17 h',
      weekendHours: 'So–Ne 9–22 h',
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
      hours: 'Po–Pá 9–17 h',
      weekendHours: 'So–Ne 9–22 h',
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
      hours: 'Po–Pá 9–17 h',
      weekendHours: 'So–Ne 9–22 h',
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
      hours: 'Po–Pá 9–17 h',
      weekendHours: 'So–Ne 9–22 h',
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

  const addLocation = () => {
    const newLocation: Location = {
      image: '',
      name: 'Nová lokace',
      address: 'Adresa',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      facebookUrl: '#',
      instagramUrl: '#',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    };
    onUpdate({ ...block.content, locations: [...locations, newLocation] } as any);
  };

  const removeLocation = (index: number) => {
    const newLocations = locations.filter((_: any, i: number) => i !== index);
    onUpdate({ ...block.content, locations: newLocations } as any);
  };

  // Limit to max 4 locations (2 per row, 2 rows)
  const displayedLocations = locations.slice(0, 4);

  return (
    <div className="border border-border p-6 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Header - matching component heading style */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121', fontSize: '24px', fontWeight: 700, margin: 0 }}
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
                style={{ color: '#212121', textUnderlineOffset: '2px' }}
                onClick={() => setEditingLocation(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Locations grid - max 2 per row, max 4 total */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px' 
        }}>
          {displayedLocations.map((location: Location, index: number) => {
            return (
              <div 
                key={index} 
                className="group relative flex flex-col"
                style={{ 
                  backgroundColor: '#F4F4F4', 
                  flex: '0 0 calc(50% - 6px)',
                  maxWidth: 'calc(50% - 6px)'
                }}
              >
                {/* Remove button */}
                <button
                  onClick={() => removeLocation(index)}
                  className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>

                {/* Location image - 5/4 ratio */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '5/4' }}>
                  <ImageUpload
                    currentImage={location.image}
                    onImageUploaded={(url) => updateLocation(index, 'image', url)}
                    aspectRatio="landscape"
                    placeholder="Nahrát foto"
                    className="w-full h-full"
                    showBorder={false}
                  />
                </div>

                {/* Content with padding - flex column to push buttons to bottom */}
                <div className="p-3 flex flex-col" style={{ flexGrow: 1 }}>
                  {/* Location info - Název with font-weight 700 */}
                  <h3 
                    className="mb-1 cursor-pointer"
                    onClick={() => setEditingLocation(index)}
                    style={{ color: '#000000', fontSize: '16px', fontWeight: 700, marginTop: '0.5rem' }}
                  >
                    {location.name}
                  </h3>
                  <p 
                    className="text-xs mb-1 whitespace-pre-line cursor-pointer"
                    onClick={() => setEditingLocation(index)}
                    style={{ color: '#000000' }}
                  >
                    {location.address}
                  </p>
                  <p 
                    className="text-xs mb-1 cursor-pointer"
                    onClick={() => setEditingLocation(index)}
                    style={{ color: '#000000' }}
                  >
                    {location.hours}
                  </p>
                  <p 
                    className="text-xs mb-2 cursor-pointer"
                    onClick={() => setEditingLocation(index)}
                    style={{ color: '#000000' }}
                  >
                    {location.weekendHours}
                  </p>
                  
                  {/* Social links - underlined, only show if URL exists */}
                  {(location.facebookUrl || location.instagramUrl) && (
                    <div className="flex gap-2 text-xs mb-2">
                      {location.facebookUrl && (
                        <a 
                          href={location.facebookUrl} 
                          className="cursor-pointer"
                          style={{ color: '#000000', textDecoration: 'underline' }}
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingLocation(index);
                          }}
                        >
                          Facebook
                        </a>
                      )}
                      {location.instagramUrl && (
                        <a 
                          href={location.instagramUrl} 
                          className="cursor-pointer"
                          style={{ color: '#000000', textDecoration: 'underline' }}
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingLocation(index);
                          }}
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  )}

                  {/* Spacer to push buttons to bottom */}
                  <div style={{ flexGrow: 1 }} />

                  {/* Action buttons - 36px circular with green border, no background */}
                  <div className="flex items-center gap-2 mt-auto" style={{ marginTop: '1.75rem' }}>
                    <button 
                      className="flex items-center justify-center locations-circle-btn"
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        backgroundColor: 'transparent',
                        border: '1px solid #00C322'
                      }}
                      onClick={() => setEditingLocation(index)}
                    >
                      <CustomArrowIcon color="#00C322" />
                    </button>
                    <span 
                      className="text-xs cursor-pointer"
                      onClick={() => setEditingLocation(index)}
                    >
                      → {location.secondaryButtonText || 'Rezervace'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add location button - disabled when max 4 */}
        {locations.length < 4 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addLocation}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
            >
              <CustomPlusIcon color="currentColor" />
              Přidat lokaci
            </button>
          </div>
        )}
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
