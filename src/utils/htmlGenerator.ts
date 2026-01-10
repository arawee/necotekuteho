import { NewsletterBlock } from '@/types/newsletter';

// SVG Icons for email HTML
const ARROW_ICON_SVG = (color: string = '#00C322') => `
<svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
  <path d="M4.16156 11.5628L7.22156 7.66281C7.54156 7.23615 7.88156 6.97615 8.24156 6.88281H0.00156253V4.68281H8.16156C8.02823 4.64281 7.86823 4.55615 7.68156 4.42281C7.50823 4.28948 7.3549 4.13615 7.22156 3.96281L4.14156 0.00281215H6.90156L11.4016 5.76281L6.88156 11.5628H4.16156Z" fill="${color}"/>
</svg>`;

const PLUS_ICON_SVG = (color: string = '#000000') => `
<svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
  <path d="M3.58031 9.51937V5.91937H0.000312582V3.59937H3.58031V-0.000625372H6.06031V3.59937H9.64031V5.91937H6.06031V9.51937H3.58031Z" fill="${color}"/>
</svg>`;

// The Zichovec logo SVG
const ZICHOVEC_LOGO_SVG = `
<svg width="100%" height="auto" viewBox="0 0 1258 143" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;">
  <path d="M1177.26 143C1225.76 143 1255.72 119.372 1257.97 81.8424L1220.08 79.8804C1217.99 98.4351 1203.22 109.394 1177.26 109.394C1149.78 109.394 1133.5 94.9316 1133.5 71.5C1133.5 48.0684 1149.78 33.6058 1177.26 33.6058C1203.03 33.6058 1217.82 44.5368 1220.08 63.1196L1257.97 60.7652C1254.93 23.6558 1225.19 0 1177.26 0C1126.67 0 1095.22 27.7479 1095.22 71.5C1095.22 115.252 1126.67 143 1177.26 143ZM945.709 3.13916V139.889H1081.96V106.283H983.984V87.1397H1071.71V55.2997H983.984V36.745H1081.96V3.13916H945.709ZM937.2 3.13916H894.766L846.269 106.283L796.223 3.13916H752.647L818.406 139.889H872.801L937.2 3.13916ZM674.003 109.394C645.759 109.394 627.573 94.9316 627.573 71.5C627.573 48.0684 645.759 33.6058 674.003 33.6058C702.248 33.6058 720.434 48.0684 720.434 71.5C720.434 94.9316 702.248 109.394 674.003 109.394ZM674.003 143C725.354 143 758.709 115.252 758.709 71.5C758.709 27.7479 725.354 0 674.003 0C622.653 0 589.298 27.7479 589.298 71.5C589.298 115.252 622.653 143 674.003 143ZM411.187 3.13916V139.889H449.462V88.3169H532.075V139.889H570.35V3.13916H532.075V54.7111H449.462V3.13916H411.187ZM311.503 143C359.999 143 389.956 119.372 392.213 81.8424L354.318 79.8804C352.225 98.4351 337.464 109.394 311.503 109.394C284.02 109.394 267.737 94.9316 267.737 71.5C267.737 48.0684 284.02 33.6058 311.503 33.6058C337.274 33.6058 352.062 44.5368 354.318 63.1196L392.213 60.7652C389.168 23.6558 359.429 0 311.503 0C260.913 0 229.461 27.7479 229.461 71.5C229.461 115.252 260.913 143 311.503 143ZM172.239 3.13916V139.889H210.514V3.13916H172.239ZM0 111.16V139.889H155.194V106.283H64.0458L152.53 31.8401V3.13916H1.90289V36.745H89.0552L0 111.16Z" fill="black"/>
</svg>`;

// Helper function to determine if a color is dark
const isColorDark = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25;
};

// Helper for very dark backgrounds (for promo boxes)
const isVeryDarkBg = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 60;
};

// Default benefit icons from the editor - these must match src/assets/benefit-icon-*.png
// In production, these should be uploaded to a CDN or embedded as base64
const DEFAULT_BENEFIT_ICONS = [
  'https://yzbjnjhrrvqcdwfdoksa.supabase.co/storage/v1/object/public/newsletter-images/images/benefit-icon-1.png',
  'https://yzbjnjhrrvqcdwfdoksa.supabase.co/storage/v1/object/public/newsletter-images/images/benefit-icon-2.png',
  'https://yzbjnjhrrvqcdwfdoksa.supabase.co/storage/v1/object/public/newsletter-images/images/benefit-icon-3.png',
  'https://yzbjnjhrrvqcdwfdoksa.supabase.co/storage/v1/object/public/newsletter-images/images/benefit-icon-4.png'
];

