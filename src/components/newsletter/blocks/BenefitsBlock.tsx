import { NewsletterBlock } from '@/types/newsletter';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const BenefitsBlock = ({ block, onUpdate }: BenefitsBlockProps) => {
  const [editingBenefit, setEditingBenefit] = useState<number | null>(null);

  const defaultBenefits: Benefit[] = [
    { 
      icon: '', 
      title: 'Experiment', 
      description: 'Náš pivovar rád experimentuje a neustále objevuje nové chutě a způsoby vaření piva.' 
    },
    { 
      icon: '', 
      title: 'Radost', 
      description: 'Pivo jako radost, zážitek, komunita.' 
    },
    { 
      icon: '', 
      title: 'Komunita', 
      description: 'Propojujeme zákazníky s výrobou, sládky, inspirací, chutěmi i místem.' 
    },
    { 
      icon: '', 
      title: 'Kvalita', 
      description: 'Dbáme na autenticitu a kvalitu vstupních surovin.' 
    }
  ];

  const benefits: Benefit[] = (block.content as any).benefits || defaultBenefits;

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  const addBenefit = () => {
    const newBenefits = [...benefits, { icon: '', title: 'Nový benefit', description: 'Popis benefitu' }];
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  return (
    <div className="bg-white border border-border p-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative text-center">
              {/* Remove button */}
              <button
                onClick={() => removeBenefit(index)}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Icon - replaceable image */}
              <div 
                className="mb-4 flex justify-center cursor-pointer"
                onClick={() => setEditingBenefit(index)}
              >
                {benefit.icon ? (
                  <img 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    className="w-12 h-12 object-contain"
                    style={{ color: '#00C322' }}
                  />
                ) : (
                  <div 
                    className="w-12 h-12 border border-dashed border-gray-300 flex items-center justify-center text-2xl"
                    style={{ color: '#00C322' }}
                  >
                    □
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 
                className="font-medium text-base mb-2 cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ color: '#212121' }}
              >
                {benefit.title}
              </h3>

              {/* Description */}
              <p 
                className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ fontStyle: 'italic' }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={addBenefit}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Přidat benefit
          </Button>
        </div>
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
