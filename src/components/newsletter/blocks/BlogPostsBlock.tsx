import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
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

  const addPost = () => {
    const newPost: BlogPost = {
      image: '',
      title: 'Nový příspěvek',
      excerpt: 'Popis příspěvku...',
      url: '#'
    };
    onUpdate({ ...block.content, posts: [...posts, newPost] } as any);
  };

  const removePost = (index: number) => {
    const newPosts = posts.filter((_: any, i: number) => i !== index);
    onUpdate({ ...block.content, posts: newPosts } as any);
  };

  return (
    <div className="bg-white border border-border p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header - title 20px bold */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h2 
            className="font-bold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
            style={{ color: '#212121', fontSize: '20px' }}
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
                style={{ color: '#000000', textUnderlineOffset: '2px' }}
                onClick={() => setEditingPost(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Blog posts grid - flex with gap 12px, equal height cards */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
          {posts.slice(0, 3).map((post: BlogPost, index: number) => (
            <div key={index} className="group relative flex flex-col" style={{ flex: '1 1 0' }}>
              {/* Remove button */}
              <button
                onClick={() => removePost(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Post image - 3/4 ratio */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageUpload
                  currentImage={post.image}
                  onImageUploaded={(url) => updatePost(index, 'image', url)}
                  aspectRatio="portrait"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Grey box for title, excerpt and button - flex grow for equal height */}
              <div 
                className="p-3 relative flex-1 flex flex-col"
                style={{ backgroundColor: '#F4F4F4' }}
              >
                {/* Title - 20px bold */}
                <h3 
                  className="mb-2 cursor-pointer"
                  onClick={() => setEditingPost(index)}
                  style={{ color: '#212121', fontSize: '20px', fontWeight: 'bold' }}
                >
                  {post.title}
                </h3>
                
                {/* Excerpt - full text, black color */}
                <p 
                  className="text-xs cursor-pointer mb-3"
                  onClick={() => setEditingPost(index)}
                  style={{ color: '#212121' }}
                >
                  {post.excerpt}
                </p>

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>

                {/* Action button - 36px circular outline, positioned bottom right */}
                <div className="flex justify-end mt-3">
                  <button 
                    className="blog-circle-btn flex items-center justify-center"
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      backgroundColor: 'transparent',
                      border: '1px solid #00C322',
                      borderRadius: '100%'
                    }}
                    onClick={() => setEditingPost(index)}
                  >
                    <ArrowRight style={{ width: '12px', height: '12px', color: '#00C322' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add post button */}
        {posts.length < 3 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={addPost}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Přidat příspěvek
            </button>
          </div>
        )}
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
