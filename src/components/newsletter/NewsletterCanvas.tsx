import { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { NewsletterBlock } from '@/types/newsletter';
import { SortableBlockRenderer } from './SortableBlockRenderer';
import { BlockSelectionDialog } from './BlockSelectionDialog';
import { LoadNewsletterDialog } from './LoadNewsletterDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Save, FolderOpen } from 'lucide-react';
import { blockTemplates } from '@/data/blockTemplates';

interface NewsletterCanvasProps {
  blocks: NewsletterBlock[];
  onUpdateBlock: (blockId: string, content: NewsletterBlock['content']) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (template: typeof blockTemplates[0], insertIndex?: number) => void;
  onLoadNewsletter: (blocks: NewsletterBlock[]) => void;
  onSaveNewsletter: (name: string, blocks: NewsletterBlock[]) => void;
  onExportHTML: (name: string, blocks: NewsletterBlock[]) => void;
  newsletterName: string;
  onNewsletterNameChange: (name: string) => void;
}

export function NewsletterCanvas({ 
  blocks, 
  onUpdateBlock, 
  onDeleteBlock,
  onAddBlock,
  onLoadNewsletter,
  onSaveNewsletter,
  onExportHTML,
  newsletterName,
  onNewsletterNameChange
}: NewsletterCanvasProps) {
  const handleAddBlock = (template: typeof blockTemplates[0], insertIndex?: number) => {
    onAddBlock(template, insertIndex);
  };

  const handleSave = () => {
    if (!newsletterName.trim()) {
      alert('Prosím zadejte název newsletteru');
      return;
    }
    onSaveNewsletter(newsletterName, blocks);
  };

  const handleExport = () => {
    if (!newsletterName.trim()) {
      alert('Prosím zadejte název newsletteru');
      return;
    }
    onExportHTML(newsletterName, blocks);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Menu Bar */}
      <div className="border-b p-4 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4 flex-1">
          <Input
            placeholder="Název newsletteru..."
            value={newsletterName}
            onChange={(e) => onNewsletterNameChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <LoadNewsletterDialog onLoad={onLoadNewsletter}>
            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-2" />
              Načíst
            </Button>
          </LoadNewsletterDialog>
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Uložit
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportovat HTML
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 bg-muted/30 overflow-y-auto">
        <div className="max-w-[600px] mx-auto">
          <div className="newsletter-email min-h-[500px] bg-background rounded-lg shadow-sm border p-6">
            {blocks.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary/20 rounded"></div>
                </div>
                <p className="text-lg mb-2">Začněte vytvářet váš newsletter</p>
                <p className="mb-6">Klikněte na tlačítko níže pro přidání prvního bloku</p>
                <BlockSelectionDialog onAddBlock={(template) => handleAddBlock(template, 0)} />
              </div>
            ) : (
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {/* Add button at the beginning */}
                  <div className="py-2">
                    <BlockSelectionDialog onAddBlock={(template) => handleAddBlock(template, 0)} />
                  </div>
                  
                  {blocks.map((block, index) => (
                    <div key={block.id}>
                      <SortableBlockRenderer
                        block={block}
                        onUpdate={(content) => onUpdateBlock(block.id, content)}
                        onDelete={() => onDeleteBlock(block.id)}
                      />
                      {/* Add button after each block */}
                      <div className="py-2">
                        <BlockSelectionDialog onAddBlock={(template) => handleAddBlock(template, index + 1)} />
                      </div>
                    </div>
                  ))}
                </div>
              </SortableContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}