import { NewsletterBlock } from '@/types/newsletter';
import { ImageUpload } from '@/components/ui/image-upload';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
}

interface BlogPostsBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const BlogPostsBlock = ({ block, onUpdate }: BlogPostsBlockProps) => {
  const defaultPosts: BlogPost[] = [
    { 
      image: '', 
      title: 'První hospoda ZICHOVEC!', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?'
    },
    { 
      image: '', 
      title: 'Příběh marakuji', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?'
    },
    { 
      image: '', 
      title: 'Chill day 7', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?'
    },
    { 
      image: '', 
      title: 'Chill day 7', 
      excerpt: 'Je to tady! Kouska od IP Pavlova. Na čepu ZICHOVEC! Otevíráme 21. 5. 2027. Máte žízeň?'
    }
  ];

  const posts = (block.content as any).posts || defaultPosts;

  const updatePost = (index: number, field: keyof BlogPost, value: any) => {
    const newPosts = [...posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    onUpdate({ ...block.content, posts: newPosts } as any);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
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
          <a href="#" className="text-sm underline hover:no-underline" style={{ color: '#212121' }}>
            → zobrazit vše
          </a>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-4 gap-4">
          {posts.map((post: BlogPost, index: number) => (
            <div key={index} className="group">
              {/* Post image */}
              <div className="relative mb-3 rounded-lg aspect-square overflow-hidden">
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
                className="font-medium text-sm mb-2"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updatePost(index, 'title', e.currentTarget.textContent || '')}
                style={{ color: '#212121' }}
              >
                {post.title}
              </h3>
              <p 
                className="text-xs text-muted-foreground mb-3 line-clamp-3"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updatePost(index, 'excerpt', e.currentTarget.textContent || '')}
              >
                {post.excerpt}
              </p>

              {/* Action button */}
              <button 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#00D954' }}
              >
                <Plus className="w-4 h-4" style={{ color: '#212121' }} />
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          <button className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: '#E5E5E5' }}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: '#212121' }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
