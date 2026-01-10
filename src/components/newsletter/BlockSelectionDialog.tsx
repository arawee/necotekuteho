import { useState } from 'react';
import { blockTemplates } from '@/data/blockTemplates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterBlock } from '@/types/newsletter';
import { Button } from '@/components/ui/button';
import { CustomPlusIcon } from '@/components/icons/CustomIcons';

interface BlockSelectionDialogProps {
  onAddBlock: (template: typeof blockTemplates[0]) => void;
  children?: React.ReactNode;
}

export function BlockSelectionDialog({ onAddBlock, children }: BlockSelectionDialogProps) {
  const [open, setOpen] = useState(false);

  const handleBlockSelect = (template: typeof blockTemplates[0]) => {
    onAddBlock(template);
    setOpen(false); // Close dialog after adding block
  };

  // Color coding for different block types
  const getBlockColor = (color: string) => {
    const colors = {
      'black': 'bg-gray-100 border-gray-200',
      'blue': 'bg-blue-100 border-blue-200',
      'yellow': 'bg-yellow-100 border-yellow-200',
      'red': 'bg-red-100 border-red-200',
      'purple': 'bg-purple-100 border-purple-200',
      'orange': 'bg-orange-100 border-orange-200',
      'pink': 'bg-pink-100 border-pink-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 border-gray-200';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            variant="outline" 
            size="sm"
            className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary"
          >
            <CustomPlusIcon className="mr-2" color="currentColor" style={{ width: '8px', height: '8px' }} />
            Přidat blok
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vyberte blok</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {blockTemplates.map((template) => (
            <Card 
              key={template.id}
              className="cursor-pointer hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleBlockSelect(template)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 border-2 ${getBlockColor(template.color)}`}>
                  <div className="w-4 h-4 bg-current opacity-30 rounded-sm"></div>
                </div>
                  <h3 className="text-sm font-medium">{template.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}