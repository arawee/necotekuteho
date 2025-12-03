import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NewsletterBlock } from '@/types/newsletter';
import { HeaderContentBlock } from './blocks/HeaderContentBlock';
import { IntroBlock } from './blocks/IntroBlock';
import { ThanksBlock } from './blocks/ThanksBlock';
import { PromoBlock } from './blocks/PromoBlock';
import { BenefitsOffsetBlock } from './blocks/BenefitsOffsetBlock';
import { ReviewsOffsetBlock } from './blocks/ReviewsOffsetBlock';
import { EventsBlock } from './blocks/EventsBlock';
import { HarmonogramBlock } from './blocks/HarmonogramBlock';
import { EventBlock } from './blocks/EventBlock';
import { PhotosBlock } from './blocks/PhotosBlock';
import { SummaryBlock } from './blocks/SummaryBlock';

import { QuoteBlock } from './blocks/QuoteBlock';
import { FooterBlock } from './blocks/FooterBlock';
import { PlainTextBlock } from './blocks/PlainTextBlock';
import { PromoWideBlock } from './blocks/PromoWideBlock';
import { SinglePhotoBlock } from './blocks/SinglePhotoBlock';
import { SinglePhotoSquareBlock } from './blocks/SinglePhotoSquareBlock';
import { TextContentBlock } from './blocks/TextContentBlock';
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
      case 'header-content':
        return (
          <HeaderContentBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'intro-block':
        return (
          <IntroBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'thanks-block':
        return (
          <ThanksBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'promo-block':
        return (
          <PromoBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'benefits-offset':
        return (
          <BenefitsOffsetBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'reviews-offset':
        return (
          <ReviewsOffsetBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'events':
        return (
          <EventsBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'harmonogram':
        return (
          <HarmonogramBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'event':
        return (
          <EventBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'photos':
        return (
          <PhotosBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'summary':
        return (
          <SummaryBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'quote':
        return (
          <QuoteBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'promo-wide':
        return (
          <PromoWideBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'single-photo':
        return (
          <SinglePhotoBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'single-photo-square':
        return (
          <SinglePhotoSquareBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
      case 'text-content':
        return (
          <TextContentBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'plain-text':
        return (
          <PlainTextBlock
            content={block.content}
            onUpdate={onUpdate}
          />
        );
      case 'footer':
        return (
          <FooterBlock
            block={block}
            onUpdate={onUpdate}
          />
        );
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