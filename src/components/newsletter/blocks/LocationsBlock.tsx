import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Edit2 } from 'lucide-react';

interface Location {
  image: string;
  name: string;
  address: string;
  hours: string;
  weekendHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

interface LocationsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const LocationsBlock = ({ block, onUpdate }: LocationsBlockProps) => {
  const defaultLocations: Location[] = [
    { 
      image: '', 
      name: 'Pivovar v Lounech', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h'
    },
    { 
      image: '', 
      name: 'Sklad Louny', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h'
    },
    { 
      image: '', 
      name: 'Pivní bar Louny', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h'
    },
    { 
      image: '', 
      name: 'Restaurace Zichovec', 
      address: '5. května 2789, Louny\n440 01',
      hours: 'Po-Pá 9-17 h',
      weekendHours: 'So-Ne 9-22 h'
    }
  ];

  const locations = (block.content as any).locations || defaultLocations;

  const updateLocation = (index: number, field: keyof Location, value: any) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    onUpdate({ ...block.content, locations: newLocations } as any);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
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
          <a href="#" className="text-sm underline hover:no-underline" style={{ color: '#212121' }}>
            → zobrazit vše
          </a>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-4 gap-4">
          {locations.map((location: Location, index: number) => (
            <div key={index} className="group">
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
              <p className="text-xs text-muted-foreground mb-1">{location.hours}</p>
              <p className="text-xs text-muted-foreground mb-2">{location.weekendHours}</p>
              
              {/* Social links */}
              <div className="flex gap-2 text-xs mb-2">
                <a href="#" className="underline">Facebook</a>
                <a href="#" className="underline">Instagram</a>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-6 h-6 rounded-full flex items-center justify-center border"
                  style={{ borderColor: '#212121' }}
                >
                  <span style={{ color: '#212121' }}>+</span>
                </button>
                <span className="text-xs">→ Rezervace</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
