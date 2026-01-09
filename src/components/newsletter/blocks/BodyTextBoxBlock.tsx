import { NewsletterBlock } from '@/types/newsletter';

interface BodyTextBoxBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

interface Section {
  heading: string;
  text: string;
}

export const BodyTextBoxBlock = ({ block, onUpdate }: BodyTextBoxBlockProps) => {
  const title = block.content.title || 'OPA: Jemná evoluce moderních ale';
  const introText = (block.content as any).introText || 'PA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty. Na rozdíl od tradičních Pale Ale využívá ve větší míře ovesné vločky, které pivu dodávají hedvábnou plnost a příjemně zakulacený charakter. OPA tak stojí na pomezí mezi svěžím, chmelným pivem a jemně krémovým stylem.';
  
  const defaultSections: Section[] = [
    { heading: 'Chuťové profily a aroma OPA', text: 'Oat Pale Ale je typický svou vyvážeností. Základ tvoří světlé slady, které poskytují měkké, lehce sladové tělo. Oves přidává krémovost, která zjemňuje hořkost a činí z OPA styl přístupný i pro ty, kteří běžně vyhledávají méně výrazná piva. Aroma bývá svěží, často citrusové, tropické nebo květinové, podle použitých chmelů. Moderní chmely typu Citra, Mosaic či Amarillo podtrhují lehkost a šťavnatost, zatímco ovesný základ drží celek pohromadě.' },
    { heading: 'OPA je pivo, které spojuje lehkost, sametovou jemnost a moderní chmelení v harmonický celek (citace)', text: '' },
    { heading: 'Trendy a obliba na pivní scéně', text: 'OPA se stává oblíbenou volbou zejména v minipivovarech, které hledají cestu, jak nabídnout pitelné, svěží, ale zároveň zajímavé pivo. Styl se výborně hodí pro celoroční pití a je přívětivý jak pro zkušené pijáče, tak pro nováčky, kteří chtějí vstoupit do světa svrchně kvašených piv. OPA tak právem patří mezi nejpřístupnější a zároveň nejmodernější styly současného craftového pivovarnictví.' },
    { heading: 'Nezapomenutelné tělo', text: 'Oat Pale Ale je typický svou vyvážeností. Základ tvoří světlé slady, které poskytují měkké, lehce sladové tělo. Oves přidává krémovost, která zjemňuje hořkost a činí z OPA styl přístupný i pro ty, kteří běžně vyhledávají méně výrazná piva. Aroma bývá svěží, často citrusové, tropické nebo květinové, podle použitých chmelů. Moderní chmely typu Citra, Mosaic či Amarillo podtrhují lehkost a šťavnatost, zatímco ovesný základ drží celek pohromadě.' }
  ];

  const sections = (block.content as any).sections || defaultSections;

  // Metadata
  const metaDate = (block.content as any).metaDate || '28. května 2025';
  const metaAuthor = (block.content as any).metaAuthor || 'Petr Novák';
  const metaTags = (block.content as any).metaTags || 'Pivo OPA Trend';
  const metaShare = (block.content as any).metaShare || 'Link Facebook X Linkedin';

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    onUpdate({ ...block.content, sections: newSections } as any);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Main title */}
        <h1 
          className="text-3xl font-normal mb-6"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          style={{ color: '#212121' }}
        >
          {title}
        </h1>

        {/* Intro text */}
        <p 
          className="text-sm leading-relaxed mb-8"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ ...block.content, introText: e.currentTarget.textContent || '' } as any)}
          style={{ color: '#212121' }}
        >
          {introText}
        </p>

        {/* Sections */}
        {sections.map((section: Section, index: number) => (
          <div key={index} className="mb-6">
            <h2 
              className={`font-medium mb-3 ${section.text ? 'text-xl' : 'text-lg italic border-l-4 border-black pl-4'}`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateSection(index, 'heading', e.currentTarget.textContent || '')}
              style={{ color: '#212121' }}
            >
              {section.heading}
            </h2>
            {section.text && (
              <p 
                className="text-sm leading-relaxed"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateSection(index, 'text', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {section.text}
              </p>
            )}
          </div>
        ))}

        {/* Metadata box */}
        <div className="border-t border-gray-300 pt-4 mt-8">
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-medium w-20" style={{ color: '#212121' }}>Datum →</span>
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, metaDate: e.currentTarget.textContent || '' } as any)}
                style={{ color: '#212121' }}
              >
                {metaDate}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-20" style={{ color: '#212121' }}>Autor →</span>
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, metaAuthor: e.currentTarget.textContent || '' } as any)}
                style={{ color: '#212121' }}
              >
                {metaAuthor}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-20" style={{ color: '#212121' }}>Tag →</span>
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, metaTags: e.currentTarget.textContent || '' } as any)}
                className="underline"
                style={{ color: '#212121' }}
              >
                {metaTags}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-20" style={{ color: '#212121' }}>Sdílet →</span>
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate({ ...block.content, metaShare: e.currentTarget.textContent || '' } as any)}
                className="underline"
                style={{ color: '#212121' }}
              >
                {metaShare}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
