import { NewsletterBlock } from '@/types/newsletter';
import { Edit2 } from 'lucide-react';

interface PromoBoxBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const PromoBoxBlock = ({ block, onUpdate }: PromoBoxBlockProps) => {
  const boxes = [
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
      bgColor: '#FFFFFF',
      hasBorder: true
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
      bgColor: '#F5F5F5'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {boxes.map((box, index) => (
            <div 
              key={index} 
              className="rounded-lg p-6"
              style={{ 
                backgroundColor: box.bgColor,
                border: box.hasBorder ? '1px solid #E5E5E5' : 'none'
              }}
            >
              <h3 
                className="font-medium text-lg mb-4"
                style={{ color: '#212121' }}
              >
                {box.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                {box.features.map((feature, fIdx) => (
                  <div key={fIdx} className="text-xs">
                    <span className="font-medium" style={{ color: '#212121' }}>{feature.label}</span>
                    <span className="text-muted-foreground"> → {feature.value}</span>
                  </div>
                ))}
              </div>

              <button 
                className="text-sm px-4 py-2 rounded-full border"
                style={{ 
                  borderColor: '#212121',
                  color: '#212121',
                  backgroundColor: 'transparent'
                }}
              >
                {box.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
