import { NewsletterBlock } from '@/types/newsletter';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import paymentVisa from '@/assets/payment-visa.png';
import paymentDiners from '@/assets/payment-diners.png';
import paymentAmex from '@/assets/payment-amex.png';
import paymentDiscover from '@/assets/payment-discover.png';
import paymentMastercard from '@/assets/payment-mastercard.png';
import paymentMaestro from '@/assets/payment-maestro.png';
import paymentStripe from '@/assets/payment-stripe.png';
import paymentPaypal from '@/assets/payment-paypal.png';
import paymentGooglepay from '@/assets/payment-googlepay.png';
import paymentApplepay from '@/assets/payment-applepay.png';
import paymentBitpay from '@/assets/payment-bitpay.png';

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

const paymentIcons = [
  { name: 'VISA', src: paymentVisa },
  { name: 'Diners', src: paymentDiners },
  { name: 'Amex', src: paymentAmex },
  { name: 'Discover', src: paymentDiscover },
  { name: 'Mastercard', src: paymentMastercard },
  { name: 'Maestro', src: paymentMaestro },
  { name: 'Stripe', src: paymentStripe },
  { name: 'PayPal', src: paymentPaypal },
  { name: 'GPay', src: paymentGooglepay },
  { name: 'ApplePay', src: paymentApplepay },
  { name: 'BitPay', src: paymentBitpay },
];

export const ZichovecFooterBlock = ({ block, onUpdate }: ZichovecFooterBlockProps) => {
  const [editingColumn, setEditingColumn] = useState<{ colIdx: number; linkIdx: number } | null>(null);
  const [editingSocial, setEditingSocial] = useState<number | null>(null);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const email = (block.content as any).email || 'e-shop@pivovarzichovec.cz';

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
        {/* Main footer content - text 12px */}
        <div className="p-8 grid grid-cols-4 gap-6" style={{ fontSize: '12px' }}>
          {/* Contact column - first column bold and underlined */}
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: '#212121', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1rem' }}>
              <span 
                className="hover:bg-black/10 px-1 cursor-pointer"
                onClick={() => setEditingPhone(true)}
              >
                {(block.content.footerText || '602 555 555').replace(/^\+420\s*/, '').replace(/^tel\.\s*/i, '')}
              </span>
            </p>
            <p className="mb-6">
              <span 
                className="hover:no-underline cursor-pointer" 
                style={{ color: '#212121', fontWeight: 'bold', textDecoration: 'underline' }}
                onClick={() => setEditingEmail(true)}
              >
                Email
              </span>
            </p>
            <div className="flex flex-col gap-1">
              {socials.map((social, idx) => (
                <span 
                  key={idx} 
                  className="underline hover:no-underline cursor-pointer" 
                  style={{ color: '#212121', fontWeight: 'bold' }}
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
              {/* Headings 16px fontsize */}
              <h4 
                className="cursor-text" 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newColumns = [...columns];
                  newColumns[colIdx] = { ...newColumns[colIdx], title: e.currentTarget.textContent || '' };
                  onUpdate({ ...block.content, columns: newColumns } as any);
                }}
                style={{ color: '#212121', fontSize: '16px', fontWeight: 700, marginBottom: '1rem' }}
              >
                {column.title}
              </h4>
              <div className="flex flex-col gap-1">
                {column.links.map((link, linkIdx) => (
                  <span 
                    key={linkIdx} 
                    className="hover:underline cursor-pointer" 
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

        {/* Payment icons - white background, 10px gap, flex wrap */}
        <div className="px-8 py-4 flex justify-center flex-wrap border-t border-black/10" style={{ backgroundColor: '#FFFFFF', gap: '10px' }}>
          {paymentIcons.map((payment) => (
            <img 
              key={payment.name} 
              src={payment.src}
              alt={payment.name}
              className="h-6 w-auto object-contain"
            />
          ))}
        </div>

        {/* Copyright - white background, 10px fontsize, NOT editable */}
        <div className="px-8 py-4 flex justify-between items-start border-t border-black/10" style={{ backgroundColor: '#FFFFFF', color: '#212121', fontSize: '10px' }}>
          <div>
            <div>{(block.content.copyright || 'Copyright © 2025 Pivovar ZICHOVEC.').replace(/\s*Všechna práva vyhrazena\.?/gi, '')}</div>
            <div>Všechna práva vyhrazena.</div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span>Vývoj</span>
              <a href="https://www.fv-studio.cz/" target="_blank" rel="noopener noreferrer" style={{ color: '#A073FF', textDecoration: 'underline' }}>FY STUDIO + Shoptet</a>
            </div>
            <div className="flex flex-col">
              <span>Design</span>
              <a href="https://www.vanek.studio" target="_blank" rel="noopener noreferrer" style={{ color: '#A073FF', textDecoration: 'underline' }}>Vaněk.Studio</a>
            </div>
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

      {/* Edit Phone Dialog */}
      <Dialog open={editingPhone} onOpenChange={(open) => !open && setEditingPhone(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit telefonní číslo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Telefonní číslo (bez předvolby +420)</label>
              <Input
                value={(block.content.footerText || '602 555 555').replace(/^\+420\s*/, '').replace(/^tel\.\s*/i, '')}
                onChange={(e) => onUpdate({ ...block.content, footerText: e.target.value })}
                placeholder="602 555 555"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Email Dialog */}
      <Dialog open={editingEmail} onOpenChange={(open) => !open && setEditingEmail(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upravit e-mail</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">E-mailová adresa</label>
              <Input
                value={email}
                onChange={(e) => onUpdate({ ...block.content, email: e.target.value } as any)}
                placeholder="e-shop@pivovarzichovec.cz"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
