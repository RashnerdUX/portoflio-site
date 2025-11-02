import React from 'react'
import { Square } from 'lucide-react';
import { FaSquare } from "react-icons/fa6";

interface MovieTileProps {
  id: string;
  title: string;
  poster_url?: string;
  watched: boolean;
  onToggleSelect: (id: string) => void;
}

export const MovieTile: React.FC<MovieTileProps> = ({ id, title, poster_url, watched, onToggleSelect }) => {
  return (
        <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300">
            <input className="hidden peer" id={`movie_${id}`} type="checkbox" checked={watched} onChange={() => onToggleSelect(id)} />
            <label className="flex items-center gap-3 cursor-pointer w-full" htmlFor={`movie_${id}`}>
            <img alt={`${title} Poster`} className="w-10 h-14 object-cover rounded-md" src={poster_url || "/images/placeholder.png"} />
            <span className="flex-1 text-sm font-medium text-secondary-foreground">{title}</span>
            <div className={`w-6 h-6 rounded-md border-2 ${watched ? 'border-primary' : 'border-primary/50'} flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary`}>
                {watched ? <FaSquare className="size-4 text-primary" /> : <Square className="size-4 text-primary/50" />}
            </div>
            </label>
        </div>
  )
}

export default MovieTile;
