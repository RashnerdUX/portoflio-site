import React from 'react'

interface CreatorReviewProps {
    reviewHeadline?: string;
    reviewText?: string;
    reviewTags?: string[];
}

export const CreatorReview: React.FC<CreatorReviewProps> = ({ reviewHeadline, reviewText, reviewTags }) => {
  return (
    <div className='flex flex-col w-full bg-card p-4 gap-2 rounded-lg'>
        <h3 className='text-lg font-semibold mb-2'> {reviewHeadline} </h3>
        <p className='text-sm text-black/60 dark:text-white/60'> {reviewText} </p>
        <div className='flex flex-wrap gap-2 mt-2'>
          {reviewTags?.map((tag, index) => (
            <span key={index} className='bg-tertiary text-xs text-white py-1 px-2 rounded-full'>
              {tag}
            </span>
          ))}
        </div>
    </div>
  )
}
