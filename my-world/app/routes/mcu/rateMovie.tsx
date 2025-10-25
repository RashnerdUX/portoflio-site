import React from 'react'
import type { Route } from './+types/rateMovie';
import { Loading } from '~/components/loadingIcon';
import supabase from '~/superbaseclient';
import { Form } from 'react-router';
import { useRouteLoaderData, useParams } from "react-router";
import { X } from 'lucide-react';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Vote for " + params.movieId },
    { name: "description", content: "Cast your vote for " + params.movieId },
  ];
}

export async function action({request}: Route.ClientActionArgs){
  const formData = await request.formData();
  const vote = formData.get("vote");
  console.log("Vote received: ", vote);
  return null;
}


export const VoteModal = ({
  actionData,
}: Route.ComponentProps) => {

  const params = useParams();
  const movieId = params.movieId;

  const data = useRouteLoaderData("MCUMovieDetail");
  if (!data) {
    return <Loading />;
  }

  const movie_data = data.movieData;

  const closeModal = () => {
    console.log("Closing the Modal")
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center'>
      <div className='relative w-full max-w-md mx-auto bg-background rounded-2xl border border-primary/20 shadow-2xl shadow-primary/20 overflow-hidden'>

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
            
          </Form>
        </div>
      </div>
    </div>
  )
}

export default VoteModal;