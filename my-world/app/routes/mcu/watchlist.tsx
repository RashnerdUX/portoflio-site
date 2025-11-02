import React, {useEffect, useState} from 'react'
import type { Route } from './+types/watchlist';
import { Loading } from '~/components/loadingIcon';
import WatchOrder from '~/components/watch_order/watchOrder';
import { loadProgress } from '~/utils/db';
import { useNavigate, useSearchParams } from 'react-router';
import supabase from 'app/utils/supabase.server';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Watchlist" },
    { name: "description", content: "Your personalized watchlist of MCU movies and shows." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const watchOrderSelection = (url.searchParams.get('order') ?? 'chronological') as 'chronological' | 'release' | 'phase';

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

  const { data: mcuList, error } = await watchOrderQuery;

  if (error) {
    console.error("Error fetching MCU movies from Supabase:", error);
    throw new Error("Failed to load MCU movies");
  }

  const watchOrderList = (mcuList ?? []).reduce<Array<{ id: string; title: string; poster_url: string | null }>>((acc, movie) => {
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

  console.log("Loaded from the Server: ");
  return { watchlist: watchOrderList, watchOrderOrder: watchOrderSelection, initialProgress: null };
}

export async function clientLoader({serverLoader}: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const saved = await loadProgress();

  console.log("Loaded progress from IndexedDB: ", saved);
  return { watchlist: serverData.watchlist, watchOrderOrder: serverData.watchOrderOrder, initialProgress: saved ?? serverData.initialProgress };
}

// This ensures the clientLoader also works 
clientLoader.hydrate = true as const;

export function HydrateFallBack() {
  return <Loading />;
}

export const WatchOrderPage = ({loaderData} : Route.ComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState<string>(loaderData.watchOrderOrder ?? 'chronological');
    const navigate = useNavigate();

    useEffect(() => {

      const mq = window.matchMedia("(min-width: 768px)");

      // The function that changes the route
      const handleNavigation = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          navigate("/mcu-index");
        }
      };
      
      // Check on mount
      if (mq.matches) {
        navigate("/mcu-index");
      }
      
      // Run the function on media query change
      handleNavigation(mq);
      // Listen for changes
      mq.addEventListener("change", handleNavigation);

      return () => {
        mq.removeEventListener("change", handleNavigation);
      };
    }, [navigate]);

    useEffect(() => {
      setSelectedOrder(loaderData.watchOrderOrder ?? 'chronological');
    }, [loaderData.watchOrderOrder]);

    const handleOrderChange = (newOrder: string) => {
        setSelectedOrder(newOrder);
        const params = new URLSearchParams(searchParams);
        params.set('order', newOrder);
        setSearchParams(params);
    }

    const { watchlist, initialProgress } = loaderData;

  return (
    <>
        <main className='flex flex-col flex-1 py-4 px-4 sm:px-6 lg:px-16 gap-8'>
            <WatchOrder initialProgress={initialProgress ?? {}} selectedOrder={selectedOrder} onOrderChange={handleOrderChange} sortedMovies={watchlist ?? []} />
        </main>
    </>
  )
}

export default WatchOrderPage;