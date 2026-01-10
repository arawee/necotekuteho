import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  image: string;
  name: string;
  alcohol: string;
  volume: string;
  price: string;
  salePrice?: string;
  tags: { text: string; color: 'dark' | 'red' | 'green' }[];
  url?: string;
}

interface ProductListBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductListBlock = ({ block, onUpdate }: ProductListBlockProps) => {
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const defaultProducts: Product[] = [
    { image: '', name: 'Magor 15', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: [{ text: 'Polotmavé bock', color: 'dark' }], url: '#' },
    { image: '', name: 'Sour Passion Fruit', alcohol: '5,9', volume: '750 ml', price: '167 Kč', salePrice: '90 Kč', tags: [{ text: 'Relax', color: 'dark' }, { text: 'Poslední šance', color: 'red' }], url: '#' },
    { image: '', name: 'Milky', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: [{ text: 'Neipa', color: 'dark' }, { text: 'Novinka', color: 'green' }], url: '#' }
  ];

  // Max 4 products
  const allProducts: Product[] = (block.content as any).products || defaultProducts;
  const products: Product[] = allProducts.slice(0, 4);
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllText = (block.content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (block.content as any).viewAllUrl || '#';

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const addProduct = () => {
    if (products.length >= 4) return;
    const newProduct: Product = {
      image: '',
      name: 'Nový produkt',
      alcohol: '5,0',
      volume: '500 ml',
      price: '99 Kč',
      tags: [],
      url: '#'
    };
    onUpdate({ ...block.content, products: [...products, newProduct] } as any);
  };

  const removeProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const updateTag = (productIndex: number, tagIndex: number, field: 'text' | 'color', value: string) => {
    const newProducts = [...products];
    const newTags = [...newProducts[productIndex].tags];
    newTags[tagIndex] = { ...newTags[tagIndex], [field]: value };
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const addTag = (productIndex: number) => {
    const newProducts = [...products];
    const newTags = [...newProducts[productIndex].tags, { text: 'Nový tag', color: 'dark' as const }];
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const removeTag = (productIndex: number, tagIndex: number) => {
    const newProducts = [...products];
    const newTags = newProducts[productIndex].tags.filter((_, i) => i !== tagIndex);
    newProducts[productIndex] = { ...newProducts[productIndex], tags: newTags };
    onUpdate({ ...block.content, products: newProducts } as any);
  };

  const getTagStyle = (color: string) => {
    switch (color) {
      case 'red':
        return { backgroundColor: '#FF4C4C', color: '#FFFFFF' };
      case 'green':
        return { backgroundColor: '#00C322', color: '#FFFFFF' };
      default:
        return { backgroundColor: '#161616', color: '#FFFFFF' };
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header - title 20px bold */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h2 
            className="font-bold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121', fontSize: '20px' }}
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
                style={{ color: '#000000', textUnderlineOffset: '2px' }}
                onClick={() => setEditingProduct(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Products flex */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {products.map((product: Product, index: number) => (
            <div key={index} className="group relative" style={{ flex: 1 }}>
              {/* Remove button */}
              <button
                onClick={() => removeProduct(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Product image - no margin bottom */}
              <div className="relative bg-muted aspect-[3/4] overflow-hidden" style={{ marginBottom: '0rem' }}>
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
                    className="text-[10px] px-2 py-0.5 cursor-pointer group/tag relative"
                    style={getTagStyle(tag.color)}
                    onClick={() => setEditingProduct(index)}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>

              {/* Product info - title bold 700, 20px */}
              <h3 
                className="mb-1 cursor-pointer"
                onClick={() => setEditingProduct(index)}
                style={{ color: '#212121', fontWeight: 700, fontSize: '20px' }}
              >
                {product.name}
              </h3>
              
              {/* Alcohol and volume - 10px black, volume right aligned */}
              <div className="mb-2 flex items-center justify-between" style={{ fontSize: '10px', color: '#000000' }}>
                <span><strong>Alk. →</strong> {product.alcohol}% obj.</span>
                <span>{product.volume}</span>
              </div>
              
              {/* Price - bold, discounted 10px */}
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span style={{ color: '#FF4C4C', fontWeight: 700 }}>
                      {product.salePrice}
                    </span>
                    <span className="line-through" style={{ fontSize: '10px', color: '#666' }}>
                      {product.price}
                    </span>
                  </>
                ) : (
                  <span style={{ color: '#212121', fontWeight: 700 }}>
                    {product.price}
                  </span>
                )}
                {/* Circular green button 36px with black plus 10px */}
                <button 
                  className="ml-auto flex items-center justify-center !rounded-full"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    backgroundColor: '#00C322',
                    border: 'none'
                  }}
                  onClick={() => setEditingProduct(index)}
                >
                  <Plus style={{ width: '10px', height: '10px', color: '#000000' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add product button - only show if less than 4 products */}
        {products.length < 4 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addProduct}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Přidat produkt
            </button>
          </div>
        )}
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
              {/* Tags editor */}
              <div>
                <label className="text-sm font-medium">Tagy</label>
                <div className="space-y-2 mt-2">
                  {products[editingProduct]?.tags.map((tag, tagIdx) => (
                    <div key={tagIdx} className="flex gap-2 items-center">
                      <Input
                        className="flex-1"
                        value={tag.text}
                        onChange={(e) => updateTag(editingProduct, tagIdx, 'text', e.target.value)}
                      />
                      <Select
                        value={tag.color}
                        onValueChange={(value) => updateTag(editingProduct, tagIdx, 'color', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Tmavý</SelectItem>
                          <SelectItem value="red">Červený</SelectItem>
                          <SelectItem value="green">Zelený</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        onClick={() => removeTag(editingProduct, tagIdx)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addTag(editingProduct)}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    + Přidat tag
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
