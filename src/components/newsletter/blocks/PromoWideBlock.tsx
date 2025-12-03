import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PromoWideBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const PromoWideBlock = ({ block, onUpdate }: PromoWideBlockProps) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="max-w-2xl mx-auto">
          <div className="relative h-full aspect-square">
            <div
              className="h-full w-full rounded-[32px] overflow-hidden"
              style={{ height: '100%', marginLeft: '50%', transform: 'translateX(-50%)' }}
            >
              <ImageUpload
                currentImage={block.content.backgroundImage}
                onImageUploaded={(url) => onUpdate({ ...block.content, backgroundImage: url })}
                placeholder="Nahrát obrázek na pozadí"
                className="h-full w-full object-cover"
                showBorder={false}
              />
            </div>
            {/* Edit image button */}
            <div className="absolute top-4 right-4 z-10">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="px-3 h-9 bg-white rounded-md text-sm font-medium cursor-pointer"
                  >
                    Upravit obrázek
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upravit obrázek na pozadí</DialogTitle>
                  </DialogHeader>
                  <ImageUpload
                    currentImage={block.content.backgroundImage}
                    onImageUploaded={(url) => onUpdate({ ...block.content, backgroundImage: url })}
                    placeholder="Nahrát obrázek na pozadí"
                    className="w-full h-40"
                    showBorder={false}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            {/* Top content */}
            <div className="text-left">
              <h4 
                className="text-sm font-medium mb-2 text-[#393939]"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, date: e.currentTarget.textContent || '' })}
              >
                {block.content.date}
              </h4>
              <p 
                className="text-sm font-normal text-[#393939]"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, location: e.currentTarget.textContent || '' })}
              >
                {block.content.location}
              </p>
            </div>
            
            {/* Bottom content */}
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <h4 
                  className="text-sm font-medium mb-2 text-[#393939]"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate({ ...block.content, subtitle: e.currentTarget.textContent || '' })}
                >
                  {block.content.subtitle}
                </h4>
                <h2 
                  className="text-lg font-bold text-[#393939] mr-4"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
                >
                  {block.content.title}
                </h2>
              </div>
              
              {/* Round button */}
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
                      <Label htmlFor="button-url">URL tlačítka</Label>
                      <Input
                        id="button-url"
                        value={block.content.url || ''}
                        onChange={(e) => onUpdate({ ...block.content, url: e.target.value })}
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
    </div>
  );
};