import React, {useState, useEffect} from 'react' 
import { OrderNavigation } from '../index_page/order_navigation';
import ProgressBar from '../index_page/progress_bar';
import MovieTile from '../index_page/movie_tile';
import { saveProgress } from '~/utils/db';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


interface WatchOrderProps {
  initialProgress: Record<string, boolean>;
  selectedOrder: string;
  onOrderChange: (order: string) => void;
  sortedMovies: Array<{ id: string; title: string; poster_url: string | null }>;
  itemsPerPage?: number;
}

export const WatchOrder = ({ initialProgress, selectedOrder, onOrderChange, sortedMovies, itemsPerPage = 10 }: WatchOrderProps) => {

  // Monitor watched progress
  const [watchedMovies, setWatchedMovies] = useState<Record<string, boolean>>(initialProgress || {});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = Math.max(1, itemsPerPage);

  // Update the default watchedMovies when initialProgress changes
  useEffect(() => {
    setWatchedMovies(initialProgress ?? {});
  }, [initialProgress]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedOrder, pageSize]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(sortedMovies.length / pageSize));
    setCurrentPage(prev => Math.min(prev, totalPages));
  }, [sortedMovies.length, pageSize]);

  // Calculate Progress
  const watchedCount = Object.values(watchedMovies).filter(Boolean).length;
  const progress = sortedMovies.length > 0 ? (watchedCount / sortedMovies.length) * 100 : 0;

  const totalPages = Math.max(1, Math.ceil(sortedMovies.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const visibleMovies = sortedMovies.slice(startIndex, startIndex + pageSize);

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
  <div className='relative bg-card border border-primary/20 rounded-xl p-4' style={{ backgroundImage: 'radial-gradient(circle at top, rgba(102, 15, 189, 0.15), transparent 60%)' }}>
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
                    {visibleMovies.map(movie => (
                      <MovieTile key={movie.title} id={movie.id} title={movie.title} watched={!!watchedMovies[movie.id]} poster_url={movie.poster_url ?? "/images/placeholder.png"} onToggleSelect={handleToggleWatched} />
                    ))}
                  </div>
    
                  {/* Buttons */}
                  <div className="mt-4 pt-4 border-t border-primary/10 bg-card/80 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-primary/60 hover:bg-primary text-secondary-foreground transition-colors" onClick={handleMarkAllWatched}>Mark All Watched</button>
                      <button className="flex-1 text-xs font-bold py-2.5 px-3 rounded-md bg-background/50 hover:bg-background/80 text-secondary-foreground/50 transition-colors" onClick={handleResetProgress}>Reset Progress</button>
                    </div>
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button
                        className='px-3 py-1.5 text-xs font-semibold rounded-md bg-background/50 hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <IoIosArrowBack className="inline-block size-5" />
                      </button>
                      <div className='flex gap-1'>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                          const showPage =
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1);

                          const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                          const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                          if (showEllipsisBefore || showEllipsisAfter) {
                            return <span key={`ellipsis-${page}`} className='px-2 text-xs text-secondary-foreground/60'>...</span>;
                          }

                          if (!showPage) return null;

                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 text-xs font-semibold rounded-md transition-colors ${
                                currentPage === page
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-background/50 hover:bg-background/80'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        className='px-3 py-1.5 text-xs font-semibold rounded-md bg-background/50 hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <IoIosArrowForward className="inline-block size-5" />
                      </button>
                    </div>
                  )}
              </div>

    </>
  )
}

export default WatchOrder;