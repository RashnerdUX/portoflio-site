import React, {useEffect, useState} from 'react'
import type { Route } from './+types/watchlist';
import { Loading } from '~/components/loadingIcon';
import WatchOrder from '~/components/watch_order/watchOrder';
import { loadProgress } from '~/utils/db';
import { useNavigate } from 'react-router';
import supabase from 'app/utils/supabase.server';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Watchlist" },
    { name: "description", content: "Your personalized watchlist of MCU movies and shows." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // Fetch the list of MCU movies from Supabase
  const { data: mcuList, error } = await supabase
    .from('marvel_movies')
    .select('*');

  if (error) {
    console.error("Error fetching MCU movies from Supabase:", error);
    throw new Error("Failed to load MCU movies");
  }

    console.log("Loaded from the Server: ");
  return { watchlist: mcuList, initialProgress: null };
}

export async function clientLoader({serverLoader, params}: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const saved = await loadProgress();

  console.log("Loaded progress from IndexedDB: ", saved);
  return { watchlist: serverData.watchlist, initialProgress: saved };
}

// This ensures the clientLoader also works 
clientLoader.hydrate = true as const;

export function HydrateFallBack() {
  return <Loading />;
}

export const WatchOrderPage = ({loaderData} : Route.ComponentProps) => {
    const [selectedOrder, setSelectedOrder] = useState<string>('chronological');
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

    const handleOrderChange = (newOrder: string) => {
        setSelectedOrder(newOrder);
        console.log("Selected order changed to: ", newOrder);
    }

    const { watchlist, initialProgress } = loaderData;

    const sortedMovies = React.useMemo(() => {
        const movies = [...watchlist]

        switch (selectedOrder) {
          case 'chronological':
            // Sort by in-universe chronological order
            return movies.sort((a, b) => a.chronological_order - b.chronological_order)
          
          case 'release':
            // Sort by release year
            return movies.sort((a, b) => a.release_year - b.release_year)

          case 'phase':
            // Sort by phase, then by release year within each phase
            return movies.sort((a, b) => {
              if (a.phase === b.phase) {
                return a.release_year - b.release_year
              }
              return a.phase - b.phase
            })
          
          default:
            return movies
        }
      }, [watchlist, selectedOrder])

  return (
    <>
        <main className='flex flex-col flex-1 py-4 px-4 sm:px-6 lg:px-16 gap-8'>
            <WatchOrder initialProgress={initialProgress ?? {}} selectedOrder={selectedOrder} onOrderChange={handleOrderChange} sortedMovies={sortedMovies} />
        </main>
    </>
  )
}

export default WatchOrderPage;