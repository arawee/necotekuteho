import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface EventBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const EventBlock = ({ block, onUpdate }: EventBlockProps) => {
  const [isEditingDescription, setIsEditingDescription] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState(block.content.description || '');

  const handleButtonEdit = (index: number, newButton: { text: string; url: string; variant?: 'primary' | 'secondary' }) => {
    const newButtons = [...(block.content.buttons || [])];
    newButtons[index] = newButton;
    onUpdate({
      ...block.content,
      buttons: newButtons
    });
  };

  const handleAddSecondaryButton = () => {
    const newButtons = [
      ...(block.content.buttons || []),
      { text: 'Nové tlačítko', url: '#', variant: 'secondary' as const }
    ];
    onUpdate({
      ...block.content,
      buttons: newButtons
    });
  };

  const handleDeleteButton = (index: number) => {
    const newButtons = [...(block.content.buttons || [])];
    newButtons.splice(index, 1);
    onUpdate({
      ...block.content,
      buttons: newButtons
    });
  };
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <ImageUpload
        currentImage={block.content.image}
        onImageUploaded={(url) => onUpdate({ ...block.content, image: url })}
        aspectRatio="2/1"
        placeholder="Nahrát obrázek hlavičky"
      />
      
      <div className="p-6">
        <h4 
          className="text-sm text-gray-600 mb-2 font-normal"
          style={{ fontSize: '14px' }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, eventDate: e.currentTarget.textContent || '' })}
        >
          {block.content.eventDate}
        </h4>
        
        <h1 
          className="mb-2 font-normal"
          style={{ fontSize: '32px', lineHeight: '120%' }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, eventTitle: e.currentTarget.textContent || '' })}
        >
          {block.content.eventTitle}
        </h1>
        
        <div className="mb-4">
          <div className="souhrn-pair fotka">
            {/* Instructor */}
            <div className="relative group inline">
              {isEditingDescription === 'instructor' ? (
                <input
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  onBlur={() => {
                    onUpdate({ ...block.content, instructor: tempDescription });
                    setIsEditingDescription(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onUpdate({ ...block.content, instructor: tempDescription });
                      setIsEditingDescription(null);
                    }
                  }}
                  autoFocus
                  className="font-normal text-sm border-none outline-none bg-transparent"
                />
              ) : (
                <span 
                  className="subheading cursor-pointer hover:bg-muted/50 p-1 rounded font-normal text-sm"
                  onClick={() => {
                    setIsEditingDescription('instructor');
                    setTempDescription(block.content.instructor || '');
                  }}
                >
                  {block.content.instructor}
                </span>
              )}
            </div>
            
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

            {/* Description */}
            <div className="relative group inline">
              {isEditingDescription === 'description' ? (
                <div className="space-y-2">
                  <RichTextEditor
                    value={block.content.description || ''}
                    onChange={(value) => {
                      onUpdate({ ...block.content, description: value });
                    }}
                    placeholder="Zadejte popis..."
                    className="text-gray-600 font-normal [&>div]:text-base [&>div]:leading-normal"
                  />
                  <div className="flex gap-2">
                    <a 
                      className="btn btn--yellow"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditingDescription(null);
                      }}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '9999px'
                      }}
                    >
                      Hotovo
                    </a>
                  </div>
                </div>
              ) : (
                <span 
                  className="cursor-pointer hover:bg-muted/50 p-2 rounded text-gray-600 font-normal"
                  style={{ fontSize: '16px' }}
                  onClick={() => {
                    setIsEditingDescription('description');
                  }}
                  dangerouslySetInnerHTML={{ __html: block.content.description || 'Click to add description...' }}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex" style={{ gap: '0' }}>
            {block.content.buttons?.map((button, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <button 
                    className={`px-4 py-2 text-sm font-normal rounded-full ${
                      button.variant === 'secondary' 
                        ? 'border-0'
                        : 'border border-black bg-transparent hover:bg-gray-100'
                    }`}
                    style={{ 
                      backgroundColor: button.variant === 'secondary' ? '#FBFB62' : 'transparent',
                      borderColor: button.variant === 'secondary' ? '#FBFB62' : '#393939',
                      color: '#393939'
                    }}
                  >
                    {button.text}
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upravit tlačítko</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="button-text">Text tlačítka</Label>
                      <Input
                        id="button-text"
                        value={button.text}
                        onChange={(e) => handleButtonEdit(index, { ...button, text: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="button-url">URL tlačítka</Label>
                      <Input
                        id="button-url"
                        value={button.url}
                        onChange={(e) => handleButtonEdit(index, { ...button, url: e.target.value })}
                      />
                    </div>
                    {button.variant === 'secondary' && (
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          handleDeleteButton(index);
                        }}
                        className="w-full"
                      >
                        Smazat tlačítko
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          {(!block.content.buttons || block.content.buttons.length < 2) && (
            <Button 
              variant="outline" 
              onClick={handleAddSecondaryButton}
            >
              + Přidat sekundární tlačítko
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};