import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { NewsletterCanvas } from '@/components/newsletter/NewsletterCanvas';
import { NewsletterBlock } from '@/types/newsletter';
import { blockTemplates } from '@/data/blockTemplates';
import { generateHTMLFromBlocks } from '@/utils/htmlGenerator';
import { useToast } from '@/hooks/use-toast';
import { useNewsletter } from '@/hooks/useNewsletter';

const Index = () => {
  const [blocks, setBlocks] = useState<NewsletterBlock[]>([]);
  const [newsletterName, setNewsletterName] = useState<string>('');
  const { toast } = useToast();
  const { 
    currentNewsletter, 
    saveNewsletter, 
    updateNewsletter,
    loadNewsletter 
  } = useNewsletter();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle reordering blocks
    if (active.id !== over.id) {
      const activeIndex = blocks.findIndex(block => block.id === active.id);
      const overIndex = blocks.findIndex(block => block.id === over.id);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        setBlocks(arrayMove(blocks, activeIndex, overIndex));
      }
    }
  };

  const handleAddBlock = (template: typeof blockTemplates[0], insertIndex?: number) => {
    const newBlock: NewsletterBlock = {
      id: `block-${Date.now()}`,
      type: template.type,
      content: { ...template.defaultContent }
    };
    
    if (insertIndex !== undefined) {
      setBlocks(prev => {
        const newBlocks = [...prev];
        newBlocks.splice(insertIndex, 0, newBlock);
        return newBlocks;
      });
    } else {
      setBlocks(prev => [...prev, newBlock]);
    }
  };

  const handleUpdateBlock = (blockId: string, content: NewsletterBlock['content']) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
  };

  const handleExportHTML = async (name: string, blocks: NewsletterBlock[]) => {
    const JSZip = (await import('jszip')).default;
    const { normalizeFilename } = await import('@/lib/utils');
    const html = generateHTMLFromBlocks(blocks);
    
    const normalizedName = normalizeFilename(name);
    const zip = new JSZip();
    zip.file(`${normalizedName}.html`, html);
    
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${normalizedName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML exportováno",
      description: `Váš newsletter "${name}" byl exportován jako ZIP soubor.`
    });
  };

  const handleSaveNewsletter = async (name: string, blocks: NewsletterBlock[]) => {
    try {
      if (currentNewsletter) {
        // Update existing newsletter
        await updateNewsletter(currentNewsletter.id, name, blocks);
      } else {
        // Save new newsletter
        await saveNewsletter(name, blocks);
      }
      setNewsletterName(name);
      toast({
        title: "Newsletter uložen",
        description: `"${name}" byl úspěšně uložen.`
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit newsletter. Zkuste to prosím znovu.",
        variant: "destructive"
      });
    }
  };

  const handleLoadNewsletter = (blocks: NewsletterBlock[]) => {
    setBlocks(blocks);
    setNewsletterName('');
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="h-screen">
        <NewsletterCanvas
          blocks={blocks}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
          onAddBlock={handleAddBlock}
          onLoadNewsletter={handleLoadNewsletter}
          onSaveNewsletter={handleSaveNewsletter}
          onExportHTML={handleExportHTML}
          newsletterName={newsletterName}
          onNewsletterNameChange={setNewsletterName}
        />
      </div>
    </DndContext>
  );
};

export default Index;
