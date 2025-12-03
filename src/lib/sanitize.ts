import DOMPurify from 'dompurify';

// Configure DOMPurify to allow only safe inline formatting tags
const ALLOWED_TAGS = ['b', 'i', 'strong', 'em', 'br', 'u', 's', 'del', 'strike', 'a'];
const ALLOWED_ATTR: string[] = ['href', 'target', 'rel', 'style'];

/**
 * Sanitize HTML content to prevent XSS attacks
 * Only allows safe inline formatting tags
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
