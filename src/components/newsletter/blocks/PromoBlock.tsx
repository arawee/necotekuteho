import { useState } from 'react';
import { NewsletterBlock } from '@/types/newsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, Image, ExternalLink } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';

interface PromoBlockProps {
  content: NewsletterBlock['content'];
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export function PromoBlock({ content, onUpdate }: PromoBlockProps) {
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

  return (
    <div className="newsletter-block">
      <div 
        className="relative rounded-3xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backgroundImage})`, aspectRatio: '3/5' }}
      >
        {/* Background Image Upload */}
        <div className="absolute top-4 right-4 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Upravit pozadí
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nahrát obrázek na pozadí</DialogTitle>
              </DialogHeader>
              <ImageUpload
                currentImage={content.backgroundImage}
                onImageUploaded={(url) => onUpdate({ ...content, backgroundImage: url })}
                placeholder="Nahrát pozadí"
                className="w-full h-40"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Top Content - Date and Location */}
        <div className="absolute top-8 left-6">
          <div className="relative group">
            {isEditing === 'date' ? (
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave('date')}
                onKeyDown={(e) => e.key === 'Enter' && handleSave('date')}
                autoFocus
                className="text-sm font-semibold text-gray-800 bg-white/80"
              />
            ) : (
              <h4 
                className="text-sm font-semibold text-gray-800 cursor-pointer hover:bg-white/20 p-1 rounded"
                onClick={() => handleEdit('date', content.date || '')}
              >
                {content.date}
                <Edit2 className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
              </h4>
            )}
          </div>
          
          <div className="relative group mt-2">
            {isEditing === 'location' ? (
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave('location')}
                onKeyDown={(e) => e.key === 'Enter' && handleSave('location')}
                autoFocus
                className="text-xs text-gray-800 bg-white/80"
              />
            ) : (
              <p 
                className="text-xs text-gray-800 cursor-pointer hover:bg-white/20 p-1 rounded"
                onClick={() => handleEdit('location', content.location || '')}
              >
                {content.location}
                <Edit2 className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
              </p>
            )}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end">
          <div className="flex-1">
            <div className="relative group mb-2">
              {isEditing === 'subtitle' ? (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => handleSave('subtitle')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave('subtitle')}
                  autoFocus
                  className="text-xs font-semibold text-gray-800 bg-white/80"
                />
              ) : (
                <h4 
                  className="text-xs font-semibold text-gray-800 cursor-pointer hover:bg-white/20 p-1 rounded"
                  onClick={() => handleEdit('subtitle', content.subtitle || '')}
                >
                  {content.subtitle}
                  <Edit2 className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                </h4>
              )}
            </div>
            
            <div className="relative group">
              {isEditing === 'title' ? (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => handleSave('title')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave('title')}
                  autoFocus
                  className="text-2xl font-bold text-gray-800 bg-white/80"
                />
              ) : (
                <h2 
                  className="text-2xl font-bold text-gray-800 cursor-pointer hover:bg-white/20 p-1 rounded"
                  onClick={() => handleEdit('title', content.title || '')}
                >
                  {content.title}
                  <Edit2 className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100" />
                </h2>
              )}
            </div>
          </div>

          {/* CTA Round Button */}
          <div className="flex items-end">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7125 0.898733H2.5725C2.0225 0.898733 1.5725 1.34873 1.5725 1.89873C1.5725 2.44873 2.0225 2.89873 2.5725 2.89873H14.8025L0.2925 17.4087C-0.0975 17.7987 -0.0975 18.4287 0.2925 18.8187C0.6825 19.2087 1.3125 19.2087 1.7025 18.8187L15.7025 4.80873V16.0287C15.7025 16.5787 16.1525 17.0287 16.7025 17.0287C16.9825 17.0287 17.2325 16.9187 17.4125 16.7387C17.5925 16.5587 17.7025 16.3087 17.7025 16.0287V1.88873C17.7025 1.61873 17.6025 1.36873 17.4125 1.17873C17.2225 0.988733 16.9725 0.888733 16.7025 0.888733L16.7125 0.898733Z" fill="#393939"/>
                  </svg>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upravit odkaz tlačítka</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="promo-url">URL tlačítka</Label>
                    <Input
                      id="promo-url"
                      value={content.url || ''}
                      onChange={(e) => onUpdate({ ...content, url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}