import React from 'react'
import { Outlet, useLocation, useNavigate } from "react-router";
import type { Route } from './+types/details';
import { Loading } from '~/components/loadingIcon';
import { QuickFacts } from '~/components/details_page/quick_facts';
import PopularReviews from '~/components/details_page/popular_reviews';
import { CommunityRatings } from '~/components/details_page/community_ratings';
import { SagaRelevance } from '~/components/details_page/saga_relevance';
import InfinityStonesBreakdown from '~/components/details_page/infinity_stones';
import { CreatorReview } from '~/components/details_page/creator_review';
import { DetailButtons } from '~/components/details_page/detail_buttons';

export function meta({params}: Route.MetaArgs){
  return [
    {
      title: params.movieName + " Review",
    },
    {
      name: "description",
      content: "This is the details page for " + params.movieName,
    },
  ]
}

export async function loader({params} : Route.LoaderArgs){
  const movieData = {
    title: "Thor: The Dark World",
    details: "Thor battles to save the Nine Realms from a shadowy enemy that predates the universe itself.",
    posterUrl: "https://ntvb.tmsimg.com/assets/p9530219_v_h8_aa.jpg?w=1280&h=720",
    review_headline: "A thrilling cosmic adventure with heart",
    review_body: "Thor: The Dark World soars with breathtaking visuals and a gripping storyline that delves deep into the mythology of the Marvel Universe. Chris Hemsworth delivers a powerful performance as Thor, balancing action-packed sequences with moments of genuine emotion. The film's antagonist, Malekith, portrayed by Christopher Eccleston, brings a menacing presence that elevates the stakes. The chemistry between Thor and Jane Foster (Natalie Portman) adds a heartfelt dimension to the narrative. With its blend of epic battles, humor, and character development, Thor: The Dark World is a must-watch for fans of the franchise and newcomers alike.",
    review_tags: ["Cosmic", "Heartbreaking"],
    coreReviews: [
      { channel: "Rotten Tomatoes", rating: "94%" },
      { channel: "IMDb", rating: "8.0/10" },
      { channel: "Metacritic", rating: "75/100" },
      { channel: "Letterboxd", rating: "3.8/5" },
    ],
    community_ratings: { average: 2, count: 347 },
  }

  return { movieData: movieData };
}

export function HydrateFallBack(){
  return <Loading />;
}

export const DetailsPage = ({loaderData} : Route.ComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Need to get the data from the Index page
  const movie = location.state?.movieData;
  console.log("Movie Data from location state:", movie);

  // Load movie data from loader if unavailable e.g when the page is sent to someone else
  const movieData = movie || loaderData.movieData;

  const rateMovie = () => {
    console.log("Current location:", location);
    console.log("Opening Rate Movie Modal");
    navigate("rate-movie/", { state: { background: location } });
    console.log("Rate Movie clicked");
  }

  const rewatchNow = () => {
    console.log("Rewatch Now clicked");
  }

  const markAsFavorite = () => {
    console.log("Mark As Favorite clicked");
  }
  return (
    <div>
      <main className="flex flex-col lg:flex-row gap-8 px-4 sm:px-10 py-8">
        <section className='w-full' id='movie-details'>
          <div className='flex-1 flex flex-col'>
            {/* For the image */}
            <div className='relative'>
              <div className='bg-cover bg-center w-full min-h-[480px] rounded-xl' style={{ backgroundImage: `linear-gradient(0deg, rgba(20, 17, 24, 1) 0%, rgba(20, 17, 24, 0) 50%), url(${movieData.posterUrl})` }}>
                <div className='absolute bottom-4 left-4'>
                  <h2 className='text-4xl font-bold text-white tracking-tight'>{movieData.title}</h2>
                  <p className='text-sm text-white/60'> {movieData.details} </p>
                </div>
              </div>
            </div>
            {/* For the breakdown */}
            <div className='p-4'>
              <h3 className='text-2xl font-bold tracking-tight leading-tight border-b border-tertiary pb-2 pt-5 mb-4 text-foreground'> Infinity Stones Breakdown </h3>
              {/* Infinity Stones Components */}
              <InfinityStonesBreakdown />
            </div>

            {/* Creator's Review */}
            <div className='p-4'>
              <h3 className='text-2xl font-bold tracking-tight leading-tight border-b border-tertiary pb-2 pt-5 mb-4'> Creator's Review </h3>
              {/* Creator's Review Component */}
              <CreatorReview reviewHeadline={movieData.review_headline} reviewText={movieData.review_body} reviewTags={movieData.review_tags} />
            </div>
          </div>
        </section>
        <aside className='w-full lg:w-80 flex-shrink-0'>
          <div className='flex flex-col gap-4 bg-card border border-tertiary rounded-xl p-6'>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Movie Details </h3>
              {/* Quick Facts Component */}
              <QuickFacts phase={2} releaseDate='November 8, 2013' director='Alan Taylor' runtime='112 minutes'/>
            </div>
            <div className='border-b border-tertiary'>
              {/* Buttons Component */}
              <DetailButtons rateMovie={rateMovie} rewatchNow={rewatchNow} markAsFavorite={markAsFavorite} />
            </div>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Popular Reviews </h3>
              {/* Reviews Component */}
              <PopularReviews reviews={movieData.coreReviews}/>
            </div>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Community Ratings </h3>
              {/* Community Ratings Component */}
              <CommunityRatings aggregateRating={movieData.community_ratings.average} noOfReviews={movieData.community_ratings.count} />
            </div>
            <div className=''>
              <h3 className='text-lg font-bold'> Saga Relevance </h3>
              <p>Working on it</p>
            </div>
          </div>
        </aside>
      </main>
      
      <Outlet />
    </div>
  )
}

export default DetailsPage;
