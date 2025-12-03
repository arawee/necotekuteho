import { NewsletterBlock } from '@/types/newsletter';

export function generateHTMLFromBlocks(blocks: NewsletterBlock[]): string {
  const blockHTML = blocks.map(block => {
    switch (block.type) {
      case 'header-content':
        return generateHeaderContentHTML(block);
      case 'intro-block':
        return generateIntroBlockHTML(block);
      case 'thanks-block':
        return generateThanksBlockHTML(block);
      case 'promo-block':
        return generatePromoBlockHTML(block);
      case 'benefits-offset':
        return generateBenefitsOffsetHTML(block);
      case 'reviews-offset':
        return generateReviewsOffsetHTML(block);
      case 'events':
        return generateEventsHTML(block);
      case 'harmonogram':
        return generateHarmonogramHTML(block);
      case 'event':
        return generateEventHTML(block);
      case 'photos':
        return generatePhotosHTML(block);
      case 'summary':
        return generateSummaryHTML(block);
      case 'quote':
        return generateQuoteHTML(block);
      case 'footer':
        return generateFooterHTML(block);
      case 'promo-wide':
        return generatePromoWideHTML(block);
      case 'single-photo':
        return generateSinglePhotoHTML(block);
      case 'single-photo-square':
        return generateSinglePhotoSquareHTML(block);
      case 'text-content':
        return generateTextContentHTML(block);
      case 'plain-text':
        return generatePlainTextHTML(block);
      default:
        return '';
    }
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
    <style type="text/css">
        ${getNewsletterCSS()}
    </style>
</head>
<body class="newsletter-email">
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" background='#FFFFFF'>
${blockHTML}
</table>
</body>
</html>`;
}
function generateIntroBlockHTML(block: NewsletterBlock): string {
  const { content } = block;

  const buttonsHTML = content.buttons?.filter(btn => btn).map(button =>
    `<a class="btn${button.variant === 'secondary' ? ' btn--yellow' : ''}" href="${button.url}" style="cursor:pointer;">${button.text}</a>`
  ).join('</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t') || '';

  const HERO_URL = content.image || 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png';

  // Inner content width is 600 with 24px side padding → 552px available.
  // Make the banner a perfect square: 552 × 552.
  const SQUARE = 600;

  return `<!-- Úvod -->
\t\t<table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" background='#ffffff' style='margin-top: 3rem'>
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<td align="center">
\t\t\t\t\t\t<div style="margin:0 auto; max-width:600px;">
\t\t\t\t\t\t\t<!-- [if mso]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td><![endif]-->
\t\t\t\t\t\t\t<table class="wrap" style="max-width:600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
\t\t\t\t\t\t\t\t<tbody>

                  <!-- HERO (square, no overlay/logo, Atlas-safe) -->
                  <tr>
                    <td class="header-banner">
                      <!--[if gte mso 9]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f" style="width:${SQUARE}px;height:${SQUARE}px;background-size:cover;background-position:center;">
                        <v:fill type="frame" src="${HERO_URL}" />
                        <v:textbox inset="0,0,0,0">&nbsp;</v:textbox>
                      </v:roundrect>
                      <![endif]-->

                      <!--[if !mso]><!-- -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:32px; overflow:hidden;background-size:cover;background-position:center;">
                        <tr>
                          <td align="center" valign="middle" style="border-radius:32px; overflow:hidden;">
							  <!--[if gte mso 9]>
							  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f" 
							      style="width:${SQUARE}px;height:${SQUARE}px;">
							    <v:fill type="frame" src="${HERO_URL}" />
							    <v:textbox inset="0,0,0,0">&nbsp;</v:textbox>
							  </v:roundrect>
							  <![endif]-->
							
							  <!--[if !mso]><!-- -->
							  <img src="${HERO_URL}" width="${SQUARE}" height="${SQUARE}" alt="" 
							       style="display:block; width:100%; max-width:${SQUARE}px; height:auto; border-radius:32px;" />
							  <!--<![endif]-->
							</td>
                        </tr>
                      </table>
                      <!--<![endif]-->
                    </td>
                  </tr>

\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t<td class="podekovani-td" align="left">
\t\t\t\t\t\t\t\t\t\t\t<h1 class="souhrn-h1">${content.title || 'Dynamický styl jógy. Rychlejší tempo, síla, splynutí s dechem'}</h1>
\t\t\t\t\t\t\t\t\t\t\t${(() => {
                        const hasActualContent = (str) => str && str.replace(/<[^>]*>/g, '').trim().length > 0;
                        const parts = [];
                        if (hasActualContent(content.greeting)) parts.push(`<strong>${content.greeting.trim()}</strong>`);
                        if (hasActualContent(content.text)) parts.push(content.text.trim());
                        return parts.length > 0 ? `<div class="souhrn-pair" style='color:#393939 !important;'>${parts.join('<br><br>')}</div>` : '';
                      })()}
\t\t\t\t\t\t\t\t\t\t\t<div class="souhrn-buttons">
\t\t\t\t\t\t\t\t\t\t\t\t<table role="presentation" border="0" cellspacing="0" cellpadding="0">
\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${buttonsHTML}
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t</tr>

\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t<!-- [if mso]></td></tr></table><![endif]-->
\t\t\t\t\t\t</div>
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>`;
}
function generateHeaderContentHTML(block: NewsletterBlock): string {
  const { content } = block;

  const HERO = content.image || 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png';
  const HEIGHT = 276; // 2:1 hero

  const buttonsHTML =
    content.buttons?.map(button =>
      `<a class="btn${button.variant === 'secondary' ? ' btn--yellow' : ''}" href="${button.url}" style="cursor:pointer;">${button.text}</a>`
    ).join('</td>\n\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t') || '';

  return `<!-- Header content -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="margin-top:48px;">
  <tr>
    <td align="center">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="width:100%;max-width:600px;">
        <!-- HERO image -->
        <tr>
          <td style="padding:0;">
            <div style="border-radius:32px; overflow:hidden;">
              <img src="${HERO}" width="600" height="${HEIGHT}" alt="" style="display:block;width:100%;height:auto;border:0;outline:none;text-decoration:none;">
            </div>
          </td>
        </tr>

        <!-- Copy + buttons -->
        <tr>
          <td align="left" style="padding:48px 24px;color:#393939;font-family:Arial,Helvetica,sans-serif;">
            <h1 style="margin:0 0 32px 0;font-size:48px;line-height:120%;letter-spacing:-1px;font-weight:400;color:#393939;">
              ${content.title || 'Informace k lekcím'}
            </h1>
            <p style="margin:0;font-size:16px;line-height:150%;color:#393939;">
              <span style="font-size:12px;letter-spacing:0.125px;color:#393939;">${content.subheading || 'O nás'}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>${content.text || 'YOGA MOVEMENT, studio inspirované boutiqovými studii v Jihovýchodní Asii, jsme vytvořili pro všechny, kteří hledají prostor pro svou jógovou praxi, ať už s ní začínají nebo ji chtějí posunout dál.'}</span>
            </p>
            ${buttonsHTML ? `
            <div class="souhrn-buttons" style="margin-top:24px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr><td>${buttonsHTML}</td></tr>
              </table>
            </div>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateThanksBlockHTML(block: NewsletterBlock): string {
  const { content } = block;

  const buttonsHTML = content.buttons?.filter(btn => btn).map(button =>
    `<a class="btn${button.variant === 'secondary' ? ' btn--yellow' : ''}" href="${button.url}" style="cursor:pointer;">${button.text}</a>`
  ).join('</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t') || '';

  const IMG_URL = content.image || '';
  const BLOCK_HEIGHT = 300; // 2:1 ratio at 600px width

  return `<!-- Poděkování -->
<table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="margin-top:48px;">
  <tr>
    <td align="center">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="width:100%;max-width:600px;">
        <!-- HERO image -->
        <tr>
          <td style="padding:0;">
            <div style="border-radius:32px; overflow:hidden;">
              <img src="${IMG_URL}" width="600" height="${BLOCK_HEIGHT}" alt="" style="display:block;width:100%;height:auto;border:0;outline:none;text-decoration:none;">
            </div>
          </td>
        </tr>

        <!-- Copy + buttons -->
        <tr>
          <td style="padding:48px 24px;" align="left">
            <h1 class="souhrn-h1" style="margin:0 0 16px 0;">${content.title || 'Děkujeme za přihlášení!'}</h1>
            <div class="souhrn-pair" style="margin:0 0 24px 0;">
              ${content.greeting ? `<strong>${content.greeting}</strong><br><br>` : ''}${content.text || ''}
            </div>
            ${buttonsHTML ? `
            <div class="souhrn-buttons">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr><td>${buttonsHTML}</td></tr>
              </table>
            </div>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generatePromoBlockHTML(block: NewsletterBlock): string {
  const { content } = block;
  const WIDTH  = 552;
  const HEIGHT = 780;
  const BG     = content.backgroundImage || 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png';
  const SPACER = 560;

  return `<!-- PROMO block -->
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:48px;margin-bottom:48px;">
  <tr>
    <td align="center">
      <div style="max-width:600px;margin:0 auto;border-radius:24px;overflow:hidden;">
        <!--[if gte mso 9]>
        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="f" style="width:${WIDTH}px;height:${HEIGHT}px;">
          <v:fill type="frame" src="${BG}" />
          <v:textbox inset="0,0,0,0">
            <table role="presentation" width="100%" height="${HEIGHT}" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="left" style="vertical-align:top;padding:32px 0 0 24px;font-family:Arial,Helvetica,sans-serif;color:#393939;">
                  <h4 style="margin:0 0 8px 0;color:#393939;">${content.date || '4.—6. 4. 2025'}</h4>
                  <p style="margin:0;font-weight:400;color:#393939;">${content.location || 'Vila šťastná Samota,<br/>Vrchotovy Janovice'}</p>
                </td>
              </tr>
              <tr><td style="height:${SPACER}px;line-height:${SPACER}px;font-size:1px;"><span style="display:block">&nbsp;</span></td></tr>
              <tr>
                <td style="padding:0 24px 32px 24px;vertical-align:bottom;">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr valign="bottom">
                      <td align="left" style="font-family:Arial,Helvetica,sans-serif;color:#393939;">
                        <h4 style="margin:0 0 8px 0;color:#393939;">${content.subtitle || 'The Art of Stillness'}</h4>
                        <h2 style="margin:0;margin-right:1rem;">${content.title || 'Yoga Movement<br/>Retreat'}</h2>
                      </td>
                      <td align="right" width="1%" style="white-space:nowrap;">
                        <a href="${content.url || '#'}" style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#FFFFFF;text-decoration:none;line-height:48px;text-align:center;font-size:18px;color:#393939;">↗</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </v:textbox>
        </v:rect>
        <![endif]-->

        <!--[if !mso]><!-- -->
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width:600px;border-radius:32px;overflow:hidden;">
          <tr>
            <!-- Image only via HTML background attribute -->
            <td background="${BG}" height="${HEIGHT}" style="border-radius:32px;background-position:center;background-repeat:no-repeat;background-size:cover;">
              <table role="presentation" width="100%" height="${HEIGHT}" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:top;padding:32px 0 0 24px;font-family:Arial,Helvetica,sans-serif;color:#393939;">
                    <h4 style="margin:0 0 8px 0;color:#393939;">${content.date || '4.—6. 4. 2025'}</h4>
                    <p style="margin:0;font-weight:400;color:#393939;">${content.location || 'Vila šťastná Samota,<br/>Vrchotovy Janovice'}</p>
                  </td>
                </tr>
                <!-- fixed spacer respected by Seznam/Atlas -->
                <tr><td style="height:${SPACER}px;line-height:${SPACER}px;font-size:1px;"><span style="display:block">&nbsp;</span></td></tr>
                <tr>
                  <td style="padding:0 24px 32px 24px;vertical-align:bottom;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr valign="bottom">
                        <td align="left" style="font-family:Arial,Helvetica,sans-serif;color:#393939;">
                          <h4 style="margin:0 0 8px 0;color:#393939;">${content.subtitle || 'The Art of Stillness'}</h4>
                          <h2 style="margin:0;margin-right:1rem;">${content.title || 'Yoga Movement<br/>Retreat'}</h2>
                        </td>
                        <td align="right" width="1%" style="white-space:nowrap;">
                          <a href="${content.url || '#'}" style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#FFFFFF;text-decoration:none;line-height:48px;text-align:center;font-size:18px;color:#393939;">↗</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--<![endif]-->
      </div>
    </td>
  </tr>
</table>`;
}

function generateBenefitsOffsetHTML(block: NewsletterBlock): string {
  const { content } = block;
  const benefits = Array.isArray(content.benefits) ? content.benefits : [];

  // Small 33×33 fallbacks (your existing PNGs)
  const ICON1 = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757910702480-p8w1tijvgl9.png?width=33&height=33&quality=100&format=png";
  const ICON2 = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757910705125-vyw6mo31d4.png?width=33&height=33&quality=100&format=png";

  const getIconUrl = (b: any, idx: number) => {
    // Prefer PNG that the editor saved; otherwise allow an existing PNG in `icon`,
    // finally use a stable placeholder.
    return (typeof b?.iconUrl === 'string' && b.iconUrl) ||
           (typeof b?.icon === 'string' && b.icon) ||
           (idx % 2 === 0 ? ICON1 : ICON2);
  };

  const card = (b: any, idx: number) => `
    <div style="border-radius:32px;overflow:hidden;padding:0;background-color:#F8F3EE;width:100%;position:relative;">
      <img src="${getIconUrl(b, idx)}" width="33" height="33" alt=""
           style="display:block;margin:24px;border:0;outline:none;text-decoration:none;width:33px;height:33px;" />
      <h3 style="margin:0.75rem 24px;margin-bottom:-1rem;">${b?.title ?? ''}</h3>
      <p style="margin:24px 24px 48px 24px;font-size:12px;line-height:125%;color:#393939;font-weight:bold;">
        <span class="subheading" style="line-height:150%;">${b?.description ?? ''}</span>
      </p>
    </div>
  `;

  return `<!-- Benefity offset -->
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:3rem;margin-bottom:3rem;">
  <tr>
    <td align="center">
      <div style="margin:0 auto;max-width:600px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="600">
          <tr valign="top">
        <![endif]-->

        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="photos-wrap" style="max-width:600px;">
          <tr><td style="width:100%;">
            <h1 class="souhrn-h1" style="text-align:left;padding-left:1.5rem;padding-right:1.5rem;">
              ${content.title || 'Na co se můžete těšit.'}
            </h1>
          </td></tr>
        </table>

        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr valign="top">
            <!-- LEFT 50% -->
            <td width="50%" class="photos-col" style="width:50%;vertical-align:top;padding:0;">
              ${card(benefits[0], 0)}
              ${card(benefits[2], 2)}
            </td>

            <!-- RIGHT 50% -->
            <td width="50%" class="photos-col" style="width:50%;vertical-align:top;padding:0 0 0 0;">
			  <div class="spacer" style="height: 50%;width: 100%; height: 7rem;"></div>
              ${card(benefits[1], 1)}
              ${card(benefits[3], 3)}
            </td>
          </tr>
        </table>

        <!--[if mso]>
          </tr>
        </table>
        <![endif]-->
      </div>
    </td>
  </tr>
</table>`;
}


function generateReviewsOffsetHTML(block: NewsletterBlock): string {
  const { content } = block;
  const reviews = content.reviews || [];
  
  return `		<!-- Recenze offset -->
		<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top: 3rem; margin-bottom: 3rem;">
		<tr>
			<td align="center">
			<div style="margin:0 auto; max-width:600px;">
				<!--[if mso]>
				<table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="600">
				<tr valign="top">
				<![endif]-->

				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="photos-wrap" style="max-width:600px;">
				<tr><td style="width: 100%;">
                    <h1 class="souhrn-h1" style="text-align: left; padding-left: 1.5rem; padding-right: 1.5rem;">${content.title || 'Co o nás říkají klienti. Opravdu.'}</h1>
					</td></tr></table><table cellspacing="0" border="0" cellpadding="0" ><tr>
					<!-- LEFT column -->
					<td width="50%" class="photos-col" style="width:50%;align-items: start;vertical-align: top;">
					${reviews.slice(0, 2).map(review => `
					<div style="border-radius:32px;overflow:hidden;padding: 0;background-color: #F4F4F4;width:100%;position: relative;">
						<h4 style="margin: 24px 32px; padding-bottom: 4rem;">${review.text || ''}</h4>
						<p style="margin: 24px 32px;font-size: 12px;line-height: 125%;color: #393939;font-weight: bold;">
							<span class="subheading" style="font-size: 14px !important;">${review.author || ''}</span><br>
							${review.position || ''}
						</p>
					</div>`).join('')}
					</td>

					<!-- RIGHT column -->
					<td width="50%" class="photos-col" style="width:50%;">
						<div class="spacer" style="height: 50%;width: 100%; height: 7rem;"></div>
					${reviews.slice(2, 4).map(review => `
					<div style="border-radius:32px;overflow:hidden;padding: 0;background-color: #F4F4F4;width:100%;position: relative;">
						<h4 style="margin: 24px 32px; padding-bottom: 4rem;">${review.text || ''}</h4>
						<p style="margin: 24px 32px;font-size: 12px;line-height: 125%;color: #393939;font-weight: bold;">
							<span class="subheading" style="font-size: 14px !important;">${review.author || ''}</span><br>
							${review.position || ''}
						</p>
					</div>`).join('')}
					</td>
				</tr>
				</table>

				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
			</div>
			</td>
		</tr>
		</table>`;
}
function generateEventsHTML(block: NewsletterBlock): string {
  const { content } = block;
  const IMG =
    content.image ||
    "https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png";

  const eventsHTML =
    content.events
      ?.map(
        (event) => `
      <!-- one event row -->
      <table role="presentation" class="stack" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom:2rem;">
        <tr>
          <!-- TEXT (fluid) -->
          <td class="text-cell" valign="top" width="100%" style="width:100%;padding-right:16px;">
            <h4>${event.date}</h4>
            <h2>${event.title}</h2>
            <p class="souhrn-pair fotka" style="margin:0 !important;">
              <span class="subheading">${event.instructor}</span>
            </p>
          </td>

          <!-- CTA -->
          <td class="btn-cell" valign="bottom" align="right" width="164" style="width:164px;white-space:nowrap;">
            <table role="presentation" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <a class="btn btn--yellow" href="${event.buttonUrl}">${event.buttonText}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
      )
      .join("") || "";

  const BOX_W = 600,
    BOX_H = 300; // 2:1 hero

  return `<!-- Events -->
  <table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="margin:0 auto; max-width:600px; margin-top:3rem;">
          <table class="wrap" style="max-width:600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td style="padding:0;">
                <!-- rounded mask + TD background (Seznam/Atlas safe) -->
                <div style="border-radius:32px; overflow:hidden;">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td background="${IMG}" height="${BOX_H}"
                          style="width:${BOX_W}px; height:${BOX_H}px; line-height:0; font-size:0; border-radius:32px; background-position:center; background-size:cover; background-color:#ffffff;">
                        <!--[if gte mso 9]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f"
                                       style="width:${BOX_W}px;height:${BOX_H}px;">
                            <v:fill type="frame" src="${IMG}" color="#ffffff" />
                            <v:textbox inset="0,0,0,0"><div></div></v:textbox>
                          </v:roundrect>
                        <![endif]-->
                        <!--[if !mso]><!-- -->
                          <div style="height:${BOX_H}px; min-height:${BOX_H}px;">&nbsp;</div>
                        <!--<![endif]-->
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td class="events-td" align="left" style="padding:48px 24px;">
                <h1 class="souhrn-h1">${content.title || "Nejbližší akce"}</h1>
                ${eventsHTML}
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>`;
}


function generateHarmonogramHTML(block: NewsletterBlock): string {
  const { content } = block;

  const eventsHTML =
    content.events
      ?.map(
        (event) => `
      <!-- one event row -->
      <table role="presentation" class="stack" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom:2rem;">
        <tr>
          <td class="text-cell" valign="top" width="100%" style="width:100%;">
            <h4>${event.date}</h4>
            <h2>${event.title}</h2>
            <p class="souhrn-pair fotka" style="margin:0 !important;">
              <span class="subheading">${event.instructor}</span>
            </p>
          </td>
        </tr>
      </table>
    `
      )
      .join("") || "";

  return `<!-- Harmonogram -->
  <table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="margin:0 auto; max-width:600px; margin-top:3rem;">
          <table class="wrap" style="max-width:600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td class="events-td" align="left" style="padding:48px 24px; background-color:#ffffff; border-radius:32px;">
                <h1 class="souhrn-h1">${content.title || "Harmonogram"}</h1>
                ${eventsHTML}
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>`;
}

function generateEventHTML(block: NewsletterBlock): string {
  const { content } = block;
  const IMG = content.image || 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png';

  const buttonsHTML =
    content.buttons?.filter(btn => btn).map(
      (button) =>
        `<a class="btn${button.variant === 'secondary' ? ' btn--yellow' : ''}" href="${button.url}">${button.text}</a>`
    ).join('</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t') || '';

  // Fixed hero box size (2:1)
  const BOX_W = 600;
  const BOX_H = 300;

  return `<!-- Event -->
  <table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td align="center">
          <div style="margin:0 auto; max-width:600px; margin-top:3rem;">
            <!--[if mso]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td><![endif]-->
            <table class="wrap" style="max-width:600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
              <tbody>

                <!-- Hero (Seznam/Atlas-safe + rounded) -->
                <tr>
                  <td style="padding:0;">
                    <div style="border-radius:32px; overflow:hidden;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <!-- NOTE: image ONLY via background attribute; no CSS background-image -->
                          <td background="${IMG}" height="${BOX_H}"
                              style="width:${BOX_W}px; height:${BOX_H}px; line-height:0; font-size:0; border-radius:32px; background-position:center; background-size:cover; background-color:#ffffff;">
                            <!--[if gte mso 9]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f"
                                         style="width:${BOX_W}px; height:${BOX_H}px;">
                              <v:fill type="frame" src="${IMG}" color="#ffffff" />
                              <v:textbox inset="0,0,0,0"><div></div></v:textbox>
                            </v:roundrect>
                            <![endif]-->
                            <!--[if !mso]><!-- --><div style="height:${BOX_H}px">&nbsp;</div><!--<![endif]-->
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Copy + buttons (removed class="event"; same padding) -->
                <tr>
                  <td style="padding:48px 24px;" align="left">
                    <h4>${content.eventDate || 'Neděle 1.6. 15:00-17:30'}</h4>
                    <h1 class="souhrn-h1">${content.eventTitle || 'Body & Mind Reset with Face Workout'}</h1>
                    <p class="souhrn-pair fotka">
                      <span class="subheading">${content.instructor || 'Kat Dymáková'}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>${content.description || content.text || 'YOGA MOVEMENT, studio inspirované boutiqovými studii v Jihovýchodní Asii...'}</span>
                    </p>
                    <div class="souhrn-buttons">
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>
                            <td>${buttonsHTML}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
            <!--[if mso]></td></tr></table><![endif]-->
          </div>
        </td>
      </tr>
    </tbody>
  </table>`;
}

function generatePhotosHTML(block: NewsletterBlock): string {
  const { content } = block;
  const photos = content.photos || [];

  // Each photo is visually ~300×375 inside a 600px container (two columns).
  const PHOTO_W = 300;
  const PHOTO_H = 375;

  // Outlook-safe (VML) + non-MSO <img> fallback (Gmail/iOS, etc.)
  const box = (url: string) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
      <tr>
        <td align="center" valign="top" style="border-radius:32px; overflow:hidden; line-height:0; font-size:0;">
          <!--[if gte mso 9]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f"
                         style="width:${PHOTO_W}px;height:${PHOTO_H}px;">
              <v:fill type="frame" src="${url}" />
              <v:textbox inset="0,0,0,0"><div></div></v:textbox>
            </v:roundrect>
          <![endif]-->

          <!--[if !mso]><!-- -->
          <img src="${url}"
               width="${PHOTO_W}" height="${PHOTO_H}" alt=""
               style="display:block; width:100%; height:auto; border:0; outline:none; text-decoration:none; border-radius:32px;" />
          <!--<![endif]-->
        </td>
      </tr>
    </table>
  `;

  return `<!-- PHOTOS block -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:3rem;margin-bottom:3rem;">
    <tr>
      <td align="center">
        <div style="margin:0 auto; max-width:600px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="photos-wrap" style="max-width:600px;">
            <tr valign="top">
              <!-- LEFT column -->
              <td width="50%" class="photos-col" style="width:50%;vertical-align:top;">
                ${box(photos[0]?.url || 'https://storage.googleapis.com/yogamovementstudio33228/hero.png')}
                ${box(photos[2]?.url || 'https://storage.googleapis.com/yogamovementstudio33228/hero.png')}
              </td>

              <!-- RIGHT column -->
              <td width="50%" class="photos-col" style="width:50%;vertical-align:top;">
                <!-- Offset for staggered look -->
                <div class="photos-offset" style="line-height:0;font-size:0;height:${PHOTO_H/2}px;">&nbsp;</div>
                ${box(photos[1]?.url || 'https://storage.googleapis.com/yogamovementstudio33228/hero.png')}
                ${box(photos[3]?.url || 'https://storage.googleapis.com/yogamovementstudio33228/hero.png')}
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>`;
}

function generateSummaryHTML(block: NewsletterBlock): string {
  const { content } = block;
  
  // Handle backward compatibility between pairs and individual text fields
  const getTextData = () => {
    if (content.pairs && content.pairs.length > 0) {
      // Legacy format with pairs
      return {
        subheading1: content.pairs[0]?.subheading || 'Workshopy',
        text1: content.pairs[0]?.text || '',
        subheading2: content.pairs[1]?.subheading || 'Lekce',
        text2: content.pairs[1]?.text || ''
      };
    } else {
      // New format with individual fields
      return {
        subheading1: content.subheading1 || 'Workshopy',
        text1: content.text1 || '',
        subheading2: content.subheading2 || 'Lekce',
        text2: content.text2 || ''
      };
    }
  };

  const textData = getTextData();
  
  const buttonsHTML = content.buttons?.filter(btn => btn).map(button => 
    `<a class="btn${button.variant === 'secondary' ? ' btn--yellow' : ''}" href="${button.url}">${button.text}</a>`
  ).join('</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t') || '';

  return `<!-- Souhrn -->
\t\t<table class="souhrn-bg" style="background: ${content.backgroundColor || '#F8F3EE'};" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="${content.backgroundColor || '#F8F3EE'}">
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<td align="center">
\t\t\t\t\t\t<div style="background: ${content.backgroundColor || '#F8F3EE'}; margin: 0 auto; max-width: 600px;">
\t\t\t\t\t\t\t<!-- [if mso]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td><![endif]-->
\t\t\t\t\t\t\t<table class="wrap" style="max-width: 600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
\t\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t<td class="souhrn-td" align="left">
\t\t\t\t\t\t\t\t\t\t\t<h1 class="souhrn-h1">${content.title || 'Co chystáme?'}</h1>
\t\t\t\t\t\t\t\t\t\t\t<p class="souhrn-pair">
\t\t\t\t\t\t\t\t\t\t\t\t<span class="subheading">${textData.subheading1}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>${textData.text1 || ''}</span>
\t\t\t\t\t\t\t\t\t\t\t</p>
\t\t\t\t\t\t\t\t\t\t\t<p class="souhrn-pair">
\t\t\t\t\t\t\t\t\t\t\t\t<span class="subheading">${textData.subheading2}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>${textData.text2 || ''}</span>
\t\t\t\t\t\t\t\t\t\t\t</p>
\t\t\t\t\t\t\t\t\t\t\t<div class="souhrn-buttons">
\t\t\t\t\t\t\t\t\t\t\t\t<table role="presentation" border="0" cellspacing="0" cellpadding="0">
\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${buttonsHTML}
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t<!-- [if mso]></td></tr></table><![endif]-->
\t\t\t\t\t\t</div>
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>`;
}


function generateQuoteHTML(block: NewsletterBlock): string {
  const { content } = block;
  
  return `<!-- Citace -->
\t\t<table class="souhrn-bg" style="background: ${content.backgroundColor || '#F8F3EE'};" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="${content.backgroundColor || '#F8F3EE'}">
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<td align="center">
\t\t\t\t\t\t<div style="background: ${content.backgroundColor || '#F8F3EE'}; margin: 0 auto; max-width: 600px;">
\t\t\t\t\t\t\t<!-- [if mso]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td><![endif]-->
\t\t\t\t\t\t\t<table class="wrap" style="max-width: 600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
\t\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t<td class="souhrn-td" align="left">
\t\t\t\t\t\t\t\t\t\t\t<p class="citace-pair">
\t\t\t\t\t\t\t\t\t\t\t\t<span class="subheading">${content.quoteSubheading || 'Zajímavost'}</span>&nbsp;&nbsp;${content.quote || 'Nebojte se. Na začátku nebudu žádné mosty a ani stání na hlavě. A ano, skoro nikdo si na začátku nedosáhne na špičky nohou.'}
                      </p>
\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t<!-- [if mso]></td></tr></table><![endif]-->
\t\t\t\t\t\t</div>
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>`;
}

function generateFooterHTML(block: NewsletterBlock): string {
  const { content } = block;
  const socialLinks = content.socialLinks || [];

  // Social URLs
  const facebookUrl  = socialLinks.find(link => link.platform === 'facebook')?.url  || '#';
  const instagramUrl = socialLinks.find(link => link.platform === 'instagram')?.url || '#';
  const youtubeUrl   = socialLinks.find(link => link.platform === 'youtube')?.url   || '#';
  const twitterUrl   = socialLinks.find(link => link.platform === 'twitter')?.url   || '#';

  // New PNG icons
  const ICON_IG = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757983568659-kpssg0o3st.png";
  const ICON_X  = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757983563052-gcv6n7j3clp.png";
  const ICON_YT = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757983565964-l3nqf2wztt.png";
  const ICON_FB = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757983571175-me34lmipx5o.png";

  // Decorative logo (scaled down)
  const FOOTER_LOGO = "https://tnzgcxxlkxkbiwisrlzu.supabase.co/storage/v1/object/public/newsletter-images/images/1757913277422-y20wih56mv.png";

  return `<!-- Footer -->

<table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="background:#FFFFFF;">
  <tbody>
    <tr>
      <td align="center">
        <div style="margin:0 auto; max-width:600px;">
          <table class="wrap" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tbody>
              <tr>
                <td align="left">
                  <p style="font-size:16px; line-height:150%; margin:48px 24px">
                    ${content.footerText?.replace(/\n/g, '<br/>') || 'Budeme se na Vás těšit na viděnou ve studiu.<br/><br/>Hezký den,<br/>Adéla & Tým Yoga Movement'}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="background:${content.backgroundColor || '#F8F3EE'};">
  <tbody>
    <tr>
      <td align="center">
        <div style="margin:0 auto; max-width:600px;">
          <table class="wrap" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tbody>
              <tr style="background-color:${content.backgroundColor || '#F8F3EE'};">
                <!-- Decorative logo -->
                <td style="padding:32px 24px; width:1%;">
                  <img src="${FOOTER_LOGO}" width="52" height="76" alt="" style="display:block; border:0; outline:none; text-decoration:none;">
                </td>

                <!-- Social icons -->
                <td style="padding:32px 24px; padding-left:72px;"> <!-- 24px + 48px = 72px -->
                  <h4 style="color:#806C56; font-size:14px; margin:0 0 12px 0;">Sledujte nás na</h4>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      ${instagramUrl ? `
                      <td style="padding-right:4px;">
                        <a href="${instagramUrl}" style="display:inline-block;">
                          <img src="${ICON_IG}" width="20" height="20" alt="Instagram" style="display:block; border:0; outline:none; text-decoration:none;">
                        </a>
                      </td>` : ''}

                      ${facebookUrl ? `
                      <td>
                        <a href="${facebookUrl}" style="display:inline-block;">
                          <img src="${ICON_FB}" width="20" height="20" alt="Facebook" style="display:block; border:0; outline:none; text-decoration:none;">
                        </a>
                      </td>` : ''}
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table class="wrap" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tbody>
              <tr style="background-color:${content.backgroundColor || '#F8F3EE'}; font-size:12px; color:#806C56; vertical-align:baseline;">
                <td style="padding-left:24px; padding-right:16px; padding-bottom:16px;">
                  <p style="margin:0;">${content.copyright || 'Copyright © 2025 Yoga Movement'}</p>
                </td>
                <td align="right" style="padding-right:24px;">
                  <a href="${content.unsubscribeUrl || '*|UNSUB|*'}" style="color:#007BA0; text-decoration:underline; text-underline-offset:3px;">Odhlásit od newsletteru</a>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </td>
    </tr>
  </tbody>
</table>`;
}

function getNewsletterCSS(): string {
  return `
    body,
    #bodyTable,
    #bodyCell {
      height: 100% !important;
      margin: 0;
      padding: 0;
      width: 100% !important;
      font-family: Arial, Helvetica, sans-serif;
      color: #393939;
    }

    a {
      color: #007BA0 !important;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    
    .btn, .btn a {
      color: #393939 !important;
      text-decoration: none !important;
    }
    .header-banner {
      position: relative;
    }
    .header-banner svg {
      position: absolute;
      top: 3rem;
      left: 3rem;
    }
    .header-img, .uvod-img {
      width: 100%;
      aspect-ratio: 2 / 1;
      object-fit: cover;
      border-radius: 2rem;
      min-height: 10.5rem;
    }
    .uvod-img {
      aspect-ratio: 1 / 1;
    }

    .souhrn-bg {
      background: #F8F3EE;
    }

    .souhrn-td, .podekovani-td {
      padding: 96px 24px;
      /* 96 top/bottom, 48 left/right */
      color: #393939;
      font-family: Arial, Helvetica, sans-serif;
    }
    
    .podekovani-td {
      padding: 48px 24px;
    }

    .podekovani-td h1 {
      margin-bottom: 2rem;
    }

    .souhrn-h1 {
      margin: 0 0 32px;
      font-size: 48px;
      line-height: 120%;
      letter-spacing: -1px;
      font-weight: 400;
      color: #393939;
    }

    .souhrn-pair, .citace-pair {
      margin: 32px 0;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0;
      font-weight: 400;
      color: #393939;
    }
    
    .souhrn-pair p, .souhrn-pair.fotka p,
    .souhrn-pair > p:first-child {
      margin: 0 0 1em 0;
      line-height: 150%;
    }
    
    .souhrn-pair p:last-child, .souhrn-pair.fotka p:last-child {
      margin-bottom: 0;
    }
    
    .souhrn-pair > p:only-child {
      margin: 0;
    }

    h2 {
      font-size: 32px;
      font-weight: 400;
      color: #393939;
      margin: 0.125rem 0 0.125rem;
      line-height: 120%;
      letter-spacing: -1px;
    }
    h3 {
      font-size: 24px;
      font-weight: 400;
      color: #393939;
      line-height: 130%;
    }
    h4 {
      font-size: 20px;
      font-weight: 400;
      line-height: 120%;
      color: #393939;
      margin: 0;
    }

    .souhrn-pair.fotka {
      margin: 42px 0 0 0 !important;
	  line-height: 150%;
    }

    .citace-pair {
      margin: 0;
      font-size: 55px;
      line-height: 110%;
      letter-spacing: -1px;
    }

    .subheading {
      font-size: 14px;
      letter-spacing: 0.125px;
      font-weight: 400;
      color: #393939;
    }
    .citace-pair .subheading {
      line-height: 110%;
    }

    .souhrn-buttons {
      margin-top: 48px;
    }

    .btn {
      display: inline-block;
      padding: 7px 19px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 150%;
      font-weight: 400;
      text-decoration: none;
      color: #393939;
      border-radius: 2rem;
      border: 1px solid #393939;
      background: transparent;
    }

    .btn--yellow {
      border-color: #FBFB62 !important;
      background: #FBFB62;
    }

    .btn-spacer {
      width: 16px;
      font-size: 0;
      line-height: 0;
    }

    .promo-wrap {
      margin: 0 auto;
      max-width: 600px;
      overflow: hidden;
    }
    .promo-table {
      max-width: 600px;
      width: 100%;
      margin: 48px 0;
    }
    .promo-row {
      display: inline-flex;
      width: 100%;
    }

    .promo-left {
      width: 35%;
      border-radius: 32px;
      display: block;
      aspect-ratio: 4 / 7;
      background: url('https://storage.googleapis.com/yogamovementstudio33228/hero.png') center center / cover no-repeat;
    }

    .promo-right {
      width: 65%;
      border-radius: 32px;
      background: url('https://storage.googleapis.com/yogamovementstudio33228/ad-bg-1.png') center center / cover no-repeat;
      padding: 48px;
    }

    .promo-right h2 {
      margin: 0 0 40px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 32px;
      line-height: 120%;
      letter-spacing: -1px;
      font-weight: 400;
      color: #393939;
    }

    .promo-buttons {
      margin: 0;
    }

    .events-td {
      padding: 3rem 3rem 1rem 3rem;
    }

    /* MOBILE: collapse at 380px for narrow email clients */
    @media only screen and (max-width: 380px) {
      
      .header-banner svg {
        top: 1.5rem;
      }

      .podekovani-td {
      padding: 48px 24px;
      }

      .wrap {
        width: 100% !important;
        max-width: 100% !important;
      }

      .souhrn-td {
        padding: 96px 24px !important;
      }

      .souhrn-h1 {
        font-size: 36px !important;
        line-height: 120% !important;
        margin: 0 0 24px !important;
        letter-spacing: -1px !important;
      }

      .souhrn-pair {
        margin: 24px 0 !important;
        font-size: 14px !important;
        line-height: 150% !important;
      }

      .subheading {
        font-size: 12px !important;
      }

      .souhrn-buttons table {
        width: 100% !important;
      }

      .souhrn-buttons td {
        display: block !important;
        width: 100% !important;
        padding-right: 0 !important;
      }

      .souhrn-buttons td:last-child {
        margin-bottom: 0 !important;
      }

      .btn {
        display: block !important;
        width: calc(100% - 42px) !important;
        /* 1.5rem side breathing */
        text-align: center !important;
        padding: 10px 20px !important;
        border-radius: 2rem !important;
      }
      .promo-right h2 {
        font-size: 26px;
        margin-bottom: 9rem;
      }
      .promo-left {
        width: 50%;
      }
      .promo-row .souhrn-buttons {
        position: absolute;
        bottom: 3rem;
        width: calc(100% - 48px);
      }

      .promo-right {
        width: 50%;
        padding: 48px 24px;
        position: relative;
      }

      .citace-pair {
        font-size: 42px;
      }

      .event-buttons {
        position: relative !important;
        margin-top: 1rem;
        left: -0.25rem;
        width: 100%;
      }

		.stack td {
			display: block !important;
			width: 100% !important;
			width: 100%;
			display: block;
		}
	
		.stack .btn-cell {
			text-align: left !important;
			padding-top: 12px !important;
			white-space: normal !important;
			width: 100%;
			display: block;
		}
	
		.stack .btn-cell table {
			width: 100%;
		}

    /* Responsive single photo styling - removed for simplicity */

      .event-buttons {
        position: relative !important;
        margin-top: 1rem;
        left: -0.25rem;
        width: 100%;
      }
    }
    @media only screen and (max-width: 470px) {
      .photos-wrap{ max-width:100% !important; }
      .photos-col{ display:block !important; width:100% !important; padding-left:0 !important; padding-right:0 !important; }
      .photos-gutter{ height:16px !important; line-height:16px !important; }
      .photos-offset{ padding-top:0 !important; height: 0 !important;} /* remove the 50% offset on mobile */
      .spacer{ height: 0 !important;} /* remove the 50% offset on mobile */
      .photos-img{ width:100% !important; height:auto !important; }
	  .stack td { display:block !important; width:100% !important; width: 100%; display: block; text-align: left;}
	  .stack .btn-cell { text-align:left !important; padding-top:12px !important; white-space:normal !important; width: 100%; display: block;}
	  .stack .text-cell { padding-right:0 !important; }
    }
	.im {
		color: #393939 !important;
	}
  `;
}

function generatePromoWideHTML(block: NewsletterBlock): string {
  const { content } = block;
  const WIDTH  = 600;
  const HEIGHT = 600;
  const BG = content.backgroundImage || 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png';
  const SPACER = 320;

  return `<!-- PROMO wide block -->
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:3rem;margin-bottom:3rem;">
  <tr>
    <td align="center">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="width:100%;max-width:600px;">
        <tr>
          <td style="padding:0;">
            <!-- Rounded mask to clip corners in non-Outlook -->
            <div style="border-radius:32px; overflow:hidden;">
              
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="f" style="width:${WIDTH}px;height:${HEIGHT}px;">
                <v:fill type="frame" src="${BG}" />
                <v:textbox inset="0,0,0,0">
                  <table role="presentation" width="100%" height="${HEIGHT}" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left" style="vertical-align:top;padding:32px 0 0 24px;font-family:Arial,Helvetica,sans-serif;color:#393939;">
                        <h4 style="margin:0 0 8px 0;color:#393939;">${content.date || '4.—6. 4. 2025'}</h4>
                        <p style="margin:0;font-weight:400;color:#393939;">${content.location || 'Vila šťastná Samota, Vrchotovy Janovice'}</p>
                      </td>
                    </tr>
                    <tr><td style="height:${SPACER}px;line-height:${SPACER}px;font-size:1px;"><span style="display:block">&nbsp;</span></td></tr>
                    <tr>
                      <td style="padding:0 24px 32px 24px;vertical-align:bottom;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr valign="bottom">
                            <td align="left" style="font-family:Arial,Helvetica,sans-serif;color:#393939;">
                              <h4 style="margin:0 0 8px 0;color:#393939;">${content.subtitle || 'The Art of Stillness'}</h4>
                              <h2 style="margin:0;margin-right:1rem;">${content.title || 'Yoga Movement Retreat'}</h2>
                            </td>
                            <td align="right" width="1%" style="white-space:nowrap;">
                              <a href="${content.url || '#'}" style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#FFFFFF;text-decoration:none;line-height:48px;text-align:center;font-size:18px;color:#393939;">↗</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </v:textbox>
              </v:rect>
              <![endif]-->

              <!--[if !mso]><!-- -->
              <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <!-- Image only via HTML attribute (no CSS background shorthand) -->
                  <td background="${BG}" height="${HEIGHT}"
                      style="line-height:0;font-size:0;background-position:center center;background-repeat:no-repeat;background-size:cover;">
                    <table role="presentation" width="100%" height="${HEIGHT}" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="vertical-align:top;padding:32px 0 0 24px;font-family:Arial,Helvetica,sans-serif;color:#393939;">
                          <h4 style="margin:0 0 8px 0;color:#393939;">${content.date || '4.—6. 4. 2025'}</h4>
                          <p style="margin:0;font-weight:400;color:#393939;">${content.location || 'Vila šťastná Samota, Vrchotovy Janovice'}</p>
                        </td>
                      </tr>
                      <!-- fixed spacer respected by Seznam/Gmail iOS -->
                      <tr><td style="height:${SPACER}px;line-height:${SPACER}px;font-size:1px;"><span style="display:block">&nbsp;</span></td></tr>
                      <tr>
                        <td style="padding:0 24px 32px 24px;vertical-align:bottom;">
                          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr valign="bottom">
                              <td align="left" style="font-family:Arial,Helvetica,sans-serif;color:#393939;">
                                <h4 style="margin:0 0 8px 0;color:#393939;">${content.subtitle || 'The Art of Stillness'}</h4>
                                <h2 style="margin:0;margin-right:1rem;">${content.title || 'Yoga Movement Retreat'}</h2>
                              </td>
                              <td align="right" width="1%" style="white-space:nowrap;">
                                <a href="${content.url || '#'}" style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#FFFFFF;text-decoration:none;line-height:48px;text-align:center;font-size:18px;color:#393939;">↗</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--<![endif]-->

            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateSinglePhotoHTML(block: NewsletterBlock): string {
  const { content } = block;
  const imageUrl = content.image || '';
  const W = 600;
  const H = 980;

  return `<!-- single photo (VML + IMG fallback) -->
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="${W}" style="width:100%;max-width:${W}px;">
        <tr>
          <td style="padding:0;">
            <!-- rounded mask -->
            <div style="border-radius:32px; overflow:hidden; line-height:0; font-size:0;">
              <!--[if gte mso 9]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f"
                           style="width:${W}px;height:${H}px;">
                <v:fill type="frame" src="${imageUrl}" />
                <v:textbox inset="0,0,0,0"><div></div></v:textbox>
              </v:roundrect>
              <![endif]-->

              <!--[if !mso]><!-- -->
              <img src="${imageUrl}"
                   width="${W}" height="${H}" alt=""
                   style="display:block; width:100%; max-width:${W}px; height:auto; border:0; outline:none; text-decoration:none; border-radius:32px;" />
              <!--<![endif]-->
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateSinglePhotoSquareHTML(block: NewsletterBlock): string {
  const { content } = block;
  const imageUrl = content.image || '';
  const BOX = 600; // 600 × 600

  return `<!-- single photo square (VML + IMG fallback) -->
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center">
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600" style="width:100%;max-width:600px;">
        <tr>
          <td style="padding:0;">
            <!-- rounded mask -->
            <div style="border-radius:32px; overflow:hidden; line-height:0; font-size:0;">
              <!--[if gte mso 9]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="12%" stroke="f"
                           style="width:${BOX}px;height:${BOX}px;">
                <v:fill type="frame" src="${imageUrl}" />
                <v:textbox inset="0,0,0,0"><div></div></v:textbox>
              </v:roundrect>
              <![endif]-->

              <!--[if !mso]><!-- -->
              <img src="${imageUrl}"
                   width="${BOX}" height="${BOX}" alt=""
                   style="display:block; width:100%; max-width:${BOX}px; height:auto; border:0; outline:none; text-decoration:none; border-radius:32px;" />
              <!--<![endif]-->
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateTextContentHTML(block: NewsletterBlock): string {
  const { content } = block;

  // Add class to p tags only if they don't already have a class
  const formattedText = content.text
    ? content.text
        // inject class if missing
        .replace(/<p(?![^>]*\bclass=)(\s|>)/gi, '<p class="souhrn-pair fotka"$1')
        // if class exists but not ours, append ours
        .replace(/<p([^>]*\bclass=")([^"]*)(")/gi, (m, a, cls, c) => {
          if (/\bsouhrn-pair\b/.test(cls) && /\bfotka\b/.test(cls)) return m;
          return `<p${a}${cls} souhrn-pair fotka${c}`;
        })
    : '';

  return `<!-- Text -->
\t\t<table class="header" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<td align="center">
\t\t\t\t\t\t<div style="margin: 0 auto; max-width: 600px;">
\t\t\t\t\t\t\t<!-- [if mso]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td><![endif]-->
\t\t\t\t\t\t\t<table class="wrap" style="max-width: 600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
\t\t\t\t\t\t\t\t<tbody>
\t\t\t\t\t\t\t\t\t<tr>
\t\t\t\t\t\t\t\t\t\t<td style="padding: 48px 24px;" align="left">
\t\t\t\t\t\t\t\t\t\t\t<h1 class="souhrn-h1">${content.title || ''}</h1>
\t\t\t\t\t\t\t\t\t\t\t<p class="souhrn-pair fotka">
\t\t\t\t\t\t\t\t\t\t\t\t<span class="subheading">${content.subheading || ''}</span>&nbsp;&nbsp;&nbsp;&nbsp;${formattedText}
\t\t\t\t\t\t\t\t\t\t\t</p>
\t\t\t\t\t\t\t\t\t\t</td>
\t\t\t\t\t\t\t\t\t</tr>
\t\t\t\t\t\t\t\t</tbody>
\t\t\t\t\t\t\t</table>
\t\t\t\t\t\t\t<!-- [if mso]></td></tr></table><![endif]-->
\t\t\t\t\t\t</div>
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>`;
}

function generatePlainTextHTML(block: NewsletterBlock): string {
  const text = block.content.text || '';

  // Add the class to <p> that don't have it;
  // keep existing classes and avoid duplication.
  let textWithClass = text
    .replace(/<p(?![^>]*\bclass=)(\s|>)/gi, '<p class="souhrn-pair fotka"$1')
    .replace(/<p([^>]*\bclass=")([^"]*)(")/gi, (m, a, cls, c) => {
      if (/\bsouhrn-pair\b/.test(cls) && /\bfotka\b/.test(cls)) return m;
      return `<p${a}${cls} souhrn-pair fotka${c}`;
    });

  // If there are no paragraphs with the souhrn-pair class at all,
  // wrap the entire content so typography matches .souhrn-pair logic.
  if (!/class="[^"]*\bsouhrn-pair\b[^"]*"/i.test(textWithClass)) {
    textWithClass = `<p class="souhrn-pair fotka">${textWithClass}</p>`;
  }

  return `
    <!-- Plain Text Block -->
    <table class="header" style="margin-top: 3rem;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td align="center">
            <div style="margin: 0 auto; max-width: 600px;">
              <table class="wrap" style="max-width: 600px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                <tbody>
                  <tr>
                    <td style="padding: 48px 24px;" align="left">
                      ${textWithClass}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `;
}