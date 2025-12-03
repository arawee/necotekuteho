import { NewsletterBlock } from '@/types/newsletter';
import { Edit2 } from 'lucide-react';

interface ReviewsOffsetBlockProps {
  block: NewsletterBlock;
  onUpdate: (content: NewsletterBlock['content']) => void;
}

export const ReviewsOffsetBlock = ({ block, onUpdate }: ReviewsOffsetBlockProps) => {
  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <h1 
            className="text-left pl-6 mb-8"
            style={{ fontSize: '48px', fontWeight: 400, lineHeight: '120%', letterSpacing: '-1px', color: '#393939' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ ...block.content, title: e.currentTarget.textContent || '' })}
          >
            {block.content.title}
          </h1>
          <Edit2 className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
        </div>
        
        <div className="grid grid-cols-2 gap-0">
          {/* Left column */}
          <div className="space-y-6">
            {block.content.reviews?.slice(0, 2).map((review, index) => (
              <div key={index} className="bg-gray-100 rounded-2xl p-6 relative pb-20 group">
                <div className="relative group/text">
                  <p 
                    className="text-lg mb-4"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newReviews = [...(block.content.reviews || [])];
                      newReviews[index] = { ...newReviews[index], text: e.currentTarget.textContent || '' };
                      onUpdate({ ...block.content, reviews: newReviews });
                    }}
                  >
                    {review.text}
                  </p>
                  <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="relative group/author">
                    <p 
                      className="font-semibold text-sm"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newReviews = [...(block.content.reviews || [])];
                        newReviews[index] = { ...newReviews[index], author: e.currentTarget.textContent || '' };
                        onUpdate({ ...block.content, reviews: newReviews });
                      }}
                    >
                      {review.author}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                  <div className="relative group/position">
                    <p 
                      className="text-xs text-gray-600"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newReviews = [...(block.content.reviews || [])];
                        newReviews[index] = { ...newReviews[index], position: e.currentTarget.textContent || '' };
                        onUpdate({ ...block.content, reviews: newReviews });
                      }}
                    >
                      {review.position}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right column with offset */}
          <div className="space-y-6">
            <div className="h-16" />
            {block.content.reviews?.slice(2, 4).map((review, index) => (
              <div key={index + 2} className="bg-gray-100 rounded-2xl p-6 relative pb-20 group">
                <div className="relative group/text">
                  <p 
                    className="text-lg mb-4"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newReviews = [...(block.content.reviews || [])];
                      newReviews[index + 2] = { ...newReviews[index + 2], text: e.currentTarget.textContent || '' };
                      onUpdate({ ...block.content, reviews: newReviews });
                    }}
                  >
                    {review.text}
                  </p>
                  <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="relative group/author">
                    <p 
                      className="font-semibold text-sm"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newReviews = [...(block.content.reviews || [])];
                        newReviews[index + 2] = { ...newReviews[index + 2], author: e.currentTarget.textContent || '' };
                        onUpdate({ ...block.content, reviews: newReviews });
                      }}
                    >
                      {review.author}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                  <div className="relative group/position">
                    <p 
                      className="text-xs text-gray-600"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newReviews = [...(block.content.reviews || [])];
                        newReviews[index + 2] = { ...newReviews[index + 2], position: e.currentTarget.textContent || '' };
                        onUpdate({ ...block.content, reviews: newReviews });
                      }}
                    >
                      {review.position}
                    </p>
                    <Edit2 className="w-3 h-3 absolute top-0 -right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#393939' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};