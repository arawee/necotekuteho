import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Plus, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  image: string;
  name: string;
  alcohol: string;
  volume: string;
  price: string;
  salePrice?: string;
  tags: string[];
  url?: string;
}

interface ProductListBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductListBlock = ({ block, onUpdate }: ProductListBlockProps) => {
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const defaultProducts: Product[] = [
    { image: '', name: 'Magor 15', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Polotmavé bock'], url: '#' },
    { image: '', name: 'Sour Passion Fruit', alcohol: '5,9', volume: '750 ml', price: '167 Kč', salePrice: '90 Kč', tags: ['Relax', 'Poslední šance'], url: '#' },
    { image: '', name: 'Milky', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Neipa', 'Novinka'], url: '#' },
    { image: '', name: 'Juicy Lucy', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Relax'], url: '#' }
  ];

  const products: Product[] = (block.content as any).products || defaultProducts;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = (block.content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (block.content as any).viewAllUrl || '#';

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const updateTag = (productIndex: number, tagIndex: number, value: string) => {
    const newProducts = [...products];
    const newTags = [...newProducts[productIndex].tags];
    newTags[tagIndex] = value;
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const addTag = (productIndex: number) => {
    const newProducts = [...products];
    const newTags = [...newProducts[productIndex].tags, 'Nový tag'];
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const removeTag = (productIndex: number, tagIndex: number) => {
    const newProducts = [...products];
    const newTags = newProducts[productIndex].tags.filter((_, i) => i !== tagIndex);
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
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
            {block.content.title || 'Mohlo by vám chutnat'}
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
                onClick={() => setEditingProduct(-1)}
              >
                → {viewAllText}
              </span>
            )}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-4 gap-4">
          {products.map((product: Product, index: number) => (
            <div key={index} className="group">
              {/* Product image */}
              <div className="relative mb-3 bg-muted aspect-[3/4] overflow-hidden">
                <ImageUpload
                  currentImage={product.image}
                  onImageUploaded={(url) => updateProduct(index, 'image', url)}
                  aspectRatio="portrait"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Tags - below photo */}
              <div className="flex flex-wrap gap-1 mb-2">
                {product.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx}
                    className="text-[10px] px-2 py-0.5 cursor-text group/tag relative"
                    style={{ 
                      backgroundColor: tag.toLowerCase().includes('novinka') ? '#00C322' : '#F4F4F4',
                      color: '#212121'
                    }}
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateTag(index, tagIdx, e.currentTarget.textContent || '')}
                    >
                      {tag}
                    </span>
                    <button
                      onClick={() => removeTag(index, tagIdx)}
                      className="ml-1 opacity-0 group-hover/tag:opacity-100 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => addTag(index)}
                  className="text-[10px] px-2 py-0.5 border border-dashed border-gray-300 hover:border-green-500 text-gray-400 hover:text-green-500"
                >
                  +
                </button>
              </div>

              {/* Product info */}
              <h3 
                className="font-medium text-sm mb-1 cursor-pointer"
                onClick={() => setEditingProduct(index)}
                style={{ color: '#212121' }}
              >
                {product.name}
              </h3>
              
              {/* Alcohol and volume */}
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <span>Alk. → {product.alcohol}% obj. {product.volume}</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-sm font-medium" style={{ color: '#00C322' }}>
                      {product.salePrice}
                    </span>
                    <span className="text-xs line-through text-muted-foreground">
                      {product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium" style={{ color: '#212121' }}>
                    {product.price}
                  </span>
                )}
                <button 
                  className="ml-auto w-6 h-6 flex items-center justify-center border"
                  style={{ borderColor: '#00C322' }}
                  onClick={() => setEditingProduct(index)}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: '#00C322' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingProduct !== null} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct === -1 ? 'Upravit "zobrazit vše"' : 'Upravit produkt'}</DialogTitle>
          </DialogHeader>
          {editingProduct === -1 ? (
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
          ) : editingProduct !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Název</label>
                <Input
                  value={products[editingProduct]?.name || ''}
                  onChange={(e) => updateProduct(editingProduct, 'name', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Alkohol (%)</label>
                  <Input
                    value={products[editingProduct]?.alcohol || ''}
                    onChange={(e) => updateProduct(editingProduct, 'alcohol', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Objem</label>
                  <Input
                    value={products[editingProduct]?.volume || ''}
                    onChange={(e) => updateProduct(editingProduct, 'volume', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Cena</label>
                  <Input
                    value={products[editingProduct]?.price || ''}
                    onChange={(e) => updateProduct(editingProduct, 'price', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Sleva (volitelné)</label>
                  <Input
                    value={products[editingProduct]?.salePrice || ''}
                    onChange={(e) => updateProduct(editingProduct, 'salePrice', e.target.value)}
                    placeholder="např. 90 Kč"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={products[editingProduct]?.url || ''}
                  onChange={(e) => updateProduct(editingProduct, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
