import { NewsletterBlock } from '@/types/newsletter';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HarmonogramBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const HarmonogramBlock = ({ block, onUpdate }: HarmonogramBlockProps) => {
  const handleAddEvent = () => {
    const newEvent = {
      date: 'Nové datum',
      title: 'Nová akce',
      instructor: 'Instruktor'
    };
    const newEvents = [...(block.content.events || []), newEvent];
    onUpdate({ ...block.content, events: newEvents });
  };

  const handleDeleteEvent = (index: number) => {
    const newEvents = [...(block.content.events || [])];
    newEvents.splice(index, 1);
    onUpdate({ ...block.content, events: newEvents });
  };

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="p-6">
        <div className="relative group">
          <h1 
            className="text-left pl-6 mb-8"
            style={{ fontSize: '48px', fontWeight: 400, lineHeight: '120%', letterSpacing: '-1px', color: '#393939' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          >
            {block.content.title}
          </h1>
          <Edit2 className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
        </div>
        
        <div className="space-y-8">
          {block.content.events?.map((event, index) => (
            <div key={index} className="relative pb-6 border-b last:border-b-0 group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteEvent(index)}
              >
                <Trash2 className="w-4 h-4" style={{ color: '#393939' }} />
              </Button>
              <div>
                <div className="relative group/date">
                  <h4 
                    className="text-sm text-gray-600 mb-2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newEvents = [...(block.content.events || [])];
                      newEvents[index] = { ...newEvents[index], date: e.currentTarget.textContent || '' };
                      onUpdate({ ...block.content, events: newEvents });
                    }}
                  >
                    {event.date}
                  </h4>
                  <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                </div>
                <div className="relative group/title">
                  <h2 
                    className="text-xl font-bold mb-1" 
                    style={{ whiteSpace: 'pre-line' }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newEvents = [...(block.content.events || [])];
                      newEvents[index] = { ...newEvents[index], title: e.currentTarget.textContent || '' };
                      onUpdate({ ...block.content, events: newEvents });
                    }}
                  >
                    {event.title}
                  </h2>
                  <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                </div>
                <div className="relative group/instructor">
                  <p 
                    className="text-sm text-gray-600"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newEvents = [...(block.content.events || [])];
                      newEvents[index] = { ...newEvents[index], instructor: e.currentTarget.textContent || '' };
                      onUpdate({ ...block.content, events: newEvents });
                    }}
                  >
                    {event.instructor}
                  </p>
                  <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={handleAddEvent}
        >
          <Plus className="w-4 h-4 mr-2" />
          Přidat akci
        </Button>
      </div>
    </div>
  );
};
