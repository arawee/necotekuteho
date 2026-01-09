import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

const defaultIcons = ['□', '✕', '⊞', '◇'];

export const BenefitsBlock = ({ block, onUpdate }: BenefitsBlockProps) => {
  const defaultBenefits: Benefit[] = [
    { 
      icon: '□', 
      title: 'Experiment', 
      description: 'Náš pivovar rád experimentuje a neustále objevuje nové chutě a způsoby vaření piva.' 
    },
    { 
      icon: '✕', 
      title: 'Radost', 
      description: 'Pivo jako radost, zážitek, komunita.' 
    },
    { 
      icon: '⊞', 
      title: 'Komunita', 
      description: 'Propojujeme zákazníky s výrobou, sládky, inspirací, chutěmi i místem.' 
    },
    { 
      icon: '◇', 
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
    const newBenefits = [...benefits, { icon: '○', title: 'Nový benefit', description: 'Popis benefitu' }];
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    onUpdate({ ...block.content, benefits: newBenefits } as any);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative text-center">
              {/* Remove button */}
              <button
                onClick={() => removeBenefit(index)}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <input
                  type="text"
                  value={benefit.icon}
                  onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                  className="w-12 h-12 text-2xl text-center bg-transparent border border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  style={{ color: '#00D954' }}
                  maxLength={2}
                />
              </div>

              {/* Title */}
              <h3 
                className="font-medium text-base mb-2"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateBenefit(index, 'title', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {benefit.title}
              </h3>

              {/* Description */}
              <p 
                className="text-xs text-muted-foreground leading-relaxed"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateBenefit(index, 'description', e.currentTarget.textContent || '')}
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
    </div>
  );
};
