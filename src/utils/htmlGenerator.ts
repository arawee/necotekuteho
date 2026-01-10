import { NewsletterBlock } from '@/types/newsletter';

// SVG Icons for email HTML
const ARROW_ICON_SVG = (color: string = '#00C322') => `
<svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.16156 11.5628L7.22156 7.66281C7.54156 7.23615 7.88156 6.97615 8.24156 6.88281H0.00156253V4.68281H8.16156C8.02823 4.64281 7.86823 4.55615 7.68156 4.42281C7.50823 4.28948 7.3549 4.13615 7.22156 3.96281L4.14156 0.00281215H6.90156L11.4016 5.76281L6.88156 11.5628H4.16156Z" fill="${color}"/>
</svg>`;

const PLUS_ICON_SVG = (color: string = '#000000') => `
<svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.58031 9.51937V5.91937H0.000312582V3.59937H3.58031V-0.000625372H6.06031V3.59937H9.64031V5.91937H6.06031V9.51937H3.58031Z" fill="${color}"/>
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

export function generateHTMLFromBlocks(blocks: NewsletterBlock[]): string {
  const blockHTML = blocks.map(block => {
    switch (block.type) {
      case 'zichovec-header':
      case 'zichovec-header-menu':
        return generateZichovecHeaderHTML(block);
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
  const svgContent = block.content.image || '';
  
  return `<!-- Záhlaví ZICHOVEC -->
<tr>
  <td align="center" style="background-color:#00C322;padding:48px 24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td align="center">
          ${svgContent ? svgContent : `
          <h1 style="margin:0;font-size:48px;font-weight:900;font-style:italic;color:#212121;font-family:'JetBrains Mono',monospace;letter-spacing:-1px;">
            ZICHOVEC
          </h1>`}
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
    <td valign="top" style="padding:0 12px 24px 0;font-family:'JetBrains Mono',monospace;font-size:12px;color:#212121;">
      <h4 style="margin:0 0 1rem 0;font-size:16px;font-weight:700;color:#212121;">${col.title}</h4>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${col.links.map((link: any) => `<a href="${link.url}" style="color:#212121;text-decoration:none;display:block;margin-bottom:4px;">${link.text}</a>`).join('')}
      </div>
    </td>
  `).join('');

  return `<!-- Patička ZICHOVEC -->
