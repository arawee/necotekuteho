import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductTextBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductTextBlock = ({ block, onUpdate }: ProductTextBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const productImage = block.content.image || '';
  const productName = block.content.title || 'Magop';
  const productText = block.content.text || 'V pátce roku 2019 vyhlášena servrem Untapped.com nejlepším pivem v České republice. New England IPA je moderním stylem, který vznikl v roce 2008 na východním pobřeží Spojených Států. Přinesl úplně nový pohled na stavbu americké IPA, zabil, který dařena velmi velké důraz na chmelovou arovatiku a hořkost se tak stavěla jen právhy doplńkem.';

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-md mx-auto">
        {/* Product image - no margin bottom */}
        <div className="relative aspect-[3/4] overflow-hidden flex items-center justify-center">
          <ImageUpload
            currentImage={productImage}
            onImageUploaded={(url) => onUpdate({ ...block.content, image: url })}
            aspectRatio="portrait"
            placeholder="Nahrát foto produktu"
            className="w-full h-full"
            showBorder={false}
          />
        </div>

        {/* Product info box - grey background */}
        <div 
          className="p-4 cursor-pointer"
          style={{ backgroundColor: '#F4F4F4' }}
          onClick={() => setIsEditing(true)}
        >
          {/* Product name - 20px with 16px margin below */}
          <h2 
            className="font-normal"
            style={{ color: '#212121', fontSize: '20px', marginBottom: '16px' }}
          >
            {productName}
          </h2>

          {/* Product description - 120% line height */}
          <p 
            className="text-sm"
            style={{ color: '#212121', lineHeight: '120%' }}
          >
            {productText}
          </p>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit produkt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Název</label>
              <input
                className="w-full border p-2 text-sm"
                value={productName}
                onChange={(e) => onUpdate({ ...block.content, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Popis</label>
              <textarea
                className="w-full border p-2 text-sm"
                rows={5}
                value={productText}
                onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
