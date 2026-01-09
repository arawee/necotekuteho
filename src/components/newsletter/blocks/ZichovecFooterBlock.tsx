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

  const email = (block.content as any).email || 'e-shop@pivovarzichovec.cz';
  const socials = (block.content as any).socials || ['Facebook', 'Instagram', 'Youtube', 'X', 'LinkedIn'];
  const columns = (block.content as any).columns || footerColumns;

  return (
    <div style={{ backgroundColor: '#00D954' }} className="border-t border-black/10">
      <div className="max-w-2xl mx-auto">
        {/* Main footer content */}
        <div className="p-8 grid grid-cols-4 gap-6 text-sm">
          {/* Contact column */}
          <div>
            <p className="mb-4" style={{ fontFamily: 'monospace', color: '#212121' }}>
              <span 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, footerText: e.currentTarget.textContent || '' })}
                className="hover:bg-black/10 px-1 rounded cursor-text"
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
              {socials.map((social: string, idx: number) => (
                <span 
                  key={idx} 
                  contentEditable 
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newSocials = [...socials];
                    newSocials[idx] = e.currentTarget.textContent || '';
                    onUpdate({ ...block.content, socials: newSocials } as any);
                  }}
                  className="underline hover:no-underline cursor-text" 
                  style={{ color: '#212121' }}
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns - editable */}
          {columns.map((column: any, idx: number) => (
            <div key={idx}>
              <h4 
                className="font-medium mb-4 cursor-text" 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newColumns = [...columns];
                  newColumns[idx] = { ...newColumns[idx], title: e.currentTarget.textContent || '' };
                  onUpdate({ ...block.content, columns: newColumns } as any);
                }}
                style={{ color: '#212121' }}
              >
                {column.title}
              </h4>
              <div className="flex flex-col gap-1">
                {column.links.map((link: string, linkIdx: number) => (
                  <span 
                    key={linkIdx} 
                    contentEditable 
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newColumns = [...columns];
                      const newLinks = [...newColumns[idx].links];
                      newLinks[linkIdx] = e.currentTarget.textContent || '';
                      newColumns[idx] = { ...newColumns[idx], links: newLinks };
                      onUpdate({ ...block.content, columns: newColumns } as any);
                    }}
                    className="underline hover:no-underline cursor-text" 
                    style={{ color: '#212121' }}
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Payment icons */}
        <div className="px-8 py-4 flex justify-center gap-3 border-t border-black/10">
          {['VISA', 'Diners', 'Amex', 'Discover', 'Mastercard', 'Maestro', 'Stripe', 'PayPal', 'GPay', 'ApplePay', 'BitPay'].map((payment) => (
            <div 
              key={payment} 
              className="w-10 h-6 rounded flex items-center justify-center text-[8px]"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#212121' }}
            >
              {payment}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="px-8 py-4 flex justify-between items-center text-xs border-t border-black/10" style={{ color: '#212121' }}>
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
    </div>
  );
};
