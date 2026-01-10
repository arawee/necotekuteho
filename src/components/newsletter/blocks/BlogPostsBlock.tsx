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
                style={{ color: '#000000', textUnderlineOffset: '2px' }}
                onClick={() => setEditingPost(-1)}
              >
                <span style={{ textDecoration: 'none' }}>→ </span>
                <span style={{ textDecoration: 'underline' }}>{viewAllText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-4 gap-4">
          {posts.map((post: BlogPost, index: number) => (
            <div key={index} className="group relative">
              {/* Remove button */}
              <button
                onClick={() => removePost(index)}
                className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white shadow hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>

              {/* Post image - no margin, directly connected to grey box */}
              <div className="relative aspect-square overflow-hidden">
                <ImageUpload
                  currentImage={post.image}
                  onImageUploaded={(url) => updatePost(index, 'image', url)}
                  aspectRatio="square"
                  placeholder="Nahrát foto"
                  className="w-full h-full"
                  showBorder={false}
                />
              </div>

              {/* Grey box for title, excerpt and button - no gap to image */}
              <div 
                className="p-3"
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
                
                {/* Excerpt */}
                <p 
                  className="text-xs text-muted-foreground line-clamp-3 cursor-pointer mb-3"
                  onClick={() => setEditingPost(index)}
                >
                  {post.excerpt}
                </p>

                {/* Action button - 48px circular with 12px arrow */}
                <button 
                  className="flex items-center justify-center rounded-full"
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#00C322',
                    border: 'none'
                  }}
                  onClick={() => setEditingPost(index)}
                >
                  <ArrowRight style={{ width: '12px', height: '12px', color: '#FFFFFF' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add post button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={addPost}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-400 hover:border-green-500 text-gray-500 hover:text-green-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Přidat příspěvek
          </button>
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
