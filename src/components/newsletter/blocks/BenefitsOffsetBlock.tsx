import { NewsletterBlock } from '@/types/newsletter';
import { Edit2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';

interface BenefitsOffsetBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const BenefitsOffsetBlock = ({ block, onUpdate }: BenefitsOffsetBlockProps) => {
  // normalize to satisfy the strict benefit type:
  const normalizeBenefit = (b: any = {}): { title: string; description: string; icon: string } & { iconUrl?: string } => ({
    title: typeof b.title === 'string' ? b.title : '',
    description: typeof b.description === 'string' ? b.description : '',
    icon: typeof b.icon === 'string' ? b.icon : '',
    ...(b.iconUrl ? { iconUrl: b.iconUrl } : {}),
  });

  const updateBenefit = (idx: number, patch: Partial<{ title: string; description: string; icon: string; iconUrl: string }>) => {
    const src = block.content.benefits || [];
    const next = src.map((b) => normalizeBenefit(b)) as any[];
    const merged = { ...normalizeBenefit(src[idx]), ...patch };
    next[idx] = merged;
    onUpdate({ ...block.content, benefits: next as any });
  };

  const toIcon33 = (url: string) => `${url}?width=33&height=33&quality=100&format=png`;

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
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

        <div className="grid grid-cols-2 gap-0">
          {/* Left column */}
          <div className="space-y-6">
            {block.content.benefits?.slice(0, 2).map((benefit, index) => {
              const b = normalizeBenefit(benefit);
              return (
                <div key={index} className="rounded-2xl p-6 group" style={{ backgroundColor: '#F8F3EE', margin: 0 }}>
                  <div className="mb-3" style={{ width: 33, height: 33 }}>
                    <ImageUpload
                      currentImage={b.iconUrl || ''}
                      onImageUploaded={(url) => {
                        // store 33×33 PNG; keep required fields:
                        updateBenefit(index, { iconUrl: toIcon33(url) });
                      }}
                      aspectRatio="square"   // ✅ fix: "square" instead of "1/1"
                      placeholder="Upload icon (PNG)"
                      className="w-[33px] h-[33px]"
                    />
                  </div>

                  <div className="relative group/title">
                    <h3
                      className="font-semibold mb-2"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateBenefit(index, { title: e.currentTarget.textContent || '' })}
                    >
                      {b.title}
                    </h3>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>

                  <div className="relative group/desc">
                    <p
                      className="text-sm text-gray-600"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateBenefit(index, { description: e.currentTarget.textContent || '' })}
                    >
                      {b.description}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="h-16" /> {/* Spacer */}
            {block.content.benefits?.slice(2, 4).map((benefit, sliceIdx) => {
              const index = sliceIdx + 2;
              const b = normalizeBenefit(benefit);
              return (
                <div key={index} className="rounded-2xl p-6 group" style={{ backgroundColor: '#F8F3EE', margin: 0 }}>
                  <div className="mb-3" style={{ width: 33, height: 33 }}>
                    <ImageUpload
                      currentImage={b.iconUrl || ''}
                      onImageUploaded={(url) => updateBenefit(index, { iconUrl: toIcon33(url) })}
                      aspectRatio="square"   // ✅ fix
                      placeholder="Upload icon (PNG)"
                      className="w-[33px] h-[33px]"
                    />
                  </div>

                  <div className="relative group/title">
                    <h3
                      className="font-semibold mb-2"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateBenefit(index, { title: e.currentTarget.textContent || '' })}
                    >
                      {b.title}
                    </h3>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>

                  <div className="relative group/desc">
                    <p
                      className="text-sm text-gray-600"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateBenefit(index, { description: e.currentTarget.textContent || '' })}
                    >
                      {b.description}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};