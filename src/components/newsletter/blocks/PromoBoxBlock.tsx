import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  label: string;
  value: string;
}

interface PromoBox {
  title: string;
  features: Feature[];
  buttonText: string;
  buttonUrl: string;
  bgColor: string;
}

interface PromoBoxBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

const colorOptions = ['#00D954', '#FFFFFF', '#F5F5F5', '#212121', '#FFF59D', '#FFAB91'];

export const PromoBoxBlock = ({ block, onUpdate }: PromoBoxBlockProps) => {
  const defaultBoxes: PromoBox[] = [
    {
      title: 'Pivní předplatné?',
      features: [
        { label: 'Novinky', value: 'Nejnovější piva jako první.' },
        { label: 'Všechno víš', value: 'Pravidelný přísun novinek.' },
        { label: 'Doprava', value: 'Zdarma – navždy.' },
        { label: '8-12 piv', value: 'Každý měsíc' },
        { label: 'Magazín', value: 'Online mag ke každému předplatnému.' }
      ],
      buttonText: '+ objevit předplatné',
      buttonUrl: '#',
      bgColor: '#00D954'
    },
    {
      title: 'Věrnostní program',
      features: [
        { label: 'Novinky', value: 'Nejnovější piva jako první.' },
        { label: 'Všechno víš', value: 'Pravidelný přísun novinek.' },
        { label: 'Doprava', value: 'Zdarma – navždy.' },
        { label: '8-12 piv', value: 'Každý měsíc' },
        { label: 'Magazín', value: 'Online mag ke každému předplatnému.' }
      ],
      buttonText: '+ objevit',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    },
    {
      title: 'Pivo v sudu. Rovnou od zdroje.',
      features: [
        { label: 'Novinky', value: 'Nejnovější piva jako první.' },
        { label: 'Všechno víš', value: 'Pravidelný přísun novinek.' },
        { label: 'Doprava', value: 'Zdarma – navždy.' },
        { label: '8-12 piv', value: 'Každý měsíc' },
        { label: 'Magazín', value: 'Online mag ke každému předplatnému.' }
      ],
      buttonText: '+ zeptat se',
      buttonUrl: '#',
      bgColor: '#F5F5F5'
    }
  ];

  const boxes: PromoBox[] = (block.content as any).boxes || defaultBoxes;

  const updateBox = (index: number, field: keyof PromoBox, value: any) => {
    const newBoxes = [...boxes];
    newBoxes[index] = { ...newBoxes[index], [field]: value };
    onUpdate({ ...block.content, boxes: newBoxes } as any);
  };

  const updateFeature = (boxIndex: number, featureIndex: number, field: keyof Feature, value: string) => {
    const newBoxes = [...boxes];
    const newFeatures = [...newBoxes[boxIndex].features];
    newFeatures[featureIndex] = { ...newFeatures[featureIndex], [field]: value };
    newBoxes[boxIndex] = { ...newBoxes[boxIndex], features: newFeatures };
    onUpdate({ ...block.content, boxes: newBoxes } as any);
  };

  const addFeature = (boxIndex: number) => {
    const newBoxes = [...boxes];
    newBoxes[boxIndex].features = [...newBoxes[boxIndex].features, { label: 'Nový', value: 'Popis' }];
    onUpdate({ ...block.content, boxes: newBoxes } as any);
  };

  const removeFeature = (boxIndex: number, featureIndex: number) => {
    const newBoxes = [...boxes];
    newBoxes[boxIndex].features = newBoxes[boxIndex].features.filter((_, i) => i !== featureIndex);
    onUpdate({ ...block.content, boxes: newBoxes } as any);
  };

  const isLightBg = (color: string) => color === '#FFFFFF' || color === '#F5F5F5' || color === '#00D954' || color === '#FFF59D' || color === '#FFAB91';

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {boxes.map((box, index) => (
            <div 
              key={index} 
              className="rounded-lg p-6 group relative"
              style={{ 
                backgroundColor: box.bgColor,
                border: box.bgColor === '#FFFFFF' ? '1px solid #E5E5E5' : 'none'
              }}
            >
              {/* Color picker */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateBox(index, 'bgColor', color)}
                    className="w-4 h-4 rounded-full border border-gray-400"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h3 
                className="font-medium text-lg mb-4"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateBox(index, 'title', e.currentTarget.textContent || '')}
                style={{ color: isLightBg(box.bgColor) ? '#212121' : '#FFFFFF' }}
              >
                {box.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                {box.features.map((feature, fIdx) => (
                  <div key={fIdx} className="text-xs flex items-start gap-1 group/feature">
                    <span 
                      className="font-medium cursor-text"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateFeature(index, fIdx, 'label', e.currentTarget.textContent || '')}
                      style={{ color: isLightBg(box.bgColor) ? '#212121' : '#FFFFFF' }}
                    >
                      {feature.label}
                    </span>
                    <span style={{ color: isLightBg(box.bgColor) ? '#666' : '#CCC' }}> → </span>
                    <span 
                      className="cursor-text flex-1"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateFeature(index, fIdx, 'value', e.currentTarget.textContent || '')}
                      style={{ color: isLightBg(box.bgColor) ? '#666' : '#CCC' }}
                    >
                      {feature.value}
                    </span>
                    <button
                      onClick={() => removeFeature(index, fIdx)}
                      className="opacity-0 group-hover/feature:opacity-100 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addFeature(index)}
                  className="text-xs px-2 py-0.5 rounded border border-dashed border-gray-400 hover:border-green-500 text-gray-400 hover:text-green-500"
                >
                  + přidat
                </button>
              </div>

              {/* Button - rectangular */}
              <div className="space-y-2">
                <button 
                  className="text-sm px-4 py-2 border w-full"
                  style={{ 
                    borderColor: isLightBg(box.bgColor) ? '#212121' : '#FFFFFF',
                    color: isLightBg(box.bgColor) ? '#212121' : '#FFFFFF',
                    backgroundColor: 'transparent'
                  }}
                >
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateBox(index, 'buttonText', e.currentTarget.textContent || '')}
                  >
                    {box.buttonText}
                  </span>
                </button>
                <Input
                  type="text"
                  value={box.buttonUrl}
                  onChange={(e) => updateBox(index, 'buttonUrl', e.target.value)}
                  placeholder="URL tlačítka"
                  className="h-6 text-xs bg-white/50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
