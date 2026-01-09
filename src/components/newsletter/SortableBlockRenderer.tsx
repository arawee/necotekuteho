import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NewsletterBlock } from '@/types/newsletter';
import { ZichovecHeaderBlock } from './blocks/ZichovecHeaderBlock';
import { ZichovecHeaderWithMenuBlock } from './blocks/ZichovecHeaderWithMenuBlock';
import { ZichovecFooterBlock } from './blocks/ZichovecFooterBlock';
import { ProductListBlock } from './blocks/ProductListBlock';
import { LocationsBlock } from './blocks/LocationsBlock';
import { BlogPostsBlock } from './blocks/BlogPostsBlock';
import { PromoBoxBlock } from './blocks/PromoBoxBlock';
import { GalleryTrioBlock } from './blocks/GalleryTrioBlock';
import { GalleryDuoBlock } from './blocks/GalleryDuoBlock';
import { GallerySingleBlock } from './blocks/GallerySingleBlock';
import { ArticleTextBlock } from './blocks/ArticleTextBlock';
import { BenefitsBlock } from './blocks/BenefitsBlock';
import { MistaBlock } from './blocks/MistaBlock';
import { CategoriesBlock } from './blocks/CategoriesBlock';
import { PoziceBlock } from './blocks/PoziceBlock';
import { ProductTextBlock } from './blocks/ProductTextBlock';
import { TextTwoColumnsBlock } from './blocks/TextTwoColumnsBlock';
import { BodyTextBoxBlock } from './blocks/BodyTextBoxBlock';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableBlockRendererProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
  onDelete: () => void;
}

export function SortableBlockRenderer({ block, onUpdate, onDelete }: SortableBlockRendererProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'zichovec-header':
        return <ZichovecHeaderBlock block={block} onUpdate={onUpdate} />;
      case 'zichovec-header-menu':
        return <ZichovecHeaderWithMenuBlock block={block} onUpdate={onUpdate} />;
      case 'zichovec-footer':
        return <ZichovecFooterBlock block={block} onUpdate={onUpdate} />;
      case 'product-list':
        return <ProductListBlock block={block} onUpdate={onUpdate} />;
      case 'locations':
        return <LocationsBlock block={block} onUpdate={onUpdate} />;
      case 'blog-posts':
        return <BlogPostsBlock block={block} onUpdate={onUpdate} />;
      case 'promo-box':
        return <PromoBoxBlock block={block} onUpdate={onUpdate} />;
      case 'gallery-trio':
        return <GalleryTrioBlock block={block} onUpdate={onUpdate} />;
      case 'gallery-duo':
        return <GalleryDuoBlock block={block} onUpdate={onUpdate} />;
      case 'article-text':
        return <ArticleTextBlock block={block} onUpdate={onUpdate} />;
      case 'benefits':
        return <BenefitsBlock block={block} onUpdate={onUpdate} />;
      case 'mista':
        return <MistaBlock block={block} onUpdate={onUpdate} />;
      case 'categories':
        return <CategoriesBlock block={block} onUpdate={onUpdate} />;
      case 'pozice':
        return <PoziceBlock block={block} onUpdate={onUpdate} />;
      case 'product-text':
        return <ProductTextBlock block={block} onUpdate={onUpdate} />;
      case 'gallery-single':
        return <GallerySingleBlock block={block} onUpdate={onUpdate} />;
      case 'text-two-columns':
        return <TextTwoColumnsBlock block={block} onUpdate={onUpdate} />;
      case 'body-text-box':
        return <BodyTextBoxBlock block={block} onUpdate={onUpdate} />;
      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Block Controls */}
      <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Block Content */}
      <div className="p-4">
        {renderBlock()}
      </div>
    </Card>
  );
}
