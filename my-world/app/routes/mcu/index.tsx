import React from 'react'
import { useSearchParams } from 'react-router'
import type {Route} from './+types/index';
import { Loading } from '~/components/loadingIcon';
import { MovieCard } from '~/components/index_page/movie_card';
import { HeroBanner } from '~/components/index_page/hero_banner';
import { WatchOrder } from '~/components/watch_order/watchOrder';
import { loadProgress } from '~/utils/db';
import supabase  from "app/utils/supabase.server"
import type { Movie } from '~/types/movie';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export function meta({}: Route.MetaArgs ) {
  return [
    { title: "A Monument to the Marvel Cinematic Universe"},
    { name: "description", content: "Rewatch cinematic glory and participate in a fun ranking of the Marvel Cinematic Universe"},
  ]
}

export async function loader({ request } : Route.LoaderArgs){
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const watchOrderSelection = (url.searchParams.get('order') ?? 'chronological') as 'chronological' | 'release' | 'phase';
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  // Fetch paginated list of MCU movies ordered by aggregate score
  const { data: paginatedMovies, error, count } = await supabase
    .from('marvel_movies_with_defaults')
    .select('*', { count: 'exact' })
    .order('gauntlet_average_rating', { ascending: false })
    .range(offset, offset + itemsPerPage - 1);

  if (error) {
    console.error("Error fetching MCU movies from Supabase:", error);
    throw new Error("Failed to load MCU movies");
  }

  const normalizedMovies: Movie[] = (paginatedMovies ?? []).map((movie) => ({
    id: movie.id ?? '',
    title: movie.title ?? 'Untitled',
    release_year: movie.release_year ?? 0,
    phase: movie.phase ?? 0,
    synopsis: movie.synopsis ?? 'Synopsis unavailable.',
    saga_relevance: movie.saga_tier ?? 'Unknown Tier',
    tva_rating: movie.tva_status ?? 'Unknown Status',
    poster_url: movie.poster_url ?? '/images/placeholder.png',
    gauntlet_average_rating: Number(movie.gauntlet_average_rating ?? 0),
    slug: movie.slug ?? '',
  })).filter((movie) => movie.id && movie.slug);

  // Determine ordering for watch order list
  const watchOrderColumns: Record<string, Array<{ column: string; ascending: boolean }>> = {
    chronological: [{ column: 'chronological_order', ascending: true }],
    release: [{ column: 'release_year', ascending: true }],
    phase: [
      { column: 'phase', ascending: true },
      { column: 'release_year', ascending: true },
    ],
  };

  const ordering = watchOrderColumns[watchOrderSelection] ?? watchOrderColumns.chronological;

  let watchOrderQuery = supabase
    .from('marvel_movies_with_defaults')
    .select('id,title,poster_url,phase,release_year,chronological_order');

  ordering.forEach(({ column, ascending }) => {
    watchOrderQuery = watchOrderQuery.order(column, { ascending });
  });

  const { data: watchOrderMovies, error: watchOrderError } = await watchOrderQuery;

  if (watchOrderError) {
    console.error("Error fetching watch order data from Supabase:", watchOrderError);
    throw new Error("Failed to load watch order data");
  }

  const watchOrderList = (watchOrderMovies ?? []).reduce<Array<{ id: string; title: string; poster_url: string | null }>>((acc, movie) => {
    if (!movie?.id || !movie?.title) {
      return acc;
    }

    acc.push({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url ?? null,
    });

    return acc;
  }, []);

  return {
    listOfMovies: normalizedMovies,
    totalCount: count ?? paginatedMovies?.length ?? 0,
    currentPage: page,
    itemsPerPage,
    watchOrder: watchOrderList,
    watchOrderOrder: watchOrderSelection,
    initialProgress: null,
  };
}

export async function clientLoader({ serverLoader } : Route.ClientLoaderArgs){
  const serverData = await serverLoader();
  const saved = await loadProgress();

  console.log("Loaded progress from IndexedDB: ", saved);
  return { ...serverData, initialProgress: saved ?? serverData.initialProgress };
}

// Ensure the client loader also loads on mount
clientLoader.hydrate = true as const;

export function HydrateFallBack(){
  return <Loading />;
}

export const IndexPage = ({loaderData} : Route.ComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = React.useState<string>(loaderData.watchOrderOrder ?? 'chronological');
  const [currentPage, setCurrentPage] = React.useState<number>(loaderData.currentPage ?? 1);

  React.useEffect(() => {
    setSelectedOrder(loaderData.watchOrderOrder ?? 'chronological');
  }, [loaderData.watchOrderOrder]);

  React.useEffect(() => {
    setCurrentPage(loaderData.currentPage ?? 1);
  }, [loaderData.currentPage]);

  const paginatedMovies = (loaderData.listOfMovies ?? []) as Movie[];
  const startIndex = (loaderData.currentPage - 1) * loaderData.itemsPerPage;
  const totalPages = Math.max(1, Math.ceil((loaderData.totalCount ?? paginatedMovies.length) / loaderData.itemsPerPage));

  const handleOrderChange = (order: string) => {
    setSelectedOrder(order);
    const params = new URLSearchParams(searchParams);
    params.set('order', order);
    params.set('page', '1');
    setSearchParams(params);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    params.set('order', selectedOrder);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      {/* Main Content */}
      <main className='flex flex-col flex-1 py-4 px-4 sm:px-6 lg:px-16 gap-8'>
        {/* Hero Banner */}
        <HeroBanner />

        <div className='flex gap-8'>
          <div className='w-full md:w-[60%] lg:w-[75%] lg:px-8'>
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
                  <IoIosArrowBack className="inline-block size-5" />
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
                  <IoIosArrowForward className="inline-block size-5" />
                </button>
              </div>
            )}
          </div>

          <aside className='hidden md:w-[40%] md:block lg:w-[25%]'>
            <WatchOrder initialProgress={loaderData.initialProgress ?? {}} selectedOrder={selectedOrder} onOrderChange={handleOrderChange} sortedMovies={loaderData.watchOrder ?? []} />
        </aside>
        </div>
      </main>
    </div>
  )
}

export default IndexPage;