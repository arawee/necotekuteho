import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CustomPlusIcon, CustomArrowIcon } from '@/components/icons/CustomIcons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

export const PromoBoxBlock = ({ block, onUpdate }: PromoBoxBlockProps) => {
  const [editingButton, setEditingButton] = useState<number | null>(null);

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
      buttonText: '→ objevit předplatné',
      buttonUrl: '#',
      bgColor: '#00C322'
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
      buttonText: '→ objevit',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
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

  const addBox = () => {
    const newBox: PromoBox = {
      title: 'Nový box',
      features: [
        { label: 'Funkce', value: 'Popis funkce' }
      ],
      buttonText: '→ akce',
      buttonUrl: '#',
      bgColor: '#F4F4F4'
    };
    onUpdate({ ...block.content, boxes: [...boxes, newBox] } as any);
  };

  const removeBox = (index: number) => {
    const newBoxes = boxes.filter((_, i) => i !== index);
    onUpdate({ ...block.content, boxes: newBoxes } as any);
  };

  // More restrictive threshold - only use white text on very dark backgrounds
  const isVeryDarkBg = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 60; // Much lower threshold - only very dark colors get white text
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${boxes.length}, 1fr)` }}>
          {boxes.map((box, index) => (
            <div 
              key={index} 
              className="p-6 group relative"
              style={{ 
                backgroundColor: box.bgColor,
                border: box.bgColor === '#FFFFFF' || box.bgColor === '#F4F4F4' ? '1px solid #E5E5E5' : 'none'
              }}
            >
              {/* Delete box button */}
              <button
                onClick={() => removeBox(index)}
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* HEX Color picker */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="color"
                  value={box.bgColor}
                  onChange={(e) => updateBox(index, 'bgColor', e.target.value)}
                  className="w-6 h-6 cursor-pointer border-0"
                  title="Vybrat barvu"
                />
              </div>

              <h3 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateBox(index, 'title', e.currentTarget.textContent || '')}
                style={{ color: isVeryDarkBg(box.bgColor) ? '#FFFFFF' : '#000000', fontSize: '24px', marginBottom: '1rem', fontWeight: 700 }}
              >
                {box.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                {box.features.map((feature, fIdx) => (
                  <div key={fIdx} className="text-xs flex items-start gap-1 group/feature" style={{ marginTop: '0.25rem' }}>
                    <span 
                      className="cursor-text"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateFeature(index, fIdx, 'label', e.currentTarget.textContent || '')}
                      style={{ color: isVeryDarkBg(box.bgColor) ? '#FFFFFF' : '#000000', fontWeight: 'bold' }}
                    >
                      {feature.label}
                    </span>
                    <CustomArrowIcon color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span 
                      className="cursor-text flex-1"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateFeature(index, fIdx, 'value', e.currentTarget.textContent || '')}
                      style={{ color: isVeryDarkBg(box.bgColor) ? '#CCC' : '#000000' }}
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
                  className="text-xs px-2 py-0.5 border border-dashed border-gray-400 hover:border-green-500 text-gray-400 hover:text-green-500 flex items-center gap-1"
                >
                  <CustomPlusIcon color="currentColor" /> přidat
                </button>
              </div>

              {/* Button - sized to text + 24px left/right, 12px top/bottom */}
              <div className="space-y-2">
                <button 
                  className="text-sm border inline-flex items-center"
                  style={{ 
                    borderColor: isVeryDarkBg(box.bgColor) ? '#FFFFFF' : '#000000',
                    color: isVeryDarkBg(box.bgColor) ? '#FFFFFF' : '#000000',
                    backgroundColor: 'transparent',
                    padding: '12px 24px'
                  }}
                  onClick={() => setEditingButton(index)}
                >
                  {box.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add box button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={addBox}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
          >
            <CustomPlusIcon color="currentColor" />
            Přidat box
          </button>
        </div>
      </div>

      {/* Edit Button Dialog */}
      <Dialog open={editingButton !== null} onOpenChange={(open) => !open && setEditingButton(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit tlačítko</DialogTitle>
          </DialogHeader>
          {editingButton !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text tlačítka</label>
                <Input
                  value={boxes[editingButton]?.buttonText || ''}
                  onChange={(e) => updateBox(editingButton, 'buttonText', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={boxes[editingButton]?.buttonUrl || ''}
                  onChange={(e) => updateBox(editingButton, 'buttonUrl', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
