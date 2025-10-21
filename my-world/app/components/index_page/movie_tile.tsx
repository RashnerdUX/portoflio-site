import React from 'react'

interface MovieTileProps {
  title: string;
  posterUrl?: string;
}

export const MovieTile: React.FC<MovieTileProps> = ({ title, posterUrl }) => {
  return (
        <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300">
            <input className="hidden peer" id="movie_3" type="checkbox"/>
            <label className="flex items-center gap-3 cursor-pointer w-full" htmlFor="movie_3">
            <img alt={`${title} Poster`} className="w-10 h-14 object-cover rounded-md" src={posterUrl} />
            <span className="flex-1 text-sm font-medium text-secondary-foreground">{title}</span>
            <div className="w-6 h-6 rounded-md border-2 border-primary/50 flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary">
            <span className="material-symbols-outlined text-white text-lg hidden peer-checked:block">check</span>
            </div>
            </label>
        </div>
  )
}
