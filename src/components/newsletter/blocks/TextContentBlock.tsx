import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface TextContentBlockProps {
  content: NewsletterBlock['content'];
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export function TextContentBlock({ content, onUpdate }: TextContentBlockProps) {
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
                      <td style={{ padding: '48px 24px' }} align="left">
                        
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
                            className="souhrn-h1 cursor-pointer hover:bg-muted/50 p-2 rounded relative group"
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