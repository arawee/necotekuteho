import DOMPurify from 'dompurify';

// Configure DOMPurify to allow newsletter-safe rich text tags (kept intentionally small)
const ALLOWED_TAGS = [
  'b',
  'i',
  'strong',
  'em',
  'br',
  'u',
  's',
  'del',
  'strike',
  'a',
  // Rich text structure + headings
  'span',
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
];
const ALLOWED_ATTR: string[] = ['href', 'target', 'rel', 'style'];

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows only a limited, newsletter-safe subset of rich-text tags.
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize rich text editor content
 * Preserves basic formatting but removes any potentially malicious code
 */
export function sanitizeRichText(content: string): string {
  if (!content) return '';
  
  // First sanitize with DOMPurify
  const cleaned = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [...ALLOWED_TAGS, 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    KEEP_CONTENT: true,
  });
  
  // Ensure links open safely
  return cleaned.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
}
