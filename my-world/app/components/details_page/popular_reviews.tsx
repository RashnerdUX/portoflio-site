import React from 'react'

interface PopularReviewTileProps {
    channel: string;
    rating: string;
}

export const PopularReviewTile: React.FC<PopularReviewTileProps> = ({ channel, rating }) => {
    return (
        <div className='flex justify-between py-2'>
            <h4 className='text-foreground/40'>{channel}:</h4>
            <p className='text-foreground font-bold'>{rating}</p>
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
