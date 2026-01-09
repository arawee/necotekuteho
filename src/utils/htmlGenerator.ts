import { NewsletterBlock } from '@/types/newsletter';

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
      case 'mista':
        return generateLocationsHTML(block);
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
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="background-color:#00D954;padding:48px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td align="center">
            ${svgContent ? svgContent : `
            <h1 style="margin:0;font-size:48px;font-weight:900;font-style:italic;color:#212121;font-family:'Space Grotesk',Arial,sans-serif;letter-spacing:-1px;">
              ZICHOVEC
            </h1>`}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateZichovecFooterHTML(block: NewsletterBlock): string {
  const { content } = block;
  
  return `<!-- Patička ZICHOVEC -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #E5E5E5;">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <!-- Kontakt -->
          <td valign="top" width="25%" style="padding:0 16px 24px 0;font-family:Arial,sans-serif;font-size:12px;color:#212121;">
            <p style="margin:0 0 16px 0;font-family:monospace;">${content.footerText || '+420 602 555 555'}</p>
            <p style="margin:0 0 24px 0;"><a href="mailto:e-shop@pivovarzichovec.cz" style="color:#212121;text-decoration:underline;">e-shop@pivovarzichovec.cz</a></p>
            <p style="margin:0;">
              <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Facebook</a>
              <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Instagram</a>
              <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Youtube</a>
              <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">X</a>
              <a href="#" style="color:#212121;text-decoration:underline;display:block;">LinkedIn</a>
            </p>
          </td>
          <!-- Užitečné -->
          <td valign="top" width="25%" style="padding:0 16px 24px 0;font-family:Arial,sans-serif;font-size:12px;color:#212121;">
            <h4 style="margin:0 0 16px 0;font-weight:600;">Užitečné</h4>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Doprava</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Platba</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Reklamace</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Ochrana osobních údajů</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;">Cookies</a>
          </td>
          <!-- ZICHOVEC -->
          <td valign="top" width="25%" style="padding:0 16px 24px 0;font-family:Arial,sans-serif;font-size:12px;color:#212121;">
            <h4 style="margin:0 0 16px 0;font-weight:600;">ZICHOVEC</h4>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">O nás</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Chci na čepu</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Eventy</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Merch</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Blog</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;">Kontakt</a>
          </td>
          <!-- E-shop -->
          <td valign="top" width="25%" style="padding:0 0 24px 0;font-family:Arial,sans-serif;font-size:12px;color:#212121;">
            <h4 style="margin:0 0 16px 0;font-weight:600;">E-shop</h4>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">E-shop</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Limitky a Novinky</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;margin-bottom:4px;">Dárky a Balíčky</a>
            <a href="#" style="color:#212121;text-decoration:underline;display:block;">Zachraň pivo</a>
          </td>
        </tr>
      </table>
      <!-- Copyright -->
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;border-top:1px solid #E5E5E5;">
        <tr>
          <td style="padding:16px 0;font-family:Arial,sans-serif;font-size:10px;color:#212121;">
            ${content.copyright || 'Copyright © 2025 Pivovar ZICHOVEC. Všechna práva vyhrazena.'}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateProductListHTML(block: NewsletterBlock): string {
  const { content } = block;
  const products = Array.isArray(content.products) ? content.products : [
    { name: 'OPA 12°', price: '69 Kč', image: '' },
    { name: 'IPA 14°', price: '79 Kč', image: '' },
    { name: 'APA 11°', price: '59 Kč', image: '' }
  ];

  const productCards = products.map(p => `
    <td valign="top" width="33%" style="padding:8px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background:#F5F5F5;border-radius:16px;">
        <tr>
          <td style="padding:16px;text-align:center;">
            ${p.image ? `<img src="${p.image}" width="120" height="180" alt="${p.name}" style="display:block;margin:0 auto 16px;border:0;"/>` : 
              `<div style="width:120px;height:180px;background:#E0E0E0;border-radius:8px;margin:0 auto 16px;"></div>`}
            <h4 style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:14px;color:#212121;">${p.name}</h4>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#666;">${p.price}</p>
          </td>
        </tr>
      </table>
    </td>
  `).join('');

  return `<!-- List produktů -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td style="padding-bottom:24px;">
            <h2 style="margin:0;font-family:Arial,sans-serif;font-size:24px;color:#212121;">${content.title || 'Mohlo by vám chutnat'}</h2>
          </td>
        </tr>
        <tr>
          ${productCards}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateLocationsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const locations = Array.isArray(content.locations) ? content.locations : [
    { name: 'Pivovar ZICHOVEC', address: 'Litoměřice' },
    { name: 'Hospoda U Zichovce', address: 'Praha' },
    { name: 'Beer Point', address: 'Brno' }
  ];

  const locationRows = locations.map(loc => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;font-family:Arial,sans-serif;font-size:14px;">
        <strong style="color:#212121;">${loc.name}</strong>
        <span style="color:#666;margin-left:8px;">${loc.address}</span>
      </td>
    </tr>
  `).join('');

  return `<!-- Lokace -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td style="padding-bottom:24px;">
            <h2 style="margin:0;font-family:Arial,sans-serif;font-size:24px;color:#212121;">${content.title || 'Kde nás ochutnáte?'}</h2>
          </td>
        </tr>
        ${locationRows}
      </table>
    </td>
  </tr>
</table>`;
}

function generateBlogPostsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const posts = Array.isArray(content.posts) ? content.posts : [
    { title: 'Nová limitka je tady!', date: '28. května 2025', image: '' },
    { title: 'Jak správně čepovat pivo', date: '25. května 2025', image: '' }
  ];

  const postCards = posts.map(post => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #E5E5E5;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
          <tr>
            <td width="100" valign="top">
              ${post.image ? `<img src="${post.image}" width="80" height="80" alt="" style="border-radius:8px;border:0;"/>` :
                `<div style="width:80px;height:80px;background:#F5F5F5;border-radius:8px;"></div>`}
            </td>
            <td valign="top" style="padding-left:16px;font-family:Arial,sans-serif;">
              <h4 style="margin:0 0 8px 0;font-size:16px;color:#212121;">${post.title}</h4>
              <p style="margin:0;font-size:12px;color:#666;">${post.date}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `<!-- Blog posty -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td style="padding-bottom:16px;">
            <h2 style="margin:0;font-family:Arial,sans-serif;font-size:24px;color:#212121;">${content.title || 'Novinky od ZICHOVCE'}</h2>
          </td>
        </tr>
        ${postCards}
      </table>
    </td>
  </tr>
</table>`;
}

function generatePromoBoxHTML(block: NewsletterBlock): string {
  const { content } = block;
  const boxes = Array.isArray(content.boxes) ? content.boxes : [
    { title: 'Limitovaná edice', subtitle: 'Pouze tento týden', color: '#00D954' },
    { title: 'Dárkové balení', subtitle: 'Ideální dárek', color: '#212121' }
  ];

  const boxCards = boxes.map(box => `
    <td valign="top" width="50%" style="padding:8px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background:${box.color || '#00D954'};border-radius:16px;">
        <tr>
          <td style="padding:32px 24px;">
            <h3 style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:20px;color:${box.color === '#212121' ? '#FFFFFF' : '#212121'};">${box.title}</h3>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:${box.color === '#212121' ? '#CCCCCC' : '#333333'};">${box.subtitle}</p>
          </td>
        </tr>
      </table>
    </td>
  `).join('');

  return `<!-- Promo boxy -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          ${boxCards}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateGalleryTrioHTML(block: NewsletterBlock): string {
  const { content } = block;
  const photos = Array.isArray(content.photos) ? content.photos.slice(0, 3) : [];

  const photoPlaceholder = `<div style="width:100%;height:180px;background:#F5F5F5;border-radius:12px;"></div>`;
  
  const photoCards = [0, 1, 2].map(i => {
    const photo = photos[i];
    return `
    <td valign="top" width="33%" style="padding:4px;">
      ${photo?.url ? `<img src="${photo.url}" width="180" height="180" alt="${photo.alt || ''}" style="display:block;width:100%;height:auto;border-radius:12px;border:0;"/>` : photoPlaceholder}
    </td>`;
  }).join('');

  return `<!-- Galerie trio -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:16px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          ${photoCards}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateGalleryDuoHTML(block: NewsletterBlock): string {
  const { content } = block;
  const photos = Array.isArray(content.photos) ? content.photos.slice(0, 2) : [];

  const photoPlaceholder = `<div style="width:100%;height:250px;background:#F5F5F5;border-radius:16px;"></div>`;
  
  const photoCards = [0, 1].map(i => {
    const photo = photos[i];
    return `
    <td valign="top" width="50%" style="padding:8px;">
      ${photo?.url ? `<img src="${photo.url}" width="280" height="250" alt="${photo.alt || ''}" style="display:block;width:100%;height:auto;border-radius:16px;border:0;"/>` : photoPlaceholder}
    </td>`;
  }).join('');

  return `<!-- Galerie duo -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:16px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          ${photoCards}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateArticleTextHTML(block: NewsletterBlock): string {
  const { content } = block;

  return `<!-- Článek -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <!-- Titulek -->
        <tr>
          <td style="padding-bottom:24px;">
            <h1 style="margin:0;font-family:Arial,sans-serif;font-size:32px;font-weight:400;line-height:1.2;color:#212121;">
              ${content.title || 'OPA: Jemná evoluce moderních ale'}
            </h1>
          </td>
        </tr>
        <!-- Text -->
        <tr>
          <td style="padding-bottom:24px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#212121;">
            ${content.text || 'OPA, tedy Oat Pale Ale, představuje moderní variaci na klasické světlé styly, která si díky své hladké textury a vysoké přístupnosti získává stále větší pozornost mezi pivovary i konzumenty.'}
          </td>
        </tr>
        <!-- Citát -->
        ${content.quote ? `
        <tr>
          <td style="padding:16px 0 24px 24px;border-left:4px solid #212121;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:18px;font-style:italic;line-height:1.4;color:#212121;">
              ${content.quote}
            </p>
          </td>
        </tr>` : ''}
        <!-- Metadata -->
        <tr>
          <td style="padding-top:16px;border-top:1px solid #E5E5E5;font-family:Arial,sans-serif;font-size:12px;color:#212121;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:4px 0;"><strong>Datum →</strong> <span style="color:#666;">${(content as any).date || '28. května 2025'}</span></td>
              </tr>
              <tr>
                <td style="padding:4px 0;"><strong>Autor →</strong> <span style="color:#666;">${content.subtitle || 'Petr Novák'}</span></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateBenefitsHTML(block: NewsletterBlock): string {
  const benefits = block.content.benefits || [];
  const benefitCells = benefits.map(b => `
    <td valign="top" width="25%" style="padding:8px;text-align:center;font-family:Arial,sans-serif;">
      <div style="font-size:24px;color:#00D954;margin-bottom:8px;">${b.icon}</div>
      <h4 style="margin:0 0 8px;font-size:14px;color:#212121;">${b.title}</h4>
      <p style="margin:0;font-size:11px;color:#666;font-style:italic;">${b.description}</p>
    </td>
  `).join('');

  return `<!-- Benefity -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr><td align="center" style="padding:32px 24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr>${benefitCells}</tr>
    </table>
  </td></tr>
</table>`;
}

function generateCategoriesHTML(block: NewsletterBlock): string {
  const categories = block.content.categories || [];
  const catCells = categories.slice(0, 4).map(c => `
    <td valign="top" width="25%" style="padding:8px;">
      ${c.image ? `<img src="${c.image}" width="140" height="180" style="border-radius:8px;display:block;margin-bottom:8px;"/>` : 
        `<div style="width:140px;height:180px;background:#F5F5F5;border-radius:8px;margin-bottom:8px;"></div>`}
      <span style="display:inline-block;background:#212121;color:#FFF;font-size:10px;padding:4px 8px;border-radius:4px;">${c.tag}</span>
    </td>
  `).join('');

  return `<!-- Kategorie -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr><td align="center" style="padding:32px 24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr><td style="padding-bottom:16px;"><h2 style="margin:0;font-family:Arial,sans-serif;font-size:20px;color:#212121;">${block.content.title || 'Vyber si to pravé pro tebe'}</h2></td></tr>
      <tr>${catCells}</tr>
    </table>
  </td></tr>
</table>`;
}

function generatePoziceHTML(block: NewsletterBlock): string {
  const positions = (block.content as any).positions || [];
  const positionCells = positions.slice(0, 4).map((p: any) => `
    <td valign="top" width="25%" style="padding:8px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="background:${p.bgColor || '#FFFFFF'};border-radius:8px;">
        <tr>
          <td style="padding:16px;font-family:Arial,sans-serif;">
            <h4 style="margin:0 0 8px;font-size:14px;color:#212121;">${p.title}</h4>
            <p style="margin:0 0 12px;font-size:11px;color:#666;line-height:1.4;">${p.description}</p>
            <a href="${p.buttonUrl || '#'}" style="font-size:11px;color:#212121;text-decoration:underline;">${p.buttonText}</a>
          </td>
        </tr>
      </table>
    </td>
  `).join('');

  return `<!-- Pozice -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr><td align="center" style="padding:32px 24px;">
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
      <tr><td style="padding-bottom:16px;"><h2 style="margin:0;font-family:Arial,sans-serif;font-size:20px;color:#212121;">${block.content.title || 'Volné pozice'}</h2></td></tr>
      <tr>${positionCells}</tr>
    </table>
  </td></tr>
</table>`;
}

function generateProductTextHTML(block: NewsletterBlock): string {
  const { content } = block;
  
  return `<!-- Produkt + text -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="400" style="max-width:400px;">
        <tr>
          <td style="text-align:center;">
            ${content.image ? `<img src="${content.image}" width="300" height="400" alt="${content.title || ''}" style="display:block;margin:0 auto 24px;border:0;"/>` :
              `<div style="width:300px;height:400px;background:#F5F5F5;margin:0 auto 24px;"></div>`}
          </td>
        </tr>
        <tr>
          <td>
            <h2 style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:24px;color:#212121;">${content.title || 'Magop'}</h2>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#212121;">${content.text || ''}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateGallerySingleHTML(block: NewsletterBlock): string {
  const photo = block.content.photos?.[0];
  
  return `<!-- Galerie single -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:16px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td>
            ${photo?.url ? `<img src="${photo.url}" width="600" height="340" alt="${photo.alt || ''}" style="display:block;width:100%;height:auto;border-radius:16px;border:0;"/>` :
              `<div style="width:100%;height:340px;background:#F5F5F5;border-radius:16px;"></div>`}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateTextTwoColumnsHTML(block: NewsletterBlock): string {
  const { content } = block;
  
  return `<!-- Text two columns -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center" style="padding:32px 24px;">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="max-width:600px;">
        <tr>
          <td valign="top" width="100" style="font-family:Arial,sans-serif;font-size:14px;font-weight:500;color:#212121;">
            ${content.leftColumn || 'Slovníček'}
          </td>
          <td valign="top" style="padding-left:24px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#212121;">
            ${content.rightColumn || ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
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
      font-family: Arial, Helvetica, sans-serif;
      color: #212121;
      line-height: 1.5;
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
