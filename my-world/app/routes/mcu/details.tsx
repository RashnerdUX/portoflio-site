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
import supabase from 'app/utils/supabase.server';

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
  // Fetch movie details based on params.movieId
  const movieId = params.movieId;
  
  let { data: marvel_movies_with_defaults, error } = await supabase
    .from('marvel_movies_with_defaults')
    .select('*')
    .eq('id', movieId)
    .single();

  if (error) {
    console.error("Error fetching movie details from Supabase:", error);
    throw new Error("Failed to load movie details");
  }

  console.log("Loaded from the Server: ", marvel_movies_with_defaults);
  return { movieData: marvel_movies_with_defaults };
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

  // Parse core reviews
  const reviewJSON = movieData.core_reviews;
  // Define the type
  type CoreReview = {
    channel: string;
    rating: string;
  };

  type CoreReviewsList = CoreReview[];

  function formatCoreReviews(reviews: unknown): CoreReviewsList {
    if (Array.isArray(reviews)) {
      return reviews.filter(review => review.channel && review.rating) as CoreReviewsList;
    } else if (typeof reviews === 'object' && reviews !== null) {
      return Object.entries(reviews).map(([channel, rating]) => ({ channel, rating }));
    } else {
      return [];
    }
  }

  const parsedReviews = formatCoreReviews(reviewJSON);
  console.log("Parsed Reviews:", parsedReviews);

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
              <div className='bg-cover md:bg-contain w-full min-h-[480px] rounded-xl' style={{ backgroundImage: `linear-gradient(0deg, rgba(20, 17, 24, 1) 0%, rgba(20, 17, 24, 0) 50%), url(${movieData.poster_url})` }}>
                <div className='absolute bottom-4 left-4 pr-2'>
                  <h2 className='text-4xl font-bold text-white tracking-tight'>{movieData.title}</h2>
                  <p className='text-sm text-white/60'> {movieData.synopsis} </p>
                </div>
              </div>
            </div>
            {/* For the breakdown */}
            <div className='p-4'>
              <h3 className='text-2xl font-bold tracking-tight leading-tight border-b border-tertiary pb-2 pt-5 mb-4 text-foreground'> Infinity Stones Breakdown </h3>
              {/* Infinity Stones Components */}
              <InfinityStonesBreakdown 
                power_stone_avg={movieData.power_stone_avg}
                space_stone_avg={movieData.space_stone_avg}
                reality_stone_avg={movieData.reality_stone_avg}
                mind_stone_avg={movieData.mind_stone_avg}
                time_stone_avg={movieData.time_stone_avg}
                soul_stone_avg={movieData.soul_stone_avg}
              />
            </div>

            {/* Creator's Review */}
            <div className='p-4'>
              <h3 className='text-2xl font-bold tracking-tight leading-tight border-b border-tertiary pb-2 pt-5 mb-4'> Creator's Review </h3>
              {/* Creator's Review Component */}
              {movieData.creator_review_text ? (<CreatorReview reviewHeadline={movieData.review_headline} reviewText={movieData.review_body} reviewTags={movieData.review_tags} />) : (<p className='text-foreground/60 italic'> The creator is yet to review this movie </p>)}
            </div>
          </div>
        </section>
        <aside className='w-full lg:w-80 flex-shrink-0'>
          <div className='flex flex-col gap-4 bg-card border border-tertiary rounded-xl p-6'>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Movie Details </h3>
              {/* Quick Facts Component */}
              <QuickFacts phase={2} releaseDate={movieData.release_date} director={movieData.director} runtime={movieData.runtime} />
            </div>
            <div className='border-b border-tertiary'>
              {/* Buttons Component */}
              <DetailButtons rateMovie={rateMovie} rewatchNow={rewatchNow} markAsFavorite={markAsFavorite} />
            </div>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Popular Reviews </h3>
              {/* Reviews Component */}
              <PopularReviews reviews={parsedReviews} />
            </div>
            <div className='border-b border-tertiary'>
              <h3 className='text-lg font-bold'> Community Ratings </h3>
              {/* Community Ratings Component */}
              <CommunityRatings aggregateRating={movieData.gauntlet_average_rating} noOfReviews={movieData.global_ratings_count} />
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
