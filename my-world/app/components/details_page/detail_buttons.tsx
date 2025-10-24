import React from 'react'
import { FaRegStar, FaPlay, FaRegHeart } from "react-icons/fa6";

interface DetailButtonsProps {
    rateMovie?: () => void;
    rewatchNow?: () => void;
    markAsFavorite?: () => void;
}

export const DetailButtons = ({ rateMovie, rewatchNow, markAsFavorite }: DetailButtonsProps) => {
  return (
    <div>
        <div className="flex flex-col gap-3 py-4">
            <button onClick={rateMovie} className="w-full flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/80 transition-colors"><FaRegStar /> Rate the Movie</button>
            <button onClick={rewatchNow} className="w-full flex items-center justify-center gap-2 h-10 px-4 bg-[#302839] text-white text-sm font-medium rounded-lg hover:bg-[#4d405b] transition-colors"><FaPlay /> Rewatch Now</button>
            <button onClick={markAsFavorite} className="w-full flex items-center justify-center gap-2 h-10 px-4 bg-[#302839] text-white text-sm font-medium rounded-lg hover:bg-[#4d405b] transition-colors"><FaRegHeart /> Mark As Favourite</button>
        </div>
    </div>
  )
}

export default DetailButtons;