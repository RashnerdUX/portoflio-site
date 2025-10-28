import React, { useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { RatingBar } from '../vote_page/ratingBar';

interface StoneRatingProps {
  name: string;
  tooltipInfo: string;
  color: string;
  defaultValue?: number;
}

export const StoneRating = ({
  name,
  tooltipInfo,
  color,
  defaultValue = 0,
}: StoneRatingProps) => {
  const [rating, setRating] = useState<number>(defaultValue);

  return (
    <div className="space-y-1">
      {/* Title + Tooltip */}
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-sm font-medium text-foreground">{name}</h3>

        <div className="relative inline-block group">
          <HiOutlineInformationCircle className="size-4 text-foreground/50" />
          <span
            className="hidden px-2 py-1 bg-tertiary text-foreground/80 text-center text-[8px] leading-[1.5] rounded shadow-md
                       absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                       opacity-0 transition-all duration-300 translate-y-1
                       group-hover:block group-hover:opacity-100 group-hover:translate-y-0"
          >
            {tooltipInfo}
          </span>
        </div>
      </div>

      {/* Segmented Rating Bar */}
      <div className="">
        <RatingBar
          name={name}
          defaultValue={defaultValue}
          color={color}
          onChange={setRating}
        />
      </div>

    </div>
  );
};