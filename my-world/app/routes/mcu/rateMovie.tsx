import React from 'react'
import type { Route } from './+types/rateMovie';
import { Loading } from '~/components/loadingIcon';
import { Form, useNavigate , useRouteLoaderData, useParams, redirect } from "react-router";
import { X } from 'lucide-react';
import { StoneRating } from '~/components/vote_page/stone_rating';
import { CustomSlider } from "../../components/customSlider";
import supabase from 'app/utils/supabase.server';

export function meta({ params, loaderData }: Route.MetaArgs) {
  const data = useRouteLoaderData("MCUMovieDetail");
  const movie_data = data ? data.movieData : null;
  return [
    { title: "Rate " + movie_data?.title },
    { name: "description", content: "Rate " + movie_data?.title + " with the Infinity Stones and contribute to the Index" },
  ];
}

export async function action({request, params}: Route.ClientActionArgs){
  const formData = await request.formData();
  // Debug the formdata
  console.log("FormData: ", formData);
  const movieId = params.movieId;
  const movieName = params.movieName;
  console.log("Movie ID: ", movieId);

  // Get the stone ratings
  const spaceRating = formData.get("spaceStone");
  const timeRating = formData.get("timeStone");
  const realityRating = formData.get("realityStone");
  const powerRating = formData.get("powerStone");
  const mindRating = formData.get("mindStone");
  const soulRating = formData.get("soulStone");

  // Get the TVA and Saga ratings
  const tvaRating = formData.get("TVA");
  const sagaRating = formData.get("Saga");

  // Finally get the review text
  const reviewText = formData.get("review");

  // Debug log all ratings
  console.log("The rating for time stone: ", timeRating);
  console.log("The rating for reality stone: ", realityRating);
  console.log("The rating for space stone: ", spaceRating);
  console.log("The rating for power stone: ", powerRating);
  console.log("The rating for mind stone: ", mindRating);
  console.log("The rating for soul stone: ", soulRating);
  console.log("The TVA Rating: ", tvaRating);
  console.log("The Saga Rating: ", sagaRating);
  console.log("The Review Text: ", reviewText);

  // Send to the UserRating table in Supabase
  const payload = {
    movie_id: movieId ?? null,
    space_stone: typeof spaceRating === 'string' ? Number(spaceRating) : null,
    time_stone: typeof timeRating === 'string' ? Number(timeRating) : null,
    reality_stone: typeof realityRating === 'string' ? Number(realityRating) : null,
    power_stone: typeof powerRating === 'string' ? Number(powerRating) : null,
    mind_stone: typeof mindRating === 'string' ? Number(mindRating) : null,
    soul_stone: typeof soulRating === 'string' ? Number(soulRating) : null,
    tva_score: typeof tvaRating === 'string' ? Number(tvaRating) : null,
    saga_score: typeof sagaRating === 'string' ? Number(sagaRating) : null,
    user_review: typeof reviewText === 'string' ? reviewText : null, // match column name
  };

  const { data, error } = await supabase.from('user_ratings').insert(payload).select();

  if (error) {
    console.error("Error inserting user rating:", error);
    throw new Error("Failed to submit rating");
  }

  console.log("Successfully inserted user rating:", data);
  return redirect(`/mcu-index/detail/${movieId}/${movieName}`);
}

const stones = [
    { name: 'spaceStone', label: 'Space', tooltip: 'Cinematography & World-building', color: '#3b82f6' },
    { name: 'mindStone', label: 'Mind', tooltip: 'Plot & Screenplay', color: '#facc15' },
    { name: 'realityStone', label: 'Reality', tooltip: 'Visual Effects & Production Design', color: '#dc2626' },
    { name: 'powerStone', label: 'Power', tooltip: 'Performances & Action', color: '#9333ea' },
    { name: 'timeStone', label: 'Time', tooltip: 'Pacing & Editing', color: '#22c55e' },
    { name: 'soulStone', label: 'Soul', tooltip: 'Emotional Impact & Score', color: '#f97316' }
];


export const VoteModal = ({
  actionData,
}: Route.ComponentProps) => {

  const params = useParams();
  const movieId = params.movieId;
  const navigate = useNavigate();

  const data = useRouteLoaderData("MCUMovieDetail");
  if (!data) {
    return <Loading />;
  }

  const movie_data = data.movieData;

  const closeModal = () => {
    console.log("Closing the Modal")
    // Close the modal by navigating back
    navigate(-1);
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center'>
      <div className='relative w-full max-w-md mx-4 md:mx-auto bg-background rounded-2xl border border-primary/20 shadow-2xl shadow-primary/20 overflow-hidden no-scrollbar'>

        {/* Background radial */}
        <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center" style={{ backgroundImage: "radial-gradient(circle at center, rgba(102, 15, 189, 0.2) 0%, rgba(102, 15, 189, 0) 70%)" }}></div>

        {/* Close button */}
        <button className="absolute top-4 right-4 z-50 text-foreground/80 hover:text-foreground transition-colors" onClick={closeModal}>
          <X className='size-5 text-foreground font-bold' />
        </button>

        {/* Main content */}
        <div className='relative p-6 sm:p-8 max-h-[90vh] overflow-y-auto'>
          <div className="text-center mb-6">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">Rate the Movie</h2>
            <p className="text-primary text-xl font-medium">{movie_data.title}</p>
          </div>
          <Form method='post'>
            {/* Infinity Breakdown */}
            <div className='grid grid-cols-2 gap-y-4 gap-x-6'>
              {stones.map((stone) => (
                  <StoneRating key={stone.name} name={stone.label} inputName={stone.name} tooltipInfo={stone.tooltip} color={stone.color} />
              ))}
            </div>

            {/* TVA Rating */}
            <div className='mt-6'>
              <h3 className="text-foreground text-lg font-bold mb-3 text-center">Cast Your TVA Verdict</h3>
              <CustomSlider name="TVA" tooltipInfo="TVA Rating" minLabel="Pruned" midLabel="Variant" maxLabel="Sacred" />
            </div>

            {/* Saga Relevance */}
            <div className='mt-6'>
              <h3 className="text-foreground text-lg font-bold mb-3 text-center">Determine Saga Relevance</h3>
              <CustomSlider name="Saga" tooltipInfo="Saga Rating" minLabel="Non-Canon" midLabel="Standalone" maxLabel="Core MCU" />
            </div>

            {/* User Review */}
            <div className='mt-6'>
              <div className='flex gap-2 items-center justify-center'>
                <h3 className="text-white text-lg font-bold mb-3 text-center">Your Mini Verdict (Optional)</h3>
              </div>
              <textarea
                id="review"
                name="review"
                placeholder="What did you think about the movie?(Max 140 characters)"
                rows={3}
                className="w-full bg-background/50 border border-gray-700/50 text-foreground rounded-lg p-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
              <button type="submit" className="w-full bg-primary text-white rounded-lg py-2 hover:bg-primary/80 transition-all duration-300">
                Submit Your Ratings
              </button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default VoteModal;