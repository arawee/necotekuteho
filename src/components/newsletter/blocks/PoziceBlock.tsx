import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Position {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  bgColor: string;
}

interface PoziceBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

const colorOptions = [
  { name: 'Šedá', value: '#F5F5F5' },
  { name: 'Bílá', value: '#FFFFFF' },
  { name: 'Zelená', value: '#00D954' },
  { name: 'Černá', value: '#212121' },
];

export const PoziceBlock = ({ block, onUpdate }: PoziceBlockProps) => {
  const [editingUrl, setEditingUrl] = useState<number | null>(null);

  const defaultPositions: Position[] = [
    { 
      title: 'Správce sociálních sítí', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. repudiand ae labor um comma se ac representa tiveed accumsan minim adip iscing dolor en ea nostrud representé parida tur adipisicing adig ad pis labe.',
      buttonText: '+ Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    },
    { 
      title: 'Obsluha v Zichoveckém baru', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod ac representa tiveed accusam is tempor. In dolor.',
      buttonText: '+ Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    },
    { 
      title: 'Sládek', 
      description: 'Sit aliqu ip venim non nostrud consectetur consequ at conse ctetur conse qui incidid unt excepteur. Consequat est quia sit. cupidat ur laboré commod acupidat laboré commod accusam is tempor. In dolore magna adip iscing dolor en ea aliqu ea nostrud lorem repre henderit parida tur adip isicing adig amet de nulla. Elit mollit',
      buttonText: '+ Mám zájem',
      buttonUrl: '#',
      bgColor: '#F5F5F5'
    },
    { 
      title: 'Skladník', 
      description: 'Sit aliqu ip venim non nostrud consectetur nostlit consequ at sed ita conse inste ad excepteur. expreat sit alqua re cupidat laboré commod tempor. In dolore magna adip isicing dolor en ea aliqu ea nostrud lorem repre henderit parida tur',
      buttonText: '+ Mám zájem',
      buttonUrl: '#',
      bgColor: '#FFFFFF'
    }
  ];

  const positions = (block.content as any).positions || defaultPositions;

  const updatePosition = (index: number, field: keyof Position, value: any) => {
    const newPositions = [...positions];
    newPositions[index] = { ...newPositions[index], [field]: value };
    onUpdate({ ...block.content, positions: newPositions } as any);
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
            {block.content.title || 'Volné pozice'}
          </h2>
        </div>

        {/* Positions grid */}
        <div className="grid grid-cols-4 gap-4">
          {positions.map((position: Position, index: number) => (
            <div 
              key={index} 
              className="group p-4 rounded-lg flex flex-col"
              style={{ backgroundColor: position.bgColor || '#FFFFFF' }}
            >
              {/* Color selector */}
              <div className="mb-2 flex gap-1">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.value }}
                    onClick={() => updatePosition(index, 'bgColor', color.value)}
                    title={color.name}
                  />
                ))}
              </div>

              {/* Position title */}
              <h3 
                className="font-medium text-sm mb-3"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updatePosition(index, 'title', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {position.title}
              </h3>

              {/* Position description */}
              <p 
                className="text-xs text-muted-foreground mb-4 flex-grow"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updatePosition(index, 'description', e.currentTarget.textContent || '')}
              >
                {position.description}
              </p>

              {/* Action button */}
              <div className="relative">
                {editingUrl === index ? (
                  <Input
                    value={position.buttonUrl || '#'}
                    onChange={(e) => updatePosition(index, 'buttonUrl', e.target.value)}
                    placeholder="URL"
                    className="w-full h-7 text-xs"
                    onBlur={() => setEditingUrl(null)}
                    autoFocus
                  />
                ) : (
                  <button 
                    className="text-xs underline text-left"
                    style={{ color: '#212121' }}
                    onClick={() => setEditingUrl(index)}
                    title="Click to edit URL"
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        e.stopPropagation();
                        updatePosition(index, 'buttonText', e.currentTarget.textContent || '');
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {position.buttonText}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
