import React from 'react'
import StarIcon from '../staricon';

interface CommunityRatingsProps {
    aggregateRating?: number;
    noOfReviews?: number;
}

export const CommunityRatings: React.FC<CommunityRatingsProps> = ({ aggregateRating, noOfReviews }) => {
  const totalStars = 5
  const rating = typeof aggregateRating === 'number' ? Math.max(0, Math.min(totalStars, aggregateRating)) : 0
  const formattedRating = rating.toFixed(1)

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const fillAmount = Math.min(1, Math.max(0, rating - index))
    return <StarIcon key={index} fill={fillAmount} />
  })

  return (
    <div className='flex items-center gap-4 py-4' aria-label={`Community rating ${formattedRating} out of ${totalStars}`}>
      <div className='flex items-center gap-1'>{stars}</div>
      <div className='flex items-center gap-2'>
        <span className='font-semibold text-lg text-foreground/80'>
            {formattedRating}</span>
        {typeof noOfReviews === 'number' && (
          <span className='text-foreground/40 text-sm'>({noOfReviews} reviews)</span>
        )}
      </div>
    </div>
  )
}

export default CommunityRatings;
