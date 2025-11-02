import React from 'react'
import { FaGem } from "react-icons/fa";
import { Link } from 'react-router';
import type { Movie } from '../../types/movie';

interface MovieCardProps extends Movie {
    index: number;
}


export const MovieCard = ({ index, ...movie }: MovieCardProps) => {
  return (
    <Link to={`/mcu-index/detail/${movie.id}/${movie.slug}`} className='no-underline' state={{ movie }}>
      <div className='flex flex-col lg:flex-row bg-card p-4 gap-6 rounded-xl border border-primary/20 dark:hover:border-primary transition-all dark:hover:shadow-[0_0_20px_rgba(102,15,189,0.5)] duration-300 transform hover:-translate-y-1'>
        {/* The Image */}
        <img src={movie.poster_url} alt={`${movie.title} poster`} className='w-40 h-48 object-cover rounded-lg flex-shrink-0'/>
        {/* Main content */}
        <div className='flex flex-col'>
          <div className='mb-2'>
              <h3 className='text-2xl font-bold text-secondary-foreground'><span className="text-primary mr-2">{index + 1}.</span>{movie.title}</h3>
              <p className='text-secondary-foreground/50 mt-1'>{movie.release_year} • Phase {movie.phase} • {movie.saga_relevance}</p>
              <p className='text-secondary-foreground/70 font-medium text-sm text-wrap mt-4'>{movie.synopsis}</p>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-yellow-400 dark:text-yellow-300">
              <FaGem className='inline-block mr-2 mb-1' />
              {movie.gauntlet_average_rating}</span>
            <span className="text-xs font-bold py-1 px-3 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">{movie.tva_rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard;
