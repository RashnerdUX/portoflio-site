import React from 'react'
import { FaGem } from "react-icons/fa";

interface MovieCardProps {
    index: number;
    title : string;
    releaseYear: number;
    phase: number;
    synopsis: string;
    sagaRelevance: string;
    tvaRating: string;
    posterUrl: string;
    aggregratedRating: number;
}

export const MovieCard = ({ index, title, releaseYear, phase, synopsis, sagaRelevance, tvaRating, posterUrl, aggregratedRating }: MovieCardProps) => {
  return (
    <div className='flex flex-col lg:flex-row bg-card p-4 gap-6 rounded-xl border border-primary/20 dark:hover:border-primary transition-all dark:hover:shadow-[0_0_20px_rgba(102,15,189,0.5)] duration-300 transform hover:-translate-y-1'>
      {/* The Image */}
      <img src={posterUrl} alt={`${title} poster`} className='w-40 h-48 object-cover rounded-lg flex-shrink-0'/>
      {/* Main content */}
      <div className='flex flex-col'>
        <div className='mb-2'>
            <h3 className='text-2xl font-bold text-secondary-foreground'><span className="text-primary mr-2">{index + 1}.</span>{title}</h3>
            <p className='text-secondary-foreground/50 mt-1'>{releaseYear} • Phase {phase} • {sagaRelevance}</p>
            <p className='text-secondary-foreground/70 font-medium text-sm text-wrap mt-4'>{synopsis}</p>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-400 dark:text-yellow-300">
            <FaGem className='inline-block mr-2 mb-1' />
            {aggregratedRating}</span>
          <span className="text-xs font-bold py-1 px-3 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">{tvaRating}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
