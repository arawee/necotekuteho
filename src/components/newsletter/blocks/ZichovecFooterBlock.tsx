import { NewsletterBlock } from '@/types/newsletter';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2 } from 'lucide-react';

interface ZichovecFooterBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ZichovecFooterBlock = ({ block, onUpdate }: ZichovecFooterBlockProps) => {
  const footerColumns = [
    {
      title: 'Užitečné',
      links: ['Doprava', 'Platba', 'Reklamace', 'Ochrana osobních údajů', 'Cookies']
    },
    {
      title: 'ZICHOVEC',
      links: ['O nás', 'Chci na čepu', 'Eventy', 'Merch', 'Blog', 'Kontakt']
    },
    {
      title: 'E-shop',
      links: ['E-shop', 'Limitky a Novinky', 'Dárky a Balíčky', 'Zachraň pivo']
    }
  ];

  return (
    <div className="bg-white border-t border-border">
      <div className="max-w-2xl mx-auto">
        {/* Main footer content */}
        <div className="p-8 grid grid-cols-4 gap-6 text-sm">
          {/* Contact column */}
          <div>
            <p className="mb-4" style={{ fontFamily: 'monospace' }}>
              <span 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, footerText: e.currentTarget.textContent || '' })}
                className="hover:bg-muted/50 px-1 rounded cursor-text"
              >
                {block.content.footerText || '+420 602 555 555'}
              </span>
            </p>
            <p className="mb-6">
              <a href="#" className="underline hover:no-underline" style={{ color: '#212121' }}>
                e-shop@pivovarzichovec.cz
              </a>
            </p>
            <div className="flex flex-col gap-1">
              {['Facebook', 'Instagram', 'Youtube', 'X', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="underline hover:no-underline" style={{ color: '#212121' }}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column, idx) => (
            <div key={idx}>
              <h4 className="font-medium mb-4" style={{ color: '#212121' }}>{column.title}</h4>
              <div className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <a key={link} href="#" className="underline hover:no-underline" style={{ color: '#212121' }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Payment icons */}
        <div className="px-8 py-4 flex justify-center gap-3 border-t border-border">
          {['VISA', 'Diners', 'Amex', 'Discover', 'Mastercard', 'Maestro', 'Stripe', 'PayPal', 'GPay', 'ApplePay', 'BitPay'].map((payment) => (
            <div 
              key={payment} 
              className="w-10 h-6 bg-muted rounded flex items-center justify-center text-[8px] text-muted-foreground"
            >
              {payment}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="px-8 py-4 flex justify-between items-center text-xs border-t border-border" style={{ color: '#212121' }}>
          <span>
            {block.content.copyright || 'Copyright © 2025 Pivovar ZICHOVEC. Všechna práva vyhrazena.'}
          </span>
          <div className="flex gap-4">
            <span>Vývoj <a href="#" className="underline">FY STUDIO</a> + <a href="#" className="underline">Shoptet</a></span>
            <span>Design <a href="#" className="underline">Vende.Studio</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};
