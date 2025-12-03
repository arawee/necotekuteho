import { blockTemplates } from '@/data/blockTemplates';
import { Card, CardContent } from '@/components/ui/card';
import { useDraggable } from '@dnd-kit/core';

interface DraggableBlockProps {
  template: typeof blockTemplates[0];
}

function DraggableBlock({ template }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `template-${template.id}`,
    data: { type: 'template', template }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing transition-all hover:shadow-md select-none ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-primary/30 rounded-sm"></div>
          </div>
          <h3 className="text-sm font-medium text-center flex-1">{template.name}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

export function BlockSidebar() {
  return (
    <div className="w-64 bg-card border-r flex flex-col h-full">
      <div className="p-4 border-b bg-card">
        <h2 className="text-lg font-semibold">E-mailové bloky</h2>
        <p className="text-sm text-muted-foreground mt-1">Přetáhněte pro přidání do newsletteru</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {blockTemplates.map((template) => (
            <DraggableBlock key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}