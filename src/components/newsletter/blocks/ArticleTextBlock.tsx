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
import { Plus, Trash2 } from 'lucide-react';

interface TagItem {
  text: string;
  url: string;
}

interface ShareItem {
  text: string;
  url: string;
}

interface ArticleTextBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ArticleTextBlock = ({ block, onUpdate }: ArticleTextBlockProps) => {
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);

  const date = ((block.content as any).date ?? '') as string;
  const author = (block.content.subtitle ?? '') as string;
  
  // Tags and shares as arrays with links
  const tags: TagItem[] = (block.content as any).tagsArray || [
    { text: 'Pivo', url: '#' },
    { text: 'OPA', url: '#' },
    { text: 'Trend', url: '#' }
  ];
  
  const shareLinks: ShareItem[] = (block.content as any).shareLinksArray || [
    { text: 'Link', url: '#' },
    { text: 'Facebook', url: '#' },
    { text: 'X', url: '#' },
    { text: 'LinkedIn', url: '#' }
  ];

  const updateTag = (index: number, field: keyof TagItem, value: string) => {
    const newTags = [...tags];
    newTags[index] = { ...newTags[index], [field]: value };
    onUpdate({ ...block.content, tagsArray: newTags } as any);
  };

  const addTag = () => {
    const newTags = [...tags, { text: 'Nový', url: '#' }];
    onUpdate({ ...block.content, tagsArray: newTags } as any);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onUpdate({ ...block.content, tagsArray: newTags } as any);
  };

  const updateShare = (index: number, field: keyof ShareItem, value: string) => {
    const newShares = [...shareLinks];
    newShares[index] = { ...newShares[index], [field]: value };
    onUpdate({ ...block.content, shareLinksArray: newShares } as any);
  };

  const addShare = () => {
    const newShares = [...shareLinks, { text: 'Nový', url: '#' }];
    onUpdate({ ...block.content, shareLinksArray: newShares } as any);
  };

  const removeShare = (index: number) => {
    const newShares = shareLinks.filter((_, i) => i !== index);
    onUpdate({ ...block.content, shareLinksArray: newShares } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Title - bold */}
        <h1 
          className="text-3xl mb-6"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          style={{ color: '#212121', lineHeight: '1.2', fontWeight: 'bold' }}
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
              className="prose prose-sm max-w-none cursor-pointer hover:bg-muted/20 group relative"
              onClick={() => setIsEditingBody(true)}
              dangerouslySetInnerHTML={{ 
                __html: block.content.text || 'PA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty. Na rozdíl od tradičních Pale Ale využívá ve větší míře ovesné vločky, které pivu dodávají hedvábnou plnost a příjemný zakulacený charakter. OPA tak stojí na pomezí mezi svěžím, chmelovým pivem a jemně krémovými stylem.' 
              }}
              style={{ color: '#212121', lineHeight: '1.6' }}
            />
          )}
        </div>

        {/* Metadata - in grey box, width fits content */}
        {(() => {
          const hasDate = date && date.trim() !== '';
          const hasAuthor = author && author.trim() !== '';
          const hasTags = tags.length > 0 && tags.some(t => t.text && t.text.trim() !== '');
          const validShareLinks = shareLinks.filter(s => s.url && s.url.trim() !== '' && s.url !== '#');
          const hasShares = validShareLinks.length > 0;
          
          const hasAnyMeta = hasDate || hasAuthor || hasTags || hasShares;
          
          if (!hasAnyMeta) {
            return (
              <button
                className="text-xs px-3 py-1 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500"
                onClick={() => setIsEditingMeta(true)}
              >
                + Přidat metadata
              </button>
            );
          }
          
          return (
            <div 
              className="p-4 space-y-1 text-sm cursor-pointer inline-block"
              style={{ backgroundColor: '#F4F4F4' }}
              onClick={() => setIsEditingMeta(true)}
            >
              {hasDate && (
                <div className="flex gap-2">
                  <span className="font-medium">Datum →</span>
                  <span className="text-muted-foreground">{date}</span>
                </div>
              )}
              {hasAuthor && (
                <div className="flex gap-2">
                  <span className="font-medium">Autor →</span>
                  <span className="text-muted-foreground">{author}</span>
                </div>
              )}
              {hasTags && (
                <div className="flex gap-2">
                  <span className="font-medium">Tag →</span>
                  <span className="text-muted-foreground underline">
                    {tags.filter(t => t.text && t.text.trim() !== '').map(t => t.text).join(', ')}
                  </span>
                </div>
              )}
              {hasShares && (
                <div className="flex gap-2">
                  <span className="font-medium">Sdílet →</span>
                  <span className="text-muted-foreground underline">
                    {validShareLinks.map(s => s.text).join(', ')}
                  </span>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Edit Metadata Dialog */}
      <Dialog open={isEditingMeta} onOpenChange={setIsEditingMeta}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upravit metadata</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Datum</label>
              <Input
                value={date}
                placeholder="28. května 2025"
                onChange={(e) => onUpdate({ ...block.content, date: e.target.value } as any)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Autor</label>
              <Input
                value={author}
                placeholder="Petr Novák"
                onChange={(e) => onUpdate({ ...block.content, subtitle: e.target.value })}
              />
            </div>
            
            {/* Tags with links */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tagy</label>
              <div className="space-y-2">
                {tags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={tag.text}
                      onChange={(e) => updateTag(idx, 'text', e.target.value)}
                      placeholder="Text"
                      className="flex-1"
                    />
                    <Input
                      value={tag.url}
                      onChange={(e) => updateTag(idx, 'url', e.target.value)}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeTag(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTag}
                  className="text-xs px-2 py-1 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Přidat tag
                </button>
              </div>
            </div>
            
            {/* Share links */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sdílet</label>
              <div className="space-y-2">
                {shareLinks.map((share, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={share.text}
                      onChange={(e) => updateShare(idx, 'text', e.target.value)}
                      placeholder="Text"
                      className="flex-1"
                    />
                    <Input
                      value={share.url}
                      onChange={(e) => updateShare(idx, 'url', e.target.value)}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeShare(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addShare}
                  className="text-xs px-2 py-1 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Přidat odkaz
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
