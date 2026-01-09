import { NewsletterBlock } from '@/types/newsletter';
import { SvgUpload } from '@/components/ui/svg-upload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface MenuItem {
  text: string;
  url: string;
}

interface ZichovecHeaderWithMenuBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ZichovecHeaderWithMenuBlock = ({ block, onUpdate }: ZichovecHeaderWithMenuBlockProps) => {
  const defaultMenuItems: MenuItem[] = [
    { text: 'E-shop ↓', url: '#' },
    { text: 'Limitky a Novinky', url: '#' },
    { text: 'Dárky a balíčky', url: '#' },
    { text: 'Zachraň pivo', url: '#' }
  ];

  const menuItems: MenuItem[] = (block.content as any).menuItems || defaultMenuItems;

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index] = { ...newMenuItems[index], [field]: value };
    onUpdate({ ...block.content, menuItems: newMenuItems } as any);
  };

  const addMenuItem = () => {
    const newMenuItems = [...menuItems, { text: 'Nová položka', url: '#' }];
    onUpdate({ ...block.content, menuItems: newMenuItems } as any);
  };

  const removeMenuItem = (index: number) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index);
    onUpdate({ ...block.content, menuItems: newMenuItems } as any);
  };

  return (
    <div 
      className="w-full flex flex-col items-center py-12"
      style={{ backgroundColor: '#00D954', minHeight: '200px' }}
    >
      <div className="w-full max-w-md mb-8">
        <SvgUpload
          currentSvg={block.content.image || ''}
          onSvgUploaded={(svgContent) => onUpdate({ ...block.content, image: svgContent })}
          placeholder="Nahrát logo (SVG)"
          className="w-full"
        />
        {!block.content.image && (
          <div className="text-center">
            <h1 
              className="text-6xl font-black tracking-tight"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontStyle: 'italic',
                color: '#212121'
              }}
            >
              ZICHOVEC
            </h1>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: '#212121' }}>
        {menuItems.map((item, index) => (
          <div key={index} className="group flex items-center gap-1">
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateMenuItem(index, 'text', e.target.value)}
              className="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-black/20 rounded px-2 py-1 min-w-[80px]"
              style={{ color: '#212121', fontStyle: 'italic' }}
            />
            <button
              onClick={() => removeMenuItem(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
            >
              <Trash2 className="w-3 h-3" style={{ color: '#212121' }} />
            </button>
          </div>
        ))}
        <button
          onClick={addMenuItem}
          className="flex items-center gap-1 px-2 py-1 hover:bg-black/10 rounded transition-colors"
          style={{ color: '#212121' }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* URL editor */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs max-w-md w-full px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="truncate" style={{ color: '#212121' }}>{item.text}:</span>
            <Input
              type="text"
              value={item.url}
              onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
              className="h-6 text-xs bg-white/50 border-none flex-1"
              placeholder="URL"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
