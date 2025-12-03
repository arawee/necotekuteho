import { NewsletterBlock } from '@/types/newsletter';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface ArticleTextBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ArticleTextBlock = ({ block, onUpdate }: ArticleTextBlockProps) => {
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [isEditingQuote, setIsEditingQuote] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h1 
          className="text-3xl font-normal mb-6"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          style={{ color: '#212121', lineHeight: '1.2' }}
        >
          {block.content.title || 'OPA: Jemná evoluce moderních ale'}
        </h1>

        {/* Main text */}
        <div className="mb-8">
          {isEditingBody ? (
            <div className="space-y-2">
              <RichTextEditor
                value={block.content.text || ''}
                onChange={(value) => onUpdate({ ...block.content, text: value })}
                placeholder="Napište obsah článku..."
              />
              <button 
                onClick={() => setIsEditingBody(false)}
                className="btn btn--green text-sm px-4 py-1 rounded-full"
                style={{ backgroundColor: '#00D954', border: 'none' }}
              >
                Hotovo
              </button>
            </div>
          ) : (
            <div 
              className="prose prose-sm max-w-none cursor-pointer hover:bg-muted/20 p-2 rounded group relative"
              onClick={() => setIsEditingBody(true)}
              dangerouslySetInnerHTML={{ 
                __html: block.content.text || 'PA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty. Na rozdíl od tradičních Pale Ale využívá ve větší míře ovesné vločky, které pivu dodávají hedvábnou plnost a příjemný zakulacený charakter. OPA tak stojí na pomezí mezi svěžím, chmelovým pivem a jemně krémovými stylem.' 
              }}
              style={{ color: '#212121', lineHeight: '1.6' }}
            />
          )}
        </div>

        {/* Quote box */}
        <div 
          className="border-l-4 pl-6 py-4 mb-8"
          style={{ borderColor: '#212121' }}
        >
          {isEditingQuote ? (
            <div className="space-y-2">
              <RichTextEditor
                value={block.content.quote || ''}
                onChange={(value) => onUpdate({ ...block.content, quote: value })}
                placeholder="Napište citát..."
              />
              <button 
                onClick={() => setIsEditingQuote(false)}
                className="btn text-sm px-4 py-1 rounded-full"
                style={{ backgroundColor: '#00D954', border: 'none' }}
              >
                Hotovo
              </button>
            </div>
          ) : (
            <blockquote 
              className="text-xl font-normal cursor-pointer hover:bg-muted/20 p-2 rounded"
              onClick={() => setIsEditingQuote(true)}
              style={{ color: '#212121', lineHeight: '1.4' }}
            >
              {block.content.quote || 'OPA je pivo, které spojuje lehkost, sametovou jemnost a moderní chmelení v harmonický celek (citace)'}
            </blockquote>
          )}
        </div>

        {/* Metadata */}
        <div className="border-t pt-4 space-y-1 text-sm" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex gap-2">
            <span className="font-medium">Datum →</span>
            <span 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate({ ...block.content, date: e.currentTarget.textContent || '' })}
              className="text-muted-foreground"
            >
              {(block.content as any).date || '28. května 2025'}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Autor →</span>
            <span 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate({ ...block.content, subtitle: e.currentTarget.textContent || '' })}
              className="text-muted-foreground"
            >
              {block.content.subtitle || 'Petr Novák'}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Tag →</span>
            <span className="text-muted-foreground">
              <a href="#" className="underline">Pivo</a> <a href="#" className="underline">OPA</a> <a href="#" className="underline">Trend</a>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Sdílet →</span>
            <span className="text-muted-foreground">
              <a href="#" className="underline">Link</a> <a href="#" className="underline">Facebook</a> <a href="#" className="underline">X</a> <a href="#" className="underline">LinkedIn</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
