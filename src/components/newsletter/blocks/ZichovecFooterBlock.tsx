import { NewsletterBlock } from '@/types/newsletter';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface ZichovecFooterBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ZichovecFooterBlock = ({ block, onUpdate }: ZichovecFooterBlockProps) => {
  const [editingColumn, setEditingColumn] = useState<{ colIdx: number; linkIdx: number } | null>(null);
  const [editingSocial, setEditingSocial] = useState<number | null>(null);

  const defaultColumns: FooterColumn[] = [
    {
      title: 'Užitečné',
      links: [
        { text: 'Doprava', url: '#' },
        { text: 'Platba', url: '#' },
        { text: 'Reklamace', url: '#' },
        { text: 'Ochrana osobních údajů', url: '#' },
        { text: 'Cookies', url: '#' }
      ]
    },
    {
      title: 'ZICHOVEC',
      links: [
        { text: 'O nás', url: '#' },
        { text: 'Chci na čepu', url: '#' },
        { text: 'Eventy', url: '#' },
        { text: 'Merch', url: '#' },
        { text: 'Blog', url: '#' },
        { text: 'Kontakt', url: '#' }
      ]
    },
    {
      title: 'E-shop',
      links: [
        { text: 'E-shop', url: '#' },
        { text: 'Limitky a Novinky', url: '#' },
        { text: 'Dárky a Balíčky', url: '#' },
        { text: 'Zachraň pivo', url: '#' }
      ]
    }
  ];

  const defaultSocials: FooterLink[] = [
    { text: 'Facebook', url: '#' },
    { text: 'Instagram', url: '#' },
    { text: 'Youtube', url: '#' },
    { text: 'X', url: '#' },
    { text: 'LinkedIn', url: '#' }
  ];

  const email = (block.content as any).email || 'e-shop@pivovarzichovec.cz';
  const socials: FooterLink[] = (block.content as any).socials || defaultSocials;
  const columns: FooterColumn[] = (block.content as any).columns || defaultColumns;

  const updateColumn = (colIdx: number, linkIdx: number, field: keyof FooterLink, value: string) => {
    const newColumns = [...columns];
    newColumns[colIdx].links[linkIdx] = { ...newColumns[colIdx].links[linkIdx], [field]: value };
    onUpdate({ ...block.content, columns: newColumns } as any);
  };

  const updateSocial = (idx: number, field: keyof FooterLink, value: string) => {
    const newSocials = [...socials];
    newSocials[idx] = { ...newSocials[idx], [field]: value };
    onUpdate({ ...block.content, socials: newSocials } as any);
  };

  return (
    <div style={{ backgroundColor: '#00C322' }} className="border-t border-black/10">
      <div className="max-w-2xl mx-auto">
        {/* Main footer content */}
        <div className="p-8 grid grid-cols-4 gap-6 text-sm">
          {/* Contact column */}
          <div>
            <p className="mb-4" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#212121' }}>
              <span 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, footerText: e.currentTarget.textContent || '' })}
                className="hover:bg-black/10 px-1 cursor-text"
              >
                {block.content.footerText || '+420 602 555 555'}
              </span>
            </p>
            <p className="mb-6">
              <span 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, email: e.currentTarget.textContent || '' } as any)}
                className="underline hover:no-underline cursor-text" 
                style={{ color: '#212121' }}
              >
                {email}
              </span>
            </p>
            <div className="flex flex-col gap-1">
              {socials.map((social, idx) => (
                <span 
                  key={idx} 
                  className="underline hover:no-underline cursor-pointer" 
                  style={{ color: '#212121' }}
                  onClick={() => setEditingSocial(idx)}
                >
                  {social.text}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns - editable */}
          {columns.map((column, colIdx) => (
            <div key={colIdx}>
              <h4 
                className="font-medium mb-4 cursor-text" 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newColumns = [...columns];
                  newColumns[colIdx] = { ...newColumns[colIdx], title: e.currentTarget.textContent || '' };
                  onUpdate({ ...block.content, columns: newColumns } as any);
                }}
                style={{ color: '#212121' }}
              >
                {column.title}
              </h4>
              <div className="flex flex-col gap-1">
                {column.links.map((link, linkIdx) => (
                  <span 
                    key={linkIdx} 
                    className="underline hover:no-underline cursor-pointer" 
                    style={{ color: '#212121' }}
                    onClick={() => setEditingColumn({ colIdx, linkIdx })}
                  >
                    {link.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Payment icons - white background */}
        <div className="px-8 py-4 flex justify-center gap-3 border-t border-black/10" style={{ backgroundColor: '#FFFFFF' }}>
          {['VISA', 'Diners', 'Amex', 'Discover', 'Mastercard', 'Maestro', 'Stripe', 'PayPal', 'GPay', 'ApplePay', 'BitPay'].map((payment) => (
            <div 
              key={payment} 
              className="w-10 h-6 flex items-center justify-center text-[8px]"
              style={{ backgroundColor: '#F4F4F4', color: '#212121' }}
            >
              {payment}
            </div>
          ))}
        </div>

        {/* Copyright - white background */}
        <div className="px-8 py-4 flex justify-between items-center text-xs border-t border-black/10" style={{ backgroundColor: '#FFFFFF', color: '#212121' }}>
          <span
            contentEditable 
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, copyright: e.currentTarget.textContent || '' })}
            className="cursor-text"
          >
            {block.content.copyright || 'Copyright © 2025 Pivovar ZICHOVEC. Všechna práva vyhrazena.'}
          </span>
          <div className="flex gap-4">
            <span>Vývoj <a href="#" className="underline">FY STUDIO</a> + <a href="#" className="underline">Shoptet</a></span>
            <span>Design <a href="#" className="underline">Vende.Studio</a></span>
          </div>
        </div>
      </div>

      {/* Edit Link Dialog */}
      <Dialog open={editingColumn !== null} onOpenChange={(open) => !open && setEditingColumn(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit odkaz</DialogTitle>
          </DialogHeader>
          {editingColumn && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={columns[editingColumn.colIdx]?.links[editingColumn.linkIdx]?.text || ''}
                  onChange={(e) => updateColumn(editingColumn.colIdx, editingColumn.linkIdx, 'text', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={columns[editingColumn.colIdx]?.links[editingColumn.linkIdx]?.url || ''}
                  onChange={(e) => updateColumn(editingColumn.colIdx, editingColumn.linkIdx, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Social Dialog */}
      <Dialog open={editingSocial !== null} onOpenChange={(open) => !open && setEditingSocial(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit sociální síť</DialogTitle>
          </DialogHeader>
          {editingSocial !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={socials[editingSocial]?.text || ''}
                  onChange={(e) => updateSocial(editingSocial, 'text', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={socials[editingSocial]?.url || ''}
                  onChange={(e) => updateSocial(editingSocial, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
