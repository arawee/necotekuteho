import { NewsletterBlock } from '@/types/newsletter';
import { Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import benefitIcon1 from '@/assets/benefit-icon-1.png';
import benefitIcon2 from '@/assets/benefit-icon-2.png';
import benefitIcon3 from '@/assets/benefit-icon-3.png';
import benefitIcon4 from '@/assets/benefit-icon-4.png';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

// Default icons from assets
const defaultIcons = [benefitIcon1, benefitIcon2, benefitIcon3, benefitIcon4];

export const BenefitsBlock = ({ block, onUpdate }: BenefitsBlockProps) => {
  const [editingBenefit, setEditingBenefit] = useState<number | null>(null);

  const defaultBenefits: Benefit[] = [
    { 
      icon: defaultIcons[0], 
      title: 'Experiment', 
      description: 'Náš pivovar rád experimentuje a neustále objevuje nové chutě a způsoby vaření piva.' 
    },
    { 
      icon: defaultIcons[1], 
      title: 'Radost', 
      description: 'Pivo jako radost, zážitek, komunita.' 
    },
    { 
      icon: defaultIcons[2], 
      title: 'Komunita', 
      description: 'Propojujeme zákazníky s výrobou, sládky, inspirací, chutěmi i místem.' 
    },
    { 
      icon: defaultIcons[3], 
      title: 'Kvalita', 
      description: 'Dbáme na autenticitu a kvalitu vstupních surovin.' 
    }
  ];

  // Use saved benefits, but apply default icons if icon is empty (max 4)
  const savedBenefits: Benefit[] = (block.content as any).benefits;
  const benefits: Benefit[] = savedBenefits 
    ? savedBenefits.slice(0, 4).map((b, i) => ({
        ...b,
        icon: b.icon || defaultIcons[i] || defaultIcons[0]
      }))
    : defaultBenefits;

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  const addBenefit = () => {
    if (benefits.length >= 4) return;
    const newIndex = benefits.length;
    const newBenefits = [...benefits, { icon: defaultIcons[newIndex] || '', title: 'Nový benefit', description: 'Popis benefitu' }];
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  return (
    <div className="bg-white border border-border p-8">
      <div className="max-w-3xl mx-auto">
        <div style={{ display: 'flex', gap: '16px' }}>
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative text-center" style={{ flex: 1 }}>
              {/* Remove button */}
              <button
                onClick={() => removeBenefit(index)}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Icon - replaceable image 48px with margin-bottom 1rem */}
              <div 
                className="flex justify-center cursor-pointer"
                style={{ marginBottom: '1rem' }}
                onClick={() => setEditingBenefit(index)}
              >
                {benefit.icon ? (
                  <img 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                ) : (
                  <div 
                    className="border border-dashed border-gray-300 flex items-center justify-center text-2xl"
                    style={{ width: '48px', height: '48px', color: '#00C322' }}
                  >
                    □
                  </div>
                )}
              </div>

              {/* Title - 20px bold black with 12px margin below */}
              <h3 
                className="cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ color: '#000000', fontSize: '20px', lineHeight: '120%', fontWeight: 'bold', marginBottom: '12px' }}
              >
                {benefit.title}
              </h3>

              {/* Description - 14px regular black */}
              <p 
                className="cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ color: '#000000', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '120%' }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Add button - only show if less than 4 benefits */}
        {benefits.length < 4 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={addBenefit}
              className="px-3 py-1.5 text-sm border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 flex items-center gap-1"
            >
              + Přidat benefit
            </button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingBenefit !== null} onOpenChange={(open) => !open && setEditingBenefit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit benefit</DialogTitle>
          </DialogHeader>
          {editingBenefit !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Ikona (obrázek)</label>
                <ImageUpload
                  currentImage={benefits[editingBenefit]?.icon || ''}
                  onImageUploaded={(url) => updateBenefit(editingBenefit, 'icon', url)}
                  aspectRatio="square"
                  placeholder="Nahrát ikonu (SVG, PNG, JPG)"
                  className="w-24 h-24"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Titulek</label>
                <input
                  className="w-full border p-2 text-sm"
                  value={benefits[editingBenefit]?.title || ''}
                  onChange={(e) => updateBenefit(editingBenefit, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Popis</label>
                <textarea
                  className="w-full border p-2 text-sm"
                  rows={3}
                  value={benefits[editingBenefit]?.description || ''}
                  onChange={(e) => updateBenefit(editingBenefit, 'description', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
