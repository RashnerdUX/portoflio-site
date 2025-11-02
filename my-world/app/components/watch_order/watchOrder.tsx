import React, {useState, useEffect} from 'react' 
import { OrderNavigation } from '../index_page/order_navigation';
import ProgressBar from '../index_page/progress_bar';
import MovieTile from '../index_page/movie_tile';
import { saveProgress } from '~/utils/db';
interface WatchOrderProps {
  initialProgress: Record<string, boolean>;
  selectedOrder: string;
  onOrderChange: (order: string) => void;
  sortedMovies: Array<{ id: string; title: string; poster_url: string | null }>;
}

export const WatchOrder = ({ initialProgress, selectedOrder, onOrderChange, sortedMovies }: WatchOrderProps) => {

  // Monitor watched progress
  const [watchedMovies, setWatchedMovies] = useState<Record<string, boolean>>(initialProgress || {});

  // Update the default watchedMovies when initialProgress changes
  useEffect(() => {
    setWatchedMovies(initialProgress ?? {});
  }, [initialProgress]);

  // Calculate Progress
  const watchedCount = Object.values(watchedMovies).filter(Boolean).length;
  const progress = sortedMovies.length > 0 ? (watchedCount / sortedMovies.length) * 100 : 0;

  // Save to Indexed DB whenever user updates their watchlist
  useEffect(() => {
    const persist = async () => {
      await saveProgress(watchedMovies);
    };

    void persist();
  }, [watchedMovies]);

  // Handle toggling watched status
  const handleToggleWatched = (id: string) => {
    setWatchedMovies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const handleMarkAllWatched = () => {
    const allWatched: Record<string, boolean> = {};
    sortedMovies.forEach(movie => {
      allWatched[movie.id] = true;
    });
    setWatchedMovies(allWatched);
  }

  const handleResetProgress = () => {
    setWatchedMovies({});
  }

  return (
    <>
        <div className='relative bg-card border border-primary/20 rounded-xl p-4 h-full' style={{ backgroundImage: 'radial-gradient(circle at top, rgba(102, 15, 189, 0.15), transparent 60%)' }}>
            <h2 className='text-lg font-bold mb-4 text-secondary-foreground'> Watch Order </h2>
                {/* Progress Bar */}
                <div className='mb-4'>
                    <div className='flex justify-between items-center text-sm mb-2'>
                      <h3 className='font-semibold text-secondary-foreground'>Progress</h3>
                      <p className='text-secondary-foreground/50'>{Math.round(progress)}% Watched</p>
                    </div>
                    <ProgressBar value={progress} />
                </div>
                {/* Nav Bar for Watch Order */}
                <OrderNavigation
                    selectedOrder={selectedOrder}
                    onOrderChange={onOrderChange}
                  />
                  {/* Watch List for Movies */}
                  <div className=''>
                    {sortedMovies.map(movie => (
                      <MovieTile key={movie.title} id={movie.id} title={movie.title} watched={!!watchedMovies[movie.id]} poster_url={movie.poster_url ?? "/images/placeholder.png"} onToggleSelect={handleToggleWatched} />
                    ))}
                  </div>
    
                  {/* Buttons */}
                  <div className="sticky bottom-0 z-10 mt-4 pt-4 border-t border-primary/10 bg-card/80 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-primary/60 hover:bg-primary text-secondary-foreground transition-colors" onClick={handleMarkAllWatched}>Mark All Watched</button>
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-background/50 hover:bg-background/80 text-secondary-foreground/50 transition-colors" onClick={handleResetProgress}>Reset Progress</button>
                    </div>
                  </div>
              </div>

    </>
  )
}

export default WatchOrder;