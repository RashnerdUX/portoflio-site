import React, { useMemo } from 'react'

interface CommunityRatingsProps {
    aggregateRating?: number;
    noOfReviews?: number;
}
const StarIcon: React.FC<{ fill: number }> = ({ fill }) => {
  // Clip the overlay star so fractional ratings render proportionally
  const clipStyle = useMemo(() => ({
    clipPath: `inset(0 ${Math.max(0, Math.min(1, 1 - fill)) * 100}% 0 0)`
  }), [fill])

  return (
    <span className='relative inline-flex h-5 w-5'>
      <svg
        viewBox='0 0 24 24'
        aria-hidden
        className='h-full w-full text-gray-300'
      >
        <path
          fill='currentColor'
          d='M12 17.25 6.545 20.4l1.042-6.076L2.75 9.9l6.1-.886L12 3.5l3.15 5.514 6.1.886-4.837 4.424 1.042 6.076Z'
        />
      </svg>
      <svg
        viewBox='0 0 24 24'
        aria-hidden
        className='absolute inset-0 h-full w-full text-yellow-400'
        style={clipStyle}
      >
        <path
          fill='currentColor'
          d='M12 17.25 6.545 20.4l1.042-6.076L2.75 9.9l6.1-.886L12 3.5l3.15 5.514 6.1.886-4.837 4.424 1.042 6.076Z'
        />
      </svg>
    </span>
  )
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
