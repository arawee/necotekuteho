import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, Image, Link } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface HeaderContentBlockProps {
  content: NewsletterBlock['content'];
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export function HeaderContentBlock({ content, onUpdate }: HeaderContentBlockProps) {
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
      <table className="header" style={{ marginTop: '3rem' }} role="presentation" border={0} width="100%" cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr>
            <td align="center">
              <div style={{ margin: '0 auto', maxWidth: '600px' }}>
                <table className="wrap" style={{ maxWidth: '600px' }} role="presentation" border={0} width="100%" cellSpacing={0} cellPadding={0} align="center">
                  <tbody>
                    <tr>
                      <td className="header-banner">
                        {/* Header Image */}
                        <div className="group relative">
                        <ImageUpload
                          currentImage={content.image}
                          onImageUploaded={(url) => onUpdate({ ...content, image: url })}
                          aspectRatio="2/1"
                          placeholder="Nahrát obrázek hlavičky"
                          className="w-full"
                        />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '24px 24px' }} align="left">

                        {/* Title */}
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
                            className="cursor-pointer hover:bg-muted/50 p-2 rounded relative group"
                            style={{ fontSize: '48px', fontWeight: 400, margin: '0 0 16px', lineHeight: '120%', letterSpacing: '-1px', color: '#393939' }}
                            onClick={() => handleEdit('title', content.title || '')}
                          >
                            {content.title}
                            <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
                          </h1>
                        )}

                        {/* Content */}
                        <div className="souhrn-pair fotka">
                          {/* Subheading */}
                          <div className="relative group inline">
                            {isEditing === 'subheading' ? (
                              <Input
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                onBlur={() => handleSave('subheading')}
                                onKeyDown={(e) => e.key === 'Enter' && handleSave('subheading')}
                                autoFocus
                              />
                            ) : (
                              <span 
                                className="subheading cursor-pointer hover:bg-muted/50 p-1 rounded"
                                onClick={() => handleEdit('subheading', content.subheading || '')}
                              >
                                {content.subheading}
                                <Edit2 className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                              </span>
                            )}
                          </div>
                          
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                          {/* Main Text */}
                          <div className="relative group inline">
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
                              <span 
                                className="cursor-pointer hover:bg-muted/50 p-2 rounded"
                                onClick={() => setIsEditing('text')}
                                dangerouslySetInnerHTML={{ __html: content.text || '' }}
                              />
                            )}
                            {!isEditing && (
                              <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
                            )}
                          </div>
                        </div>

        {/* Buttons */}
        <div className="souhrn-buttons">
          <table role="presentation" border={0} cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                {content.buttons?.map((button, index) => (
                  <td key={index} style={{ paddingRight: '0' }}>
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
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}