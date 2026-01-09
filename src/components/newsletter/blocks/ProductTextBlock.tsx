import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';

interface ProductTextBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ProductTextBlock = ({ block, onUpdate }: ProductTextBlockProps) => {
  const productImage = block.content.image || '';
  const productName = block.content.title || 'Magop';
  const productText = block.content.text || 'V pátce roku 2019 vyhlášena servrem Untapped.com nejlepším pivem v České republice. New England IPA je moderním stylem, který vznikl v roce 2008 na východním pobřeží Spojených Států. Přinesl úplně nový pohled na stavbu americké IPA, zabil, který dařena velmi velké důraz na chmelovou arovatiku a hořkost se tak stavěla jen právhy doplńkem.';

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-md mx-auto">
        {/* Product image */}
        <div className="relative mb-4 aspect-[3/4] overflow-hidden flex items-center justify-center">
          <ImageUpload
            currentImage={productImage}
            onImageUploaded={(url) => onUpdate({ ...block.content, image: url })}
            aspectRatio="portrait"
            placeholder="Nahrát foto produktu"
            className="w-full h-full"
            showBorder={false}
          />
        </div>

        {/* Product info box */}
        <div className="bg-white">
          {/* Product name */}
          <h2 
            className="text-xl font-normal mb-4"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {productName}
          </h2>

          {/* Product description */}
          <p 
            className="text-sm leading-relaxed"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, text: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {productText}
          </p>
        </div>
      </div>
    </div>
  );
};
