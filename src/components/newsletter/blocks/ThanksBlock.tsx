import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, Image, Link } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface ThanksBlockProps {
  content: NewsletterBlock['content'];
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export function ThanksBlock({ content, onUpdate }: ThanksBlockProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setTempValue(value);
  };

  const handleSave = (field: string) => {
    onUpdate({
      ...content,
      [field]: tempValue
    });
    setIsEditing(null);
  };

  const handleButtonEdit = (index: number, newButton: { text: string; url: string; variant?: 'primary' | 'secondary' }) => {
    const newButtons = [...(content.buttons || [])];
    newButtons[index] = newButton;
    onUpdate({
      ...content,
      buttons: newButtons
    });
  };

  const handleAddSecondaryButton = () => {
    const newButtons = [
      ...(content.buttons || []),
      { text: 'Nové tlačítko', url: '#', variant: 'secondary' as const }
    ];
    onUpdate({
      ...content,
      buttons: newButtons
    });
  };

  const handleDeleteButton = (index: number) => {
    const newButtons = [...(content.buttons || [])];
    newButtons.splice(index, 1);
    onUpdate({
      ...content,
      buttons: newButtons
    });
  };

  const formatTextWithBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="newsletter-block">
      {/* SVG Logo and Header Image */}
      <div className="relative group mb-6">

        <div className="relative">
          <ImageUpload
            currentImage={content.image}
            onImageUploaded={(url) => onUpdate({ ...content, image: url })}
            aspectRatio="2/1"
            placeholder="Upload header image"
            className="w-full"
          />
        </div>
      </div>

      {/* Title */}
      <div className="relative group mb-4">
        {isEditing === 'title' ? (
          <div className="space-y-2">
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => handleSave('title')}
              onKeyDown={(e) => e.key === 'Enter' && handleSave('title')}
              autoFocus
            />
          </div>
        ) : (
          <h1 
            className="cursor-pointer hover:bg-muted/50 p-2 rounded"
            style={{ fontSize: '48px', fontWeight: 400, margin: '0 0 16px', lineHeight: '120%', letterSpacing: '-1px', color: '#393939' }}
            onClick={() => handleEdit('title', content.title || '')}
          >
            {content.title}
            <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
          </h1>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Greeting */}
        <div className="relative group">
          {isEditing === 'greeting' ? (
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => handleSave('greeting')}
              onKeyDown={(e) => e.key === 'Enter' && handleSave('greeting')}
              autoFocus
            />
          ) : (
            <p 
              className="font-bold cursor-pointer hover:bg-muted/50 p-1 rounded"
              onClick={() => handleEdit('greeting', content.greeting || '')}
            >
              {content.greeting}
              <Edit2 className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
            </p>
          )}
        </div>

        {/* Main Text */}
        <div className="relative group">
          {isEditing === 'text' ? (
            <div className="space-y-2">
              <RichTextEditor
                value={content.text || ''}
                onChange={(value) => {
                  onUpdate({
                    ...content,
                    text: value
                  });
                }}
                placeholder="Enter your text content..."
              />
              <div className="flex gap-2" style={{ gap: '0' }}>
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
            <p 
              className="text-sm leading-relaxed cursor-pointer hover:bg-muted/50 p-2 rounded"
              onClick={() => setIsEditing('text')}
              dangerouslySetInnerHTML={{ __html: content.text || '' }}
            />
          )}
          {!isEditing && (
            <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
          )}
        </div>

        {/* Buttons */}
        <div className="souhrn-buttons">
          <table role="presentation" border={0} cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                {content.buttons?.map((button, index) => (
                  <td key={index} style={{ paddingRight: '0' }} className="relative group">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button 
                          type="button"
                          className={`btn${button.variant === 'secondary' ? ' btn--yellow' : ''}`}
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
                            <Label htmlFor="button-text">Button Text</Label>
                            <Input
                              id="button-text"
                              value={button.text}
                              onChange={(e) => handleButtonEdit(index, { ...button, text: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="button-url">Button URL</Label>
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
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {(!content.buttons || content.buttons.length < 2) && (
            <Button 
              variant="outline" 
              onClick={handleAddSecondaryButton}
              className="mt-4"
            >
              + Přidat sekundární tlačítko
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}