import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Category {
  image: string;
  tag: string;
  url?: string;
}

interface CategoriesBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const CategoriesBlock = ({ block, onUpdate }: CategoriesBlockProps) => {
  const [editingCategory, setEditingCategory] = useState<number | null>(null);

  const defaultCategories: Category[] = [
    { image: '', tag: '→ IPA, APA a NEIPA', url: '#' },
    { image: '', tag: '→ Sour a Ovocné', url: '#' },
    { image: '', tag: '→ Ležáky a klasika', url: '#' },
    { image: '', tag: '→ Relax a osvěžení', url: '#' }
  ];

  const categories: Category[] = (block.content as any).categories || defaultCategories;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = (block.content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (block.content as any).viewAllUrl || '#';

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  const addCategory = () => {
    const newCategories = [...categories, { image: '', tag: '→ Nová kategorie', url: '#' }];
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-lg font-normal"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {block.content.title || 'Vyber si to pravé pro tebe'}
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox
                checked={showViewAll}
                onCheckedChange={(checked) => onUpdate({ ...block.content, showViewAll: checked } as any)}
              />
              Zobrazit vše
            </label>
            {showViewAll && (
              <span 
                className="text-sm cursor-pointer"
                style={{ color: '#212121' }}
                onClick={() => setEditingCategory(-1)}
              >
                → {viewAllText}
              </span>
            )}
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} className="group relative">
              {/* Remove button */}
              <button
                onClick={() => removeCategory(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Category image */}
              <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageUpload
                  currentImage={category.image}
                  onImageUploaded={(url) => updateCategory(index, 'image', url)}
                  aspectRatio="portrait"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Tag */}
              <div 
                className="text-xs px-2 py-1 inline-block cursor-pointer"
                style={{ backgroundColor: '#212121', color: '#FFFFFF' }}
                onClick={() => setEditingCategory(index)}
              >
                {category.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        {categories.length < 4 && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={addCategory}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Přidat kategorii
            </Button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingCategory !== null} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory === -1 ? 'Upravit "zobrazit vše"' : 'Upravit kategorii'}</DialogTitle>
          </DialogHeader>
          {editingCategory === -1 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={viewAllText}
                  onChange={(e) => onUpdate({ ...block.content, viewAllText: e.target.value } as any)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={viewAllUrl}
                  onChange={(e) => onUpdate({ ...block.content, viewAllUrl: e.target.value } as any)}
                />
              </div>
            </div>
          ) : editingCategory !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Štítek</label>
                <Input
                  value={categories[editingCategory]?.tag || ''}
                  onChange={(e) => updateCategory(editingCategory, 'tag', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={categories[editingCategory]?.url || ''}
                  onChange={(e) => updateCategory(editingCategory, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
