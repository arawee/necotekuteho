import { NewsletterBlock } from '@/types/newsletter';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ArticleTextBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ArticleTextBlock = ({ block, onUpdate }: ArticleTextBlockProps) => {
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);

  const date = (block.content as any).date || '28. května 2025';
  const author = block.content.subtitle || 'Petr Novák';
  const tags = (block.content as any).tags || 'Pivo, OPA, Trend';
  const shareLinks = (block.content as any).shareLinks || 'Link, Facebook, X, LinkedIn';

  return (
    <div className="bg-white border border-border p-6">
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
                className="text-sm px-4 py-1"
                style={{ backgroundColor: '#00C322', border: 'none', color: '#212121' }}
              >
                Hotovo
              </button>
            </div>
          ) : (
            <div 
              className="prose prose-sm max-w-none cursor-pointer hover:bg-muted/20 p-2 group relative"
              onClick={() => setIsEditingBody(true)}
              dangerouslySetInnerHTML={{ 
                __html: block.content.text || 'PA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty. Na rozdíl od tradičních Pale Ale využívá ve větší míře ovesné vločky, které pivu dodávají hedvábnou plnost a příjemný zakulacený charakter. OPA tak stojí na pomezí mezi svěžím, chmelovým pivem a jemně krémovými stylem.' 
              }}
              style={{ color: '#212121', lineHeight: '1.6' }}
            />
          )}
        </div>

        {/* Metadata - in grey box */}
        <div 
          className="p-4 space-y-1 text-sm cursor-pointer"
          style={{ backgroundColor: '#F4F4F4' }}
          onClick={() => setIsEditingMeta(true)}
        >
          <div className="flex gap-2">
            <span className="font-medium">Datum →</span>
            <span className="text-muted-foreground">{date}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Autor →</span>
            <span className="text-muted-foreground">{author}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Tag →</span>
            <span className="text-muted-foreground underline">{tags}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Sdílet →</span>
            <span className="text-muted-foreground underline">{shareLinks}</span>
          </div>
        </div>
      </div>

      {/* Edit Metadata Dialog */}
      <Dialog open={isEditingMeta} onOpenChange={setIsEditingMeta}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit metadata</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Datum</label>
              <Input
                value={date}
                onChange={(e) => onUpdate({ ...block.content, date: e.target.value } as any)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Autor</label>
              <Input
                value={author}
                onChange={(e) => onUpdate({ ...block.content, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tagy (oddělené čárkou)</label>
              <Input
                value={tags}
                onChange={(e) => onUpdate({ ...block.content, tags: e.target.value } as any)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sdílet (oddělené čárkou)</label>
              <Input
                value={shareLinks}
                onChange={(e) => onUpdate({ ...block.content, shareLinks: e.target.value } as any)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
