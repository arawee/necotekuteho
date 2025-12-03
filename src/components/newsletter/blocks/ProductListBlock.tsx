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
  originalPrice?: string;
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductListBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductListBlock = ({ block, onUpdate }: ProductListBlockProps) => {
  const defaultProducts: Product[] = [
    { image: '', name: 'Magor 15', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Polotmavé bock'] },
    { image: '', name: 'Sour Passion Fruit', alcohol: '5,9', volume: '750 ml', price: '90 Kč', originalPrice: '167 Kč', tags: ['Relax', 'Poslední šance'], isSale: true },
    { image: '', name: 'Milky', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Neipa', 'Novinka'], isNew: true },
    { image: '', name: 'Juicy Lucy', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: ['Relax', 'Poslední šance'] }
  ];

  const products = (block.content as any).products || defaultProducts;

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
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
                {/* Tags */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {product.tags?.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: tag === 'Novinka' ? '#00D954' : '#F5F5F5',
                        color: '#212121'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {product.isSale && (
                    <span 
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#00D954', color: '#212121' }}
                    >
                      sleva 10 %
                    </span>
                  )}
                </div>
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
              <p className="text-xs text-muted-foreground mb-2">
                Alk. → {product.alcohol} % obj. <span className="ml-2">{product.volume}</span>
              </p>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span 
                  className={`text-sm font-medium ${product.isSale ? 'text-green-600' : ''}`}
                  style={{ color: product.isSale ? '#00D954' : '#212121' }}
                >
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-muted-foreground">
                    {product.originalPrice}
                  </span>
                )}
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
