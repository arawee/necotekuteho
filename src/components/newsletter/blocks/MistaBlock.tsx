import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

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
  const defaultPlaces: Place[] = [
    { image: '', name: 'Kolbenova 9', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'Pizza Rosa', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'Koprteenka', buttonText: '+', buttonUrl: '#' },
    { image: '', name: 'BarBar', buttonText: '+', buttonUrl: '#' }
  ];

  const places: Place[] = (block.content as any).places || defaultPlaces;
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
    <div className="bg-white rounded-lg border border-border p-6">
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
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: '#00D954' }}>→</span>
            <input
              type="text"
              defaultValue="zobrazit vše"
              className="text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded px-1"
              style={{ color: '#00D954' }}
              onBlur={(e) => onUpdate({ ...block.content, viewAllText: e.target.value } as any)}
            />
          </div>
        </div>

        {/* Places grid */}
        <div className="grid grid-cols-4 gap-4">
          {places.slice(0, 4).map((place, index) => (
            <div key={index} className="group relative">
              {/* Remove button */}
              <button
                onClick={() => removePlace(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Place image */}
              <div className="relative mb-3 rounded-lg aspect-[4/3] overflow-hidden">
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
                  className="w-6 h-6 rounded-full flex items-center justify-center border flex-shrink-0"
                  style={{ borderColor: '#00D954' }}
                >
                  <span style={{ color: '#00D954' }}>→</span>
                </button>
                <h3 
                  className="font-medium text-sm truncate"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updatePlace(index, 'name', e.currentTarget.textContent || '')}
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
    </div>
  );
};
