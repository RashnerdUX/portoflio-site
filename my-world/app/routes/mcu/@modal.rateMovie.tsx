import React from 'react'
import type { Route } from './+types/rateMovie';
import { Loading } from '~/components/loadingIcon';
import supabase from '~/superbaseclient';
import { Form, useNavigate } from 'react-router';
import { useRouteLoaderData, useParams } from "react-router";
import { X } from 'lucide-react';
import { StoneRating } from '~/components/vote_page/stone_rating';
import { CustomSlider } from "../../components/customSlider";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Rate the movie " + params.movieName },
    { name: "description", content: "Rate the movie " + params.movieName },
  ];
}

export async function action({request}: Route.ClientActionArgs){
  const formData = await request.formData();
  const spaceRating = formData.get("spaceStone");
  console.log("The rating for space stone: ", spaceRating);
  return null;
}


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
              <StoneRating name="SpaceStone" tooltipInfo="World Building" />
              <StoneRating name="TimeStone" tooltipInfo="Time Manipulation" />
              <StoneRating name="RealityStone" tooltipInfo="Reality Alteration" />
              <StoneRating name="PowerStone" tooltipInfo="Power Amplification" />
              <StoneRating name="MindStone" tooltipInfo="Mind Control" />
              <StoneRating name="SoulStone" tooltipInfo="Soul Connection" />
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
              <h3 className="text-white text-lg font-bold mb-3 text-center">Your Mini Verdict (Optional)</h3>
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