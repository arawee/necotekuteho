import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  url?: string;
}

interface BlogPostsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const BlogPostsBlock = ({ block, onUpdate }: BlogPostsBlockProps) => {
  const [editingPost, setEditingPost] = useState<number | null>(null);

  const defaultPosts: BlogPost[] = [
    { 
      image: '', 
      title: 'První hospoda ZICHOVEC!', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?',
      url: '#'
    },
    { 
      image: '', 
      title: 'Příběh marakuji', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?',
      url: '#'
    },
    { 
      image: '', 
      title: 'Chill day 7', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?',
      url: '#'
    },
    { 
      image: '', 
      title: 'Chill day 7', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?',
      url: '#'
    }
  ];

  const posts = (block.content as any).posts || defaultPosts;
  const showViewAll = (block.content as any).showViewAll !== false;
  const viewAllUrl = block.content.viewAllUrl || '#';
  const viewAllText = block.content.viewAllText || 'zobrazit vše';

  const updatePost = (index: number, field: keyof BlogPost, value: any) => {
    const newPosts = [...posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    onUpdate({ ...block.content, posts: newPosts } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-xl font-normal"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121' }}
          >
            {block.content.title || 'Novinky od ZICHOVCE'}
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox
                checked={showViewAll}
                onCheckedChange={(checked) => onUpdate({ ...block.content, showViewAll: checked } as any)}
              />
              Zobrazit vše
            </label>
            {showViewAll && (
              <span 
                className="text-sm cursor-pointer"
                style={{ color: '#212121' }}
                onClick={() => setEditingPost(-1)}
              >
                → {viewAllText}
              </span>
            )}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-4 gap-4">
          {posts.map((post: BlogPost, index: number) => (
            <div key={index} className="group">
              {/* Post image */}
              <div className="relative mb-3 aspect-square overflow-hidden">
                <ImageUpload
                  currentImage={post.image}
                  onImageUploaded={(url) => updatePost(index, 'image', url)}
                  aspectRatio="square"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Post info */}
              <h3 
                className="font-medium text-sm mb-2 cursor-pointer"
                onClick={() => setEditingPost(index)}
                style={{ color: '#212121' }}
              >
                {post.title}
              </h3>
              {/* Grey box for excerpt */}
              <div 
                className="p-2 mb-3"
                style={{ backgroundColor: '#F4F4F4' }}
              >
                <p 
                  className="text-xs text-muted-foreground line-clamp-3 cursor-pointer"
                  onClick={() => setEditingPost(index)}
                >
                  {post.excerpt}
                </p>
              </div>

              {/* Action button - same style as Místa */}
              <button 
                className="w-6 h-6 flex items-center justify-center border"
                style={{ borderColor: '#00C322' }}
                onClick={() => setEditingPost(index)}
              >
                <ArrowRight className="w-4 h-4" style={{ color: '#00C322' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingPost !== null} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPost === -1 ? 'Upravit "zobrazit vše"' : 'Upravit příspěvek'}</DialogTitle>
          </DialogHeader>
          {editingPost === -1 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Text</label>
                <Input
                  value={viewAllText}
                  onChange={(e) => onUpdate({ ...block.content, viewAllText: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={viewAllUrl}
                  onChange={(e) => onUpdate({ ...block.content, viewAllUrl: e.target.value })}
                />
              </div>
            </div>
          ) : editingPost !== null && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titulek</label>
                <Input
                  value={posts[editingPost]?.title || ''}
                  onChange={(e) => updatePost(editingPost, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Popis</label>
                <textarea
                  className="w-full border p-2 text-sm"
                  rows={3}
                  value={posts[editingPost]?.excerpt || ''}
                  onChange={(e) => updatePost(editingPost, 'excerpt', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={posts[editingPost]?.url || ''}
                  onChange={(e) => updatePost(editingPost, 'url', e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
