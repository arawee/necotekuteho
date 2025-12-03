import { NewsletterBlock } from '@/types/newsletter';
import { useState } from 'react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SummaryBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const SummaryBlock = ({ block, onUpdate }: SummaryBlockProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  // Debug logging
  console.log('SummaryBlock content:', block.content);

  // Handle backward compatibility between pairs and individual text fields
  const getTextData = () => {
    console.log('Getting text data, has pairs:', !!block.content.pairs);
    if (block.content.pairs && block.content.pairs.length > 0) {
      // Legacy format with pairs
      const data = {
        subheading1: block.content.pairs[0]?.subheading || 'Workshopy',
        text1: block.content.pairs[0]?.text || '',
        subheading2: block.content.pairs[1]?.subheading || 'Lekce',
        text2: block.content.pairs[1]?.text || ''
      };
      console.log('Using pairs format:', data);
      return data;
    } else {
      // New format with individual fields
      const data = {
        subheading1: block.content.subheading1 || 'Workshopy',
        text1: block.content.text1 || '',
        subheading2: block.content.subheading2 || 'Lekce',
        text2: block.content.text2 || ''
      };
      console.log('Using individual fields format:', data);
      return data;
    }
  };

  const textData = getTextData();

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setTempValue(value);
  };

  const handleSave = (field: string, value?: string) => {
    // Always save in the new format
    const updatedContent = { ...block.content };
    
    // Remove pairs if it exists (migrate to new format)
    if (updatedContent.pairs) {
      delete updatedContent.pairs;
    }
    
    updatedContent[field] = value !== undefined ? value : tempValue;
    
    onUpdate(updatedContent);
    setIsEditing(null);
  };

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
    <div 
      className="rounded-lg border border-border p-6"
      style={{ backgroundColor: block.content.backgroundColor || '#F8F3EE' }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 
          className="mb-8"
          style={{ fontSize: '48px', fontWeight: 400, lineHeight: '120%', letterSpacing: '-1px', color: '#393939', marginTop: '32px' }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
        >
          {block.content.title}
        </h1>
        
        <div className="mb-6">
          {/* First pair: Workshopy */}
          <div className="souhrn-pair fotka mb-4">
            <div className="relative group inline">
              {isEditing === 'subheading1' ? (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => handleSave('subheading1')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave('subheading1')}
                  autoFocus
                />
              ) : (
                <span 
                  className="subheading cursor-pointer hover:bg-muted/50 p-1 rounded"
                  onClick={() => handleEdit('subheading1', textData.subheading1)}
                >
                  {textData.subheading1}
                </span>
              )}
            </div>
            
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <div className="relative group inline">
              {isEditing === 'text1' ? (
                <div className="space-y-2">
                  <RichTextEditor
                    value={textData.text1 || ''}
                    onChange={(value) => {
                      handleSave('text1', value);
                    }}
                    placeholder="Enter your text content..."
                  />
                  <div className="flex gap-2">
                    <a 
                      className="btn btn--yellow"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(null);
                      }}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '9999px'
                      }}
                    >
                      Done
                    </a>
                  </div>
                </div>
              ) : (
                <span 
                  className="cursor-pointer hover:bg-muted/50 p-2 rounded"
                  onClick={() => setIsEditing('text1')}
                >
                  {textData.text1 ? (
                    <span dangerouslySetInnerHTML={{ __html: textData.text1 }} />
                  ) : (
                    <span className="text-muted-foreground">Click to edit text content...</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Second pair: Lekce */}
          <div className="souhrn-pair fotka">
            <div className="relative group inline">
              {isEditing === 'subheading2' ? (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => handleSave('subheading2')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave('subheading2')}
                  autoFocus
                />
              ) : (
                <span 
                  className="subheading cursor-pointer hover:bg-muted/50 p-1 rounded"
                  onClick={() => handleEdit('subheading2', textData.subheading2)}
                >
                  {textData.subheading2}
                </span>
              )}
            </div>
            
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <div className="relative group inline">
              {isEditing === 'text2' ? (
                <div className="space-y-2">
                  <RichTextEditor
                    value={textData.text2 || ''}
                    onChange={(value) => {
                      handleSave('text2', value);
                    }}
                    placeholder="Enter your text content..."
                  />
                  <div className="flex gap-2">
                    <a 
                      className="btn btn--yellow"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(null);
                      }}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '9999px'
                      }}
                    >
                      Done
                    </a>
                  </div>
                </div>
              ) : (
                <span 
                  className="cursor-pointer hover:bg-muted/50 p-2 rounded"
                  onClick={() => setIsEditing('text2')}
                >
                  {textData.text2 ? (
                    <span dangerouslySetInnerHTML={{ __html: textData.text2 }} />
                  ) : (
                    <span className="text-muted-foreground">Click to edit text content...</span>
                  )}
                </span>
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
                      color: '#393939',
                      marginRight: '0'
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
                      <Label htmlFor={`button-text-${index}`}>Button Text</Label>
                      <Input
                        id={`button-text-${index}`}
                        value={button.text}
                        onChange={(e) => handleButtonEdit(index, { ...button, text: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`button-url-${index}`}>Button URL</Label>
                      <Input
                        id={`button-url-${index}`}
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