<tr>
  <td align="center" style="background-color:#00C322;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td style="padding:32px;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <!-- Contact column -->
              <td valign="top" width="25%" style="padding:0 12px 24px 0;font-family:'JetBrains Mono',monospace;font-size:12px;color:#212121;">
                <p style="margin:0 0 1rem 0;font-weight:bold;text-decoration:underline;padding-left:0;padding-right:0;">${phoneNumber}</p>
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

  const productCards = products.slice(0, 4).map((p: any) => {
    const tagsHTML = (p.tags || []).map((tag: any) => `
      <span style="display:inline-block;background-color:${getTagBgColor(tag.color)};color:#FFFFFF;font-size:10px;padding:2px 8px;margin-right:4px;margin-bottom:4px;">${tag.text}</span>
    `).join('');

    const priceHTML = p.salePrice 
      ? `<span style="color:#FF4C4C;font-weight:700;">${p.salePrice}</span> <span style="font-size:10px;color:#666;text-decoration:line-through;">${p.price}</span>`
      : `<span style="color:#212121;font-weight:700;">${p.price}</span>`;

    return `
    <td valign="top" style="padding:0 6px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td style="background-color:#F5F5F5;">
            ${p.image ? `<img src="${p.image}" width="100%" alt="${p.name}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` : 
              `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="padding-top:0;font-family:'JetBrains Mono',monospace;">
            <div style="margin-bottom:8px;">${tagsHTML}</div>
            <h3 style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:#212121;line-height:150%;">${p.name}</h3>
            <div style="font-size:10px;color:#000000;margin-bottom:8px;display:flex;justify-content:space-between;">
              <span><strong>Alk. →</strong> ${p.alcohol}% obj.</span>
              <span>${p.volume}</span>
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
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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

  const placeCards = places.slice(0, 3).map((place: any) => `
    <td valign="top" style="padding:0 6px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td>
            ${place.image ? `<img src="${place.image}" width="100%" alt="${place.name}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;margin-bottom:12px;"/>` : 
              `<div style="width:100%;padding-top:133%;background:#E5E5E5;margin-bottom:12px;"></div>`}
          </td>
        </tr>
        <tr>
          <td style="font-family:'JetBrains Mono',monospace;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="${place.buttonUrl || '#'}" style="display:inline-block;width:36px;height:36px;border:1px solid #00C322;border-radius:50%;text-align:center;line-height:36px;text-decoration:none;">
                    ${ARROW_ICON_SVG('#00C322')}
                  </a>
                </td>
                <td>
                  <h3 style="margin:0;font-size:16px;font-weight:700;color:#212121;">${place.name}</h3>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  `).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Místa -->
<tr>
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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

  const locationCards = locations.slice(0, 6).map((loc: any) => `
    <td valign="top" width="33%" style="padding:0 6px 12px 0;">
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
  `).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#212121;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Lokace -->
<tr>
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td style="padding-bottom:24px;">
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;">
                <h2 style="margin:0;font-size:24px;font-weight:700;color:#212121;">${content.title || 'Kde nás ochutnáte?'}</h2>
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

  const postCards = posts.slice(0, 3).map((post: any) => `
    <td valign="top" style="padding:0 6px;">
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
  `).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Blog posty -->
<tr>
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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

  const boxCards = boxes.map((box: any) => {
    const isDark = isVeryDarkBg(box.bgColor || '#00C322');
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const valueColor = isDark ? '#CCC' : '#000000';
    const borderColor = isDark ? '#FFFFFF' : '#000000';

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
    <td valign="top" style="padding:0 6px;">
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
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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
  <td align="center">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <!-- Main image 1:1 -->
      <tr>
        <td>
          ${photos[0]?.url ? `<img src="${photos[0].url}" width="600" alt="${photos[0].alt || ''}" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:100%;background:#E5E5E5;"></div>`}
        </td>
      </tr>
      <!-- Two smaller images 3:4 -->
      <tr>
        <td>
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="50%">
                ${photos[1]?.url ? `<img src="${photos[1].url}" width="300" alt="${photos[1].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
                  `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
              </td>
              <td width="50%">
                ${photos[2]?.url ? `<img src="${photos[2].url}" width="300" alt="${photos[2].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
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
  <td align="center">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td width="50%">
          ${photos[0]?.url ? `<img src="${photos[0].url}" width="300" alt="${photos[0].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
            `<div style="width:100%;padding-top:133%;background:#E5E5E5;"></div>`}
        </td>
        <td width="50%">
          ${photos[1]?.url ? `<img src="${photos[1].url}" width="300" alt="${photos[1].alt || ''}" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover;"/>` :
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
  <td align="center">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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
      <td style="padding:16px;background-color:#F4F4F4;font-family:'JetBrains Mono',monospace;font-size:14px;">
        ${hasDate ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Datum →</span> <span style="color:#666;">${date}</span></div>` : ''}
        ${hasAuthor ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Autor →</span> <span style="color:#666;">${author}</span></div>` : ''}
        ${hasTags ? `<div style="margin-bottom:4px;"><span style="font-weight:500;">Tag →</span> <span style="color:#666;text-decoration:underline;">${tags.filter((t: any) => t.text && t.text.trim() !== '').map((t: any) => t.text).join(', ')}</span></div>` : ''}
        ${hasShares ? `<div><span style="font-weight:500;">Sdílet →</span> <span style="color:#666;text-decoration:underline;">${validShareLinks.map((s: any) => s.text).join(', ')}</span></div>` : ''}
      </td>
    </tr>
  ` : '';

  return `<!-- Článek -->
<tr>
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>
        <td style="font-family:'JetBrains Mono',monospace;">
          <h1 style="margin:0 0 24px 0;font-size:32px;font-weight:700;line-height:1.2;color:#212121;">
            ${content.title || 'OPA: Jemná evoluce moderních ale'}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:32px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:120%;color:#212121;">
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

  const benefitCells = benefits.slice(0, 4).map((b: any) => `
    <td valign="top" style="padding:0 8px;text-align:center;font-family:'JetBrains Mono',monospace;">
      <div style="margin-bottom:1rem;">
        ${b.icon ? `<img src="${b.icon}" width="48" height="48" alt="${b.title}" style="display:inline-block;width:48px;height:48px;object-fit:contain;"/>` :
          `<div style="width:48px;height:48px;margin:0 auto;border:1px dashed #CCC;"></div>`}
      </div>
      <h4 style="margin:0 0 12px 0;font-size:16px;font-weight:700;color:#000000;line-height:120%;">${b.title}</h4>
      <p style="margin:0;font-size:12px;font-weight:400;color:#000000;line-height:120%;">${b.description}</p>
    </td>
  `).join('');

  return `<!-- Benefity -->
<tr>
  <td align="center" style="padding:32px 24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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

  const catCells = categories.slice(0, 4).map((c: any) => `
    <td valign="top" style="padding:0 6px;">
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
  `).join('');

  const viewAllHTML = showViewAll ? `
    <a href="${viewAllUrl}" style="color:#000000;font-family:'JetBrains Mono',monospace;font-size:14px;text-decoration:none;">
      <span style="text-decoration:none;">→ </span><span style="text-decoration:underline;">${viewAllText}</span>
    </a>
  ` : '';

  return `<!-- Kategorie -->
<tr>
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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

  const positionCells = positions.slice(0, 3).map((p: any) => {
    const isDark = isColorDark(p.bgColor || '#F4F4F4');
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const borderColor = isDark ? '#FFFFFF' : '#212121';

    return `
    <td valign="top" style="padding:0 6px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:${p.bgColor || '#F4F4F4'};">
        <tr>
          <td style="padding:16px;font-family:'JetBrains Mono',monospace;">
            <h4 style="margin:0 0 12px 0;font-size:16px;font-weight:700;color:${textColor};">${p.title}</h4>
            <p style="margin:0 0 1rem 0;font-size:12px;color:${textColor};">${p.description}</p>
            <a href="${p.buttonUrl || '#'}" style="display:inline-flex;align-items:center;padding:12px 24px;border:1px solid ${borderColor};color:${textColor};font-size:12px;text-decoration:none;width:auto;">
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
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="400" style="max-width:400px;">
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
  <td align="center" style="padding:24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
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
    
    /* Responsive */
    @media only screen and (max-width: 620px) {
      table[class="wrap"] {
        width: 100% !important;
      }
      td[class="stack"] {
        display: block !important;
        width: 100% !important;
      }
    }
  `;
}
