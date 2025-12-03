import React, { useRef, useCallback, useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { sanitizeHTML } from '@/lib/sanitize';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const didInitRef = useRef(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const savedSelectionRef = useRef<Range | null>(null);

  // Sanitize to inline-only HTML while preserving ALL line breaks including empty lines
  const sanitizeInline = useCallback((input: string) => {
    if (!input) return '';
    
    // 1) FIRST convert block elements to <br> tags
    const container = document.createElement('div');
    container.innerHTML = input;
  
    const BLOCKS = ['p','div','h1','h2','h3','h4','h5','h6','ul','ol','li','blockquote','pre'];
  
    BLOCKS.forEach((tag) => {
      container.querySelectorAll(tag).forEach((el) => {
        const parent = el.parentNode;
        if (!parent) return;
  
        const textContent = (el as HTMLElement).textContent?.trim() || '';
        const isEmpty = textContent.length === 0;
        
        // Move all children out first (preserve inline markup like <b>, <i>, etc.)
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
  
        // Add a line break to represent this block element
        parent.insertBefore(document.createElement('br'), el);
        
        // If the paragraph was empty, add an extra <br> to preserve the empty line
        if (isEmpty) {
          parent.insertBefore(document.createElement('br'), el);
        }
        
        // Remove the now-empty block element
        parent.removeChild(el);
      });
    });
   
    // 2) THEN take HTML with <br> and sanitize
    let html = container.innerHTML;
    
    // Only remove leading/trailing breaks
    html = html.replace(/^(<br\s*\/?>)+/, '').replace(/(<br\s*\/?>)+$/, '');
    
    // Sanitize with DOMPurify
    const cleaned = sanitizeHTML(html);
    
    // Final cleanup - remove unwanted attributes but keep href, target, rel, style
    const finalContainer = document.createElement('div');
    finalContainer.innerHTML = cleaned;
    
    finalContainer.querySelectorAll<HTMLElement>('*').forEach((node) => {
      [...node.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        if (name === 'href' || name === 'target' || name === 'rel' || name === 'style') return;
        if (name.startsWith('data-')) return;
        node.removeAttribute(name);
      });
    });
  
    return finalContainer.innerHTML;
  }, []);

  // Treat value as initial content only (prevents clobbering visible line breaks while typing)
  React.useEffect(() => {
    if (!editorRef.current || didInitRef.current) return;
    editorRef.current.innerHTML = value || '';
    
    // Style any existing links
    const links = editorRef.current.querySelectorAll('a');
    links.forEach(link => {
      const anchor = link as HTMLAnchorElement;
      anchor.style.color = '#007BA0';
      anchor.style.textDecoration = 'underline';
    });
    
    didInitRef.current = true;
  }, [value]);

  // Formatting commands: perform, then export sanitized value (do not rewrite DOM)
  const execCommand = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      const clean = sanitizeInline(editorRef.current.innerHTML);
      onChange(clean);
    }
  }, [onChange, sanitizeInline]);

  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleStrikethrough = () => execCommand('strikeThrough');
  
  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && selection.rangeCount > 0) {
      // Save the current selection
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
      setShowLinkDialog(true);
    }
  };

  const handleLinkInsert = () => {
    if (linkUrl && savedSelectionRef.current) {
      // Restore the selection
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRef.current);
      }
      
      // Create the link
      document.execCommand('createLink', false, linkUrl);
      
      // Style all links with the correct color and underline
      if (editorRef.current) {
        const links = editorRef.current.querySelectorAll('a');
        links.forEach(link => {
          const anchor = link as HTMLAnchorElement;
          anchor.style.color = '#007BA0';
          anchor.style.textDecoration = 'underline';
        });
      }
      
      // Export the updated content
      if (editorRef.current) {
        const clean = sanitizeInline(editorRef.current.innerHTML);
        onChange(clean);
      }
      
      setLinkUrl('');
      setShowLinkDialog(false);
      savedSelectionRef.current = null;
    }
  };

  // Export sanitized html while leaving the editor DOM intact (so Enter visual breaks remain)
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    const clean = sanitizeInline(e.currentTarget.innerHTML);
    onChange(clean);
    setTimeout(() => { isUpdatingRef.current = false; }, 0);
  };

  // Paste as plain text; let the browser create visual lines. Export will sanitize away breaks.
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Handle Enter key to insert only a single <br> tag
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
      
      // Export the updated content
      if (editorRef.current) {
        const clean = sanitizeInline(editorRef.current.innerHTML);
        onChange(clean);
      }
    }
  };

  return (
    <>
      <div className={cn('border border-border rounded-lg', className)}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border">
          <Button type="button" variant="ghost" size="sm" onClick={handleBold} className="h-8 w-8 p-0">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleItalic} className="h-8 w-8 p-0">
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleUnderline} className="h-8 w-8 p-0">
            <Underline className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleStrikethrough} className="h-8 w-8 p-0">
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleLinkClick} className="h-8 w-8 p-0">
            <Link className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="p-3 min-h-[100px] outline-none rich-text-editor"
          style={{ color: '#393939' }}
          data-placeholder={placeholder}
        />
      </div>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLinkInsert();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowLinkDialog(false);
              setLinkUrl('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleLinkInsert}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};