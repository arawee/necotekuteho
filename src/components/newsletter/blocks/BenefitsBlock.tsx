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

// Default SVG icons as data URIs
const defaultIcons = [
  `data:image/svg+xml,${encodeURIComponent('<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_9658_6090)"><path d="M47 1V47H1V1H47ZM48 0H0V48H48V0Z" fill="#00A51B"/><path d="M37.1716 24.0034C45.0416 35.2134 35.6216 44.2934 24.0016 36.7034C12.3816 44.2934 2.96157 35.2034 10.8316 24.0034C2.96157 12.7934 12.3816 3.71342 24.0016 11.3034C35.6216 3.71342 45.0416 12.8034 37.1716 24.0034Z" stroke="#00A51B" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_9658_6090"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>')}`,
  `data:image/svg+xml,${encodeURIComponent('<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_9658_6096)"><path d="M47 1V47H1V1H47ZM48 0H0V48H48V0Z" fill="#00A51B"/><path d="M39.2909 24.2578C39.2909 32.6978 32.4509 39.5478 24.0009 39.5478C15.5509 39.5478 8.71094 32.7078 8.71094 24.2578" stroke="#00A51B" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_9658_6096"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>')}`,
  `data:image/svg+xml,${encodeURIComponent('<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_9658_6102)"><path d="M47 1V47H1V1H47ZM48 0H0V48H48V0Z" fill="#00A51B"/><path d="M15.6317 27.7791C20.2543 27.7791 24.0017 24.0317 24.0017 19.4091C24.0017 14.7864 20.2543 11.0391 15.6317 11.0391C11.0091 11.0391 7.26172 14.7864 7.26172 19.4091C7.26172 24.0317 11.0091 27.7791 15.6317 27.7791Z" stroke="#00A51B" stroke-miterlimit="10"/><path d="M32.37 36.9587C36.9926 36.9587 40.74 33.2114 40.74 28.5888C40.74 23.9661 36.9926 20.2188 32.37 20.2188C27.7474 20.2188 24 23.9661 24 28.5888C24 33.2114 27.7474 36.9587 32.37 36.9587Z" stroke="#00A51B" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_9658_6102"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>')}`,
  `data:image/svg+xml,${encodeURIComponent('<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_9658_6109)"><path d="M47 1V47H1V1H47ZM48 0H0V48H48V0Z" fill="#00A51B"/><path d="M24 3.25V42.77" stroke="#00A51B" stroke-miterlimit="10"/><path d="M37.9713 9.03906L10.0312 36.9891" stroke="#00A51B" stroke-miterlimit="10"/><path d="M43.7583 23.0078H4.23828" stroke="#00A51B" stroke-miterlimit="10"/><path d="M37.9713 36.9891L10.0312 9.03906" stroke="#00A51B" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_9658_6109"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>')}`
];

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

              {/* Title - 20px bold black */}
              <h3 
                className="font-bold mb-2 cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ color: '#000000', fontSize: '20px' }}
              >
                {benefit.title}
              </h3>

              {/* Description - 14px regular black */}
              <p 
                className="leading-relaxed cursor-pointer"
                onClick={() => setEditingBenefit(index)}
                style={{ color: '#000000', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal' }}
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