const getBenefitIcon = (icon: string | undefined, index: number): string => {
  // If icon is provided and not empty, use it
  if (icon && icon.trim() !== '') return icon;
  // Otherwise use the default icon for this index
  return DEFAULT_BENEFIT_ICONS[index] || DEFAULT_BENEFIT_ICONS[0];
};

export function generateHTMLFromBlocks(blocks: NewsletterBlock[]): string {
  const blockHTML = blocks.map(block => {
    switch (block.type) {
      case 'zichovec-header':
        return generateZichovecHeaderHTML(block);
      case 'zichovec-header-menu':
        return generateZichovecHeaderWithMenuHTML(block);
      case 'zichovec-footer':
        return generateZichovecFooterHTML(block);
      case 'product-list':
        return generateProductListHTML(block);
      case 'locations':
        return generateLocationsHTML(block);
      case 'mista':
        return generateMistaHTML(block);
      case 'blog-posts':
        return generateBlogPostsHTML(block);
      case 'promo-box':
        return generatePromoBoxHTML(block);
      case 'gallery-trio':
        return generateGalleryTrioHTML(block);
      case 'gallery-duo':
        return generateGalleryDuoHTML(block);
      case 'article-text':
        return generateArticleTextHTML(block);
      case 'benefits':
        return generateBenefitsHTML(block);
      case 'categories':
        return generateCategoriesHTML(block);
      case 'pozice':
        return generatePoziceHTML(block);
      case 'product-text':
        return generateProductTextHTML(block);
      case 'gallery-single':
        return generateGallerySingleHTML(block);
      case 'text-two-columns':
        return generateTextTwoColumnsHTML(block);
      default:
        return '';
    }
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter - Pivovar ZICHOVEC</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style type="text/css">
        ${getNewsletterCSS()}
    </style>
</head>
<body class="newsletter-email">
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF">
${blockHTML}
</table>
</body>
</html>`;
}

function generateZichovecHeaderHTML(block: NewsletterBlock): string {
  return `<!-- Záhlaví ZICHOVEC -->
<tr>
  <td align="center" style="background-color:#00C322;padding:48px 24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td align="center">
          ${ZICHOVEC_LOGO_SVG}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateZichovecHeaderWithMenuHTML(block: NewsletterBlock): string {
  const menuItems = (block.content as any).menuItems || [
    { text: 'E-shop ↓', url: '#' },
    { text: 'Limitky a Novinky', url: '#' },
    { text: 'Dárky a balíčky', url: '#' },
    { text: 'Zachraň pivo', url: '#' }
  ];

  const menuHTML = menuItems.map((item: any) => 
    `<a href="${item.url}" style="color:#212121;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;text-decoration:none;padding:0 8px;">${item.text}</a>`
  ).join('');

  return `<!-- Záhlaví ZICHOVEC s menu -->
<tr>
  <td align="center" style="background-color:#00C322;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;height:auto;">
      <tr>
        <td align="center" style="padding:48px 24px 16px 24px;">
          ${ZICHOVEC_LOGO_SVG}
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 16px 16px 16px;line-height:120%;">
          ${menuHTML}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateZichovecFooterHTML(block: NewsletterBlock): string {
  const { content } = block;
  const email = (content as any).email || 'e-shop@pivovarzichovec.cz';
  const columns = (content as any).columns || [
    { title: 'Užitečné', links: [{ text: 'Doprava', url: '#' }, { text: 'Platba', url: '#' }, { text: 'Reklamace', url: '#' }, { text: 'Ochrana osobních údajů', url: '#' }, { text: 'Cookies', url: '#' }] },
    { title: 'ZICHOVEC', links: [{ text: 'O nás', url: '#' }, { text: 'Chci na čepu', url: '#' }, { text: 'Eventy', url: '#' }, { text: 'Merch', url: '#' }, { text: 'Blog', url: '#' }, { text: 'Kontakt', url: '#' }] },
    { title: 'E-shop', links: [{ text: 'E-shop', url: '#' }, { text: 'Limitky a Novinky', url: '#' }, { text: 'Dárky a Balíčky', url: '#' }, { text: 'Zachraň pivo', url: '#' }] }
  ];
  const socials = (content as any).socials || [
    { text: 'Facebook', url: '#' },
    { text: 'Instagram', url: '#' },
    { text: 'Youtube', url: '#' },
    { text: 'X', url: '#' },
    { text: 'LinkedIn', url: '#' }
  ];
  const phoneNumber = (content.footerText || '602 555 555').replace(/^\+420\s*/, '').replace(/^tel\.\s*/i, '');

  const columnHTML = columns.map((col: any) => `
    <td valign="top" width="25%" class="stack" style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#212121;">
      <h4 style="margin:0 0 1rem 0;font-size:16px;font-weight:700;color:#212121;">${col.title}</h4>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${col.links.map((link: any) => `<a href="${link.url}" style="color:#212121;text-decoration:none;display:block;margin-bottom:4px;">${link.text}</a>`).join('')}
      </div>
    </td>
  `).join('');

  return `<!-- Patička ZICHOVEC -->
<tr>
  <td align="center" style="background-color:#00C322;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;">
      <tr>
        <td style="padding:32px;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <!-- Contact column -->
              <td valign="top" width="25%" class="stack" style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#212121;">
                <p style="margin:0 0 1rem 0;font-weight:bold;text-decoration:underline;">${phoneNumber}</p>
                <p style="margin:0 0 24px 0;"><a href="mailto:${email}" style="color:#212121;font-weight:bold;text-decoration:underline;">Email</a></p>
                <div style="display:flex;flex-direction:column;gap:4px;">
                  ${socials.map((s: any) => `<a href="${s.url}" style="color:#212121;font-weight:bold;text-decoration:underline;display:block;margin-bottom:4px;">${s.text}</a>`).join('')}
                </div>
              </td>
              ${columnHTML}
            </tr>
          </table>
        </td>
      </tr>
      <!-- Payment icons -->
      <tr>
        <td style="background-color:#FFFFFF;padding:16px 0;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td align="center" style="font-size:0;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="VISA" height="24" style="height:24px;margin:0 4px;"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" height="24" style="height:24px;margin:0 4px;"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="24" style="height:24px;margin:0 4px;"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" height="24" style="height:24px;margin:0 4px;"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" height="24" style="height:24px;margin:0 4px;"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Copyright -->
      <tr>
        <td style="background-color:#FFFFFF;padding:16px 32px;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#212121;">
                <div>${(content.copyright || 'Copyright © 2025 Pivovar ZICHOVEC.').replace(/\s*Všechna práva vyhrazena\.?/gi, '')}</div>
                <div>Všechna práva vyhrazena.</div>
              </td>
              <td align="right" style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#212121;">
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-right:16px;">
                      <div>Vývoj</div>
                      <a href="https://www.fv-studio.cz/" style="color:#A073FF;text-decoration:underline;">FY STUDIO + Shoptet</a>
                    </td>
                    <td>
                      <div>Design</div>
                      <a href="https://www.vanek.studio" style="color:#A073FF;text-decoration:underline;">Vaněk.Studio</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateProductListHTML(block: NewsletterBlock): string {
  const { content } = block;
  const products = Array.isArray((content as any).products) ? (content as any).products : [
    { name: 'Magor 15', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: [{ text: 'Polotmavé bock', color: 'dark' }], image: '', url: '#' },
    { name: 'Sour Passion Fruit', alcohol: '5,9', volume: '750 ml', price: '167 Kč', salePrice: '90 Kč', tags: [{ text: 'Relax', color: 'dark' }, { text: 'Poslední šance', color: 'red' }], image: '', url: '#' },
    { name: 'Milky', alcohol: '5,9', volume: '750 ml', price: '113 Kč', tags: [{ text: 'Neipa', color: 'dark' }, { text: 'Novinka', color: 'green' }], image: '', url: '#' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = (content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (content as any).viewAllUrl || '#';

  const getTagBgColor = (color: string) => {
    switch (color) {
      case 'red': return '#FF4C4C';
      case 'green': return '#00C322';
      default: return '#161616';
    }
  };

  const productCount = Math.min(products.length, 4);
  // Calculate width with gap consideration: total gap = (n-1) * 12px
  const gapPx = 12;
  const totalGapPercent = ((productCount - 1) * gapPx) / 6; // ~6px per 1% at 600px width
  const colWidth = (100 - totalGapPercent) / productCount;

  const productCards = products.slice(0, 4).map((p: any, idx: number) => {
    const tagsHTML = (p.tags || []).map((tag: any) => `
      <span style="display:inline-block;background-color:${getTagBgColor(tag.color)};color:#FFFFFF;font-size:10px;padding:2px 8px;margin-right:4px;margin-bottom:4px;">${tag.text}</span>
    `).join('');

    const priceHTML = p.salePrice 
      ? `<span style="color:#FF4C4C;font-weight:700;">${p.salePrice}</span> <span style="font-size:10px;color:#666;text-decoration:line-through;">${p.price}</span>`
      : `<span style="color:#212121;font-weight:700;">${p.price}</span>`;

    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === productCount - 1 ? '0' : '6px';

    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td style="background-color:#F5F5F5;">
            ${p.image ? `<img src="${p.image}" width="100%" alt="${p.name}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` : 
              `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="padding-top:0;font-family:'JetBrains Mono',monospace;">
            <div style="margin-top:-4px;margin-bottom:8px;">${tagsHTML}</div>
            <h3 style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:#212121;line-height:150%;">${p.name}</h3>
            <div style="font-size:10px;color:#000000;margin-bottom:8px;">
              <span><strong>Alk. →</strong> ${p.alcohol}% obj.</span>
              <span style="float:right;">${p.volume}</span>
            </div>
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td style="font-family:'JetBrains Mono',monospace;">${priceHTML}</td>
                <td align="right">
                  <a href="${p.url || '#'}" style="display:inline-block;width:36px;height:36px;background-color:#00C322;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;">
                    ${PLUS_ICON_SVG('#000000')}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>`;
  }).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- List produktů -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:1rem;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Mohlo by vám chutnat'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${productCards}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateMistaHTML(block: NewsletterBlock): string {
  const { content } = block;
  const places = (content as any).places || [
    { image: '', name: 'Kolbenova 9', buttonText: '→', buttonUrl: '#' },
    { image: '', name: 'Pizza Rosa', buttonText: '→', buttonUrl: '#' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = (content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (content as any).viewAllUrl || '#';

  const placeCount = Math.min(places.length, 3);

  const placeCards = places.slice(0, 3).map((place: any, idx: number) => {
    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === placeCount - 1 ? '0' : '6px';
    
    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td>
            ${place.image ? `<img src="${place.image}" width="100%" alt="${place.name}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;margin-bottom:12px;"/>` : 
              `<div style="width:100%;padding-top:133%;background:#E5E5E5;margin-bottom:12px;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="font-family:'JetBrains Mono',monospace;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td style="padding-right:12px;width:60px;">
                  <a href="${place.buttonUrl || '#'}" style="display:inline-block;width:36px;height:36px;border:1px solid #00C322;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;">
                    ${ARROW_ICON_SVG('#00C322')}
                  </a>
                </td>
                <td align="right" style="width:100%;text-align:right;">
                  <h3 style="margin:0;font-size:16px;font-weight:700;color:#212121;text-align:right;">${place.name}</h3>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  `}).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Místa -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:1rem;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Kde nás ochutnáte?'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${placeCards}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateLocationsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const locations = (content as any).locations || [
    { image: '', name: 'Pivovar v Lounech', address: '5. května 2789, Louny\n440 01', hours: 'Po–Pá 9–17 h', weekendHours: 'So–Ne 9–22 h', facebookUrl: '#', instagramUrl: '#', primaryButtonUrl: '#', secondaryButtonText: 'Rezervace', secondaryButtonUrl: '#' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = content.viewAllText || 'zobrazit vše';
  const viewAllUrl = content.viewAllUrl || '#';

  const locCount = Math.min(locations.length, 6);
  // For locations, we use a max of 3 per row
  const colsPerRow = Math.min(locCount, 3);

  const locationCards = locations.slice(0, 6).map((loc: any, idx: number) => {
    const colIdx = idx % colsPerRow;
    const paddingLeft = colIdx === 0 ? '0' : '6px';
    const paddingRight = colIdx === colsPerRow - 1 ? '0' : '6px';
    
    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 12px ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#F4F4F4;">
        <tr>
          <td>
            ${loc.image ? `<img src="${loc.image}" width="100%" alt="${loc.name}" style="display:block;width:100%;aspect-ratio:5/4;object-fit:cover;"/>` : 
              `<div style="width:100%;padding-top:80%;background:#E5E5E5;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="padding:12px;font-family:'JetBrains Mono',monospace;">
            <h3 style="margin:0.5rem 0 4px 0;font-size:16px;font-weight:700;color:#000000;">${loc.name}</h3>
            <p style="margin:0 0 4px 0;font-size:12px;color:#000000;white-space:pre-line;">${loc.address}</p>
            <p style="margin:0 0 4px 0;font-size:12px;color:#000000;">${loc.hours}</p>
            <p style="margin:0 0 8px 0;font-size:12px;color:#000000;">${loc.weekendHours}</p>
            ${(loc.facebookUrl || loc.instagramUrl) ? `
              <div style="margin-bottom:8px;font-size:12px;">
                ${loc.facebookUrl ? `<a href="${loc.facebookUrl}" style="color:#000000;text-decoration:underline;margin-right:8px;">Facebook</a>` : ''}
                ${loc.instagramUrl ? `<a href="${loc.instagramUrl}" style="color:#000000;text-decoration:underline;">Instagram</a>` : ''}
              </div>
            ` : ''}
            <div style="margin-top:28px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right:8px;">
                    <a href="${loc.primaryButtonUrl || '#'}" style="display:inline-block;width:36px;height:36px;border:1px solid #00C322;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;">
                      ${ARROW_ICON_SVG('#00C322')}
                    </a>
                  </td>
                  <td style="font-size:12px;color:#000000;">
                    → ${loc.secondaryButtonText || 'Rezervace'}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </td>
  `}).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#212121;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Lokace -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:24px;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Kde nás ochutnáte?'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${locationCards}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateBlogPostsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const posts = (content as any).posts || [
    { image: '', title: 'První hospoda ZICHOVEC!', excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?', url: '#' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = content.viewAllText || 'zobrazit vše';
  const viewAllUrl = content.viewAllUrl || '#';

  const postCount = Math.min(posts.length, 3);

  const postCards = posts.slice(0, 3).map((post: any, idx: number) => {
    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === postCount - 1 ? '0' : '6px';
    
    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td>
            ${post.image ? `<img src="${post.image}" width="100%" alt="${post.title}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` : 
              `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="background-color:#F4F4F4;padding:12px;font-family:'JetBrains Mono',monospace;">
            <h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#212121;">${post.title}</h3>
            <p style="margin:0 0 12px 0;font-size:12px;color:#212121;">${post.excerpt}</p>
            <div style="text-align:right;">
              <a href="${post.url || '#'}" style="display:inline-block;width:36px;height:36px;border:1px solid #00C322;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;">
                ${ARROW_ICON_SVG('#00C322')}
              </a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  `}).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Blog posty -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:1rem;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Novinky od ZICHOVCE'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${postCards}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generatePromoBoxHTML(block: NewsletterBlock): string {
  const { content } = block;
  const boxes = (content as any).boxes || [
    {
      title: 'Pivní předplatné?',
      features: [
        { label: 'Novinky', value: 'Nejnovější piva jako první.' },
        { label: 'Všechno víš', value: 'Pravidelný přísun novinek.' },
        { label: 'Doprava', value: 'Zdarma – navždy.' }
      ],
      buttonText: '→ objevit předplatné',
      buttonUrl: '#',
      bgColor: '#00C322'
    }
  ];

  const boxCount = Math.min(boxes.length, 3);

  const boxCards = boxes.slice(0, 3).map((box: any, idx: number) => {
    const isDark = isVeryDarkBg(box.bgColor || '#00C322');
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const valueColor = isDark ? '#CCC' : '#000000';
    const borderColor = isDark ? '#FFFFFF' : '#000000';
    
    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === boxCount - 1 ? '0' : '6px';

    const featuresHTML = (box.features || []).map((f: any) => `
      <tr>
        <td style="padding:2px 0;font-family:'JetBrains Mono',monospace;font-size:12px;">
          <span style="color:${textColor};font-weight:700;">${f.label}</span>
          <span style="display:inline-block;margin:0 4px;">${ARROW_ICON_SVG('#000000')}</span>
          <span style="color:${valueColor};">${f.value}</span>
        </td>
      </tr>
    `).join('');

    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:${box.bgColor || '#00C322'};">
        <tr>
          <td style="padding:24px;font-family:'JetBrains Mono',monospace;">
            <h3 style="margin:0 0 1rem 0;font-size:24px;font-weight:700;color:${textColor};">${box.title}</h3>
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
              ${featuresHTML}
            </table>
            <a href="${box.buttonUrl || '#'}" style="display:inline-block;padding:12px 24px;border:1px solid ${borderColor};color:${textColor};font-size:14px;text-decoration:none;">
              ${box.buttonText}
            </a>
          </td>
        </tr>
      </table>
    </td>`;
  }).join('');

  return `<!-- Promo boxy -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>${boxCards}</tr>
    </table>
  </td>
</tr>`;
}

function generateGalleryTrioHTML(block: NewsletterBlock): string {
  const { content } = block;
  const photos = content.photos || [{ url: '', alt: '' }, { url: '', alt: '' }, { url: '', alt: '' }];

  return `<!-- Galerie trio -->
<tr>
  <td align="center" style="margin-top:2rem;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <!-- Main image 1:1 -->
      <tr>
        <td>
          ${photos[0]?.url ? `<img src="${photos[0].url}" width="600" alt="${photos[0].alt || ''}" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:100%;background:#E5E5E5;"></div>`}
        </td>
      </tr>
      <!-- Two smaller images 3:4 with 12px gap -->
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="padding-right:6px;">
                ${photos[1]?.url ? `<img src="${photos[1].url}" width="294" alt="${photos[1].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
                  `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
              </td>
              <td style="padding-left:6px;">
                ${photos[2]?.url ? `<img src="${photos[2].url}" width="294" alt="${photos[2].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
                  `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateGalleryDuoHTML(block: NewsletterBlock): string {
  const { content } = block;
  const photos = content.photos || [{ url: '', alt: '' }, { url: '', alt: '' }];

  return `<!-- Galerie duo -->
<tr>
  <td align="center" style="margin-top:2rem;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-right:6px;">
          ${photos[0]?.url ? `<img src="${photos[0].url}" width="294" alt="${photos[0].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
        </td>
        <td style="padding-left:6px;">
          ${photos[1]?.url ? `<img src="${photos[1].url}" width="294" alt="${photos[1].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateGallerySingleHTML(block: NewsletterBlock): string {
  const photo = block.content.photos?.[0];

  return `<!-- Galerie single -->
<tr>
  <td align="center" style="margin-top:2rem;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td>
          ${photo?.url ? `<img src="${photo.url}" width="600" alt="${photo.alt || ''}" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:100%;background:#E5E5E5;"></div>`}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateArticleTextHTML(block: NewsletterBlock): string {
  const { content } = block;
  const date = ((content as any).date ?? '') as string;
  const author = (content.subtitle ?? '') as string;
  const tags = (content as any).tagsArray || [];
  const shareLinks = (content as any).shareLinksArray || [];

  const hasDate = date && date.trim() !== '';
  const hasAuthor = author && author.trim() !== '';
  const hasTags = tags.length > 0 && tags.some((t: any) => t.text && t.text.trim() !== '');
  const validShareLinks = shareLinks.filter((s: any) => s.url && s.url.trim() !== '' && s.url !== '#');
  const hasShares = validShareLinks.length > 0;
  const hasAnyMeta = hasDate || hasAuthor || hasTags || hasShares;

  const metadataHTML = hasAnyMeta ? `
    <tr>
      <td style="padding-top:32px;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="display:inline-block;">
          <tr>
            <td style="padding:16px;background-color:#F4F4F4;font-family:'JetBrains Mono',monospace;font-size:14px;">
              ${hasDate ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Datum →</span> <span style="color:#666;">${date}</span></div>` : ''}
              ${hasAuthor ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Autor →</span> <span style="color:#666;">${author}</span></div>` : ''}
              ${hasTags ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Tag →</span> <span style="color:#666;text-decoration:underline;">${tags.filter((t: any) => t.text && t.text.trim() !== '').map((t: any) => `<a href="${t.url || '#'}" style="color:#666;text-decoration:underline;">${t.text}</a>`).join(', ')}</span></div>` : ''}
              ${hasShares ? `<div><span style="font-weight:500;">Sdílet →</span> <span style="color:#666;text-decoration:underline;">${validShareLinks.map((s: any) => `<a href="${s.url}" style="color:#666;text-decoration:underline;">${s.text}</a>`).join(', ')}</span></div>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  return `<!-- Článek -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;">
      <tr>
        <td style="font-family:'JetBrains Mono',monospace;">
          <h1 style="margin:0 0 24px 0;font-size:32px;font-weight:700;line-height:1.2;color:#212121;">
            ${content.title || 'OPA: Jemná evoluce moderních ale'}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:120%;color:#212121;">
          ${content.text || 'OPA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty.'}
        </td>
      </tr>
      ${metadataHTML}
    </table>
  </td>
</tr>`;
}

function generateBenefitsHTML(block: NewsletterBlock): string {
  const benefits = (block.content as any).benefits || [
    { icon: '', title: 'Experiment', description: 'Náš pivovar rád experimentuje a neustále objevuje nové chutě a způsoby vaření piva.' },
    { icon: '', title: 'Radost', description: 'Pivo jako radost, zážitek, komunita.' },
    { icon: '', title: 'Komunita', description: 'Propojujeme zákazníky s výrobou, sládky, inspirací, chutěmi i místem.' }
  ];

  const benefitCount = Math.min(benefits.length, 4);

  const benefitCells = benefits.slice(0, 4).map((b: any, index: number) => {
    const paddingLeft = index === 0 ? '0' : '6px';
    const paddingRight = index === benefitCount - 1 ? '0' : '6px';
    
    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};text-align:center;font-family:'JetBrains Mono',monospace;">
      <div style="margin-bottom:1rem;">
        <img src="${getBenefitIcon(b.icon, index)}" width="48" height="48" alt="${b.title}" style="display:inline-block;width:48px;height:48px;object-fit:contain;"/>
      </div>
      <h4 style="margin:0 0 12px 0;font-size:16px;font-weight:700;color:#000000;line-height:120%;">${b.title}</h4>
      <p style="margin:0;font-size:12px;font-weight:400;color:#000000;line-height:120%;">${b.description}</p>
    </td>
  `}).join('');

  return `<!-- Benefity -->
<tr>
  <td align="center" style="padding:32px 24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>${benefitCells}</tr>
    </table>
  </td>
</tr>`;
}

function generateCategoriesHTML(block: NewsletterBlock): string {
  const { content } = block;
  const categories = (content as any).categories || [
    { image: '', tag: '→ IPA, APA a NEIPA', url: '#' },
    { image: '', tag: '→ Sour a Ovocné', url: '#' },
    { image: '', tag: '→ Ležáky a klasika', url: '#' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = (content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (content as any).viewAllUrl || '#';

  const catCount = Math.min(categories.length, 4);

  const catCells = categories.slice(0, 4).map((c: any, idx: number) => {
    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === catCount - 1 ? '0' : '6px';
    
    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <a href="${c.url || '#'}" style="text-decoration:none;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
          <tr>
            <td>
              ${c.image ? `<img src="${c.image}" width="100%" alt="" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
                `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
            </td>
          </tr>
          <tr>
            <td>
              <span style="display:inline-block;background-color:#212121;color:#FFFFFF;font-family:'JetBrains Mono',monospace;font-size:12px;padding:4px 8px;">${c.tag}</span>
            </td>
          </tr>
        </table>
      </a>
    </td>
  `}).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Kategorie -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:1rem;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Vyber si to pravé pro tebe'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${catCells}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generatePoziceHTML(block: NewsletterBlock): string {
  const { content } = block;
  const positions = (content as any).positions || [
    { title: 'Správce sociálních sítí', description: 'Sit aliqu ip venim non nostrud consectetur...', buttonText: 'Mám zájem', buttonUrl: '#', bgColor: '#F4F4F4' }
  ];
  const showViewAll = (content as any).showViewAll !== false;
  const viewAllText = (content as any).viewAllText || 'zobrazit vše';
  const viewAllUrl = (content as any).viewAllUrl || '#';

  const posCount = Math.min(positions.length, 3);

  const positionCells = positions.slice(0, 3).map((p: any, idx: number) => {
    const isDark = isColorDark(p.bgColor || '#F4F4F4');
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const borderColor = isDark ? '#FFFFFF' : '#212121';
    const paddingLeft = idx === 0 ? '0' : '6px';
    const paddingRight = idx === posCount - 1 ? '0' : '6px';

    return `
    <td valign="top" class="stack" style="padding:0 ${paddingRight} 0 ${paddingLeft};">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:${p.bgColor || '#F4F4F4'};">
        <tr>
          <td style="padding:16px;font-family:'JetBrains Mono',monospace;">
            <h4 style="margin:0 0 12px 0;font-size:16px;font-weight:700;color:${textColor};">${p.title}</h4>
            <p style="margin:0 0 1rem 0;font-size:12px;color:${textColor};">${p.description}</p>
            <a href="${p.buttonUrl || '#'}" style="display:inline-flex;align-items:center;padding:12px 24px;border:1px solid ${borderColor};color:${textColor};font-size:12px;text-decoration:none;">
              ${ARROW_ICON_SVG(borderColor)}
              <span style="margin-left:8px;">${p.buttonText}</span>
            </a>
          </td>
        </tr>
      </table>
    </td>`;
  }).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Pozice -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;width:100%;">
      <tr>
        <td style="padding-bottom:1rem;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:20px;font-weight:700;color:#212121;">${content.title || 'Volné pozice'}</h2>
              </td>
              <td align="right">${viewAllHTML}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>${positionCells}</tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateProductTextHTML(block: NewsletterBlock): string {
  const { content } = block;
  const productImage = content.image || '';
  const productName = content.title || 'Magor';
  const productText = content.text || 'V pátce roku 2019 vyhlášena servrem Untapped.com nejlepším pivem v České republice.';

  return `<!-- Produkt + text -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="400" class="wrap" style="max-width:400px;">
      <tr>
        <td>
          ${productImage ? `<img src="${productImage}" width="400" alt="${productName}" style="display:block;width:100%;aspect-ratio:4/5;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:125%;background:#E5E5E5;"></div>`}
        </td>
      </tr>
      <tr>
        <td style="padding:16px;background-color:#F4F4F4;font-family:'JetBrains Mono',monospace;">
          <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#212121;">${productName}</h2>
          <p style="margin:0;font-size:12px;font-weight:700;line-height:120%;color:#212121;">${productText}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function generateTextTwoColumnsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const leftColumn = (content as any).leftColumn || 'Slovníček';
  const rightColumn = (content as any).rightColumn || 'NEIPA, neboli New England India Pale Ale, je moderní, svrchně kvašený styl piva...';

  return `<!-- Text dva sloupce -->
<tr>
  <td align="center" style="padding:24px;margin-bottom:32px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" class="wrap" style="max-width:600px;">
      <tr>
        <td valign="top" width="100" style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:900;color:#212121;">
          ${leftColumn}
        </td>
        <td valign="top" style="padding-left:32px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;line-height:150%;color:#212121;">
          ${rightColumn}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}


function getNewsletterCSS(): string {
  return `
    /* Reset */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #FFFFFF;
    }
    
    .newsletter-email {
      font-family: 'JetBrains Mono', monospace;
      color: #212121;
      line-height: 1.5;
    }
    
    .newsletter-email h2 {
      font-weight: 700;
    }
    
    .newsletter-email a {
      color: inherit;
    }
    
    /* Responsive - Mobile */
    @media only screen and (max-width: 620px) {
      body, table, td {
        width: 100% !important;
        min-width: 100% !important;
      }
      table.wrap {
        width: 100% !important;
        max-width: 100% !important;
      }
      td.stack {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        padding: 0 0 16px 0 !important;
      }
      td.stack:last-child {
        padding-bottom: 0 !important;
      }
      /* Make images responsive */
      img {
        max-width: 100% !important;
        height: auto !important;
      }
      /* Stack footer columns */
      .footer-col {
        display: block !important;
        width: 100% !important;
        padding-bottom: 24px !important;
      }
      /* Ensure proper padding on mobile */
      td[style*="padding:24px"] {
        padding: 16px !important;
      }
    }
  `;
}
