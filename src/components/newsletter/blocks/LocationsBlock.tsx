import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Location {
  image: string;
  name: string;
  address: string;
  hours: string;
  weekendHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

interface LocationsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const LocationsBlock = ({ block, onUpdate }: LocationsBlockProps) => {
  const [editingButton, setEditingButton] = useState<{ index: number; type: 'primary' | 'secondary' } | null>(null);

  const defaultLocations: Location[] = [
    { 
      image: '', 
      name: 'Pivovar v Lounech', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h',
      primaryButtonText: '',
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
      primaryButtonText: '',
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
      primaryButtonText: '',
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
      primaryButtonText: '',
      primaryButtonUrl: '#',
      secondaryButtonText: 'Rezervace',
      secondaryButtonUrl: '#'
    }
  ];

  const locations = (block.content as any).locations || defaultLocations;
  const viewAllUrl = block.content.viewAllUrl || '#';
  const viewAllText = block.content.viewAllText || '→ zobrazit vše';

  const updateLocation = (index: number, field: keyof Location, value: any) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    onUpdate({ ...block.content, locations: newLocations } as any);
  };

  return (
    <div className="rounded-lg border border-border p-6" style={{ backgroundColor: '#F5F5F5' }}>
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
          <span 
            className="text-sm underline hover:no-underline cursor-pointer" 
            style={{ color: '#212121' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, viewAllText: e.currentTarget.textContent || '' })}
          >
            {viewAllText}
          </span>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-4 gap-4">
          {locations.map((location: Location, index: number) => (
            <div key={index} className="group bg-white p-3 rounded-lg">
              {/* Location image */}
              <div className="relative mb-3 rounded-lg aspect-[4/3] overflow-hidden">
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
                className="font-medium text-sm mb-1"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateLocation(index, 'name', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {location.name}
              </h3>
              <p 
                className="text-xs text-muted-foreground mb-1 whitespace-pre-line"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateLocation(index, 'address', e.currentTarget.textContent || '')}
              >
                {location.address}
              </p>
              <p 
                className="text-xs text-muted-foreground mb-1"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateLocation(index, 'hours', e.currentTarget.textContent || '')}
              >
                {location.hours}
              </p>
              <p 
                className="text-xs text-muted-foreground mb-2"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateLocation(index, 'weekendHours', e.currentTarget.textContent || '')}
              >
                {location.weekendHours}
              </p>
              
              {/* Social links */}
              <div className="flex gap-2 text-xs mb-2">
                <a 
                  href="#" 
                  className="underline"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateLocation(index, 'facebookUrl', e.currentTarget.textContent || '')}
                >
                  Facebook
                </a>
                <a 
                  href="#" 
                  className="underline"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateLocation(index, 'instagramUrl', e.currentTarget.textContent || '')}
                >
                  Instagram
                </a>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {editingButton?.index === index && editingButton?.type === 'primary' ? (
                  <Input
                    value={location.primaryButtonUrl || '#'}
                    onChange={(e) => updateLocation(index, 'primaryButtonUrl', e.target.value)}
                    placeholder="URL"
                    className="w-full h-7 text-xs"
                    onBlur={() => setEditingButton(null)}
                    autoFocus
                  />
                ) : (
                  <button 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#00D954' }}
                    onClick={() => setEditingButton({ index, type: 'primary' })}
                    title="Click to edit URL"
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: '#212121' }} />
                  </button>
                )}
                {editingButton?.index === index && editingButton?.type === 'secondary' ? (
                  <Input
                    value={location.secondaryButtonUrl || '#'}
                    onChange={(e) => updateLocation(index, 'secondaryButtonUrl', e.target.value)}
                    placeholder="URL"
                    className="w-full h-7 text-xs"
                    onBlur={() => setEditingButton(null)}
                    autoFocus
                  />
                ) : (
                  <span 
                    className="text-xs cursor-pointer"
                    onClick={() => setEditingButton({ index, type: 'secondary' })}
                    title="Click to edit URL"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateLocation(index, 'secondaryButtonText', e.currentTarget.textContent || '')}
                  >
                    → {location.secondaryButtonText || 'Rezervace'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
