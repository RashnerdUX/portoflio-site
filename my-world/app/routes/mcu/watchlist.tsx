import React, {useEffect, useState} from 'react'
import type { Route } from './+types/watchlist';
import { Loading } from '~/components/loadingIcon';
import WatchOrder from '~/components/watch_order/watchOrder';
import { loadProgress } from '~/utils/db';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Watchlist" },
    { name: "description", content: "Your personalized watchlist of MCU movies and shows." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
    const mcuList = [
        { id: 1, title: "Iron Man", releaseYear: 2008, phase: 1, chronologicalOrder: 3, synopsis: "After being kidnapped and forced to build weapons, billionaire and genius inventor Tony Stark instead creates a high-tech suit of armor to escape captivity. Returning to the United States, Stark refines the suit and decides to use his new creation to combat crime and terrorism, becoming the superhero Iron Man.", sagaRelevance: "Core MCU", tvaRating: "Approved", posterUrl: "https://posterspy.com/wp-content/uploads/2021/03/Iron_Man-200th_Poster.jpg", aggregratedRating: 4.5},
        { id: 2 , title: "Guardians of The Galaxy Vol. 3", releaseYear: 2023, phase: 4, chronologicalOrder: 22, synopsis: "Peter Quill, still grieving the loss of Gamora, must rally his team for a mission to defend the universe and protect one of their own. This pivotal mission could determine the future of the Guardians as a team, as they confront a villain from Rocket's past who threatens everything.", sagaRelevance: "Canon MCU", tvaRating: "Approved", posterUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/9UQMzjDgkapYMrwmvNNSVpAnjsV.jpg", aggregratedRating: 4.8},
        { id: 3, title: "Captain America Winter Soldier", releaseYear: 2014, phase: 2, chronologicalOrder: 9, synopsis: "Steve Rogers, also known as Captain America, is living quietly in Washington, D.C., trying to adjust to the modern world. But when a SHIELD colleague is attacked, he becomes embroiled in a web of intrigue that threatens to put the world at risk.", sagaRelevance: "Core MCU", tvaRating: "Approved", posterUrl: "https://media.themoviedb.org/t/p/w440_and_h660_face/8Zy8g8g8g8g8g8g8g8g8g8g8g8g8g8g8.jpg", aggregratedRating: 4.3}
    ];

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