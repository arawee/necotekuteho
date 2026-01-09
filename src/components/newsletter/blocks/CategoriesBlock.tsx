import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Category {
  image: string;
  tag: string;
}

interface CategoriesBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const CategoriesBlock = ({ block, onUpdate }: CategoriesBlockProps) => {
  const defaultCategories: Category[] = [
    { image: '', tag: '→ IPA, APA a NEIPA' },
    { image: '', tag: '→ Sour a Ovocné' },
    { image: '', tag: '→ Ležáky a klasika' },
    { image: '', tag: '→ Relax a osvěžení' }
  ];

  const categories: Category[] = (block.content as any).categories || defaultCategories;

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  const addCategory = () => {
    const newCategories = [...categories, { image: '', tag: '→ Nová kategorie' }];
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    onUpdate({ ...block.content, categories: newCategories } as any);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">8 Kategorie</span>
        </div>
        <h2 
          className="text-lg font-normal mb-6"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          style={{ color: '#212121' }}
        >
          {block.content.title || 'Vyber si to pravé pro tebe'}
        </h2>

        {/* Categories grid */}
        <div className="grid grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} className="group relative">
              {/* Remove button */}
              <button
                onClick={() => removeCategory(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Category image */}
              <div className="relative mb-3 rounded-lg aspect-[3/4] overflow-hidden bg-gray-100">
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
                className="text-xs px-2 py-1 rounded inline-block"
                style={{ backgroundColor: '#212121', color: '#FFFFFF' }}
              >
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateCategory(index, 'tag', e.currentTarget.textContent || '')}
                  className="cursor-text"
                >
                  {category.tag}
                </span>
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
    </div>
  );
};
