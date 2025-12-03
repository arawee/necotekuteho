import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { FolderOpen, Calendar, Trash2, Upload } from 'lucide-react';
import { useNewsletter } from '@/hooks/useNewsletter';
import { NewsletterBlock } from '@/types/newsletter';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface LoadNewsletterDialogProps {
  onLoad: (blocks: NewsletterBlock[]) => void;
  children?: React.ReactNode;
}

export function LoadNewsletterDialog({ onLoad, children }: LoadNewsletterDialogProps) {
  const { newsletters, loading, deleteNewsletter, loadNewsletters } = useNewsletter();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadNewsletter = async (newsletter: any) => {
    onLoad(newsletter.blocks);
    setOpen(false);
  };

  const handleDeleteNewsletter = async (e: React.MouseEvent, newsletterId: string) => {
    e.stopPropagation();
    await deleteNewsletter(newsletterId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/html' && !file.name.endsWith('.html')) {
      alert('Prosím vyberte HTML soubor');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const htmlContent = e.target?.result as string;
      try {
        // Parse the HTML content and extract blocks
        const blocks = parseHTMLToBlocks(htmlContent);
        onLoad(blocks);
        setOpen(false);
      } catch (error) {
        console.error('Error parsing HTML file:', error);
        alert('Chyba při zpracování HTML souboru. Zkontrolujte formát souboru.');
      }
    };
    reader.readAsText(file);
  };

  const parseHTMLToBlocks = (htmlContent: string): NewsletterBlock[] => {
    // This is a basic parser - you can enhance this based on your HTML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const blocks: NewsletterBlock[] = [];
    
    // Look for specific patterns in the HTML that correspond to your blocks
    const headers = doc.querySelectorAll('h1, h2');
    const images = doc.querySelectorAll('img');
    const textBlocks = doc.querySelectorAll('p, div');
    
    // Create basic blocks based on content found
    headers.forEach((header, index) => {
      blocks.push({
        id: `header-${index}`,
        type: 'header',
        content: {
          title: header.textContent || '',
          text: ''
        }
      });
    });

    images.forEach((img, index) => {
      blocks.push({
        id: `image-${index}`,
        type: 'intro',
        content: {
          image: img.src,
          title: img.alt || '',
          text: ''
        }
      });
    });

    // If no specific blocks found, create a basic text block with the content
    if (blocks.length === 0) {
      blocks.push({
        id: 'imported-content',
        type: 'intro',
        content: {
          title: 'Importovaný obsah',
          text: doc.body.textContent || htmlContent,
        }
      });
    }

    return blocks;
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            Load
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Načíst Newsletter</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload HTML File Section */}
          <div>
            <Label className="text-base font-medium">Nahrát HTML soubor</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Importovat newsletter z HTML souboru
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,text/html"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button onClick={triggerFileUpload} variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Vybrat HTML soubor
            </Button>
          </div>

          <Separator />

          {/* Saved Newsletters Section */}
          <div>
            <Label className="text-base font-medium">Uložené newslettery</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Načíst dříve uložený newsletter z databáze
            </p>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Načítání newsletterů...</div>
              </div>
            ) : newsletters.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg mb-2">Žádné uložené newslettery</p>
                <p className="text-muted-foreground">Vytvořte a uložte váš první newsletter, abyste ho zde viděli</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {newsletters.map((newsletter) => (
                  <Card 
                    key={newsletter.id}
                    className="cursor-pointer hover:shadow-md transition-all hover:scale-105 relative group"
                    onClick={() => handleLoadNewsletter(newsletter)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-sm line-clamp-2 flex-1 mr-2">
                          {newsletter.name}
                        </h3>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-destructive hover:text-destructive"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Smazat newsletter</AlertDialogTitle>
                              <AlertDialogDescription>
                                Opravdu chcete smazat "{newsletter.name}"? Tuto akci nelze vrátit zpět.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Zrušit</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={(e) => handleDeleteNewsletter(e, newsletter.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Smazat
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {newsletter.blocks.length} blocks
                        </Badge>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(newsletter.updated_at)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t">
          <Button variant="outline" onClick={() => loadNewsletters()}>
            Obnovit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}