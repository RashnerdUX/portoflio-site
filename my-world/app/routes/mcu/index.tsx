import React from 'react'
import type {Route} from './+types/index';
import { Loading } from '~/components/loadingIcon';
import { release } from 'os';
import { PageHeader } from '~/components/pageHeader';
import MovieCard from '~/components/index_page/movie_card';
import ProgressBar from '~/components/index_page/progress_bar';
import OrdrerNavigation from '~/components/index_page/order_navigation';
import { MovieTile } from '~/components/index_page/movie_tile';
import { HeroBanner } from '~/components/index_page/hero_banner';

export function meta({}: Route.MetaArgs ) {
  return [
    { title: "A Monument to the Marvel Cinematic Universe"},
    { name: "description", content: "Rewatch cinematic glory and participate in a fun ranking of the Marvel Cinematic Universe"},
  ]
}

export async function loader({} : Route.LoaderArgs){
  const mcuList = [
    { title: "Iron Man", releaseYear: 2008, phase: 1, chronologicalOrder: 3, synopsis: "After being kidnapped and forced to build weapons, billionaire and genius inventor Tony Stark instead creates a high-tech suit of armor to escape captivity. Returning to the United States, Stark refines the suit and decides to use his new creation to combat crime and terrorism, becoming the superhero Iron Man.", sagaRelevance: "Core MCU", tvaRating: "Approved", posterUrl: "https://posterspy.com/wp-content/uploads/2021/03/Iron_Man-200th_Poster.jpg", aggregratedRating: 4.5},
    { title: "Guardians of The Galaxy Vol. 3", releaseYear: 2023, phase: 4, chronologicalOrder: 22, synopsis: "Peter Quill, still grieving the loss of Gamora, must rally his team for a mission to defend the universe and protect one of their own. This pivotal mission could determine the future of the Guardians as a team, as they confront a villain from Rocket's past who threatens everything.", sagaRelevance: "Canon MCU", tvaRating: "Approved", posterUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/9UQMzjDgkapYMrwmvNNSVpAnjsV.jpg", aggregratedRating: 4.8},
    { title: "Captain America Winter Soldier", releaseYear: 2014, phase: 2, chronologicalOrder: 9, synopsis: "Steve Rogers, also known as Captain America, is living quietly in Washington, D.C., trying to adjust to the modern world. But when a SHIELD colleague is attacked, he becomes embroiled in a web of intrigue that threatens to put the world at risk.", sagaRelevance: "Core MCU", tvaRating: "Approved", posterUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/8Zy8g8g8g8g8g8g8g8g8g8g8g8g8g8g8.jpg", aggregratedRating: 4.3}
  ];
  return { listOfMovies: mcuList};
}

export function HydrateFallBack(){
  return <Loading />;
}

export const IndexPage = ({loaderData} : Route.ComponentProps) => {
  const [selectedOrder, setSelectedOrder] = React.useState<string>('chronological')
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const itemsPerPage = 10 // Show 10 movies per page

  // Sort movies based on selected order
  const sortedMovies = React.useMemo(() => {
    const movies = [...loaderData.listOfMovies]
    
    switch (selectedOrder) {
      case 'chronological':
        // Sort by in-universe chronological order
        return movies.sort((a, b) => a.chronologicalOrder - b.chronologicalOrder)
      
      case 'release':
        // Sort by release year
        return movies.sort((a, b) => a.releaseYear - b.releaseYear)
      
      case 'phase':
        // Sort by phase, then by release year within each phase
        return movies.sort((a, b) => {
          if (a.phase === b.phase) {
            return a.releaseYear - b.releaseYear
          }
          return a.phase - b.phase
        })
      
      default:
        return movies
    }
  }, [loaderData.listOfMovies, selectedOrder])

  // Pagination Values
  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMovies = loaderData.listOfMovies.slice(startIndex, endIndex)

  const handleOrderChange = (order: string) => {
    // Change sorting order on Watch Order tab
    setSelectedOrder(order)
  }

  const handlePageChange = (page: number) => {
    // Change the current page
    setCurrentPage(page)
    // Scroll to top of movie list
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Header for the page */}
      <PageHeader />

      {/* Main Content */}
      <main className='flex flex-col flex-1 py-4 px-4 sm:px-6 lg:px-16 gap-8'>
        {/* Hero Banner */}
        <HeroBanner />


        <div className='flex gap-8'>
          <div className='w-full lg:w-[75%] lg:px-8'>
            <div className='flex flex-col mb-4'>
              <h1 className='text-xl font-bold text-secondary-foreground'> Ranking </h1>
              <p className='text-secondary-foreground/70'>Here you can find the ranking of all MCU movies based on our unique rating system.</p>
            </div>
            {/* The Movie Ranking */}
            <div className='flex flex-col gap-4'>
              {paginatedMovies.map((movie: any, index: number) => {
                const actualIndex = startIndex + index;
                const movieInfo = { ...movie, index: actualIndex };
                return <MovieCard key={movie.title} {...movieInfo} />;
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center gap-2 mt-8'>
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='px-4 py-2 rounded-md bg-background/50 hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className='flex gap-2'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    
                    // Show ellipsis
                    const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
                    const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

                    if (showEllipsisBefore || showEllipsisAfter) {
                      return <span key={page} className='px-2'>...</span>
                    }

                    if (!showPage) return null

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-md font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background/50 hover:bg-background/80'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 rounded-md bg-background/50 hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <aside className='hidden lg:block w-[25%]'>
            {/* Watch Order Tab */}
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
              <OrdrerNavigation 
                selectedOrder={selectedOrder}
                onOrderChange={handleOrderChange}
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
        </aside>
        </div>
      </main>
    </div>
  )
}

export default IndexPage;