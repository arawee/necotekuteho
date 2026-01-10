import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MenuItem {
  text: string;
  url: string;
}

interface ZichovecHeaderWithMenuBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

const ZichovecLogo = () => (
  <svg width="1258" height="143" viewBox="0 0 1258 143" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1258px', maxWidth: '100%', height: 'auto' }}>
    <path d="M1177.26 143C1225.76 143 1255.72 119.372 1257.97 81.8424L1220.08 79.8804C1217.99 98.4351 1203.22 109.394 1177.26 109.394C1149.78 109.394 1133.5 94.9316 1133.5 71.5C1133.5 48.0684 1149.78 33.6058 1177.26 33.6058C1203.03 33.6058 1217.82 44.5368 1220.08 63.1196L1257.97 60.7652C1254.93 23.6558 1225.19 0 1177.26 0C1126.67 0 1095.22 27.7479 1095.22 71.5C1095.22 115.252 1126.67 143 1177.26 143ZM945.709 3.13916V139.889H1081.96V106.283H983.984V87.1397H1071.71V55.2997H983.984V36.745H1081.96V3.13916H945.709ZM937.2 3.13916H894.766L846.269 106.283L796.223 3.13916H752.647L818.406 139.889H872.801L937.2 3.13916ZM674.003 109.394C645.759 109.394 627.573 94.9316 627.573 71.5C627.573 48.0684 645.759 33.6058 674.003 33.6058C702.248 33.6058 720.434 48.0684 720.434 71.5C720.434 94.9316 702.248 109.394 674.003 109.394ZM674.003 143C725.354 143 758.709 115.252 758.709 71.5C758.709 27.7479 725.354 0 674.003 0C622.653 0 589.298 27.7479 589.298 71.5C589.298 115.252 622.653 143 674.003 143ZM411.187 3.13916V139.889H449.462V88.3169H532.075V139.889H570.35V3.13916H532.075V54.7111H449.462V3.13916H411.187ZM311.503 143C359.999 143 389.956 119.372 392.213 81.8424L354.318 79.8804C352.225 98.4351 337.464 109.394 311.503 109.394C284.02 109.394 267.737 94.9316 267.737 71.5C267.737 48.0684 284.02 33.6058 311.503 33.6058C337.274 33.6058 352.062 44.5368 354.318 63.1196L392.213 60.7652C389.168 23.6558 359.429 0 311.503 0C260.913 0 229.461 27.7479 229.461 71.5C229.461 115.252 260.913 143 311.503 143ZM172.239 3.13916V139.889H210.514V3.13916H172.239ZM0 111.16V139.889H155.194V106.283H64.0458L152.53 31.8401V3.13916H1.90289V36.745H89.0552L0 111.16Z" fill="black"/>
  </svg>
);

export const ZichovecHeaderWithMenuBlock = ({ block, onUpdate }: ZichovecHeaderWithMenuBlockProps) => {
  const [editingMenuItem, setEditingMenuItem] = useState<number | null>(null);

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
      className="w-full flex flex-col"
      style={{ 
        backgroundColor: '#00C322', 
        width: '100%',
        maxWidth: '1440px',
        aspectRatio: '3.4615384615',
        position: 'relative'
      }}
    >
      {/* Logo - absolutely centered */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '32px', paddingRight: '32px' }}>
        <ZichovecLogo />
      </div>

      {/* Menu - aligned to bottom */}
      <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <div key={index} className="group flex items-center gap-1">
            <span
              className="cursor-pointer hover:underline text-sm font-bold"
              style={{ color: '#212121', fontStyle: 'normal' }}
              onClick={() => setEditingMenuItem(index)}
            >
              {item.text}
            </span>
            <button
              onClick={() => removeMenuItem(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10"
            >
              <Trash2 className="w-3 h-3" style={{ color: '#212121' }} />
            </button>
          </div>
        ))}
        <button
          onClick={addMenuItem}
          className="flex items-center gap-1 px-2 py-1 hover:bg-black/10 transition-colors"
          style={{ color: '#212121' }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingMenuItem !== null} onOpenChange={(open) => !open && setEditingMenuItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit položku menu</DialogTitle>
          </DialogHeader>
          {editingMenuItem !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={menuItems[editingMenuItem]?.text || ''}
                  onChange={(e) => updateMenuItem(editingMenuItem, 'text', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={menuItems[editingMenuItem]?.url || ''}
                  onChange={(e) => updateMenuItem(editingMenuItem, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
