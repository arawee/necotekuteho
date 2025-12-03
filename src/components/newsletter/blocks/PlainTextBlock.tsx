import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { Edit2 } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface PlainTextBlockProps {
  content: NewsletterBlock['content'];
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export function PlainTextBlock({ content, onUpdate }: PlainTextBlockProps) {
  const [isEditing, setIsEditing] = useState(false);

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
                        
                        {/* Plain Text Content */}
                        <div className="relative group">
                          {isEditing ? (
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
                                    setIsEditing(false);
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
                            <div 
                              className="cursor-pointer hover:bg-muted/50 p-2 rounded newsletter-plain-text"
                              onClick={() => setIsEditing(true)}
                              dangerouslySetInnerHTML={{ __html: content.text || 'Click to add text...' }}
                              style={{ 
                                fontSize: '14px',
                                lineHeight: '150%',
                                color: '#393939',
                                fontWeight: 400
                              }}
                            />
                          )}
                          {!isEditing && (
                            <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
                          )}
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