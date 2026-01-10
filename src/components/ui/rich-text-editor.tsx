import React, { useRef, useCallback, useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, Link, Heading1, Heading2, Heading3, Heading4, Type } from 'lucide-react';
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

  // Sanitize to newsletter-safe rich text (keep headings/paragraphs intact)
  const sanitizeInline = useCallback((input: string) => {
    if (!input) return '';

    // Sanitize with DOMPurify (via our wrapper)
    const cleaned = sanitizeHTML(input);

    // Remove unwanted attributes but keep href, target, rel, style
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
  
  // Heading handlers - apply heading styles without nesting
  const handleHeading = (level: 1 | 2 | 3 | 4) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const editor = editorRef.current;
    if (!editor) return;

    const findClosestFormattedElement = (startNode: Node | null) => {
      let el: HTMLElement | null =
        startNode instanceof HTMLElement
          ? startNode
          : (startNode?.parentElement ?? null);

      while (el && el !== editor) {
        if (/^H[1-4]$/.test(el.tagName)) return el;
        el = el.parentElement;
      }

      el =
        startNode instanceof HTMLElement
          ? startNode
          : (startNode?.parentElement ?? null);

      while (el && el !== editor) {
        if (el.tagName === 'SPAN' && el.getAttribute('style')) return el;
        el = el.parentElement;
      }

      return null;
    };

    const closest = findClosestFormattedElement(selection.anchorNode);
    const closestText = closest?.textContent?.trim() ?? '';
    const selectionText = selectedText.trim();

    // Create heading element with inline styles for export
    const heading = document.createElement(`h${level}`);
    heading.textContent = selectedText;

    // Apply styles based on level
    switch (level) {
      case 1:
        heading.style.fontSize = '30px';
        heading.style.fontWeight = 'bold';
        break;
      case 2:
        heading.style.fontSize = '24px';
        heading.style.fontWeight = 'bold';
        break;
      case 3:
        heading.style.fontSize = '16px';
        heading.style.fontWeight = 'bold';
        break;
      case 4:
        heading.style.fontSize = '14px';
        heading.style.fontWeight = '700';
        break;
    }
    heading.style.margin = '0';
    heading.style.lineHeight = '1.2';

    // If the selection matches the full formatted element, replace it (prevents nesting)
    if (closest && closestText === selectionText) {
      closest.replaceWith(heading);

      const newRange = document.createRange();
      newRange.setStartAfter(heading);
      newRange.setEndAfter(heading);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      range.deleteContents();
      range.insertNode(heading);

      // Move cursor after the heading
      range.setStartAfter(heading);
      range.setEndAfter(heading);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const clean = sanitizeInline(editor.innerHTML);
    onChange(clean);
  };

  // Paragraph handler - reset to default paragraph styling (without nesting)
  const handleParagraph = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const editor = editorRef.current;
    if (!editor) return;

    const findClosestFormattedElement = (startNode: Node | null) => {
      let el: HTMLElement | null =
        startNode instanceof HTMLElement
          ? startNode
          : (startNode?.parentElement ?? null);

      while (el && el !== editor) {
        if (/^H[1-4]$/.test(el.tagName)) return el;
        el = el.parentElement;
      }

      el =
        startNode instanceof HTMLElement
          ? startNode
          : (startNode?.parentElement ?? null);

      while (el && el !== editor) {
        if (el.tagName === 'SPAN' && el.getAttribute('style')) return el;
        el = el.parentElement;
      }

      return null;
    };

    const closest = findClosestFormattedElement(selection.anchorNode);
    const closestText = closest?.textContent?.trim() ?? '';
    const selectionText = selectedText.trim();

    const span = document.createElement('span');
    span.textContent = selectedText;
    span.style.fontSize = '12px';
    span.style.fontWeight = '500';
    span.style.lineHeight = '120%';

    if (closest && closestText === selectionText) {
      closest.replaceWith(span);

      const newRange = document.createRange();
      newRange.setStartAfter(span);
      newRange.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      range.deleteContents();
      range.insertNode(span);

      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const clean = sanitizeInline(editor.innerHTML);
    onChange(clean);
  };
  
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

  // Handle Enter key to insert a paragraph break (keeps structure persistent)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertParagraph');

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
        <div className="flex items-center gap-1 p-2 border-b border-border flex-wrap">
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
          <div className="w-px h-6 bg-border mx-1" />
          <Button type="button" variant="ghost" size="sm" onClick={handleParagraph} className="h-8 px-2" title="Paragraph (12px, 500 weight)">
            <Type className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading(1)} className="h-8 px-2" title="Heading 1 (30px bold)">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading(2)} className="h-8 px-2" title="Heading 2 (24px bold)">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading(3)} className="h-8 px-2" title="Heading 3 (16px bold)">
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleHeading(4)} className="h-8 px-2" title="Heading 4 (14px, 700 weight)">
            <Heading4 className="h-4 w-4" />
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
