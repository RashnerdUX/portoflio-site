import React from 'react' 
import { OrderNavigation } from '../index_page/order_navigation';
import ProgressBar from '../index_page/progress_bar';
import MovieTile from '../index_page/movie_tile';

interface WatchOrderProps {
  selectedOrder: string;
  onOrderChange: (order: string) => void;
  sortedMovies: Array<{
    title: string;
    posterUrl: string;
  }>;
}

export const WatchOrder = ({ selectedOrder, onOrderChange, sortedMovies }: WatchOrderProps) => {
  return (
    <>
        <div className='relative bg-card border border-primary/20 rounded-xl p-4 h-full' style={{ backgroundImage: 'radial-gradient(circle at top, rgba(102, 15, 189, 0.15), transparent 60%)' }}>
            <h2 className='text-lg font-bold mb-4 text-secondary-foreground'> Watch Order </h2>
                {/* Progress Bar */}
                <div className='mb-4'>
                    <div className='flex justify-between items-center text-sm mb-2'>
                      <h3 className='font-semibold text-secondary-foreground'>Progress</h3>
                      <p className='text-secondary-foreground/50'>10% Watched</p>
                    </div>
                    <ProgressBar value={10} />
                </div>
                {/* Nav Bar for Watch Order */}
                <OrderNavigation
                    selectedOrder={selectedOrder}
                    onOrderChange={onOrderChange}
                  />
                  {/* Watch List for Movies */}
                  <div className=''>
                    {sortedMovies.map(movie => (
                      <MovieTile key={movie.title} title={movie.title} posterUrl={movie.posterUrl} />
                    ))}
                  </div>
    
                  {/* Buttons */}
                  <div className="sticky bottom-0 z-10 mt-4 pt-4 border-t border-primary/10 bg-card/80 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-primary/60 hover:bg-primary text-secondary-foreground transition-colors">Mark All Watched</button>
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-background/50 hover:bg-background/80 text-secondary-foreground/50 transition-colors">Reset Progress</button>
                    </div>
                  </div>
              </div>

    </>
  )
}

export default WatchOrder;