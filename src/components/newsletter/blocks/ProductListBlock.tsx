import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Edit2, Plus } from 'lucide-react';

interface Product {
  image: string;
  name: string;
  alcohol: string;
  volume: string;
  price: string;
  salePrice?: string;
  tags: string[];
}

interface ProductListBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductListBlock = ({ block, onUpdate }: ProductListBlockProps) => {
  const defaultProducts: Product[] = [
    { image: '', name: 'Magor 15', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Polotmavé bock'] },
    { image: '', name: 'Sour Passion Fruit', alcohol: '5,9', volume: '750 ml', price: '167 Kč', salePrice: '90 Kč', tags: ['Relax', 'Poslední šance'] },
    { image: '', name: 'Milky', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Neipa', 'Novinka'] },
    { image: '', name: 'Juicy Lucy', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Relax'] }
  ];

  const products: Product[] = (block.content as any).products || defaultProducts;

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
            {block.content.title || 'Mohlo by vám chutnat'}
          </h2>
          <a href="#" className="text-sm underline hover:no-underline" style={{ color: '#212121' }}>
            → zobrazit vše
          </a>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-4 gap-4">
          {products.map((product: Product, index: number) => (
            <div key={index} className="group">
              {/* Product image */}
              <div className="relative mb-3 bg-muted rounded-lg aspect-[3/4] overflow-hidden">
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
                    className="text-[10px] px-2 py-0.5 rounded-full cursor-text group/tag relative"
                    style={{ 
                      backgroundColor: tag.toLowerCase().includes('novinka') ? '#00D954' : '#F5F5F5',
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
                  className="text-[10px] px-2 py-0.5 rounded-full border border-dashed border-gray-300 hover:border-green-500 text-gray-400 hover:text-green-500"
                >
                  +
                </button>
              </div>

              {/* Product info */}
              <h3 
                className="font-medium text-sm mb-1"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateProduct(index, 'name', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {product.name}
              </h3>
              
              {/* Alcohol and volume - editable */}
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <span>Alk. →</span>
                <input
                  type="text"
                  value={product.alcohol}
                  onChange={(e) => updateProduct(index, 'alcohol', e.target.value)}
                  className="w-8 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded text-center"
                />
                <span>% obj.</span>
                <input
                  type="text"
                  value={product.volume}
                  onChange={(e) => updateProduct(index, 'volume', e.target.value)}
                  className="w-14 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded text-center ml-2"
                />
              </div>
              
              {/* Price - editable with optional sale price */}
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <input
                      type="text"
                      value={product.salePrice}
                      onChange={(e) => updateProduct(index, 'salePrice', e.target.value)}
                      className="text-sm font-medium w-16 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                      style={{ color: '#00D954' }}
                    />
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => updateProduct(index, 'price', e.target.value)}
                      className="text-xs line-through text-muted-foreground w-14 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    className="text-sm font-medium w-16 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                    style={{ color: '#212121' }}
                  />
                )}
                <button
                  onClick={() => updateProduct(index, 'salePrice', product.salePrice ? '' : product.price)}
                  className="text-[10px] px-1 py-0.5 rounded border border-dashed border-gray-300 hover:border-green-500 text-gray-400 hover:text-green-500"
                  title={product.salePrice ? 'Zrušit slevu' : 'Přidat slevu'}
                >
                  {product.salePrice ? '−sleva' : '+sleva'}
                </button>
                <button 
                  className="ml-auto w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#00D954' }}
                >
                  <Plus className="w-4 h-4" style={{ color: '#212121' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
