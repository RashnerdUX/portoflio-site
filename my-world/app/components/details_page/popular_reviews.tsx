import React from 'react'

interface PopularReviewTileProps {
    channel: string;
    rating: string;
}

export const PopularReviewTile: React.FC<PopularReviewTileProps> = ({ channel, rating }) => {
    return (
        <div className='flex justify-between py-2'>
            <h4 className='text-black/40 dark:text-white/60'>{channel}:</h4>
            <p className='text-black dark:text-white font-bold'>{rating}</p>
        </div>
    );
};

interface PopularReviewsProps {
    reviews: PopularReviewTileProps[];
}

export const PopularReviews: React.FC<PopularReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <PopularReviewTile key={review.channel} {...review} />
      ))}
    </div>
  )
}

export default PopularReviews;
